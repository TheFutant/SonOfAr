import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter1 = [
  {
    id: "ash_wake_1",
    title: "The Ash Wake",
    chapter: "I · The Ash Wake",
    body: `You wake up under a ceiling fan that is, mostly, still attached to the ceiling.

The smell is the first thing back: burnt sugar, wet drywall, and something that wants to be called rosemary but isn't. There is grit on your tongue. There is grit, of course, everywhere.

A neat handwritten note has been tucked under the cuff of your sleeve.

"You are awake. Try not to make this confusing — we are barely two paragraphs in. Punctuate yourself accordingly. — The Editor"`,
    editorNote:
      "Welcome. I am the Editor. I keep your tense consistent and your enemies plural. We will get along, or we will at least share footnotes.",
    writersRoomNote:
      "Scene 1 needs to do three jobs in three beats: orient the player, introduce the Editor, present the Hide / Investigate / Smoke fork. Resist exposition. Smoke is louder than backstory.",
    choices: [
      {
        id: "look_around",
        label: "Sit up. Take stock.",
        next: "ash_wake_2",
      },
    ],
  },
  {
    id: "ash_wake_2",
    title: "Three Directions of Smoke",
    chapter: "I · The Ash Wake",
    body: `Your right palm is bandaged. Badly. By you, probably. There is a burned smudge on the wall that almost spells a name, but you are not going to read it yet.

Three things pull at you:

— a soft column of smoke rising past the kitchen window,
— a closet you do not remember closing,
— and a smaller, more useful instinct that suggests the floor.

(The Editor has circled the comma after "closing" twice. Approvingly.)`,
    editorNote:
      "Note the serial comma above. Yes, I added it. No, we are not going to argue.",
    choices: [
      {
        id: "follow_smoke",
        label: "Follow the smoke.",
        next: "ash_wake_smoke",
        effects: { stats: { heat: 1, chaos: 1, editorApproval: 1 } },
      },
      {
        id: "investigate_closet",
        label: "Open the closet you do not remember closing.",
        next: "ash_wake_investigate",
        effects: { stats: { evidence: 1, editorApproval: 1 } },
      },
      {
        id: "hide",
        label: "Get down. Wait. Listen.",
        next: "ash_wake_hide",
        effects: { stats: { humanity: 1, editorApproval: 1 } },
      },
      {
        id: "bad_joke_1",
        label: '"Smells like… opportunity." (bad joke)',
        next: "ash_wake_2",
        effects: { stats: { chaos: 2, editorApproval: -2 } },
        tag: "bad joke",
      },
    ],
  },
  {
    id: "ash_wake_investigate",
    title: "The Closet",
    chapter: "I · The Ash Wake",
    body: `The closet door swings on a hinge that has, frankly, given up. Inside:

— a coat you do not own,
— a license plate, scorched, that reads NEWSTRT,
— and a small wax seal, oxblood-red, marked with three calm dots.

(The Editor's pen lingers near the third item. "A serial seal," she writes. "How wonderfully on-brand.")`,
    editorNote:
      "The wax seal is the Oxford Comma Seal. Use it on anything that ought to remember the third item in a list, which is everything.",
    choices: [
      {
        id: "take_things",
        label: "Take the plate and the seal.",
        next: "ash_wake_converge",
        effects: {
          addItems: [ITEMS.burned_plate, ITEMS.oxford_comma_seal],
          stats: { evidence: 1 },
        },
      },
      {
        id: "leave_things",
        label: "Touch nothing. Brand consistency demands restraint.",
        next: "ash_wake_converge",
        effects: { stats: { editorApproval: 1 } },
        tag: "brand consistency",
      },
    ],
  },
  {
    id: "ash_wake_hide",
    title: "The Floor's Counsel",
    chapter: "I · The Ash Wake",
    body: `The floor is a good listener. It tells you about three sets of footsteps that came through earlier and a fourth that did not have feet.

You hear, very faintly, the sound of a man explaining to a clipboard.

Beneath the couch you find a folded letter, headed "STRONGLY WORDED" in a font that knows what it has done.`,
    editorNote:
      "A strongly worded letter properly punctuated outweighs three weakly worded fires. I have, on occasion, settled disputes with one.",
    choices: [
      {
        id: "pocket_letter",
        label: "Pocket the letter.",
        next: "ash_wake_converge",
        effects: {
          addItems: [ITEMS.strongly_worded_letter],
          stats: { evidence: 1, humanity: 1 },
        },
      },
      {
        id: "leave_letter",
        label: "Leave it. Some letters are bait.",
        next: "ash_wake_converge",
        effects: { stats: { editorApproval: 1 } },
      },
    ],
  },
  {
    id: "ash_wake_smoke",
    title: "Smoke, but Polite",
    chapter: "I · The Ash Wake",
    body: `Smoke that knows what it's doing rises in a neat column from a trash can on the curb — one of those municipal ones with the small, suspiciously friendly slot on top.

You think, almost without permission: that can looks flammable. That can has always looked flammable.

There's a damp napkin folded next to it. Someone, sometime, was prepared.`,
    editorNote:
      "Suspiciously flammable trash cans are a recurring motif. Take the napkin; we may need to dab.",
    choices: [
      {
        id: "take_napkin",
        label: "Take the damp napkin.",
        next: "ash_wake_converge",
        effects: { addItems: [ITEMS.damp_napkin], stats: { humanity: 1 } },
      },
      {
        id: "ignore_can",
        label: "Walk on. The can did not start it.",
        next: "ash_wake_converge",
        effects: { stats: { heat: 1, editorApproval: 1 } },
      },
    ],
  },
  {
    id: "ash_wake_converge",
    title: "On the Walk Home",
    chapter: "I · The Ash Wake",
    body: `You walk a long block. The sky has that brushed-aluminum look it gets after fires that nobody is going to write a report about.

A child on a tricycle stares at your bandage. You stare back, professionally.

Three streets over, a dog barks. Not a warning bark. A welcome bark. Familiar. You start walking faster, because she does not bark twice for no reason and you have been gone a few days too long.`,
    editorNote:
      "The bark belongs to Maebie. She is on the porch, she has opinions, and she is going to ask, with her eyebrows, where you've been.",
    choices: [
      {
        id: "to_chapter_2",
        label: "Keep walking.",
        next: "maebie_1",
      },
    ],
  },
] as const satisfies readonly Scene[];
