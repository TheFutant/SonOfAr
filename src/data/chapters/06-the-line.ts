import type { Scene } from "../../types/game";

export const chapter6 = [
  {
    id: "the_line_1",
    title: "The Line",
    chapter: "VI · The Line",
    body: `You sit, eventually, on a curb that is colder than the rest of the curb.

The Editor takes off her glasses. She looks tired in a way only people who actually love what they're protecting can be tired.

"Every man who burns," she says, "is one decision away from a man who only stands near burning. The line is yours, not mine. But it's load-bearing. Pick one."`,
    editorNote:
      "I am, for the next four lines, declining to be funny. This is the spine of the story. Pick one.",
    choices: [
      {
        id: "code_never_start",
        label: '"I never start the fire."',
        next: "legacy_1",
        effects: {
          setCode: "never_start",
          stats: { humanity: 1, editorApproval: 1 },
        },
      },
      {
        id: "code_never_home",
        label: '"I never burn a home with people inside."',
        next: "legacy_1",
        effects: {
          setCode: "never_burn_home",
          stats: { humanity: 2, editorApproval: 1 },
        },
      },
      {
        id: "code_never_proof",
        label: '"I never punish without proof."',
        next: "legacy_1",
        effects: {
          setCode: "never_without_proof",
          stats: { evidence: 1, editorApproval: 2 },
        },
      },
      {
        id: "code_never_paperwork",
        label: '"I never let garbage hide behind paperwork."',
        next: "legacy_1",
        effects: {
          setCode: "never_paperwork",
          stats: { evidence: 2, editorApproval: 1 },
        },
      },
    ],
  },
] as const satisfies readonly Scene[];
