// The cold-open prologue — a short typographic "comic" that runs before a new
// game (skippable; replayable from the title). Story-as-data, like scenes: the
// Prologue component just renders this sequence beat by beat.
//
// AI-ART SEAM: each panel has an optional `art` (a path under /public, e.g.
// "/prologue/p1.webp"). It's unset today — the prologue is pure type + CSS, so
// it ships zero-asset and stays offline-clean. When/if we generate panel art,
// drop the images in public/prologue/ and set `art` here; the component renders
// the illustration behind the caption automatically, no structural change. Keep
// any art canon-safe (Maebie is a living partner; no Bailey; the Editor's voice;
// Pearson is not yet "Reason"). Per-panel art prompts + canon guardrails live in
// docs/prologue-art-briefs.md.

export interface ProloguePanel {
  id: string;
  /** Big comic "SFX"/display word, uppercased by the component. Optional. */
  shout?: string;
  /** The caption-box prose. */
  caption: string;
  /** Italic attribution line (e.g. an Editor margin note). Optional. */
  attribution?: string;
  /** Caption-box horizontal placement, for comic-panel asymmetry. */
  align?: "left" | "center" | "right";
  /** Future: illustration path under /public. See AI-ART SEAM above. */
  art?: string;
}

export const PROLOGUE_PANELS: readonly ProloguePanel[] = [
  {
    id: "ash",
    art: "/prologue/p1-ash.webp",
    shout: "Ash.",
    caption:
      "A town wakes smelling of burnt sugar and wet drywall and something that wants to be rosemary but isn't. It has smelled this way before.",
    align: "left",
  },
  {
    id: "you",
    art: "/prologue/p2-you.webp",
    shout: "You.",
    caption:
      "You come to under a ceiling fan that is, mostly, still attached to the ceiling. Your right palm is bandaged. Badly. By you, probably.",
    align: "right",
  },
  {
    id: "the-note",
    art: "/prologue/p3-note.webp",
    caption:
      "A note is tucked in your cuff, in a hand that punctuates like it means it:\n“You are awake. Try not to make this confusing — we are barely two paragraphs in.”",
    attribution: "— The Editor",
    align: "center",
  },
  {
    id: "three-columns",
    art: "/prologue/p4-smoke.webp",
    shout: "Three columns of smoke.",
    caption:
      "One past the kitchen window. A closet you don't remember closing. And the floor, which has opinions about where you should be.",
    align: "left",
  },
  {
    id: "the-name",
    art: "/prologue/p5-name.webp",
    caption:
      "There's a smudge on the wall that almost spells a name. You're not going to read it yet. Three streets over, a dog you'd burn the world to keep is barking at nothing in particular. Her name is Maebie.",
    align: "right",
  },
  {
    id: "punctuate",
    art: "/prologue/p6-punctuate.webp",
    shout: "Punctuate yourself accordingly.",
    caption: "He never starts the fire. He only uses what is already there.",
    align: "center",
  },
];
