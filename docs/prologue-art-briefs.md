# Prologue art briefs — filling the AI-art seam

Per-panel briefs for illustrating the six prologue beats. The prologue ships
**zero-asset today** (pure type + CSS); this doc is what you hand an image model
(or an illustrator) when you decide to fill the `art` slot in
`src/data/prologue.ts`. Captions stay in CSS — **the art carries no lettering.**

> Project-wide master art direction, palette, character bible, and the reusable
> style/negative prompts live in **`art-direction.md`** — this file is the
> prologue-specific shot list and inherits all of it.

## How the art wires in

1. Generate one image per panel (consistency workflow below).
2. Optimize to **WebP**, place in `public/prologue/` as `p1-ash.webp` …
   `p6-punctuate.webp`.
3. Set `art` on each panel in `src/data/prologue.ts`, e.g. `art: "/prologue/p1-ash.webp"`.
   The `Prologue` component renders it in a rounded, bordered box above the
   caption — no other change needed.
4. `npm run qa` (parity/logic unaffected) → `npm run build` → eyeball → push.

**Bundle budget:** the PWA precaches the whole bundle for offline (currently
~1.2 MB). Six panels should add **well under ~600 KB total** — target ≤ ~90 KB
per WebP at ~1280 px wide. If they come in heavy, we lazy-load them out of the
precache instead (ask and I'll wire that).

**Integration note (decided):** the big `shout` word **stays** as a kicker over
the caption even when `art` is present (current behavior). Art is the visual;
the shout is the beat's punch line. No component change needed.

**Accessibility:** the component currently renders `alt=""` (decorative, since
the caption conveys the meaning). Per-panel `alt` text is suggested below if you
want me to add an `alt` field.

---

## Hard constraints (canon + technical)

**Canon — non-negotiable (see `CLAUDE.md`):**
- **Maebie** (panel 5) is a **living, healthy dog and partner** — alert, alive,
  unharmed. Never in danger, never gore, never near chocolate. She is the dog
  "you'd burn the world to keep," not a victim. No "Bailey."
- **The Editor is a voice, not a character** — never depict a person as the
  Editor. Panel 3 shows her *handwriting*, nothing more.
- **No readable text in any image** — the scorched "name" (panel 5) and the
  Editor's note (panel 3) must stay **illegible** (you're "not going to read it
  yet"; AI lettering garbles anyway). Captions are CSS.
- Restraint over spectacle. This is aftermath and mood, not an action splash.
  "Fire remembers" — embers, ash, smoke; not a blazing inferno.
- (Pearson/"Reason" and Ranya's rain do **not** appear in the prologue — don't
  introduce them.)

**Technical:**
- **Aspect ratio:** uniform across all six. Recommend **3:2 landscape**
  (generate ~1536×1024, export ~1280 px wide WebP).
- **No baked-in text, captions, speech bubbles, watermarks, signatures, or
  borders.** The component supplies the panel frame.
- Edges should sit comfortably on near-black `#050403` — favor dark, vignetted
  compositions that fade toward black at the margins.

---

## Global style block (reuse verbatim, append the per-panel subject)

> Dark graphic-novel / noir comic illustration. Ink and charcoal linework, heavy
> blacks, high-contrast chiaroscuro lit by a single warm ember light source.
> Strictly limited palette: near-black warm browns (#050403, #0b0908, #221e1a)
> with ash-grey midtones (#9b9085, #c5bdb3) and **ember orange as the only
> saturated color** (#ff7a2a, #e85a14, #a83b08). Drifting embers and fine ash,
> faint smoke, subtle film grain. Cinematic, moody, restrained, melancholic.
> Painterly comic art, NOT photorealistic, NOT 3D render, NOT cartoonish.

**Negative / avoid (all panels):** text, letters, words, captions, speech
bubbles, watermark, signature, logo; bright/neon colors, saturated blues or
greens; gore, blood, wounds; cute/chibi style; cluttered backgrounds; modern
brand logos; lens flare overkill.

**Model hints:** Midjourney — append `--ar 3:2 --style raw --stylize 250`;
SDXL/Flux — 1536×1024, CFG ~5–7, add "concept art, comic book ink." For a
recurring look, lock a **style reference** (MJ `--sref`) across all six.

---

## Consistency workflow (do this first)

The six panels must look like one hand. Before the panels:

1. **Arson (the protagonist) character anchor.** Use the existing face master at
   `assets/icons/source-any.png` as an image reference so the face stays
   consistent. Anchor description: *a weathered man, late 30s–40s, short dark
   hair, soot on the brow, guarded eyes, a badly self-wrapped bandage on his
   right palm.* In the prologue keep him **partly obscured** — shadow,
   silhouette, back-of-head, or cropped — to preserve mystery. He is never
   smiling, never heroic-clean.
2. **Maebie character anchor (canon).** A **brown pit bull mix** — compact, a
   smallish/medium build (canon prose calls her one of the "small brown dogs"),
   short brown/brindle coat, and the signature tan **"eyebrow" markings** that do
   "the eyebrow thing" (judging your judgment, gently, in advance). Bright,
   ember-catching eyes; expressive, soft, and very alive. **Depict her as gentle
   and beloved — never snarling, menacing, or in danger** (counter the breed
   stereotype; she's the partner "you'd burn the world to keep"). Generate a
   clean reference, then reuse it in panel 5.
3. Generate panels with the same seed family + the Arson/Maebie references so
   faces and the dog stay stable.

---

## Panel briefs

### P1 — `p1-ash.webp` · "Ash."
- **Beat:** establishing. A town that has smelled like this before — aftermath,
  recurrence, dread-quiet.
- **Composition:** wide establishing shot, low light of almost-dawn. A modest
  suburban/small-town street; thin smoke threads rising; ash drifting like snow;
  a scorch-streaked wall. No people, or a single distant silhouette. Ember glow
  low on the horizon. Caption box will sit lower-left, so keep the lower-left
  quieter.
- **Subject prompt:** *empty small-town street at grey dawn after a fire, thin
  ribbons of smoke, ash falling softly, soot-streaked clapboard wall, a faint
  ember glow at the horizon, desolate and quiet.*
- **alt:** "A quiet small-town street at dawn, ash drifting, thin smoke rising."

### P2 — `p2-you.webp` · "You."
- **Beat:** you come to under a half-attached ceiling fan; bandaged right palm.
- **Composition:** high angle looking down at a man on a debris-strewn floor,
  half-detached ceiling fan above frame, his **badly bandaged right hand** in
  the foreground. Face shadowed / partially out of frame (mystery). Single warm
  light raking across.
- **Subject prompt:** *overhead view of a man lying on a wrecked floor coming to,
  a ceiling fan hanging crooked above, his crudely self-bandaged right hand
  closest to camera, face half in shadow, warm raking light, dust in the air.*
- **Guardrail:** face obscured; no clear hero portrait yet.
- **alt:** "A man coming to on a wrecked floor, a crooked ceiling fan above, his
  right hand badly bandaged."

### P3 — `p3-note.webp` · the Editor's note
- **Beat:** a note tucked in the cuff, in a hand that punctuates like it means it.
- **Composition:** tight still-life. A scrap of paper tucked into a shirt cuff,
  **illegible** ink handwriting (suggested, never readable), ash smudge on one
  scorched edge, fountain-pen ink quality. Shallow depth of field.
- **Subject prompt:** *macro close-up of a folded paper note tucked into a
  frayed shirt cuff, elegant illegible ink handwriting, one scorched ash-smudged
  edge, shallow focus, warm low light.*
- **Guardrail:** **no legible text**; do **not** depict the Editor as a person.
- **alt:** "A handwritten note tucked into a frayed shirt cuff, its edge scorched."

### P4 — `p4-smoke.webp` · "Three columns of smoke."
- **Beat:** three pulls at once — kitchen window, a closet you don't recall
  closing, and the floor. (Leans on the load-bearing **"three" motif** — keep
  three distinct verticals.)
- **Composition:** graphic, near-symmetrical: **three vertical smoke columns**
  across the frame — one past a kitchen window, one bleeding from the seam of a
  shut closet door, one rising ambiguously from the floorboards. Strong negative
  space, comic-poster clarity.
- **Subject prompt:** *interior of a dim fire-touched house, three separate
  vertical columns of smoke rising — one past a kitchen window, one seeping from
  a closed closet door, one from gaps in the floorboards, graphic high-contrast
  composition, embers in the air.*
- **alt:** "A dim room with three separate columns of smoke rising from a window,
  a closet door, and the floor."

### P5 — `p5-name.webp` · the smudge + Maebie *(canon-critical)*
- **Beat:** a scorch on the wall that almost spells a name (you won't read it
  yet); three streets over, the dog you'd burn the world to keep.
- **Composition:** foreground — a **scorched smudge on a wall that ALMOST forms
  letters but stays unreadable**. Mid/background through a doorway or down the
  street — **Maebie**, alert and alive, ember-light catching her eyes, looking
  back toward the viewer. Two clear focal points.
- **Subject prompt:** *foreground: an indistinct scorch mark on a soot-stained
  wall that almost resembles handwriting but is unreadable. Background down the
  street: a brown pit bull mix, compact, short brindle coat with tan eyebrow
  markings, bright ember-lit eyes, sitting alert and healthy with a gentle
  expression, looking back toward camera. Warm ember light, ash in the air.*
- **Guardrails:** the smudge stays **illegible**; **Maebie is alive, healthy,
  calm, gentle, unharmed, never in danger**. Read as beloved, **not** menacing —
  no snarl, no aggression. No blood, no chocolate, nothing threatening her.
- **alt:** "An unreadable scorch mark on a wall; down the street, an alert,
  healthy dog looks back."

### P6 — `p6-punctuate.webp` · "Punctuate yourself accordingly." / "He never starts the fire."
- **Beat:** resolution; the myth settling. He only uses what is already there.
- **Composition:** the man as **silhouette / back view** in a doorway rimmed
  with ember light, ash settling, smoke behind him. Restrained mythic hero-shot.
  His hands are empty — or hold an **unlit** matchbook — near something that is
  *already* burning. He did not light it.
- **Subject prompt:** *back view silhouette of a man standing in a doorway rimmed
  with warm ember light, ash settling around him, smoke behind, an already-lit
  glow ahead of him that he is merely walking toward, calm and final, mythic and
  restrained.*
- **Guardrail:** he is not igniting anything — the fire pre-exists him. No
  triumphant/action posing.
- **alt:** "A man silhouetted in an ember-lit doorway, ash settling, walking
  toward a fire he did not start."

---

## Post-generation checklist

- [ ] Arson's face + bandaged hand consistent across P2/P6; Maebie matches her
      reference in P5.
- [ ] No readable text anywhere (recheck P3, P5).
- [ ] Maebie reads as a gentle, beloved brown pit bull mix (eyebrow markings) —
      alive/healthy/safe, never menacing — in P5; nothing violates the guardrails.
- [ ] Palette holds — ember is the only saturated color; everything else
      ash/charcoal.
- [ ] Exported WebP, uniform 3:2, each ≤ ~90 KB; placed in `public/prologue/`.
- [ ] `art` set on all six panels in `src/data/prologue.ts`.
- [ ] `npm run build` clean; eyeball at mobile width (390 px); then push.
