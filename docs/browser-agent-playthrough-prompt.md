# Browser-agent prompt — Son of Ar playthrough QA

> **Run `npm run qa` first.** Most of this prompt's work — endings coverage
> (with exact paths), dead-ends, unreachable content, canon string-checks,
> telemetry parity — now runs locally for free via `scripts/qa/playthrough.ts`
> (see `local-qa.md`). Use a browser agent only for what the local tool can't
> do: visual layout, live beacons hitting nginx, PWA/offline, and the toggle /
> save-continue UI.

Paste everything below the line into your browser-automation agent. It is
self-contained: target URL, UI map, tasks, and the report format.

---

You are a QA agent testing a public web game by playing it in a real browser.

## Target

**https://sonofar.fly.dev/**

"Son of Ar" is a mobile-first, dark-comic interactive-fiction game: you read a
scene and click one of several **choice buttons** to advance. It is a static
single-page app — there are no logins, no forms, no payments, and nothing you
can break permanently. Play freely. (It's a PWA; ignore any "install" prompt.)

Use a **mobile viewport** (e.g. 390×844) — the layout is mobile-first.

## Your mission (four goals, run them together)

1. **Functional QA** — every choice you click must advance to a new scene; no
   blank scenes, no dead ends, no buttons that do nothing, no console errors.
2. **Endings coverage** — reach as many of the **9 endings** as you can, plus
   the optional **Drive** detour. Track progress via the title screen's
   "Endings discovered" list (see below).
3. **Narrative / canon review** — flag typos, tone breaks, and canon violations
   (checklist below).
4. **Telemetry check** — confirm the game fires its anonymous usage beacons
   (see "Telemetry" below).

## UI map

- **Title screen:** a **Begin** button (first visit) — or, once a save exists,
  **Continue** (resume mid-run) and **Start over** (which asks **Confirm start
  over** / **Cancel**). Below the buttons is an **"Endings discovered"** list of
  9 rows: discovered ones show their title + ✓; undiscovered show "— ???". This
  list **persists across runs/reloads** — it is your coverage scoreboard.
- **Play screen:**
  - **TopBar** — a *Back to title* control + the current chapter name (e.g.
    "VI · The Mire").
  - **Stats panel** — five stats: Heat, Humanity, Evidence, Chaos, Editor.
    Watching these change tells you what a choice did.
  - **Scene** — body text, an optional collapsible **Editor** note, and the
    **choice buttons**. A locked choice may render **disabled/greyed** (its
    requirement isn't met) — note these but you can't click them.
  - **Bottom controls** — toggles: **Chaos Mode** (Editor turns sarcastic),
    **Writers Room** (reveals hidden design notes), **Sound**. Also Save/Reset.
- **Ending scene:** shows an **EndingCard** (title + a stats summary + a **Copy
  ending summary** button) and the line "Legacy is written in ash." Clicking the
  final choice rolls credits and returns you to the title — the ending is now
  ticked in "Endings discovered".

## How to run multiple playthroughs

Reaching all 9 endings needs several runs with **different decision
personalities**, because endings are gated by accumulated stats/flags you can't
see directly. After each run, return to the title, read "Endings discovered",
then **Start over → Confirm start over** and play again with a new personality.
Do up to ~12 runs; stop early if the scoreboard stops gaining new endings for 3
runs in a row. Suggested personalities (mix and adapt):

1. **Vengeance / fire** — pick aggressive, intimidating, "burn it" choices.
2. **Protection / humanity** — pick protective, restrained, "treat people as
   people" choices; always choose to protect the dog.
3. **Mystery / evidence** — investigate, read the file, check the comma, follow
   what doesn't add up.
4. **Editor's pet** — pick choices tagged for the Editor / Oxford-comma /
   tasteful punctuation; keep Editor approval high.
5. **Chaos / bad jokes** — pick the joke options.
6. **The insurance man** — engage fully with Carl / paperwork in the late
   chapters.
7. **Reason path** — in Chapter VI ("The Mire"): keep calling Pearson by name,
   trust Ranya, choose mercy/justice over raw fire. This unlocks the
   reflective endings.
8. **The quiet man** — maximise Humanity, minimise Heat throughout.

Known ending titles to look for (match against the scoreboard): *The Myth of
Ar, The Two of Them, Public Servant of Fire, Carl from Insurance Wins, The
Monster, The Editor's Ending, Rain Reveals, The Man, Reason Remains.*

### The optional Drive detour (do this in at least one run)

In **Chapter IV · The Third Stair**, on the "Inside the Cabin" scene, pick
**"Take the hand-drawn map with three addresses off the corkboard."** This
enters an optional road-trip detour. Explore its spokes — the route choice
(fast / scenic / "ask the dog"), the **Dog Logistics Department**, the **Dirty
Spoon** diner, the worst-meal beat, the **Disclosure Day** counter chat, the
coast/Bar-Harbor scene, and the meal-planning beat — then take the exit back to
the cabin and continue the main story. Confirm it loops back cleanly and never
blocks the main path.

## Toggle checks (once each)

- Flip **Writers Room** on — hidden notes should appear under scenes.
- Flip **Chaos Mode** on — the Editor's notes should turn sarcastic, and should
  **not** repeat the same complaint verbatim scene after scene.
- Flip **Sound** on — clicking should produce a tiny click (no error if audio is
  blocked).
- Reload the page mid-run — you should land on the **title** screen, and
  **Continue** should resume where you were.

## Canon checklist (flag any violation as a bug)

- The dog is **Maebie** — spelled exactly that way, everywhere. Never "Bailey",
  never "Maybe". She is alive and a partner.
- **Maebie never dies** and is never used as shock/trauma fuel. (Chapter VI has
  a horse that may be lost — that's intended; the dog must be fine.)
- **Never give chocolate to the dog** — the story should reinforce this, not
  violate it.
- There is **no "Big Don's"** anywhere (the safehouse is **The Third Stair**).
- **Sister Pearson** is a person first; the world only gradually starts calling
  her **"Reason."** She should not be introduced already named "Reason."
- **Ranya's** rain is subtle (it *reveals* — hidden writing, truth, cooling
  fire) — not spectacular weather.

## Telemetry

The game fires anonymous beacons to `/t?evt=…` (HTTP **204**). If your tooling
can inspect network requests, confirm you see:

- `evt=session_start` on each page load,
- `evt=new_game` when you click Begin / Confirm start over,
- `evt=ending&lbl=<ending_id>` when an ending scene loads,
- `evt=detour` when you enter the Drive.

If you can't inspect the network, just **log each milestone** (session starts,
endings reached with their on-screen title, detour entered) so the owner can
cross-check them in Logflare.

## Report back

Produce a structured report:

1. **Endings reached** — the final "Endings discovered" scoreboard (which of the
   9 are ticked), and which personality/run unlocked each.
2. **Functional bugs** — scene id/title or chapter + what went wrong + repro
   steps + a screenshot. Include any browser-console errors.
3. **Canon / narrative issues** — quote the offending text + which checklist
   item it breaks (or typos / tone notes).
4. **Toggle + save/continue results** — pass/fail for each check above.
5. **Telemetry observations** — the beacons you saw (or the milestone log).
6. **Coverage gaps** — endings you could not reach and what you tried.

Be concrete: quote on-screen text and cite chapter names so issues are
traceable.
