import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter7 = [
  {
    id: "carl_1",
    title: "Carl, from Insurance",
    chapter: "VII · The Insurance Man",
    body: `Carl is waiting on the porch.

Carl is always waiting on porches. Carl was, you suspect, born on a porch, in a windbreaker, holding a clipboard.

"Hey there, friend," he says, with a smile that knows exactly which clauses don't exist. "Carl. Adjuster-Counselor. Just had a couple little questions about a couple little fires."`,
    editorNote:
      '"Adjuster-Counselor" is not a job. It is a posture. Resist his commas, but engage his commas.',
    choices: [
      {
        id: "carl_forms",
        label: "Ask to see the paperwork.",
        next: "carl_forms",
        effects: { stats: { evidence: 1 } },
      },
      {
        id: "carl_loophole",
        label: "Beat him with his own form language.",
        next: "carl_loophole",
        effects: { stats: { editorApproval: 1, chaos: 1 } },
        requires: { hasItems: [ITEMS.strongly_worded_letter] },
        showIfLocked: true,
      },
      {
        id: "carl_confront",
        label: "Tell him you know about the fourth set of footsteps.",
        next: "carl_confront",
        effects: { stats: { heat: 1, evidence: 1 } },
        requires: { flag: { key: "leans_mystery", value: true } },
        showIfLocked: true,
      },
      {
        id: "carl_bad_joke",
        label: '"Sign here," and point at the porch. (bad joke)',
        next: "carl_1",
        effects: { stats: { chaos: 2, editorApproval: -1 } },
        tag: "bad joke",
      },
    ],
  },
  {
    id: "carl_forms",
    title: "The Forms",
    chapter: "VII · The Insurance Man",
    body: `Carl hands you the forms. They are warm, somehow.

Three pages, single-spaced. Two pages are written in language that pretends to be English. The third page is, on inspection, mostly a list — and the list, on closer inspection, is missing its final comma.

You feel the Oxford Comma Seal warm in your pocket.`,
    editorNote:
      "Carl uses Oxford commas only when convenient. We do not. We use them always. This is how we know who he is.",
    choices: [
      {
        id: "fix_comma",
        label: "Use the seal. Fix the list.",
        next: "carl_confront",
        effects: {
          stats: { editorApproval: 2, evidence: 1 },
          setFlags: [{ key: "fixed_carl_comma", value: true }],
        },
        requires: { hasItems: [ITEMS.oxford_comma_seal] },
        showIfLocked: true,
      },
      {
        id: "let_it_stand",
        label: "Sign anyway. Let the missing comma sit.",
        next: "carl_loophole",
        effects: { stats: { humanity: -1, editorApproval: -2, chaos: 1 } },
      },
    ],
  },
  {
    id: "carl_loophole",
    title: "Loopholes Are Just Slow Fires",
    chapter: "VII · The Insurance Man",
    body: `You read the form back to Carl, slowly, with your finger.

The clause about "damp napkin warranties." The footnote that voids itself. The sub-paragraph that, on a careful reading, obligates Carl personally to "absorb any moisture incidental to a claim."

Carl's smile becomes the smile of a man being slowly handed a glass of water.`,
    editorNote:
      'You can defeat a man with his own paperwork. It is, in fact, my favorite genre.',
    choices: [
      {
        id: "press_napkin",
        label: "Hand him the damp napkin.",
        next: "carl_confront",
        effects: { stats: { evidence: 2, editorApproval: 2, chaos: 1 } },
        requires: { hasItems: [ITEMS.damp_napkin] },
        showIfLocked: true,
      },
      {
        id: "press_anyway",
        label: "Press the point without props.",
        next: "carl_confront",
        effects: { stats: { evidence: 1, editorApproval: 1 } },
      },
    ],
  },
  {
    id: "carl_confront",
    title: "The Fire Marshal Warns",
    chapter: "VII · The Insurance Man",
    body: `Just as it gets interesting, an envelope arrives in the hands of a kid on a bicycle who absolutely does not want to be a delivery service. The envelope is, of course, from the Fire Marshal.

"WARNING," it says, simply. Below: a paragraph of inarguable, lovely, beautifully-punctuated prose.

Carl recognizes the letterhead. He stops smiling for the first time, and the porch becomes, briefly, just a porch.`,
    editorNote:
      "The Fire Marshal writes better than anyone I have ever met. His sentences are short. His commas are correct. We do not start fires near him; he writes them out of existence.",
    choices: [
      {
        id: "carl_take_warning",
        label: "Take the warning. Tuck it in your jacket.",
        next: "the_line_1",
        effects: {
          addItems: [ITEMS.fire_marshal_warning],
          stats: { evidence: 1, humanity: 1 },
        },
      },
      {
        id: "carl_let_him_have_it",
        label: "Hand the warning to Carl.",
        next: "the_line_1",
        effects: { stats: { heat: 1, chaos: 1 } },
      },
    ],
  },
] as const satisfies readonly Scene[];
