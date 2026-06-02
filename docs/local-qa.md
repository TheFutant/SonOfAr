# Local playthrough QA — `npm run qa`

A zero-token, zero-browser replacement for most of the browser-agent
playthrough (`browser-agent-playthrough-prompt.md`). Because the story is data
and the engine is pure functions (see `CLAUDE.md`), we replay the whole game in
Node with the *exact same* modules the app uses (`getScene` + the `gameEngine`
reducer helpers) — no headless browser, no LLM, no Fly deploy.

```bash
npm run qa
```

It bundles `scripts/qa/playthrough.ts` with the already-present `esbuild` and
runs it. Exit code is non-zero on any **hard failure**, so it drops straight
into CI or a pre-push hook.

## What it checks

1. **Structural validation** — `validateStory()` runs at import (broken `next`
   refs, duplicate ids, ending wiring, structural reachability). Reaching the
   script at all means it passed.
2. **Endings coverage (a proof, not a sample)** — a state-space search over the
   *real* choice graph (applying effects, honoring `requires`) enumerates which
   of the 9 endings are reachable and prints the **exact shortest choice path**
   to each. This replaces the browser prompt's ~12 guessed "decision
   personalities": instead of hoping to stumble into an ending, we prove
   reachability or prove it's impossible.
3. **Functional QA** — finds **runtime dead-ends** (a non-ending scene a player
   can reach with zero clickable choices) and **unreachable content** (scenes /
   choices whose conditions are never satisfiable on any path). The structural
   validator can't catch these — it ignores `requires`.
4. **Canon lint** — hard-fails on forbidden strings ("Bailey", "Big Don's"),
   warns on chocolate-near-Maebie co-occurrences for a human eyeball.
5. **Telemetry parity** — statically asserts the `UsageEvent` union in
   `usage.ts` matches the nginx `map $arg_evt` whitelist (the drift that
   silently drops beacons — see `CLAUDE.md`).

### How the search stays finite

State is high-dimensional, but only dimensions a `Condition` actually tests can
change branching. The state key buckets each stat at exactly the thresholds some
condition compares against, keeps only flags/items referenced by a condition,
plus `chosenCode`. Cosmetic loot (`road_pie`, `immunity_gravy`, …) and untested
flags collapse, so the reachable-state set stays small (~60k states, well under
a second). If the search ever hits its `STATE_CAP`, it says so and hard-fails
rather than reporting partial coverage as complete.

## What it does NOT cover (still needs the browser / deployed app)

- live telemetry beacons actually hitting nginx (we only check event/whitelist
  parity statically),
- visual layout / mobile viewport / the EmberBackground / EndingCard rendering,
- service-worker / PWA install / offline behavior,
- toggle UI (Chaos / Writers' Room / Sound) and save/continue across reload.

For those, the browser-agent prompt is still the tool — but run `npm run qa`
first; it's free and catches the logic bugs before you spend tokens on a
browser run.
