import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter9 = [
  {
    id: "legacy_1",
    title: "Legacy Written in Ash",
    chapter: "IX · Legacy Written in Ash",
    body: `By morning, three things are true:

— Carl from Insurance has filed something somewhere,
— Mrs. Hennings is no longer the president of anything,
— and somebody is going to remember how this ends.

You stand at the edge of a quiet block. There's a burned plate on the curb. There's a dog, three streets over, barking at nothing in particular. There's a stew, by now, somewhere reaching a tender point.

Legacy is written in ash. Blood remembers. Destiny endures. Pick the line, and walk it.`,
    editorNote:
      "The roads forward have multiplied since we last counted. Some of them only open if someone bothered to read the room. Each is honest. None of them is clean. Choose the one your code can live with.",
    choices: [
      {
        id: "end_myth",
        label: "Disappear. Let the story do the work.",
        next: "ending_myth",
        requires: { minStats: { heat: 2, chaos: 2 } },
        showIfLocked: true,
      },
      {
        id: "end_two_of_them",
        label: "Pocket the spare collar. Go home to her.",
        next: "ending_two_of_them",
        requires: { hasItems: [ITEMS.maebies_collar] },
        showIfLocked: true,
      },
      {
        id: "end_servant",
        label: "Sign on. Officially. Sanitation, with flair.",
        next: "ending_servant",
        requires: { minStats: { humanity: 2, editorApproval: 2 } },
        showIfLocked: true,
      },
      {
        id: "end_rain",
        label: "Let her bring the rain. Let it do the telling.",
        next: "ending_rain",
        requires: {
          flag: { key: "ranya_trust_high", value: true },
          minStats: { humanity: 2 },
        },
        showIfLocked: true,
      },
      {
        id: "end_editor",
        label: "Hand the manuscript back. Let the Editor close it.",
        next: "ending_editor",
        requires: {
          flag: { key: "saved_the_story", value: true },
          minStats: { editorApproval: 4 },
        },
        showIfLocked: true,
      },
      {
        id: "end_monster",
        label: "Become the thing he warned you about.",
        next: "ending_monster",
        requires: {
          flag: { key: "mason_sees_lost", value: true },
          minStats: { heat: 4 },
          maxStats: { humanity: 0 },
        },
        showIfLocked: true,
      },
      {
        id: "end_man",
        label: "Put the matches down. Be a person about it. All the way down.",
        next: "ending_man",
        requires: { minStats: { humanity: 4 }, maxStats: { heat: 3 } },
        showIfLocked: true,
      },
      {
        id: "end_reason",
        label: "Stand witness while Pearson becomes Reason. Decide what that costs.",
        next: "ending_reason",
        requires: { flag: { key: "pearson_insight", value: true } },
        showIfLocked: true,
      },
      {
        id: "end_carl",
        label: "Sign Carl's paperwork. Walk into the office.",
        next: "ending_carl",
      },
    ],
  },
  {
    id: "ending_myth",
    title: "The Myth of Ar",
    chapter: "Ending · The Myth of Ar",
    body: `You disappear the way smoke disappears: methodically, in upward stages.

People you have never met will tell stories about you for years. Some of them will be true. The true ones will sound the most made-up.

A burned license plate reading NEWSTRT is found, sometime later, on a dock somewhere. There is no boat.

The Editor leaves a final margin note in the file. It reads, simply: "Set in Caslon, please."`,
    editorNote:
      "Myth is what survives when the man stops correcting his own legend. I'll miss correcting yours.",
    isEnding: true,
    endingId: "myth_of_ar",
    onEnter: { unlockEnding: "myth_of_ar" },
    choices: [
      {
        id: "myth_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_two_of_them",
    title: "The Two of Them",
    chapter: "Ending · The Two of Them",
    body: `You pocket the spare collar and you go home.

The man named Arson is, today, retired. You open a hardware store on a corner where two streets used to be one, and call it Maebie & Co. because she is the more reliable partner and you wanted that on the sign. From then on every hallway in the neighborhood opens outward. The shop bell chimes in something just shy of a perfect fifth, because Maebie startles at major thirds and the Editor has notes.

She has a dog bed by the register. She has opinions. She has the better collar. A small brown dog with serious eyebrows naps in your sunbeam, occasionally, when the sunbeam is correctly placed. She approves. She always did.`,
    editorNote:
      "Partnership is, structurally, also a redemption arc. I'll allow it. Note that 'Maebie & Co.' is, technically, an Oxford-comma-compliant business name. Carry on.",
    isEnding: true,
    endingId: "two_of_them",
    onEnter: { unlockEnding: "two_of_them" },
    choices: [
      {
        id: "two_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_servant",
    title: "Public Servant of Fire",
    chapter: "Ending · Public Servant of Fire",
    body: `You take the job. There is, somehow, a job.

Your business card reads: SANITATION (WITH FLAIR). Your office is, in practice, three corkboards and a stew pot. The Fire Marshal becomes, in time, your most devoted pen pal. Carl from Insurance is rotated quietly out of town, into a posture-corrective seminar from which he will, mostly, return.

There is always heat in the burn barrel. You use it on paperwork, which is, of all the things to burn, the only one I formally endorse.`,
    editorNote:
      "Pro tip: public service is dramatic when the audience is correct. Yours is.",
    isEnding: true,
    endingId: "public_servant_of_fire",
    onEnter: { unlockEnding: "public_servant_of_fire" },
    choices: [
      {
        id: "servant_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_rain",
    title: "Rain Reveals",
    chapter: "Ending · Rain Reveals",
    body: `It rains.

Not on you. Near you. On the flat field of ash where the third name was, and the third name was, in the rain's careful telling, never yours — it was a name someone burned into the list so that you would walk into a room and answer to it.

You don't.

Ranya lowers her hand. The rain stops. The truth stays out, like a stone you can't put back. Mason reads it from a distance, and his face does the small private thing his sister's face does, and he closes his book.

You don't disappear. You don't burn a building down. You don't sign a thing. You walk away with a woman who reads what fire was too proud to say, and the story, for once, is told by the rain.`,
    editorNote:
      "Fire remembers. Rain reveals. Print that on the back of the cover. We can argue about font later. (Caslon. Obviously Caslon.)",
    isEnding: true,
    endingId: "rain_reveals",
    onEnter: { unlockEnding: "rain_reveals" },
    choices: [
      {
        id: "rain_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_editor",
    title: "The Editor's Ending",
    chapter: "Ending · The Editor's Ending",
    body: `You hand her the manuscript. You do not say "manuscript." You say, "Take it." She takes it.

The Editor sets it on the table at the Third Stair, three staircases above her chair, and reads it once, slowly, in the way only people who actually love what they're protecting can read.

She makes seven margin notes. She fixes two commas. She lets one joke stand that she should have cut, because the joke meant something the writer didn't know he meant.

She closes the file.

You live. The story lives. They live, frankly, longer than either of you would have expected.

Somewhere, in a different file, on a different desk, somebody writes, simply, in calm serif type: "Set in Caslon, please."`,
    editorNote:
      "Stories survive when someone cares enough to revise them. Not rewrite. Revise. There is a difference. I have, today, made it.",
    isEnding: true,
    endingId: "editors_ending",
    onEnter: { unlockEnding: "editors_ending" },
    choices: [
      {
        id: "editor_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_monster",
    title: "The Monster",
    chapter: "Ending · The Monster",
    body: `Mason told you, once, on a broken column at a fork in a road, that fire without structure is destruction.

You decide, today, that he was right about the noun and wrong about whether it's a problem.

You burn a thing that did not need burning. Then another. Then the third one, because three is the number that makes a pattern, and you wanted a pattern. The block remembers. The next block hears about it. Carl from Insurance, somewhere in his neat little office, opens a new folder with your name on the tab and goes home, on time, smiling.

The Editor stops correcting you. That is the worst thing that happens to you, and you will not realize it for years.`,
    editorNote:
      "I do not, today, have a margin note. That is also a margin note.",
    isEnding: true,
    endingId: "the_monster",
    onEnter: { unlockEnding: "the_monster" },
    choices: [
      {
        id: "monster_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_carl",
    title: "Carl from Insurance Wins",
    chapter: "Ending · Carl from Insurance Wins",
    body: `You sign.

You shouldn't have. The form had a missing comma in a list of three. You knew. You signed anyway.

Carl smiles, neatly, and offers you a windbreaker. The windbreaker fits, which is the most disappointing thing that happens to you all year.

In a margin somewhere, the Editor is, for the first time, silent.`,
    editorNote: "We do not, under any circumstances, sign a list of three without the comma. We just learned this. Try again.",
    isEnding: true,
    endingId: "carl_wins",
    onEnter: { unlockEnding: "carl_wins" },
    choices: [
      {
        id: "carl_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_man",
    title: "The Man",
    chapter: "Ending · The Man",
    body: `You put the matches down. Not dramatically. You just set them on a windowsill and leave them there, the way you'd leave a habit you've decided to outlive.

It turns out a man is harder to be than a myth. A myth doesn't have to apologize to a widow, or learn a neighbor's name, or sit through the long unglamorous middle of being trusted again. You do all of it, badly at first, then less badly. Maebie supervises. The bandana fades further. The tin of chocolate gets refilled, which is its own quiet proof that there keep being afters worth recovering from.

You never fully stop being the man who notices that things are flammable. You just stop being only that. Mason hears, eventually, and does not write to say he was wrong, but he leaves a door propped where there used to be a wall.

The Editor writes one line and underlines it once, gently, like she means it: "He chose the third thing. He chose to stay."`,
    editorNote:
      "The Man is the hardest ending to write because nothing explodes. Connection over legend, person over symbol. I am, for the record, proud of you, and I will deny having said so in any subsequent edition.",
    isEnding: true,
    endingId: "the_man",
    onEnter: { unlockEnding: "the_man" },
    choices: [
      {
        id: "man_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
  {
    id: "ending_reason",
    title: "Reason Remains",
    chapter: "Ending · Reason Remains",
    body: `You don't leave. You stay, at the edge of the square, and you watch the myth finish closing over your sister like water over a stone.

By winter, no one calls her Pearson. They come from three towns over to stand at her plain table and be told the cold true thing. She is fair. She is, by every account, scrupulously, frighteningly fair — a godlike quiet that does not need a throne, only the arithmetic and the nerve to read it aloud.

Whether that is mercy or vengeance depends, in the end, on what you taught her was allowed. You were the one who kept saying her name. You were the one in the room when fairness cost something and someone had to decide whether kindness was permitted around its edges.

Reason remains. She always will, now. The only question the story leaves open — the one the Editor refuses to answer in the margin, for once — is whether the world got a judge, or got a god, and whether you can still tell the difference between the two from where you're standing.`,
    editorNote:
      "Pearson is a person. Reason is what happens when people stop treating her like one. I am not going to tell you whether this ending is hopeful. You were there. You decide. That's the whole point of letting you hold the pen.",
    isEnding: true,
    endingId: "reason_remains",
    onEnter: { unlockEnding: "reason_remains" },
    choices: [
      {
        id: "reason_to_title",
        label: "Roll credits.",
        next: "ash_wake_1",
      },
    ],
  },
] as const satisfies readonly Scene[];
