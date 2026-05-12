import type { Scene } from "../../types/game";

export const chapter4 = [
  {
    id: "third_stair_1",
    title: "The Third Stair",
    chapter: "IV · The Third Stair",
    body: `Off a road that has been a road since before the road had a name, there is a cabin.

It has been added to, acre by acre, for what is either decades or a more impolite stretch of time. The roofs do not entirely agree with each other. The sides are clapboard, then stone, then clapboard again. From the front yard you can count three chimneys, none of which is currently emitting smoke and one of which is, apparently, decorative.

A small hand-lettered sign, weather-bleached but legible, reads: THE THIRD STAIR. Below it, in a hand that is more recent and more particular about typography: PLEASE WIPE YOUR FEET. PLEASE WIPE YOUR INTENT.`,
    editorNote:
      "I have a chair here. The chair is upstairs, on the floor with the staircases. You'll get to that. Keep walking.",
    choices: [
      {
        id: "ask_about_stairs",
        label: '"Why is it called the Third Stair?"',
        next: "third_stair_lore",
        effects: { stats: { chaos: 1 } },
      },
      {
        id: "enter_cabin",
        label: "Wipe your feet. Wipe your intent. Walk in.",
        next: "third_stair_corkboards",
      },
    ],
  },
  {
    id: "third_stair_lore",
    title: "Counted Wrong, On Purpose",
    chapter: "IV · The Third Stair",
    body: `Nobody who lives nearby will give you a straight answer about The Third Stair.

The most consistent version is this: somewhere on the top floor, there are three staircases. Some accounts say two of them go up, and one of them goes somewhere else. Some accounts say all three lead to the same room, which has, in the way of these places, three doors. New visitors have been known to start counting and lose track at the second one.

Locals will tell you the cabin has been added to "in pieces" by people who passed through and felt like building a corner. Nobody appears to be in charge. Somebody is clearly keeping the floors swept.`,
    editorNote:
      "Three staircases on the top floor is either symbolism or a contractor with unresolved issues. I have, for the record, decided not to choose.",
    choices: [
      {
        id: "lore_accept",
        label: "Accept that you will not be told.",
        next: "third_stair_corkboards",
        effects: { stats: { editorApproval: 1, chaos: -1 } },
      },
    ],
  },
  {
    id: "third_stair_corkboards",
    title: "Inside the Cabin",
    chapter: "IV · The Third Stair",
    body: `Inside, three things become apparent at once.

The first is the corkboards — four of them, around a room that smells of old paper and good thread. Pinned across them: timelines, photographs, a hand-drawn map with three addresses, and a paper diagram of three particles in a calm committee arrangement, signed P. in a quiet corner.

The second is the whiteboard, on which someone has written THE WRITERS ROOM in confident block capitals, then underlined it twice, then underlined it a third time at a slightly different angle, like a person mid-thought.

The third is the chair in the corner. It is wooden. It is plain. It has been labelled EDITOR in calm serif type on a brass plate. It has been polished, recently, by no one you can see.`,
    editorNote:
      'The chair is mine. The brass plate is mine. The polish is, regrettably, also mine. We are working on delegation.',
    writersRoomNote:
      "Third Stair becomes the writers'-room/safehouse beat. Sister Pearson's diagram pinned here is a soft forward reference — players who haven't met her yet will recognize it later; players who have will feel the loop closing.",
    choices: [
      {
        id: "sit_for_stew",
        label: "Sit. There is, somehow, stew.",
        next: "third_stair_stew",
      },
    ],
  },
  {
    id: "third_stair_stew",
    title: "The Stew",
    chapter: "IV · The Third Stair",
    body: `A bowl is on the small table beside the Editor's chair. You did not see anyone put it there. The bowl is warm. The spoon is heavier than it has any right to be.

A small typewritten card has been left beside the bowl. It reads:

"Every story I ever heard about you went into the pot. Some of it boiled out. Some of it caramelized at the bottom. That's where the lore lives. The recipe gets written down last."

You look up at the staircases — there are, in this light, three of them, or possibly two, or possibly one being shy. None of them invite you up yet.`,
    editorNote:
      "Worldbuilding is a stew. You keep the bones. You add what you can spare. You write the recipe last. I left the card. I am not, today, going to admit which staircase is mine.",
    choices: [
      {
        id: "eat_stew",
        label: "Eat the stew.",
        next: "three_marks_path",
        effects: { stats: { humanity: 1, editorApproval: 1 } },
      },
      {
        id: "decline_stew",
        label: "Decline. Politely. Leave the spoon where it is.",
        next: "three_marks_path",
        effects: { stats: { chaos: 1, editorApproval: -1 } },
      },
    ],
  },
] as const satisfies readonly Scene[];
