import type { Scene } from "../../types/game";

export const chapter4 = [
  {
    id: "big_dons_1",
    title: "Big Don's",
    chapter: "IV · Big Don's",
    body: `Big Don's is, depending on who you ask:

— a cabin off a service road,
— a bait shop without bait,
— a writers' room that occasionally serves chili,
— or "the sex house," which is a misunderstanding the locals enjoy maintaining.

It is not a sex house. It is a cabin. It is a cabin with a hand-painted sign, two folding chairs, and a stew pot that has been simmering, in some form, since 2004.`,
    editorNote:
      '"The sex house" is a nickname that got away from us. The actual nickname was supposed to be "The Sextant House." Brand consistency suffered.',
    choices: [
      {
        id: "ask_about_name",
        label: '"Wait — sex house?"',
        next: "big_dons_misunderstand",
        effects: { stats: { chaos: 1 } },
      },
      {
        id: "enter",
        label: "Walk in. Don't ask.",
        next: "big_dons_safehouse",
      },
    ],
  },
  {
    id: "big_dons_misunderstand",
    title: "Sextant. Sextant House.",
    chapter: "IV · Big Don's",
    body: `Big Don himself — six foot four, gentle, bad with names — emerges from the doorway holding a ladle.

"Sextant," he says, patiently. "Like the nautical thing. There was a sextant in the rafters. You can still see it."

You can, in fact, see the sextant in the rafters. It is beside what is unmistakably a disco ball.

"That was a different night," Big Don says, before you ask.`,
    editorNote:
      'For the record, "Big Don\'s" is a safehouse. Anything else is fan fiction.',
    choices: [
      {
        id: "accept_explanation",
        label: '"Okay, yeah. Sextant."',
        next: "big_dons_safehouse",
        effects: { stats: { editorApproval: 1, chaos: -1 } },
      },
    ],
  },
  {
    id: "big_dons_clarify",
    title: "The Stew",
    chapter: "IV · Big Don's",
    body: `Big Don ladles you a bowl of stew. The stew is, by his own admission, a metaphor.

"Every story I ever heard about you went in there," he says, gesturing. "Some of it boiled out. Some of it caramelized on the bottom. That's where the lore lives. The bottom of the pot."

He hands you a spoon. The spoon is heavier than it has any right to be.`,
    editorNote:
      "Worldbuilding is a stew. You keep the bones. You add what you can spare. You write down the recipe last.",
    choices: [
      {
        id: "eat_stew",
        label: "Eat the stew.",
        next: "carl_1",
        effects: { stats: { humanity: 1, editorApproval: 1 } },
      },
      {
        id: "decline_stew",
        label: "Decline. Politely.",
        next: "carl_1",
        effects: { stats: { chaos: 1, editorApproval: -1 } },
      },
    ],
  },
  {
    id: "big_dons_safehouse",
    title: "Inside the Cabin",
    chapter: "IV · Big Don's",
    body: `Inside, there are corkboards. There are timelines. There is a whiteboard with the words THE WRITERS ROOM at the top, underlined twice, plus a third time by someone who couldn't help themselves.

Pinned in the corner: a printed margin note in a familiar hand. "We've talked about brand consistency, gentlemen. — The Editor."

Big Don nods at a chair. You sit. There's stew.`,
    editorNote:
      'I do not officially work out of Big Don\'s. Unofficially I have a chair. The chair is labeled "EDITOR" in a hand that is, of course, mine.',
    writersRoomNote:
      "WRITERS ROOM NOTE: This is the safehouse beat. We need to slip in the stew metaphor, the writers-room joke, and the first appearance of Carl-shaped paperwork on the corkboard. Do not exceed two visible jokes per paragraph.",
    choices: [
      {
        id: "to_stew",
        label: "Sit down. Have stew.",
        next: "big_dons_clarify",
      },
    ],
  },
] as const satisfies readonly Scene[];
