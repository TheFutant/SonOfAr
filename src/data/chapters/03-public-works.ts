import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter3 = [
  {
    id: "public_works_1",
    title: "Aggressive Recycling",
    chapter: "III · Public Works",
    body: `The notice is on a fence around the kind of property that has had two coats of paint and one of them is for tax purposes.

The HOA president — let's call her Mrs. Hennings, because everyone else does, in the same tired tone — is currently fining an elderly tenant for "non-compliant trash can placement."

The trash can is, you note with professional interest, suspiciously flammable.`,
    editorNote:
      'Mrs. Hennings is a recurring antagonist class. The technical term is "tyrant, but small."',
    writersRoomNote:
      "Public Works gives the player four genuinely different solutions. Resist letting controlled fire be the obvious good choice; controlled fire should be the bad-good choice.",
    choices: [
      {
        id: "intimidate",
        label: "Stand very close to her and say nothing.",
        next: "public_intimidate",
        effects: { stats: { heat: 1, humanity: -1, chaos: 1 } },
      },
      {
        id: "investigate",
        label: "Ask the tenant if you can see her files.",
        next: "public_investigate",
        effects: { stats: { evidence: 1, editorApproval: 1 } },
      },
      {
        id: "bureaucracy",
        label: "Out-bureaucracy her.",
        next: "public_bureaucracy",
        effects: { stats: { editorApproval: 2, chaos: 1 } },
        requires: { hasItems: [ITEMS.oxford_comma_seal] },
        showIfLocked: true,
      },
      {
        id: "controlled_fire",
        label: "Use what is already there.",
        next: "public_fire",
        effects: { stats: { heat: 2, chaos: 1, humanity: -1 } },
        requires: { flag: { key: "leans_vengeance", value: true } },
        showIfLocked: true,
      },
    ],
  },
  {
    id: "public_intimidate",
    title: "Loudness Optional",
    chapter: "III · Public Works",
    body: `You stand close. Closer than is socially permitted. Not threatening — just present, the way smoke is present.

Mrs. Hennings finishes a sentence she did not intend to finish, returns the can to the tenant, and walks back to a car that costs more than the building.

The tenant looks at you the way people look at unexplained weather.`,
    editorNote:
      "Intimidation without violence is technically a literary device. Don't make me proud about it.",
    choices: [
      {
        id: "pw_continue_intimidate",
        label: "Walk on.",
        next: "public_converge",
      },
    ],
  },
  {
    id: "public_investigate",
    title: "The Tenant's Files",
    chapter: "III · Public Works",
    body: `The tenant has, in a manila folder labeled "INSURANCE — DO NOT TRUST," a stack of letters from a man named Carl.

The letters are masterpieces of polite menace. Each one cites a clause that doesn't exist. Each one is signed with a flourish.

Beneath the Carl letters: a single architectural drawing, neat, foundation-level, signed in a hand that is much, much tidier — Mason. The tenant catches your eye, says nothing, and slides the drawing back under the folder.

You feel the back of your neck warm. Not heat — recognition.`,
    editorNote:
      'Carl from Insurance signs "Best," with a comma. The other one signs his foundation drawings. Note the brothers in a list. Note the missing third. We will get there.',
    choices: [
      {
        id: "pw_take_laptop",
        label: "Take the tenant's old laptop. (She offers it.)",
        next: "public_converge",
        effects: { addItems: [ITEMS.old_laptop], stats: { evidence: 1 } },
      },
      {
        id: "pw_just_thanks",
        label: "Thank her. Leave the laptop.",
        next: "public_converge",
        effects: { stats: { humanity: 1, editorApproval: 1 } },
      },
    ],
  },
  {
    id: "public_bureaucracy",
    title: "Sanitation, With Flair",
    chapter: "III · Public Works",
    body: `You produce the Oxford Comma Seal. You produce a clipboard. You produce, from somewhere, the calm energy of a man named Glen who has worked at the county for thirty-one years.

Within an hour, Mrs. Hennings has been served with a "Notice of Improper Notice." Within two, her HOA is being audited by an entity that may or may not exist.

The tenant offers you a casserole. You decline, because casseroles, like fires, should not be borrowed.`,
    editorNote:
      "Triple paperwork is more devastating than any flame. Yes, I am the Editor and yes, I have favorites.",
    choices: [
      {
        id: "pw_take_warranty",
        label: "Accept the warranty scroll the tenant slides across the table.",
        next: "public_converge",
        effects: { addItems: [ITEMS.warranty_scroll], stats: { evidence: 1 } },
      },
    ],
  },
  {
    id: "public_fire",
    title: "What Was Already There",
    chapter: "III · Public Works",
    body: `You don't start anything. You never start anything. You only notice.

You notice that the trash can has, somehow, become full of paperwork from Mrs. Hennings's car. You notice that her car has, somehow, idled too long beside the can. You notice the can is, somehow, suspiciously flammable.

The fire, when it happens, is brief, polite, and confined to documents. The Editor, watching, makes a small unhappy sound, then a small, complicated, less unhappy one.`,
    editorNote:
      'There is always heat in the burn barrel, but borrowing it without consent is, technically, "using what is already there." Technicalities are a fire code.',
    choices: [
      {
        id: "pw_fire_continue",
        label: "Walk away before someone reads the paperwork.",
        next: "public_converge",
        effects: { stats: { heat: 1, chaos: 1 } },
      },
    ],
  },
  {
    id: "public_converge",
    title: "Off the Block",
    chapter: "III · Public Works",
    body: `Two blocks later, your hands stop shaking, mostly.

A grocery clerk you've never met salutes you. A retired postal worker tips an invisible hat. You have become, briefly, a public figure of a kind that doesn't require photos.

You should probably go somewhere they can't find you yet.`,
    editorNote:
      'Public figures of "a kind that doesn\'t require photos" is a category I made up. I encourage you to live up to it.',
    choices: [
      {
        id: "to_chapter_4",
        label: "Head for the Third Stair.",
        next: "third_stair_1",
      },
    ],
  },
] as const satisfies readonly Scene[];
