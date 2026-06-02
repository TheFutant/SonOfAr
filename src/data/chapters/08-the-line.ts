import type { Scene } from "../../types/game";

export const chapter8 = [
  {
    id: "the_line_1",
    title: "The Line",
    chapter: "VIII · The Line",
    body: `You sit, eventually, on a curb that is colder than the rest of the curb.

The Editor takes off her glasses. She looks tired in a way only people who actually love what they're protecting can be tired.

"Every man who burns," she says, "is one decision away from a man who only stands near burning. Three siblings. Three roads. Three readings of the same mark. The line is yours, not mine. But it's load-bearing. Pick one."`,
    editorNote:
      "I am, for the next few lines, declining to be funny. This is the spine of the story. Pick one.",
    writersRoomNote:
      "Four codes are the honest lines. A fifth — the refusal — only surfaces if Mason already wrote you off (mason_sees_lost): the player who raged at him in Three Marks is the only one offered the chance to prove him right. It sets chose_cruelty, the sole gate to The Monster ending; declining a code IS the monstrous choice.",
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
      {
        id: "code_refuse",
        label: '"No line. I burn what I decide needs burning."',
        next: "legacy_1",
        requires: { flag: { key: "mason_sees_lost", value: true } },
        effects: {
          stats: { heat: 2, humanity: -2, editorApproval: -2, chaos: 1 },
          setFlags: [{ key: "chose_cruelty", value: true }],
        },
        tag: "no code",
      },
    ],
  },
] as const satisfies readonly Scene[];
