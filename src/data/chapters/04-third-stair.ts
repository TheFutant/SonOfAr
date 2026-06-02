import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

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
        id: "maebie_hackles",
        label: "Maebie's hackles rise. She's locked onto the third staircase.",
        next: "stair_maebie_knows",
      },
      {
        id: "plan_the_drive",
        label: "Take the hand-drawn map with three addresses off the corkboard.",
        next: "drive_hub",
        tag: "optional detour",
      },
      {
        id: "lie_down_cot",
        label: "There's a cot. You haven't slept in three days. Lie down.",
        next: "stair_dream",
        effects: { stats: { humanity: 1 } },
      },
      {
        id: "sit_for_stew",
        label: "Sit. There is, somehow, stew.",
        next: "third_stair_stew",
      },
    ],
  },
  {
    id: "stair_maebie_knows",
    title: "Maebie Knows the Room",
    chapter: "IV · The Third Stair",
    body: `Maebie does not bark. Barking is for problems she thinks you can handle on your own.

This is the other thing — the low, still, full-body attention she does maybe three times a year. She is pointed at the third staircase, the one the locals can't agree goes up. The fur along her spine has an opinion. Her eyebrows have escalated to management.

You follow where she's looking instead of where you'd look, which is the entire trick of trusting a dog. Under the bottom step, behind a loose riser no human eye would have flagged, there's a hook. On the hook: a faded red bandana, soft from washing, and a battered tin labelled FOR AFTER.

She found them the way she finds everything — before you knew they were lost. She sits, pleased, and accepts the bandana being tied back on as her rightful tribute.`,
    editorNote:
      "Maebie reveals hidden things without speaking, which is more than I can say for most of my authors. Note: the tin is for you. The bandana is hers. Do not, I beg you, confuse the protocol.",
    writersRoomNote:
      "Scene F: 'Maebie Knows the Room.' Companion-as-danger-sensor used gently — a discovery, not a threat. Grants the bandana and chocolate and sets maebie_trust. Returns to the hub so it stays optional.",
    onEnter: {
      addItems: [ITEMS.maebie_bandana, ITEMS.emergency_chocolate],
    },
    choices: [
      {
        id: "maebie_knows_back",
        label: "Tie the bandana back on. Pocket the tin. Tell her she's the senior partner.",
        next: "third_stair_corkboards",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [{ key: "maebie_trust", value: true }],
        },
      },
    ],
  },
  {
    id: "stair_dream",
    title: "The Pest-Control Prophecy",
    chapter: "IV · The Third Stair",
    body: `You sleep, which is to say you fall sideways into a dream that has clearly been waiting for the cot to open up.

In it, you are younger, or someone is, standing in a yard in front of a house that hasn't been built yet. A man in a company polo and a clipboard is doing something oddly specific to the foundation — not pest control, exactly, more like he's checking the house against a list only he can see. His van says SIDE QUEST COORDINATOR where a phone number should be.

"You're early," he tells you, not unkindly, spraying nothing at the base of a wall. "The third thing always thinks it's early. Tell the dog I said the floor's fine. The floor is the only part of this I can guarantee."

Maebie, in the dream, will not enter the yard. She stands at the property line with her ears flat, telling you something the dream is too polite to subtitle.`,
    editorNote:
      "I have read this dream four times and I still don't know if it's foreshadowing or a man doing his job. That is, I'm told, the correct amount to know about a prophecy.",
    writersRoomNote:
      "Scene H: 'The Pest-Control Prophecy.' The optional absurd side quest. Deliberately weird, short, low-literal. Maebie refusing the yard is the only real signal. Leads into the Editor Objects beat.",
    choices: [
      {
        id: "dream_press",
        label: "\"What's the third thing? What floor? Coordinator of WHAT?\"",
        next: "stair_editor_objects",
        effects: {
          stats: { chaos: 1, evidence: 1 },
          setFlags: [{ key: "saw_the_prophecy", value: true }],
        },
      },
      {
        id: "dream_dog",
        label: "Cross to the property line. Stand with Maebie instead.",
        next: "stair_editor_objects",
        effects: {
          stats: { humanity: 1 },
          setFlags: [
            { key: "saw_the_prophecy", value: true },
            { key: "maebie_trust", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "stair_editor_objects",
    title: "The Editor Objects",
    chapter: "IV · The Third Stair",
    body: `"No," says the Editor, and the dream stops like a film hitting a splice.

She is standing in the yard now, in the dream, holding the dream the way you'd hold a manuscript that has gotten ideas above its station. The pest-control man freezes mid-spray, politely.

"A prophetic handyman is fine. A prophetic handyman whose van spells out the metaphor is a man yelling 'I AM A SYMBOL' at a reader who was, until two seconds ago, having a nice time. We do not do that here." She taps the van. The lettering blurs, tactfully, into an ordinary smudged phone number. "Better. Let them wonder. Wondering is the rent they pay to stay in the story."

She turns to you. "You can keep the floor line. The floor line is earned. Now wake up; there's stew, and I refuse to let it get a skin on it for the sake of your subconscious."`,
    editorNote:
      "Symbolism is salt. The amount that makes the dish is a tenth of the amount that announces itself. I edit dreams too. Somebody has to.",
    writersRoomNote:
      "Scene I: 'The Editor Objects.' The Editor breaks in when symbolism gets too on-the-nose — a meta-joke that also enforces the project's own style rule (don't over-explain symbols). Returns to the hub.",
    choices: [
      {
        id: "editor_objects_wake",
        label: "Wake up. Concede the point. The floor line stays.",
        next: "third_stair_corkboards",
        effects: { stats: { editorApproval: 2 } },
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
