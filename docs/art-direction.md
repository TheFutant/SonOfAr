# Son of Ar — art direction & generation prompts

The master art brief for *Son of Ar*: requirements, art direction, character
bible, and style — written as **copy-pasteable prompts** for an image model
(Midjourney / SDXL / Flux / DALL·E) or as a spec for an illustrator. The
prologue-specific shot list lives in `prologue-art-briefs.md` and inherits
everything here.

> **Golden rule:** the art carries **no lettering**. All words (titles,
> captions, the Editor's voice) are CSS/typography in the app. Generate
> text-free images.

---

## 1. Hard requirements (non-negotiable)

### Canon guardrails (from `CLAUDE.md`)
- **Maebie** (the dog) is a **brown pit bull mix**, alive, gentle, beloved — a
  partner, never a victim, never menacing/snarling, never in danger, never near
  chocolate. Never "Bailey."
- **The Editor is a voice, not a person — do not depict her as a character.**
  She is present only as handwriting, red-pen margin notes, punctuation.
- **Sister Pearson is a human scholar, NOT yet "Reason."** Never render her as a
  glowing/godlike force or deity. The myth forms around her gradually; the
  *person* comes first.
- **Ranya's power is subtle rain that reveals** (hidden writing in ash, cooled
  fire, truth) — **never** Storm-style spectacular weather. "Fire remembers.
  Rain reveals."
- **No plot furniture.** Every figure reads as a person with interiority — no
  decorative bystanders, no one reduced to a symbol or to motivation for Arson.
- **Restraint over spectacle.** This is burn-*noir* aftermath and mood, not an
  action splash. Embers, ash, smoke — not a blazing inferno.
- **No readable text in images.** Scorched "almost-names," notes, signs, and
  marks stay illegible (and AI lettering garbles anyway).

### Technical / deliverable spec
- **Format:** WebP (final). Master/working renders can be PNG; deliver optimized
  WebP.
- **Aspect ratios:** story panels **3:2 landscape**; character sheets **1:1** or
  **2:3 portrait**; cover/key art **2:3 portrait**. Keep panel AR uniform within
  a sequence.
- **Resolution:** generate ~1536 px on the long edge; export ~1280 px WebP.
- **File-size budget:** the app is an **offline PWA that precaches its bundle**
  (~1.2 MB today). Target **≤ ~90 KB per panel WebP**. If a set runs heavy,
  it gets lazy-loaded out of the precache instead — flag it.
- **No** baked text, captions, speech bubbles, borders/frames, watermarks,
  signatures, UI, or logos. The app supplies frames and type.
- Compose **dark and vignetted** so edges sit cleanly on near-black `#050403`;
  fade toward black at the margins.
- **Alt text:** the app renders decorative `alt=""` by default; supply a one-line
  alt per delivered image if you want it wired for accessibility.

### File naming
`<area>-<slug>.webp` — e.g. `prologue/p5-name.webp`, `char/maebie-sheet.webp`,
`cover/key-art.webp`. Place under `public/`.

---

## 2. Master art direction

**The world:** burn-noir Americana on the edge of collapse — small towns, ash
streets, an impossible self-tending cabin (the Third Stair), a drowned wet
country (the Mire), and the liminal diners of a long road trip (the Drive).
Mythic, melancholic, darkly funny underneath. Smoke and ash are the weather;
ember-glow is the only warmth.

**Medium & finish:** dark graphic-novel / noir comic illustration — ink and
charcoal linework, heavy blacks, painterly comic shading. NOT photorealistic,
NOT 3D render, NOT cartoon/chibi.

**Light:** dramatic chiaroscuro from a **single warm ember light source**; deep
shadow holding most of the frame; fine film grain; drifting embers and ash.

**Palette:** near-black warm browns + ash greys, with **ember orange as the only
saturated color.** The one sanctioned exception: **Ranya / rain scenes** may
admit a cool, desaturated rain-blue/teal as a deliberate counterweight to the
ember warmth ("fire remembers / rain reveals") — used sparingly, never neon.

### MASTER STYLE PROMPT (paste, then append a subject)
> Dark graphic-novel / noir comic illustration, ink and charcoal linework with
> heavy blacks and painterly shading, high-contrast chiaroscuro lit by a single
> warm ember light source. Strictly limited palette of near-black warm browns
> and ash greys with ember orange as the only saturated color. Drifting embers,
> fine ash, faint smoke, subtle film grain. Cinematic, moody, melancholic,
> restrained, mythic. No text, no lettering, no border. ::

---

## 3. Palette (hex)

| Role | Hex | Notes |
|------|-----|-------|
| Void / background | `#050403` | deepest black-brown (`ash-950`) |
| App theme black | `#0b0908` | `ash-900` |
| Shadow brown | `#221e1a` | `ash-700` |
| Mid ash | `#4a423b` / `#6e655c` | `ash-500/400` |
| Ash light | `#9b9085` / `#c5bdb3` | `ash-300/200` |
| Paper / highlight | `#f6f4f2` | `ash-50` |
| Ember (bright) | `#ffb070` | `ember-400` |
| Ember (core) | `#ff7a2a` / `#e85a14` | `ember-500/600` |
| Ember (deep) | `#a83b08` | `ember-700` |
| Rain accent (Ranya only) | desaturated teal/slate-blue | sparing counterweight |

---

## 4. NEGATIVE PROMPT (paste for every image)
> text, letters, words, captions, speech bubble, watermark, signature, logo,
> frame, border, UI; bright neon colors, saturated blue/green (except sparing
> rain-teal in Ranya scenes); photorealistic, 3d render, cartoon, chibi, anime;
> gore, blood, wounds; snarling or aggressive dog; cluttered background; modern
> brand logos; extra fingers, deformed hands.

---

## 5. Consistency workflow (do this before any scene)

1. **Generate character sheets first** (prompts in §6) — front + 3/4 views,
   neutral ember light, plain dark background.
2. **Lock a style reference.** Pick one sheet/render you like and reuse it as a
   style ref across everything (Midjourney `--sref`, or an IP-adapter / image
   prompt in SDXL/Flux). Keep a consistent **seed family**.
3. **Anchor Arson's face** on the existing master at
   `assets/icons/source-any.png` (image-reference it) so he stays the same man.
4. Only then generate scenes, passing the relevant character sheet + style ref.

---

## 6. Character bible

For each: canon notes (what's fixed) → a copy-paste **character-sheet prompt**
(prepend the MASTER STYLE PROMPT, append the NEGATIVE PROMPT).

### Arson — the protagonist ("Son of Ar")
- **Canon:** weathered man, late 30s–40s; short dark hair; soot on the brow;
  guarded, tired eyes; a **badly self-wrapped bandage on his right palm.** He
  *never starts the fire — he only uses what is already there.* Burn-noir, never
  clean-heroic, rarely smiling. In sequence art keep him **often partly obscured**
  (shadow, silhouette, back, or cropped) to preserve mystery. Face anchor:
  `assets/icons/source-any.png`.
- **Sheet prompt:** *character sheet of a weathered man in his early 40s, short
  dark soot-streaked hair, stubble, guarded tired eyes, a worn dark coat, a
  crudely self-bandaged right hand; front and 3/4 views; neutral warm ember key
  light; plain near-black background.*

### Maebie — the dog
- **Canon:** a **brown pit bull mix** — compact, smallish/medium (canon prose:
  one of the "small brown dogs"), short **brindle/brown coat**, the signature
  tan **"eyebrow" markings** that do "the eyebrow thing" (judging your judgment,
  gently, in advance), bright ember-catching eyes. **Gentle, expressive,
  beloved, very alive — never menacing.** She is the partner "you'd burn the
  world to keep."
- **Sheet prompt:** *character sheet of a brown pit bull mix dog, compact and
  muscular but smallish, short brindle coat, distinctive tan eyebrow markings,
  bright warm eyes, soft and gentle expressive face, alert and friendly; sitting
  and standing views; neutral warm ember light; plain near-black background.*

### The Editor — UNSEEN
- **Canon:** a **voice, never a depicted person.** Her presence = elegant
  **handwriting, red-pen margin notes, punctuation marks, a manuscript.** If key
  art ever needs to evoke her, render *marginalia / a red-inked page*, not a face.
- **Motif prompt (objects only):** *a scorched manuscript page with elegant
  illegible handwriting and red-ink margin notes and editing marks, a fountain
  pen, warm low light — no person, no readable text.*

### Mason — the structure/order sibling
- **Canon:** Arson's brother — "your eyebrows, your jaw, and **none of your
  priors**"; dressed the way Arson dresses "in the dream where he's a more
  reasonable person" — neat, composed, a **book in one hand**, a small precise
  smile. He argues *structure / frame*, not "cage." **Intelligent and
  emotionally connected, NOT a stock villain.** One of the three siblings (the
  "three" motif is load-bearing).
- **Sheet prompt:** *character sheet of a composed man, clear resemblance to a
  rougher brother — same brow and jaw but neatly groomed, tidy dark clothing,
  holding a closed book, a small precise controlled smile, calm intelligent
  eyes; front and 3/4 views; warm ember light; plain near-black background.*

### Sister Pearson — the scholar (NOT yet "Reason")
- **Canon:** the third sibling and **smartest in the family**; "your father's
  quiet eyes and **none of your father's patience**"; a coat **"either monastic
  or just well-made."** A folding table, **cold tea**, diagrams whose footnotes
  argue with the equations. Associated objects: a small brass icon, a paper
  three-particle diagram, a scorched scrap. **She is a person — never a glowing
  deity or godlike force.** The world only *gradually* starts calling her
  "Reason"; she may dislike it. Render the human scholar.
- **Sheet prompt:** *character sheet of a sharp, composed woman scholar, quiet
  intelligent eyes, slight impatience, in a plain well-made coat that reads
  faintly monastic, seated at a folding table with a cup of cold tea and
  hand-drawn diagrams; grounded and human, not divine; front and 3/4 views; warm
  ember light; plain near-black background.*

### Ranya — the rain
- **Canon:** her power is **subtle, revelatory rain** — it makes hidden writing
  surface in ash, cools fire, exposes truth. **Never Storm-style spectacle.**
  She is the quiet emotional counterweight to fire. *(Physical specifics aren't
  pinned in canon — keep her grounded and ordinary; lock a look via her sheet.
  Avoid the "weather goddess" trope entirely.)*
- **Sheet prompt:** *character sheet of a calm, grounded young woman, plain
  weatherworn clothes, quietly attentive; fine rain beginning around her,
  raindrops revealing faint pale writing in wet ash at her feet; mood subtle and
  intimate, NOT a storm; introduce a sparing cool rain-teal accent against the
  ember warmth; front and 3/4 views; plain near-black background.*

---

## 7. Settings (prompt seeds — append to MASTER STYLE PROMPT)
- **Burn-noir town:** *an emptied small-town street at grey dawn after a fire,
  thin smoke, ash falling like snow, soot-streaked clapboard, ember glow low on
  the horizon.*
- **The Third Stair (safehouse):** *an impossible self-tending cabin interior,
  warm and uncanny, with three separate staircases on the top floor going
  improbable directions, corkboards and a pot of stew, no host present.* (Never
  "Big Don's.")
- **The Mire:** *a drowned wet country at dusk, a half-submerged causeway over
  black water, reeds and rain, melancholy and dangerous, restrained.*
- **The Drive:** *a liminal roadside diner at night on a long road trip, neon
  off, warm window light, a parked car, the dog waiting — wistful Americana,
  collapse just offscreen.*

---

## 8. Model param hints
- **Midjourney:** append `--ar 3:2 --style raw --stylize 250`; lock look with
  `--sref <ref>`; faces via `--cref <arson_ref>`.
- **SDXL / Flux:** 1536×1024, CFG ~5–7; add "concept art, comic book ink";
  IP-adapter / image-prompt the character sheets for consistency.
- **Any model:** keep the MASTER STYLE PROMPT + NEGATIVE PROMPT fixed; vary only
  the subject; reuse a seed family per sequence.

---

## 9. Deliverable checklist
- [ ] Character sheets generated and locked (Arson, Maebie, Mason, Pearson,
      Ranya); style ref chosen.
- [ ] Canon guardrails honored (Maebie gentle/safe; Editor unseen; Pearson human
      not divine; Ranya subtle; no readable text; restraint).
- [ ] Palette holds — ember the only saturated color (rain-teal only in Ranya).
- [ ] Uniform aspect per sequence; dark vignetted edges.
- [ ] Exported WebP, within the per-image size budget; placed under `public/`.
- [ ] (If wiring into the app) `art` paths set; `npm run build` clean; eyeball at
      390 px mobile width; then push.
