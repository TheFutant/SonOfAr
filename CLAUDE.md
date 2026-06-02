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

The build script prefixes `vite build` with `NODE_OPTIONS=--experimental-global-webcrypto` to work around a workbox dep that needs `globalThis.crypto` on Node 18. No-op on Node 19+; Fly's `node:20-alpine` builder doesn't need it but isn't harmed.

Local container run: `docker compose up -d --build` (multi-stage Node 20 → nginx, host port `SON_OF_AR_PORT` default `8090`, healthcheck at `/healthz`).

## Deploy

Live at **https://sonofar.fly.dev/** on Fly.io.

- Config: `fly.toml` (app `sonofar`, primary region `ord`, shared-cpu-1x / 1GB, internal port 80, `force_https`, auto-stop/auto-start so idle machines cost nothing).
- Build: Fly's builders use the same `Dockerfile` as local — no separate prod Dockerfile.
- Redeploy: `flyctl deploy` from the repo root (flyctl is installed at `~/.fly/bin/flyctl`).
- Logs / status / SSH: `flyctl logs`, `flyctl status`, `flyctl ssh console`.

Tailscale was explored as an alternative but isn't used — Fly was the simpler path for a public test URL.

## Usage telemetry

Anonymous usage logging, same contract as the other Fly apps (MonteJiraSim's `usage.py`): single-line `USAGE {json}` records on stdout, no identity / IP / save contents — only an event name and an optional low-cardinality label.

- **Flow:** the SPA fires a fire-and-forget beacon to `/t?evt=<event>[&lbl=<label>]` (`src/utils/usage.ts`, via `navigator.sendBeacon`). nginx turns each *known* event into one `USAGE {"app":"sonofar","evt":…,"lbl":…,"ts":…}` line on container stdout (`nginx.conf`: `usage_fmt` log_format + `location = /t`). Fly's org-wide `montejirasim-log-shipper` (a separate always-on app in the same `personal` org, reading the org NATS log stream) forwards it to Logflare with **no per-app wiring** — SonOfAr is covered automatically because the shipper's `SUBJECT` is org-wide.
- **Events:** `session_start` (once per page load), `new_game`, `ending` (label = `endingId`), `detour` (entering the optional Drive), `prologue` (the cold-open prologue is viewed — on a new game or a title-screen replay). Add events by extending the `UsageEvent` union in `usage.ts` **and** the `map $arg_evt $usage_evt` whitelist in `nginx.conf` — the whitelist guards against log injection, so an event not in both places is silently dropped. The `npm run qa` gate asserts the two lists stay in parity.
- **Labels** are constrained to `^[a-z0-9_]{1,40}$` in nginx; anything else is stripped (the event still logs without the label). `escape=none` is safe only because inputs are whitelisted first.
- **No backend:** unlike the Python apps there's no process to `print()` — the nginx access-log line *is* the telemetry. Beacons no-op in `npm run dev` (no nginx; `/t` 404s, swallowed).
- **View in Logflare:** filter the shared source on message contains `USAGE` and `"app":"sonofar"`. No separate Logflare source is required; to add one, give the shipper a narrower `SUBJECT` / second sink (see MonteJiraSim `docs/telemetry-drain.md`).

## PWA

The site is an installable PWA. `vite-plugin-pwa` (configured in `vite.config.ts`) generates the manifest and a Workbox service worker at build time.

- **Manifest** values (name, theme/bg color `#0b0908`, `display: standalone`, `orientation: portrait`, icon list) live in the plugin config in `vite.config.ts`. Output is `dist/manifest.webmanifest`; the plugin auto-injects `<link rel="manifest">` into the built `index.html`.
- **Service worker** uses `registerType: "autoUpdate"` — registered from `src/main.tsx` via `virtual:pwa-register`. Precaches the JS/CSS/HTML/PNG bundle so the app works fully offline once installed; saves continue to live in `localStorage`. Updates ship on the next page load with no user prompt.
- **Icons** ship from `public/icons/`. Master 1024×1024 sources live outside the build at `assets/icons/source-any.png` (tight face crop) and `assets/icons/source-maskable.png` (face shrunk to ~80% with `#0b0908` padding so Android adaptive-icon masking doesn't clip the focal point). Regenerate the `public/icons/*.png` size variants from the masters with `python3 scripts/build-pwa-icons.py`. `assets/` and `scripts/` are in `.dockerignore` so they don't bloat the runtime image.
- **nginx PWA tweaks** in `nginx.conf`: serve `.webmanifest` as `application/manifest+json` (nginx's default mime.types doesn't know the extension), force `no-cache` on `/sw.js` so service worker updates always reach the client, immutable cache on hashed `workbox-*.js` files.
- **TypeScript** picks up `virtual:pwa-register` via `src/vite-env.d.ts` (`/// <reference types="vite-plugin-pwa/client" />`).

## Architecture

**Story is data, not code.** Scenes live in `src/data/chapters/01-ash-wake.ts` through `09-legacy.ts` (nine chapters total: Ash Wake, Maebie, Public Works, The Third Stair, Three Marks, The Mire, The Insurance Man, The Line, Legacy). Chapter VI (The Mire) holds the Pearson→Reason arc and the Artax-style horse beat; the file numbers and the in-story roman numerals are kept in sync, so inserting a chapter means renumbering the later files' display labels and exported `chapterN` const names. Items are in `src/data/items.ts`. `src/data/story.ts` is the combiner — it imports all chapters, derives the `SceneId` union type from the literal scene-id tuples, runs the content validator at module load, and exports `getScene` + `STARTING_SCENE_ID`. To add a scene, append to the relevant chapter file; the validator will fail loudly on broken refs at the next dev/prod boot.

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

Relationships and narrative branches are tracked via `GameState.flags` (a `Record<string, boolean>`), not new stats — keeps the StatsPanel UI uncluttered. Effects set them via `SceneEffect.setFlags: readonly { key, value }[]` (an array so one choice can pivot multiple flags at once); conditions match a single flag via `Condition.flag`. Flag keys currently in use across the story include `leans_vengeance/protection/mystery`, `mason_sees_lost/amused/sees_redeemable/listens`, `mason_tension`, `pearson_faith/science/story/refuse`, `pearson_insight`, `remembers_pearson`, `called_her_reason`, `fears_reason`, `mercy_over_fairness`, `reading_mercy/justice/vengeance`, `ranya_trust`, `ranya_trust_high`, `maebie_trust`, `horse_saved/horse_released`, `chose_mercy`, `reached_for_fire`, `owns_the_cost`, `saw_the_prophecy`, `saved_the_story`, `interpret_science/faith/coincidence/manipulation`, `fixed_carl_comma`, `chose_cruelty`. Add new keys freely — they're stringly-typed by design. `pearson_insight` gates the **Reason Remains** ending; high `humanity` + low `heat` gates **The Man**; `chose_cruelty` + `heat ≥ 4` gates **The Monster** (set by refusing a code at The Line, which itself requires `mason_sees_lost` — the old `humanity ≤ 0` gate was unreachable, the stat economy floors humanity at +3 by Legacy).

`Choice.next` is intentionally typed as `string` (not `SceneId`) — the schema can't reference `SceneId` without circularity, so the validator carries that load.

### UI

Mobile-first single-page React + Tailwind. Theme palette: custom `ash` (near-black browns) and `ember` (oranges) defined in `tailwind.config.js`. Three screens (`title` / `prologue` / `play`) via local `useState`, not a router. Body scene rendering is `SceneView`; persistent UI is `StatsPanel` (top), `InventoryDrawer` and `StatsSheet` (bottom sheets), `SaveControls` (footer toggles for Chaos / Writers' Room / Sound). `EmberBackground` is pure CSS animation. `sound.ts` synthesizes the click via WebAudio — there are no audio assets in the repo.

The **prologue** is a skippable typographic "comic" cold-open that runs before a new game (and is replayable via the title's `▸ Prologue` link). It's story-as-data: panels live in `src/data/prologue.ts`, rendered by `src/components/Prologue.tsx` over the `EmberBackground`. Each `ProloguePanel` has an `art` path; the six panels are illustrated (`public/prologue/p1-ash.webp` … `p6-punctuate.webp`). The art masters are committed PNGs at `assets/prologue/` (1536×1024); regenerate the served WebP variants with `python3 scripts/build-prologue-art.py` (downscales to 1280px wide, ~388 KB total — `assets/` and `scripts/` are `.dockerignore`d so masters don't bloat the runtime image, same as the PWA icons). A panel with no `art` still renders type-only. Art direction + canon-safe prompts live in `docs/art-direction.md` and `docs/prologue-art-briefs.md`; keep any art canon-safe (Maebie is a living brown pit bull mix, gentle never menacing; the Editor is a voice never depicted; Pearson is not yet "Reason"; no readable text in images).

## Story canon

**Writing principle — no plot furniture.** "No decorative people. No plot furniture. Everyone gets choices, even when the choices are terrible." Characters want things, make choices, are allowed to be wrong, change the story by acting, and resist being reduced to symbols — they stay human even when myth forms around them. Never write women, companions, animals, or side characters as objects to be reclaimed, sacrificed, or used only to motivate Arson. Choices should *shape* characters, not turn them into an equation — avoid mechanical if/then morality. The Editor enforces this: when a scene risks reducing someone to motivation, when a choice reads too mechanically, when symbolism gets too obvious, or when Arson gets too pleased with himself, the Editor says so. Canonical Editor lines: *"No decorative people. No plot furniture."* / *"Choices should shape them, not turn them into an equation."* / *"Pearson is a person. Reason is what happens when people stop treating her like one."* / *"Maebie lives. Revise accordingly."* / *"If anything happens to Maebie, I walk."* / *"Flying skips too many side quests."*

- **The dog is Maebie** — alive, a partner. Never "Bailey." A **brown pit bull mix** (canon prose: one of the "small brown dogs," with the tan "eyebrow" markings that do "the eyebrow thing"); in any art, gentle and beloved, never menacing. There is no childhood-fire / trauma origin in Arson's backstory; do not introduce one.
- **The safehouse is The Third Stair**, not "Big Don's." The old name was removed wholesale — no callbacks, no jokes, no references. The Third Stair is mythic-cabin / writers'-room flavor: impossible architecture, three staircases on the top floor, self-tending, no host character.
- **The three siblings are Arson, Mason, and Sister Pearson.** The recurring "three" motif (three siblings, three roads, three readings of the same mark, proton/neutron/electron, mercy/justice/vengeance, etc.) is intentional and load-bearing across Chapters V, VI, and VIII — preserve it when editing. Mason is the structure/order antagonist sibling; Sister Pearson is the science/faith/story scholar.
- **Pearson is the person; "Reason" is the myth others build around her.** She must NOT start as "Reason." In Chapter VI she is a human scholar/judge with cold tea; the world starts calling her "Reason" gradually (a child names it first), and she may dislike it. "Reason can be fair, but fairness is not always kind" — a godlike force does not need to be evil to terrify. Arson keeps calling her Pearson. Don't collapse the person into the archetype early.
- **Maebie is protected by writers'-room law: she never dies and is never cheap trauma fuel.** Any being but Maebie is expendable — Chapter VI's horse is the Artax-style tragedy (handle with restraint; it must reveal/change Arson's code, never shock for its own sake). Chocolate is the recovery protocol after; never give chocolate to the dog.
- **Ranya makes it rain — quietly, not like Storm.** Her power is subtle: rain that reveals hidden writing in ash, cools fire, exposes truth. Never escalate her into spectacular weather; the brief is explicit that "rain reveals" is the emotional counterweight to "fire remembers."
- **The drive is the story.** Road-trip lore is an optional thread, not the spine — but where it appears, the journey itself matters: diners, terrible meals, weird signs, dog breaks, storm delays, accidental revelations, liminal towns, emotionally significant detours. "Flying skips too many side quests." The travel-collapse motif — *"eat our way around the coasts while the world goes to shit"* — is humor with emotional truth under it: people still need joy, food, dogs, and weird little plans even as things fall apart ("That is not nihilism. That is meal planning under collapse."). A proper road trip needs at least one life-changing diner and one meal that becomes family lore. Dog logistics is a running practical-joke concern (Bishop, food/water/leashes/emergency towels/"emotional support jurisdiction"). Optional flavor only — never required exposition: Disclosure Day / Fermi-paradox / Great-Filter musings, and a sparing guilt-haunted-fighter gag ("guilt that took boxing lessons" — no copyrighted characters). Live now in `src/data/chapters/10-the-drive.ts`, an optional detour reachable from The Third Stair that loops back without touching the I–IX mainline or its endings.

See auto-memory for the canonical notes — these aren't suggestions, they're enforcement rules from prior conversations.
