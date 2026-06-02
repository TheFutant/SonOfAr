// Offline playthrough QA — the local, zero-token replacement for the
// browser-agent playthrough (docs/browser-agent-playthrough-prompt.md).
//
// "Story is data, the engine is pure functions" (CLAUDE.md), so we don't need a
// browser to play the game — we replay it with the exact same modules the app
// uses (getScene + the gameEngine reducer helpers). Where the browser agent
// *sampled* ~12 guessed "personalities" hoping to stumble into endings, this
// does a deterministic state-space search and PROVES which endings are reachable,
// printing the exact choice path to each. It also finds runtime dead-ends and
// unreachable content that the structural validator can't (the validator ignores
// `requires` conditions; a real player is gated by them).
//
// What this CANNOT do (still needs the deployed container / a browser):
//   - live telemetry beacons actually hitting nginx (we check event/whitelist
//     parity statically instead — that's the part that silently breaks),
//   - visual layout / mobile viewport,
//   - service-worker / PWA install behavior.
//
// Run with `npm run qa`. Exit code is non-zero on any HARD failure, so it's
// CI-able.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { allScenes, getScene, STARTING_SCENE_ID } from "../../src/data/story";
import { chooseChoice, meetsCondition, newGame } from "../../src/utils/gameEngine";
import {
  ENDING_TITLES,
  type Choice,
  type Condition,
  type EndingId,
  type GameState,
  type Scene,
  type StatKey,
} from "../../src/types/game";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "../..");

// ── tiny report plumbing ──────────────────────────────────────────────────
const hardFailures: string[] = [];
const warnings: string[] = [];
const fail = (msg: string) => hardFailures.push(msg);
const warn = (msg: string) => warnings.push(msg);

const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const ok = (s: string) => `\x1b[32m${s}\x1b[0m`;
const bad = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yel = (s: string) => `\x1b[33m${s}\x1b[0m`;

function section(title: string) {
  console.log(`\n${bold("── " + title + " " + "─".repeat(Math.max(0, 60 - title.length)))}`);
}

// ── 1. Structural validation ────────────────────────────────────────────────
// validateStory() already ran at import time of story.ts (it throws on broken
// refs / dupes / ending wiring / structural unreachability). If we got here, it
// passed — reaching this line IS the green check.
section("1. Structural validation (validateStory)");
console.log(`${ok("✓")} validateStory passed at module load: ${allScenes.length} scenes, no broken refs / dupes / ending-wiring errors.`);

// ── State-space search over the REAL choice graph ────────────────────────────
// State is high-dimensional, but only a few dimensions actually gate branches.
// We collapse the rest so the reachable-state set stays finite & tiny:
//   - stats: bucketed at exactly the thresholds any condition compares against
//     (only predicate flips matter, not raw values),
//   - flags: only flag keys referenced by some condition,
//   - inventory + chosenCode: kept verbatim (they gate directly).
// This turns "can a player reach ending X?" into a provable graph reachability.

const STAT_KEYS: StatKey[] = ["heat", "humanity", "evidence", "chaos", "editorApproval"];

const statThresholds: Record<StatKey, number[]> = {
  heat: [], humanity: [], evidence: [], chaos: [], editorApproval: [],
};
const relevantFlags = new Set<string>();
const relevantItems = new Set<string>();

for (const scene of allScenes) {
  for (const c of scene.choices) {
    const req = c.requires;
    if (!req) continue;
    for (const k of STAT_KEYS) {
      if (req.minStats?.[k] !== undefined) statThresholds[k].push(req.minStats[k]!);
      if (req.maxStats?.[k] !== undefined) statThresholds[k].push(req.maxStats[k]!);
    }
    if (req.flag) relevantFlags.add(req.flag.key);
    for (const it of req.hasItems ?? []) relevantItems.add(it);
    for (const it of req.notHasItems ?? []) relevantItems.add(it);
  }
}
for (const k of STAT_KEYS) {
  statThresholds[k] = [...new Set(statThresholds[k])].sort((a, b) => a - b);
}
const relevantStats = STAT_KEYS.filter((k) => statThresholds[k].length > 0);

function stateKey(state: GameState): string {
  const buckets = relevantStats.map((k) => statThresholds[k].filter((t) => state.stats[k] >= t).length);
  const flags = [...relevantFlags].filter((f) => state.flags[f]).sort();
  // Only items a condition actually tests can change branching; ignore the rest
  // so cosmetic loot (road_pie, immunity_gravy, …) collected in different orders
  // doesn't blow up the reachable-state set.
  const inv = state.inventory.filter((i) => relevantItems.has(i)).sort();
  return JSON.stringify([state.currentSceneId, buckets, flags, inv, state.chosenCode]);
}

/** Choices a real player could actually click here (requirement met). */
function clickable(state: GameState, scene: Scene) {
  return scene.choices.filter((c) => meetsCondition(state, c.requires));
}

// BFS so the first path found to each ending is a shortest one.
const reachedEndings = new Map<EndingId, string[]>(); // endingId -> path of choice labels
const visitedScenes = new Set<string>();
const exercisedChoices = new Set<string>(); // `${sceneId}::${choiceId}`
const deadEnds = new Map<string, string[]>(); // sceneId -> path to it
const seenStates = new Set<string>();

// Gateways: for each ending, the (scene, choice) pairs that lead into it. We
// snapshot the reachable states at those gateway scenes so we can explain WHY an
// unreachable ending can't be reached (which requirement clause is never met).
const gateways = new Map<EndingId, { sceneId: string; choice: Choice }[]>();
for (const s of allScenes) {
  for (const c of s.choices) {
    const tgt = getScene(c.next);
    if (tgt.isEnding && tgt.endingId) {
      const list = gateways.get(tgt.endingId) ?? [];
      list.push({ sceneId: s.id, choice: c });
      gateways.set(tgt.endingId, list);
    }
  }
}
const gatewaySceneIds = new Set([...gateways.values()].flat().map((g) => g.sceneId));
const gatewayStates = new Map<string, GameState[]>(); // sceneId -> reachable states there

const STATE_CAP = 500_000;
let capHit = false;

type Node = { state: GameState; path: string[] };
const start: GameState = (() => {
  const g = newGame();
  // newGame() sets currentSceneId to STARTING_SCENE_ID but does NOT run its
  // onEnter; mirror the app's first enterScene by re-entering the start scene.
  return chooseChoice(g, { id: "__boot", label: "", next: STARTING_SCENE_ID }, getScene);
})();

const queue: Node[] = [{ state: start, path: [] }];
seenStates.add(stateKey(start));

while (queue.length) {
  if (seenStates.size > STATE_CAP) { capHit = true; break; }
  const { state, path } = queue.shift()!;
  const scene = getScene(state.currentSceneId);
  visitedScenes.add(scene.id);
  if (gatewaySceneIds.has(scene.id)) {
    const list = gatewayStates.get(scene.id) ?? [];
    list.push(state);
    gatewayStates.set(scene.id, list);
  }

  if (scene.isEnding && scene.endingId) {
    if (!reachedEndings.has(scene.endingId)) reachedEndings.set(scene.endingId, path);
    continue; // endings terminate the run
  }

  const options = clickable(state, scene);
  if (options.length === 0) {
    if (!scene.isEnding && !deadEnds.has(scene.id)) deadEnds.set(scene.id, path);
    continue;
  }

  for (const choice of options) {
    exercisedChoices.add(`${scene.id}::${choice.id}`);
    const nextState = chooseChoice(state, choice, getScene);
    const key = stateKey(nextState);
    if (seenStates.has(key)) continue;
    seenStates.add(key);
    queue.push({ state: nextState, path: [...path, `${scene.id} → "${choice.label}"`] });
  }
}

// Decompose a Condition into individually-testable clauses so we can report
// which one blocks an unreachable ending, and the best value actually achievable.
type Clause = { label: string; test: (s: GameState) => boolean; best?: (states: GameState[]) => string };
function clauses(cond: Condition): Clause[] {
  const out: Clause[] = [];
  for (const it of cond.hasItems ?? []) out.push({ label: `has item "${it}"`, test: (s) => s.inventory.includes(it) });
  for (const it of cond.notHasItems ?? []) out.push({ label: `lacks item "${it}"`, test: (s) => !s.inventory.includes(it) });
  for (const k of STAT_KEYS) {
    const min = cond.minStats?.[k];
    if (min !== undefined) out.push({ label: `${k} ≥ ${min}`, test: (s) => s.stats[k] >= min, best: (ss) => `best reachable ${k} = ${Math.max(...ss.map((s) => s.stats[k]))}` });
    const max = cond.maxStats?.[k];
    if (max !== undefined) out.push({ label: `${k} ≤ ${max}`, test: (s) => s.stats[k] <= max, best: (ss) => `lowest reachable ${k} = ${Math.min(...ss.map((s) => s.stats[k]))}` });
  }
  if (cond.chosenCode) out.push({ label: `code = ${cond.chosenCode}`, test: (s) => s.chosenCode === cond.chosenCode });
  if (cond.flag) out.push({ label: `flag ${cond.flag.key} = ${cond.flag.value}`, test: (s) => (s.flags[cond.flag!.key] ?? false) === cond.flag!.value });
  return out;
}

function diagnoseUnreachable(id: EndingId) {
  const gws = gateways.get(id) ?? [];
  if (!gws.length) {
    console.log(`   ${dim("· no choice anywhere leads to this ending's scene — it has no gateway.")}`);
    return;
  }
  for (const { sceneId, choice } of gws) {
    const states = gatewayStates.get(sceneId) ?? [];
    if (!states.length) {
      console.log(`   ${dim(`· gateway ${sceneId} → "${choice.label}" is itself never reached.`)}`);
      continue;
    }
    const cs = choice.requires ? clauses(choice.requires) : [];
    console.log(`   ${dim(`· gateway: "${choice.label}" at ${sceneId} (${states.length} reachable states here)`)}`);
    if (!cs.length) { console.log(`     ${dim("(no requirement — should be reachable; check upstream)")}`); continue; }
    for (const c of cs) {
      const okN = states.filter(c.test).length;
      const mark = okN > 0 ? ok("ok") : bad("never");
      const extra = c.best && okN < states.length ? dim(` — ${c.best(states)}`) : "";
      console.log(`     ${mark} ${c.label} ${dim(`(${okN}/${states.length} states)`)}${extra}`);
    }
    // Closest near-miss: the reachable state that satisfies the most clauses.
    let best: { passed: number; fails: string[] } | null = null;
    for (const st of states) {
      const passed = cs.filter((c) => c.test(st)).length;
      if (!best || passed > best.passed) best = { passed, fails: cs.filter((c) => !c.test(st)).map((c) => c.label) };
    }
    if (best && best.fails.length) {
      console.log(`     ${yel("→")} closest reachable state satisfies ${best.passed}/${cs.length}; ${bad("blocked by:")} ${best.fails.join(" AND ")}`);
    }
  }
}

// ── 2. Endings coverage ───────────────────────────────────────────────────
section("2. Endings coverage (state-space proof)");
const allEndingIds = Object.keys(ENDING_TITLES) as EndingId[];
for (const id of allEndingIds) {
  const reached = reachedEndings.get(id);
  if (reached) {
    console.log(`${ok("✓")} ${bold(ENDING_TITLES[id])} ${dim(`(${id})`)} — reachable in ${reached.length} steps`);
  } else {
    console.log(`${bad("✗")} ${bold(ENDING_TITLES[id])} ${dim(`(${id})`)} — ${bad("UNREACHABLE")}`);
    diagnoseUnreachable(id);
    fail(`Ending "${ENDING_TITLES[id]}" (${id}) is unreachable from the start under any sequence of clickable choices.`);
  }
}
console.log(dim(`\nExplored ${seenStates.size.toLocaleString()} distinct game states${capHit ? " (CAP HIT — results may be partial)" : ""}.`));
if (capHit) fail(`State search hit the ${STATE_CAP.toLocaleString()} cap; reachability results may be incomplete.`);

// "How to reach each ending" recipes — replaces the browser prompt's guessed
// decision-personalities with exact, reproducible paths.
section("   How to reach each ending (shortest path)");
for (const id of allEndingIds) {
  const path = reachedEndings.get(id);
  if (!path) continue;
  console.log(`\n${bold(ENDING_TITLES[id])}:`);
  for (const step of path) console.log(`   ${dim("·")} ${step}`);
}

// ── Functional QA: dead-ends, unreachable content ───────────────────────────
section("3. Functional QA (runtime, condition-aware)");
if (deadEnds.size === 0) {
  console.log(`${ok("✓")} No runtime dead-ends: every reachable non-ending scene leaves at least one clickable choice.`);
} else {
  for (const [sceneId, path] of deadEnds) {
    console.log(`${bad("✗")} Dead-end: ${bold(sceneId)} ${dim(`(${getScene(sceneId).title})`)} — reachable but offers zero clickable choices.`);
    fail(`Runtime dead-end at scene "${sceneId}": a player can arrive here with no satisfiable choice. Reached via: ${path.slice(-3).join(" | ") || "<start>"}`);
  }
}

// Scenes never visited under real conditions (structurally reachable, but gated
// off in practice) — soft warning, the author may have intended it.
const unvisited = allScenes.filter((s) => !visitedScenes.has(s.id));
if (unvisited.length) {
  console.log(`${yel("!")} ${unvisited.length} scene(s) structurally reachable but never visited under real play:`);
  for (const s of unvisited.slice(0, 20)) console.log(`   ${dim("·")} ${s.id} ${dim(`(${s.title})`)}`);
  if (unvisited.length > 20) console.log(dim(`   …and ${unvisited.length - 20} more`));
  for (const s of unvisited) warn(`Scene "${s.id}" (${s.title}) is never reachable under real conditions — content may be dead.`);
} else {
  console.log(`${ok("✓")} Every scene is visited under real play (no condition-gated dead content).`);
}

// Choices whose requirement is never satisfiable on any reachable path.
const totalChoices = allScenes.reduce((n, s) => n + s.choices.length, 0);
const unreachableChoices: string[] = [];
for (const s of allScenes) {
  if (!visitedScenes.has(s.id)) continue; // its scene is itself unreachable; reported above
  if (s.isEnding) continue; // search terminates AT endings, so their credits→title choice is never traversed by design
  for (const c of s.choices) {
    if (!exercisedChoices.has(`${s.id}::${c.id}`)) {
      unreachableChoices.push(`${s.id}::${c.id} ${dim(`("${c.label}")`)}`);
    }
  }
}
if (unreachableChoices.length === 0) {
  console.log(`${ok("✓")} All ${totalChoices} choices on reachable scenes are clickable on some path.`);
} else {
  console.log(`${yel("!")} ${unreachableChoices.length}/${totalChoices} choice(s) never become clickable (requirement never met on any path):`);
  for (const c of unreachableChoices.slice(0, 20)) console.log(`   ${dim("·")} ${c}`);
  if (unreachableChoices.length > 20) console.log(dim(`   …and ${unreachableChoices.length - 20} more`));
  for (const c of unreachableChoices) warn(`Choice ${c} is never clickable — its requirement is unsatisfiable on every reachable path.`);
}

// ── 4. Canon lint ───────────────────────────────────────────────────────────
// Conservative, text-level checks from the browser prompt's canon checklist.
// Hard rules only where a literal string is unambiguous; everything fuzzier is a
// review warning (heuristics produce false positives on prose).
section("4. Canon lint");
const sceneText = (s: Scene) =>
  [s.title, s.body, s.editorNote ?? "", s.writersRoomNote ?? "", ...s.choices.map((c) => c.label)].join("\n");

const HARD_RULES: { name: string; re: RegExp }[] = [
  { name: 'forbidden name "Bailey" (the dog is Maebie)', re: /\bBailey\b/i },
  { name: 'forbidden safehouse name "Big Don\'s" (it is The Third Stair)', re: /\bBig Don'?s?\b/i },
];
let hardCanonClean = true;
for (const s of allScenes) {
  const text = sceneText(s);
  for (const rule of HARD_RULES) {
    if (rule.re.test(text)) {
      hardCanonClean = false;
      console.log(`${bad("✗")} ${s.id} ${dim(`(${s.title})`)}: ${rule.name}`);
      fail(`Canon violation in "${s.id}": ${rule.name}.`);
    }
  }
}
// At least one Maebie mention should exist somewhere (sanity: the dog is named).
if (!allScenes.some((s) => /\bMaebie\b/.test(sceneText(s)))) {
  fail(`Canon: the dog "Maebie" is never mentioned in any scene.`);
  console.log(`${bad("✗")} "Maebie" never appears in any scene text.`);
}
if (hardCanonClean) console.log(`${ok("✓")} No hard canon-string violations (no "Bailey", no "Big Don's").`);

// Soft: chocolate near the dog ("never give chocolate to the dog"). Reviewer
// confirms; it's flagged, not failed, because emergency_chocolate is a legit
// (human) recovery item that may legitimately share a scene with Maebie.
const chocScenes = allScenes.filter((s) => {
  const t = sceneText(s).toLowerCase();
  return t.includes("chocolate") && /\bmaebie\b/i.test(sceneText(s));
});
if (chocScenes.length) {
  console.log(`${yel("!")} ${chocScenes.length} scene(s) mention chocolate AND Maebie — eyeball that no one feeds the dog chocolate:`);
  for (const s of chocScenes) {
    console.log(`   ${dim("·")} ${s.id} ${dim(`(${s.title})`)}`);
    warn(`Review chocolate+Maebie co-occurrence in "${s.id}" — confirm the dog is never given chocolate.`);
  }
} else {
  console.log(`${ok("✓")} No scene mentions chocolate alongside Maebie.`);
}
console.log(dim(`   (Pearson→Reason naming and Ranya-rain-restraint are prose judgments — not auto-checked; review manually.)`));

// ── 5. Telemetry parity ──────────────────────────────────────────────────────
// We can't fire real beacons without the nginx container, but the failure mode
// that actually bites is the usage.ts event union drifting from the nginx
// whitelist (CLAUDE.md: an event must be in BOTH or it's silently dropped).
section("5. Telemetry parity (usage.ts ↔ nginx whitelist)");
const usageSrc = readFileSync(resolve(REPO, "src/utils/usage.ts"), "utf8");
const nginxSrc = readFileSync(resolve(REPO, "nginx.conf"), "utf8");

const unionMatch = usageSrc.match(/export type UsageEvent\s*=\s*([^;]+);/);
const tsEvents = new Set(
  (unionMatch?.[1] ?? "").match(/"([a-z0-9_]+)"/g)?.map((q) => q.replace(/"/g, "")) ?? [],
);
const mapBlock = nginxSrc.match(/map \$arg_evt \$usage_evt \{([\s\S]*?)\}/);
const nginxEvents = new Set<string>();
for (const line of (mapBlock?.[1] ?? "").split("\n")) {
  const m = line.trim().match(/^([a-z0-9_]+)\s+\1;/); // `event  event;` (skip `default ""`)
  if (m) nginxEvents.add(m[1]);
}

const onlyTs = [...tsEvents].filter((e) => !nginxEvents.has(e));
const onlyNginx = [...nginxEvents].filter((e) => !tsEvents.has(e));
console.log(`   usage.ts events:   ${[...tsEvents].sort().join(", ") || "(none)"}`);
console.log(`   nginx whitelist:   ${[...nginxEvents].sort().join(", ") || "(none)"}`);
if (onlyTs.length === 0 && onlyNginx.length === 0 && tsEvents.size > 0) {
  console.log(`${ok("✓")} Event sets match — every fired beacon is whitelisted and vice-versa.`);
} else {
  if (onlyTs.length) {
    console.log(`${bad("✗")} In usage.ts but NOT whitelisted in nginx (will be silently dropped): ${onlyTs.join(", ")}`);
    fail(`Telemetry: events ${onlyTs.join(", ")} are fired by usage.ts but missing from nginx's whitelist — they will be dropped.`);
  }
  if (onlyNginx.length) {
    console.log(`${yel("!")} Whitelisted in nginx but never fired by usage.ts: ${onlyNginx.join(", ")}`);
    onlyNginx.forEach((e) => warn(`Telemetry: nginx whitelists "${e}" but usage.ts never fires it (dead whitelist entry).`));
  }
}

// ── Summary ───────────────────────────────────────────────────────────────
section("Summary");
console.log(`Endings reachable: ${reachedEndings.size}/${allEndingIds.length}`);
console.log(`Scenes visited:    ${visitedScenes.size}/${allScenes.length}`);
console.log(`States explored:   ${seenStates.size.toLocaleString()}`);
console.log(`Warnings:          ${warnings.length}`);
console.log(`Hard failures:     ${hardFailures.length}`);

if (warnings.length) {
  console.log(`\n${yel(bold("Warnings (review, non-blocking):"))}`);
  for (const w of warnings) console.log(`   ${yel("!")} ${w}`);
}
if (hardFailures.length) {
  console.log(`\n${bad(bold("HARD FAILURES:"))}`);
  for (const f of hardFailures) console.log(`   ${bad("✗")} ${f}`);
  console.log(`\n${bad(bold("QA FAILED"))}`);
  process.exit(1);
} else {
  console.log(`\n${ok(bold("QA PASSED"))} ${dim("(local playthrough; live telemetry/visual/PWA still need the deployed app)")}`);
}
