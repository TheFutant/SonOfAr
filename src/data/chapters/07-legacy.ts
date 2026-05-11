import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter7 = [
  {
    id: "legacy_1",
    title: "Legacy Written in Ash",
    chapter: "VII · Legacy Written in Ash",
    body: `By morning, three things are true:

— Carl from Insurance has filed something somewhere,
— Mrs. Hennings is no longer the president of anything,
— and somebody is going to remember how this ends.

You stand at the edge of a quiet block. There's a burned plate on the curb. There's a dog, three streets over, barking at nothing in particular. There's a stew, by now, somewhere reaching a tender point.

Legacy is written in ash. Blood remembers. Destiny endures. Pick the line, and walk it.`,
    editorNote:
      "Four roads forward. Each one is honest. None of them is clean. Choose the one your code can live with.",
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
] as const satisfies readonly Scene[];
