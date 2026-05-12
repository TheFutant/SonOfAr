# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server on :5173
npm run build        # tsc -b && vite build (type-check then bundle to dist/)
npm run preview      # serve built dist/ on :4173 (host 0.0.0.0)
npm run typecheck    # tsc -b --noEmit
```

No linter, no test suite. `npm run build` is the type-correctness gate.

Local container run: `docker compose up -d --build` (multi-stage Node 20 → nginx, host port `SON_OF_AR_PORT` default `8090`, healthcheck at `/healthz`).

## Deploy

Live at **https://sonofar.fly.dev/** on Fly.io.

- Config: `fly.toml` (app `sonofar`, primary region `ord`, shared-cpu-1x / 1GB, internal port 80, `force_https`, auto-stop/auto-start so idle machines cost nothing).
- Build: Fly's builders use the same `Dockerfile` as local — no separate prod Dockerfile.
- Redeploy: `flyctl deploy` from the repo root (flyctl is installed at `~/.fly/bin/flyctl`).
- Logs / status / SSH: `flyctl logs`, `flyctl status`, `flyctl ssh console`.

Tailscale was explored as an alternative but isn't used — Fly was the simpler path for a public test URL.

## Architecture

**Story is data, not code.** Scenes live in `src/data/chapters/01-ash-wake.ts` through `07-legacy.ts`, one file per chapter. Items are in `src/data/items.ts`. `src/data/story.ts` is the combiner — it imports all chapters, derives the `SceneId` union type from the literal scene-id tuples, runs the content validator at module load, and exports `getScene` + `STARTING_SCENE_ID`. To add a scene, append to the relevant chapter file; the validator will fail loudly on broken refs at the next dev/prod boot.

Each chapter file is written as `as const satisfies readonly Scene[]` so scene-id literals are preserved through the combiner. This is what makes `SceneId = (typeof chapters)[number][number]["id"]` resolve to the union of all literal ids in `src/data/story.ts`.

The runtime is a tiny pure state machine wrapped in a React reducer:

- `src/types/game.ts` — the schema: `Scene`, `Choice`, `Condition`, `SceneEffect`, `GameState`, plus `StatKey` / `CodeKey` / `EndingId` string-union types and their label/description maps. Anything cross-cutting (stat tints, ending titles) lives here. Array fields in `Scene`/`Choice`/`Condition`/`SceneEffect` are `readonly` so the const-narrowed chapter tuples satisfy the type.
- `src/data/validate.ts` — `validateStory(scenes, startingId)` asserts that every `choice.next` resolves, every `isEnding` scene has matching `endingId` and `onEnter.unlockEnding`, every referenced item exists in `ITEMS`, and every scene is reachable from the start. Called at the top of `story.ts` so it runs once at module load (dev server boot, prod page load) — `tsc -b` and `vite build` will NOT catch broken refs because module side effects don't execute at build time.
- `src/utils/gameEngine.ts` — pure functions. `applyEffect` (stats clamped to [-10, 20], inventory deduped via Set, flags/code/ending tracked), `meetsCondition`, `enterScene` (runs `onEnter` effects, appends to history capped at 200), `chooseChoice(state, choice, getScene)` = apply choice effects → resolve next scene → enterScene.
- `src/state/reducer.ts` — the `Action` type and `reducer` function. Action types: `choose`, `load`, `new`, `set-flag`. `new` deliberately preserves `completedEndings`, `chaosMode`, `writersRoomMode`, `soundOn` across resets.
- `src/App.tsx` — wires the reducer to React. `useEffect` auto-saves on every state change. The `screen` ("title" | "play") is local UI state, NOT part of `GameState` — that's intentional, so reload always lands on the title screen.
- `src/utils/storage.ts` — localStorage key `son-of-ar.save.v1`. `loadGame` merges with `newGame()` defaults so adding fields to `GameState` doesn't break old saves. If you add a stored field, this merge needs to handle it.

### Scene authoring contract

Each `Scene` declares `body`, optional `editorNote` (collapsible Editor panel) and `writersRoomNote` (hidden unless Writers' Room toggle is on), optional `onEnter` effects, and `choices`. A `Choice` has `next` (scene id), optional `effects`, optional `requires` (`Condition`), and `showIfLocked: true` to render disabled rather than hidden when requirements fail. Endings are scenes with `isEnding: true` and an `endingId` — the validator enforces that endings also set `onEnter.unlockEnding` to the same id, otherwise the ending won't appear in `completedEndings`.

Items use canonical snake_case IDs in `src/data/items.ts` (`ITEMS`, with `ItemId` derived from it); user-facing names and flavor are in `ITEM_LABELS` / `ITEM_FLAVOR`. `Choice.effects.addItems`/`removeItems` and `Condition.hasItems`/`notHasItems` accept `readonly string[]`, but the validator checks every referenced id against `ITEMS` at module load. Stats are `heat | humanity | evidence | chaos | editorApproval`. Codes (`CodeKey`) are vow choices that gate certain branches.

`Choice.next` is intentionally typed as `string` (not `SceneId`) — the schema can't reference `SceneId` without circularity, so the validator carries that load.

### UI

Mobile-first single-page React + Tailwind. Theme palette: custom `ash` (near-black browns) and `ember` (oranges) defined in `tailwind.config.js`. Two screens (`title` / `play`) via local `useState`, not a router. Body scene rendering is `SceneView`; persistent UI is `StatsPanel` (top), `InventoryDrawer` and `StatsSheet` (bottom sheets), `SaveControls` (footer toggles for Chaos / Writers' Room / Sound). `EmberBackground` is pure CSS animation. `sound.ts` synthesizes the click via WebAudio — there are no audio assets in the repo.

## Story canon

The dog is **Maebie** — alive, a partner. Never "Bailey." There is no childhood-fire / trauma origin in Arson's backstory; do not introduce one. See `project_maebie_dog_name.md` in auto-memory for the full note.
