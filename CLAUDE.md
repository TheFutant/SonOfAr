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

Container deploy: `docker compose up -d --build` (multi-stage Node 20 → nginx, host port `SON_OF_AR_PORT` default `8090`, healthcheck at `/healthz`).

## Architecture

**Story is data, not code.** Every scene, choice, item, condition, and ending lives in `src/data/story.ts` as a flat `Scene[]`. Adding/editing chapters means editing that one file — the engine picks up new scenes with no code changes.

The runtime is a tiny pure state machine wrapped in a React reducer:

- `src/types/game.ts` — the schema: `Scene`, `Choice`, `Condition`, `SceneEffect`, `GameState`, plus `StatKey` / `CodeKey` / `EndingId` string-union types and their label/description maps. Anything cross-cutting (stat tints, ending titles) lives here.
- `src/utils/gameEngine.ts` — pure functions. `applyEffect` mutates a snapshot (stats clamped to [-10, 20], inventory deduped via Set, flags/code/ending tracked). `meetsCondition` evaluates `Choice.requires` against state. `enterScene` runs `onEnter` effects and appends to history (capped at 200). `chooseChoice(state, choice, getScene)` = apply choice effects → resolve next scene → enterScene. `STARTING_SCENE_ID = "ash_wake_1"`.
- `src/App.tsx` — single `useReducer` with three action types: `choose`, `load`, `new`, `set-flag`. `new` deliberately preserves `completedEndings`, `chaosMode`, `writersRoomMode`, `soundOn` across resets. `useEffect` auto-saves to localStorage on every state change.
- `src/utils/storage.ts` — localStorage key `son-of-ar.save.v1`. `loadGame` merges with `newGame()` defaults so adding fields to `GameState` doesn't break old saves. If you add a stored field, this merge needs to handle it.

### Scene authoring contract

Each `Scene` declares `body`, optional `editorNote` (collapsible Editor panel) and `writersRoomNote` (hidden unless Writers' Room toggle is on), optional `onEnter` effects, and `choices`. A `Choice` has `next` (scene id), optional `effects`, optional `requires` (`Condition`), and `showIfLocked: true` to render disabled rather than hidden when requirements fail. Endings are scenes with `isEnding: true` and an `endingId` — applying `effects.unlockEnding` adds it to `completedEndings`.

Items use canonical snake_case IDs in `ITEMS`; user-facing names and flavor are in `ITEM_LABELS` / `ITEM_FLAVOR` in the same file. Stats are `heat | humanity | evidence | chaos | editorApproval`. Codes (`CodeKey`) are vow choices that gate certain branches.

### UI

Mobile-first single-page React + Tailwind. Theme palette: custom `ash` (near-black browns) and `ember` (oranges) defined in `tailwind.config.js`. Two screens (`title` / `play`) via local `useState`, not a router. Body scene rendering is `SceneView`; persistent UI is `StatsPanel` (top), `InventoryDrawer` and `StatsSheet` (bottom sheets), `SaveControls` (footer toggles for Chaos / Writers' Room / Sound). `EmberBackground` is pure CSS animation. `sound.ts` synthesizes the click via WebAudio — there are no audio assets in the repo.

## Story canon

The dog is **Maebie** — alive, a partner. Never "Bailey." There is no childhood-fire / trauma origin in Arson's backstory; do not introduce one. See `project_maebie_dog_name.md` in auto-memory for the full note.
