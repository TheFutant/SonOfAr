# Son of Ar

A short, mobile-first, dark-comic interactive fiction game about a man named **Arson**, a dog named **Maebie**, and a very opinionated **Editor**.

> "He never starts the fire. He only uses what is already there."

Built with **React + TypeScript + Vite + Tailwind CSS**. Ships as a single static container (multi-stage build → nginx) and is **live on [Fly.io](https://sonofar.fly.dev/)**; it also runs locally via Docker.

---

## Features

- 9 chapters + an optional road-trip detour, 70 scenes, **9 endings**
- Illustrated, skippable **prologue** cold-open — six comic panels that play once for a new player and replay any time from the title's `▸ Prologue`
- Stats: Heat, Humanity, Evidence, Chaos, Editor Approval
- Inventory (Damp Napkin, Oxford Comma Seal, Maebie's Collar, et cetera)
- Save / load via `localStorage` — auto-saves after every choice
- Collapsible **Editor's Notes** panel with optional **Chaos Mode** complaints
- Optional **Writers' Room Mode** reveals hidden scene-design notes
- Shareable ending summary card (copy to clipboard)
- Optional subtle click sound (off by default; WebAudio-generated, no audio assets)
- Pure-CSS ember background animation

---

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-checks + emits dist/
npm run preview      # serves built dist/ on :4173
npm run typecheck    # type-check only
npm run qa           # offline playthrough QA (see below)
```

Tested against Node 20.

---

## Offline QA harness

`npm run qa` replays the entire game in Node using the same pure engine the app
uses — no browser, no tokens, sub-second. It:

- proves all **9 endings** are reachable and prints the exact choice path to each (a state-space search over the real choice graph, not random sampling);
- finds runtime **dead-ends** and unreachable scenes/choices — condition-aware, so it catches gating bugs the structural validator can't;
- **lints canon** (forbidden strings like "Bailey" / "Big Don's");
- checks **telemetry parity** (`usage.ts` events ↔ the nginx whitelist).

It exits non-zero on any hard failure and runs in CI **before every deploy**, so a
broken story can't ship. Details in [`docs/local-qa.md`](docs/local-qa.md).

---

## Deployment (Fly.io)

Live at **https://sonofar.fly.dev/**.

Deploys are **CI-driven** — pushing to `main` triggers `.github/workflows/fly-deploy.yml`, which runs `npm run qa` and then `flyctl deploy --remote-only`. Fly builds from the same `Dockerfile` used locally. **Don't run `flyctl deploy` by hand** — a manual deploy races the CI machine lease and skips the QA gate. Just push, watch the Action go green, and verify the live URL.

- **Config** — `fly.toml`: app `sonofar`, primary region `ord`, shared-cpu-1x / 1 GB, internal port 80, `force_https`, auto-stop/auto-start (idle machines cost nothing).
- **Ops** — `flyctl logs`, `flyctl status`, `flyctl ssh console`.
- **Health** — `GET /healthz` → `200 ok`.

(A Tailscale private URL was explored but isn't used — Fly was the simpler path to a public test URL.)

---

## Run locally with Docker

The same multi-stage container Fly builds (Node 20 → nginx):

```bash
docker compose up -d --build       # serves on http://localhost:8090
```

Override the host port via `docker-compose.yml` or an env var:

```bash
SON_OF_AR_PORT=9000 docker compose up -d --build
```

`GET /healthz` → `200 ok` backs the `docker compose ps` health status. Stop / update:

```bash
docker compose down                # stop and remove
docker compose up -d --build       # rebuild after pulling new code
```

---

## Project layout

```
src/
  App.tsx               – main shell + reducer
  main.tsx              – React entry
  index.css             – Tailwind + small utilities
  types/
    game.ts             – Scene, GameState, Stats, Ending types
  utils/
    gameEngine.ts       – pure state-machine functions
    storage.ts          – localStorage save/load
    sound.ts            – WebAudio click (no audio assets)
  data/
    story.ts            – combiner: imports chapters, validates, exports getScene
    chapters/           – 01-ash-wake … 10-the-drive (every scene lives here)
    items.ts            – inventory items
    prologue.ts         – illustrated cold-open panels (story-as-data)
  components/
    TitleScreen.tsx
    Prologue.tsx
    SceneView.tsx
    ChoiceButton.tsx
    StatsPanel.tsx
    InventoryDrawer.tsx
    EditorNotes.tsx
    SaveControls.tsx
    EndingCard.tsx
    EmberBackground.tsx
scripts/
  qa/playthrough.ts     – offline QA harness (npm run qa)
  build-prologue-art.py – regenerate prologue WebP from assets/prologue/ masters
```

The story is data, not code. To add a chapter or scene, edit the relevant file in `src/data/chapters/` — each `Scene` declares its body text, optional Editor note, choices, stat changes, item changes, and conditions. The content validator runs at boot and `npm run qa` proves reachability, so broken refs fail loudly with no code changes.

---

## Acceptance checklist

- [x] `npm install` works
- [x] `npm run dev` works
- [x] `npm run build` succeeds
- [x] Live on Fly.io via CI (`git push` → QA gate → deploy); `docker compose up -d --build` serves locally on `:8090`
- [x] App is readable and usable on mobile (large text, big tap targets, dark theme, safe-area padding)
- [x] Choices branch correctly; locked choices reveal once requirements are met
- [x] LocalStorage save/load works (auto-save + Save now button + Reset)
- [x] Inventory and stats update on choices
- [x] 70 scenes, 9 endings reachable
- [x] `npm run qa` passes (9/9 endings, no dead-ends, canon + telemetry checks) and gates CI deploys
- [x] README explains local dev, the offline QA gate, and Fly.io / Docker deployment

---

## Credits

Story, design, and unreasonable serial commas: you and the Editor.  
Engine: a small React reducer.  
Brand consistency: we're working on it.
