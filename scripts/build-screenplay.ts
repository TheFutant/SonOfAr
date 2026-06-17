// Screenplay compiler — gathers the story "as-is" into a single manuscript for
// editorial review, the same way the QA harness (scripts/qa/playthrough.ts)
// gathers it for testing: by importing the *canonical* story data the app ships,
// not by transcribing prose. "Story is data" (CLAUDE.md), so the screenplay is
// derived, never hand-maintained — edit the chapter files and re-run.
//
// Output: docs/screenplay.md, an "editorial manuscript": prose-first, in
// authoring order, with the branching made traceable (every scene is numbered
// §N; every choice points at the scene it leads to, → §M). Four annotation
// layers ride alongside the prose, each set off so it never reads as the story:
//   - EDITOR        — the in-story Editor's margin notes (Scene.editorNote)
//   - WRITERS' ROOM — the normally-hidden craft/intent notes (writersRoomNote)
//   - ↳ fx/needs    — choice mechanics (stat deltas, conditions, flags, items)
//   - Appendices    — the item catalog + a reverse-engineered map of the endings
//
// Run with `npm run screenplay`. esbuild bundles the TS (resolving the src/
// imports + running validateStory at module load) to an .mjs, then node writes
// the doc. No timestamp is emitted, so regenerating only churns on real changes.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { allScenes } from "../src/data/story";
import {
  STAT_LABELS,
  STAT_CODES,
  STAT_ORDER,
  CODE_LABELS,
  ENDING_TITLES,
  formatStat,
  type Scene,
  type Choice,
  type Condition,
  type SceneEffect,
} from "../src/types/game";
import { ITEM_LABELS, ITEM_FLAVOR, type ItemId } from "../src/data/items";
import { PROLOGUE_PANELS } from "../src/data/prologue";
import { EDITOR_COMPLAINTS } from "../src/data/editor-complaints";

// `npm run screenplay` runs with cwd = repo root — the only stable anchor here.
// esbuild bundles this file into node_modules/.cache, so import.meta.url would
// resolve to *there* at runtime, not to scripts/.
const OUT = resolve(process.cwd(), "docs/screenplay.md");

// ── lookup tables ─────────────────────────────────────────────────────────
// Scenes are numbered globally, 1-based, in authoring order (= allScenes order,
// which is chapters.flat()). A choice's `next` can jump anywhere — even into
// another chapter — so global numbers keep every cross-reference resolvable.
const sceneById = new Map<string, Scene>(allScenes.map((s) => [s.id, s]));
const sceneNo = new Map<string, number>();
allScenes.forEach((s, i) => sceneNo.set(s.id, i + 1));

const itemLabel = (id: string): string => ITEM_LABELS[id as ItemId] ?? id;

/** "§42 · *Scene Title*", or a bare `id` code span if the target is missing. */
function xref(id: string): string {
  const n = sceneNo.get(id);
  const t = sceneById.get(id);
  return n && t ? `§${n} · *${t.title}*` : `\`${id}\``;
}

/** Stat deltas in canonical order: "Heat +1, Chaos +1, Editor +1". */
function statDelta(stats: Partial<Record<string, number>>): string {
  return STAT_ORDER.filter((k) => stats[k] !== undefined)
    .map((k) => `${STAT_LABELS[k]} ${formatStat(stats[k]!)}`)
    .join(", ");
}

/** A gating condition, broken into human-readable clauses. */
function condParts(c: Condition): string[] {
  const p: string[] = [];
  STAT_ORDER.forEach((k) => {
    if (c.minStats?.[k] !== undefined) p.push(`${STAT_LABELS[k]} ≥ ${c.minStats[k]}`);
  });
  STAT_ORDER.forEach((k) => {
    if (c.maxStats?.[k] !== undefined) p.push(`${STAT_LABELS[k]} ≤ ${c.maxStats[k]}`);
  });
  c.hasItems?.forEach((i) => p.push(`has ${itemLabel(i)}`));
  c.notHasItems?.forEach((i) => p.push(`lacks ${itemLabel(i)}`));
  if (c.chosenCode) p.push(`vow “${CODE_LABELS[c.chosenCode]}”`);
  if (c.flag) p.push(`flag \`${c.flag.key}\` = ${c.flag.value}`);
  return p;
}

/** An effect (on a choice or onEnter), broken into human-readable clauses. */
function effectParts(e: SceneEffect): string[] {
  const p: string[] = [];
  if (e.stats) {
    const d = statDelta(e.stats);
    if (d) p.push(d);
  }
  e.addItems?.forEach((i) => p.push(`+${itemLabel(i)}`));
  e.removeItems?.forEach((i) => p.push(`−${itemLabel(i)}`));
  if (e.setCode) p.push(`vow set → “${CODE_LABELS[e.setCode]}”`);
  if (e.unlockEnding) p.push(`unlocks ending → **${ENDING_TITLES[e.unlockEnding]}**`);
  e.setFlags?.forEach((f) => p.push(`flag \`${f.key}\` → ${f.value}`));
  return p;
}

/** Render scene prose as markdown: preserve paragraph breaks (blank line) and
 *  the author's intra-paragraph line breaks (e.g. the em-dash lists) as hard
 *  breaks, so the manuscript looks like the scene the player reads. */
function renderBody(body: string): string {
  return body
    .trim()
    .split(/\n\n+/)
    .map((par) => par.split("\n").join("  \n"))
    .join("\n\n");
}

// ── group scenes into acts ───────────────────────────────────────────────────
// Group consecutive scenes by chapter label. The 9 endings each carry their own
// "Ending · Title" label in the data (for the in-game breadcrumb), but as a
// manuscript an ending reads as the climax of the act it was authored in — so
// fold any ending scene into the act in progress instead of letting it spawn a
// one-scene "act". The ✦ ENDING banner + Appendix B carry the ending identity.
// Result: Acts I–IX + the Detour.
type Group = { label: string; scenes: Scene[] };
const groups: Group[] = [];
for (const s of allScenes) {
  const cur = groups[groups.length - 1];
  const startsNewAct = !cur || (!s.isEnding && cur.label !== s.chapter);
  if (startsNewAct) groups.push({ label: s.chapter, scenes: [s] });
  else cur.scenes.push(s);
}
const isDetour = (label: string) => /drive/i.test(label);
const detourActs = groups.filter((g) => isDetour(g.label)).length;
const mainlineActs = groups.length - detourActs;
const actHead = (label: string) => (isDetour(label) ? label : `Act ${label}`);

const actLabelOf = new Map<string, string>();
groups.forEach((g) => g.scenes.forEach((s) => actLabelOf.set(s.id, g.label)));

// ── reverse edges (who leads here?) — powers the endings map ──────────────────
const into = new Map<string, { from: Scene; choice: Choice }[]>();
for (const s of allScenes) {
  for (const c of s.choices) {
    const list = into.get(c.next) ?? [];
    list.push({ from: s, choice: c });
    into.set(c.next, list);
  }
}
const endingScenes = allScenes.filter((s) => s.isEnding);

// ── emit ──────────────────────────────────────────────────────────────────
const out: string[] = [];
const w = (s = "") => out.push(s);
const rule = () => w("\n---\n");

const rangeOf = (g: Group): string => {
  const first = sceneNo.get(g.scenes[0].id)!;
  const last = sceneNo.get(g.scenes[g.scenes.length - 1].id)!;
  return first === last ? `§${first}` : `§${first}–§${last}`;
};

// Masthead + reading guide
w(`# Son of Ar — Screenplay`);
w();
w(`**Compiled for editorial review.**`);
w();
w(
  `_${allScenes.length} scenes · ${groups.length} acts ` +
    `(${mainlineActs} on the main line + ${detourActs} optional detour) · ` +
    `${endingScenes.length} endings · ${Object.keys(ITEM_LABELS).length} catalogued items._`,
);
w(
  `_Generated from the canonical story data in \`src/data/\` by ` +
    `\`scripts/build-screenplay.ts\` — run \`npm run screenplay\` to refresh. ` +
    `Do not hand-edit; edit the chapter files and regenerate._`,
);
w();
w(`> **How to read this.** Son of Ar is branching interactive fiction, so this`);
w(`> manuscript flattens the story into authoring order rather than one linear`);
w(`> path. Each scene is numbered **§N**; every choice names the scene it leads`);
w(`> to (**→ §M**), so any branch can be traced. The prose is the scene as the`);
w(`> player reads it. Everything else is annotation, set off from the prose:`);
w(`>`);
w(`> - **EDITOR** notes are the in-story Editor's margin commentary (these ship in the game).`);
w(`> - **WRITERS' ROOM** notes are the normally-hidden craft/intent notes.`);
w(`> - **↳ fx / needs / tag** lines under a choice are game mechanics: stat changes, gating conditions, flags set, and items gained or lost.`);
w();
w(
  `> **Stats** (shown as \`fx\` deltas, clamped to [−10, +20]): ` +
    STAT_ORDER.map((k) => `${STAT_LABELS[k]} (${STAT_CODES[k]})`).join(" · ") +
    `.`,
);
w(
  `> **Vows** a player may swear, each gating later branches: ` +
    Object.values(CODE_LABELS)
      .map((v) => `“${v}”`)
      .join(" · ") +
    `.`,
);

// Table of contents
rule();
w(`## Contents`);
w();
w(`1. **Cold Open — The Prologue** (${PROLOGUE_PANELS.length} panels)`);
groups.forEach((g) => {
  const tag = isDetour(g.label) ? " — _optional detour_" : "";
  const n = g.scenes.length;
  w(`1. **${actHead(g.label)}** — ${rangeOf(g)} (${n} scene${n === 1 ? "" : "s"})${tag}`);
});
w(`1. **Appendix A · The Inventory** — ${Object.keys(ITEM_LABELS).length} items`);
w(`1. **Appendix B · The Endings** — ${endingScenes.length} endings, and how each is reached`);
w(`1. **Appendix C · The Editor's Standing Complaints** — ${EDITOR_COMPLAINTS.length} margin barbs`);

// Cold open — the prologue
rule();
w(`## Cold Open — The Prologue`);
w();
w(
  `_A skippable typographic "comic" that runs once before a new game; replayable ` +
    `from the title screen. Story-as-data, like the scenes — panels live in ` +
    `\`src/data/prologue.ts\`._`,
);
w();
PROLOGUE_PANELS.forEach((panel, i) => {
  w(`**Panel ${i + 1}${panel.shout ? ` — ${panel.shout.toUpperCase()}` : ""}**`);
  w();
  // caption may carry embedded line breaks (a quoted Editor note on its own line)
  w(
    panel.caption
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n> \n"),
  );
  if (panel.attribution) {
    w(`> `);
    w(`> _${panel.attribution}_`);
  }
  if (panel.art) {
    w();
    w(
      `_[Panel art: \`${panel.art.replace(/^\//, "")}\`` +
        `${panel.alt ? ` — ${panel.alt}` : ""}]_`,
    );
  }
  w();
});

// Acts and scenes
groups.forEach((g) => {
  rule();
  w(`## ${actHead(g.label)}`);
  w();
  w(`_Scenes ${rangeOf(g)}._`);
  if (isDetour(g.label)) {
    w();
    w(
      `> _Optional detour — branches off The Third Stair (Act IV) and loops back ` +
        `without touching the main line (Acts I–IX) or its endings._`,
    );
  }
  w();

  g.scenes.forEach((scene) => {
    const n = sceneNo.get(scene.id)!;
    w(`### §${n} · ${scene.title}`);
    w(`<sub>\`${scene.id}\`</sub>`);
    w();
    if (scene.isEnding && scene.endingId) {
      w(`> ## ✦ ENDING — “${ENDING_TITLES[scene.endingId]}”`);
      w();
    }

    // prose
    w(renderBody(scene.body));
    w();

    // onEnter effects
    if (scene.onEnter) {
      const e = effectParts(scene.onEnter);
      if (e.length) {
        w(`_On entering this scene: ${e.join(", ")}._`);
        w();
      }
    }

    // Editor note
    if (scene.editorNote) {
      w(`> **EDITOR.** ${scene.editorNote}`);
      w();
    }

    // Writers' Room note
    if (scene.writersRoomNote) {
      w(`> **WRITERS' ROOM.** ${scene.writersRoomNote}`);
      w();
    }

    // Choices
    if (scene.choices.length) {
      w(scene.isEnding ? `**After the ending**` : `**Choices**`);
      w();
      scene.choices.forEach((c) => {
        const self = c.next === scene.id;
        w(`- **${c.label}** → ${self ? "_(stays on this scene)_" : xref(c.next)}`);
        const ann: string[] = [];
        if (c.requires) {
          const r = condParts(c.requires);
          if (r.length) ann.push(`needs ${r.join(", ")}`);
        }
        if (c.effects) {
          const e = effectParts(c.effects);
          if (e.length) ann.push(`fx: ${e.join(", ")}`);
        }
        if (c.tag) ann.push(`tag: _${c.tag}_`);
        if (c.showIfLocked) ann.push(`shown greyed-out if unmet`);
        if (ann.length) w(`  ↳ ${ann.join(" · ")}`);
      });
      w();
    } else {
      w(`_(No further choices — the page ends here.)_`);
      w();
    }
  });
});

// Appendix A — items
rule();
w(`## Appendix A · The Inventory`);
w();
w(
  `_Every catalogued item, with the flavor text the player sees. Canonical IDs ` +
    `in \`src/data/items.ts\`._`,
);
w();
(Object.keys(ITEM_LABELS) as ItemId[]).forEach((id) => {
  w(`- **${ITEM_LABELS[id]}** — _${ITEM_FLAVOR[id]}_ <sub>\`${id}\`</sub>`);
});

// Appendix B — endings, reverse-engineered from the choice graph
rule();
w(`## Appendix B · The Endings`);
w();
w(
  `_The ${endingScenes.length} endings, each with the scene it resolves at and the ` +
    `choice(s) that lead straight into it. The conditions shown gate that final ` +
    `step only — most endings also depend on stats, vows, and flags accumulated ` +
    `across the run, so read them alongside the scenes above._`,
);
w();
endingScenes.forEach((scene) => {
  const title = scene.endingId ? ENDING_TITLES[scene.endingId] : scene.title;
  const act = actLabelOf.get(scene.id);
  w(`### ${title}`);
  w(`Resolves at ${xref(scene.id)}${act ? ` — ${actHead(act)}` : ""}.`);
  w();
  const approaches = into.get(scene.id) ?? [];
  if (!approaches.length) {
    w(`_No choice leads here directly (reached by another mechanism)._`);
    w();
    return;
  }
  w(`Reached by:`);
  approaches.forEach(({ from, choice }) => {
    const req = choice.requires ? condParts(choice.requires) : [];
    const gate = req.length ? ` — needs ${req.join(", ")}` : "";
    w(`- from ${xref(from.id)}, choosing **${choice.label}**${gate}`);
  });
  w();
});

// Appendix C — the Editor's ambient complaints (UI flavor, not tied to a scene)
rule();
w(`## Appendix C · The Editor's Standing Complaints`);
w();
w(
  `_Not tied to any scene. With **Chaos Mode** on, each scene surfaces one of these ` +
    `in the Editor's Notes panel — picked deterministically by a hash of the scene's ` +
    `id, so a given scene always shows the same gripe. Collected here because an ` +
    `editorial review should know what the Editor is like off the leash. From ` +
    `\`src/data/editor-complaints.ts\`._`,
);
w();
EDITOR_COMPLAINTS.forEach((c) => w(`- “${c}”`));

// ── write ───────────────────────────────────────────────────────────────────
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out.join("\n").replace(/\n{3,}/g, "\n\n").trimStart() + "\n", "utf8");
console.log(
  `Wrote ${OUT}\n  ${allScenes.length} scenes · ${groups.length} acts ` +
    `(${mainlineActs} main + ${detourActs} detour) · ${endingScenes.length} endings · ` +
    `${PROLOGUE_PANELS.length} prologue panels.`,
);
