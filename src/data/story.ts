import { Scene } from "../types/game";

/**
 * Inventory IDs used as canonical keys; labels live in ITEM_LABELS so the UI
 * can render a friendly name. Keep these in sync with effects below.
 */
export const ITEMS = {
  damp_napkin: "damp_napkin",
  strongly_worded_letter: "strongly_worded_letter",
  old_laptop: "old_laptop",
  oxford_comma_seal: "oxford_comma_seal",
  maebies_collar: "maebies_collar",
  fire_marshal_warning: "fire_marshal_warning",
  warranty_scroll: "warranty_scroll",
  burned_plate: "burned_plate",
} as const;

export const ITEM_LABELS: Record<string, string> = {
  damp_napkin: "Damp Napkin",
  strongly_worded_letter: "Strongly Worded Letter",
  old_laptop: "Old Laptop",
  oxford_comma_seal: "Oxford Comma Seal",
  maebies_collar: "Maebie's Collar",
  fire_marshal_warning: "Fire Marshal Warning",
  warranty_scroll: "Warranty Scroll",
  burned_plate: "Burned License Plate (NEWSTRT)",
};

export const ITEM_FLAVOR: Record<string, string> = {
  damp_napkin:
    "Folded twice. Damp in the way only a napkin from a glove compartment can be.",
  strongly_worded_letter:
    "Three pages. Two of them are footnotes. The Oxford comma is correctly applied.",
  old_laptop:
    "An old laptop. Battery says 4%, has said 4% for several years now.",
  oxford_comma_seal:
    "A wax seal the color of dried oxblood, stamped with three small dots in a tidy row.",
  maebies_collar:
    "Leather, well-worn. The brass tag reads 'Maebie' in clean serif type. The spare — she's wearing the other one right now.",
  fire_marshal_warning:
    "Letterhead, watermark, and a faint smell of righteousness.",
  warranty_scroll:
    "Rolled, ribboned, and fully expired. Carl from Insurance keeps mailing them anyway.",
  burned_plate:
    "License plate, edges blackened. It reads 'NEWSTRT.' Someone is starting something.",
};

const scenes: Scene[] = [
  /* ───────────────────────── CHAPTER 1 — THE ASH WAKE ───────────────────────── */
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

  /* ───────────────────────── CHAPTER 2 — MAEBIE ───────────────────────── */
  {
    id: "maebie_1",
    title: "Home Already Knows",
    chapter: "II · Maebie",
    body: `Maebie is on the porch.

She has been waiting in the way that only dogs can wait — as if she invented patience, finds the rest of you sloppy at it, and is willing to forgive that, but only conditionally. Small. Brown. Eyebrows like a tiny accountant.

She looks at your bandage. Looks at you. Looks at the bandage again. The look says: we are going to have a conversation about this later, and you are going to lose.

She trots over and headbutts your knee, hard enough that you sit down on the step. The bandage hurts less, for no medical reason at all. You scratch behind her ear. The ear is the ear it has always been. The world, for one breath, is correct.`,
    editorNote:
      "Maebie is the emotional anchor of this story. Treat her as such. We do not ironize Maebie.",
    choices: [
      {
        id: "maebie_go_inside",
        label: "Open the door. Let her lead you in.",
        next: "maebie_collar",
      },
      {
        id: "maebie_stay_step",
        label: "Stay on the step a minute longer. Let her sit with you.",
        next: "maebie_choice",
        effects: { stats: { humanity: 1, editorApproval: 1 } },
      },
    ],
  },
  {
    id: "maebie_collar",
    title: "The Hook by the Door",
    chapter: "II · Maebie",
    body: `Inside, by the door, there is a hook with her spare collar.

Leather, well-loved, brass tag in a calm serif: MAEBIE. She nudges it with her nose, which is unmistakable — yes, take it, you keep losing things, this is not the first time we have done this.

You take it. She turns once on the kitchen rug and lies down, satisfied, in the way of a small brown dog who has, in her view, just successfully managed a person.`,
    editorNote:
      "Good serif. Solid kerning. I'd have set the tag in Caslon, but I am, as you may have noticed, particular.",
    choices: [
      {
        id: "take_collar",
        label: "Pocket the spare collar.",
        next: "maebie_choice",
        effects: {
          addItems: [ITEMS.maebies_collar],
          stats: { humanity: 2, editorApproval: 1 },
        },
      },
    ],
  },
  {
    id: "maebie_choice",
    title: "What She Means Now",
    chapter: "II · Maebie",
    body: `Maebie finds the sunbeam on the kitchen floor and settles into it like she's worked for it, which she has. The eyebrows are doing the eyebrow thing — they're judging your judgment, gently, in advance.

The thing about a partner is that they can be a weight, a comfort, or a window. Maebie is all three, in rotation.

You can decide, today, in this kitchen, which shape that partnership takes when you walk back out the door. She'll be here when you're back. She always is.`,
    editorNote:
      "Three knobs. Vengeance burns down sets I built. Protection asks me to write more children. Mystery, frankly, is the cheapest to print.",
    choices: [
      {
        id: "maebie_vengeance",
        label: "Vengeance. Someone tried to grab her leash last spring. Not twice.",
        next: "maebie_vengeance",
        effects: { stats: { heat: 2, humanity: -1, chaos: 1 } },
      },
      {
        id: "maebie_protection",
        label: "Protection. Nothing happens to her. Or to anyone else, while I'm watching.",
        next: "maebie_protection",
        effects: { stats: { humanity: 2, editorApproval: 1 } },
      },
      {
        id: "maebie_mystery",
        label: "Mystery. She knows something I don't. Follow her lead.",
        next: "maebie_mystery",
        effects: { stats: { evidence: 2, editorApproval: 1 } },
      },
    ],
  },
  {
    id: "maebie_vengeance",
    title: "A Short List",
    chapter: "II · Maebie",
    body: `You keep a short list.

Last spring a man in a windbreaker tried to grab Maebie's leash off the porch — not for keeps, just to be unpleasant. The license plate of his pickup is the first thing on the list. The second is a landlord on the next block. The third is somebody you haven't met yet.

The Editor draws a small frowning face in the margin and does not say anything else for half a page.`,
    editorNote: "Lists like this should still have an Oxford comma. Standards.",
    choices: [
      {
        id: "maebie_v_continue",
        label: "Fold the list. Keep walking.",
        next: "maebie_converge",
        effects: { setFlag: { key: "leans_vengeance", value: true } },
      },
    ],
  },
  {
    id: "maebie_protection",
    title: "A Slower Promise",
    chapter: "II · Maebie",
    body: `You don't write anything down. You just decide.

The promise lives, for now, in the way you check stairwells before strangers do, and in the way you start tipping the maintenance guys absurd amounts. You walk past a daycare and notice, for the first time, which way the exits open. They open inward.

You make a note. The note is in your head. Maebie would approve of the note, although for her all approval is conditional on belly access.`,
    editorNote:
      "Inward-opening exits are a fire-code violation in most municipalities. I'll allow it as foreshadowing.",
    choices: [
      {
        id: "maebie_p_continue",
        label: "Walk on.",
        next: "maebie_converge",
        effects: { setFlag: { key: "leans_protection", value: true } },
      },
    ],
  },
  {
    id: "maebie_mystery",
    title: "She's Sitting on Something",
    chapter: "II · Maebie",
    body: `Maebie trots over to a stack of mail on the kitchen island and sits, deliberately, on the third envelope from the top.

You ease the envelope out from underneath her. She permits it. Inside: stationery you've seen before — the porch-haunter, windbreaker, clipboard. Folded with it, a hand-drawn map and a list of three addresses, one of them too familiar.

You look at Maebie. Maebie, who has, in the way of small brown dogs, solved the case, returns to the sunbeam.`,
    editorNote:
      "Maps drawn by men in windbreakers are, in my professional view, the most useful kind of evidence. The technical term is 'we have you now.'",
    choices: [
      {
        id: "maebie_m_continue",
        label: "Pocket the map. Keep walking.",
        next: "maebie_converge",
        effects: {
          stats: { evidence: 1 },
          setFlag: { key: "leans_mystery", value: true },
        },
      },
    ],
  },
  {
    id: "maebie_converge",
    title: "Back On the Sidewalk",
    chapter: "II · Maebie",
    body: `You step out. Maebie watches from the front window, eyebrows still working.

The sidewalk does not care which knob you turned. It has its own problems — a man in a vest is putting up a fluorescent notice about parking, two birds are arguing about a fry, and somebody's HOA is making somebody else's morning worse.

You move toward the worse morning. She'll be here when you're back.`,
    editorNote:
      "Good. We are walking toward the problem. That is, technically, plot. She's pleased.",
    choices: [
      {
        id: "to_chapter_3",
        label: "Toward the HOA notice.",
        next: "public_works_1",
      },
    ],
  },

  /* ───────────────────────── CHAPTER 3 — PUBLIC WORKS ───────────────────────── */
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
        requires: { chosenCode: "never_burn_home" },
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

You feel the back of your neck warm. Not heat — recognition.`,
    editorNote:
      'Carl from Insurance signs "Best," with a comma. Use it against him.',
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
        label: "Head for Big Don's.",
        next: "big_dons_1",
      },
    ],
  },

  /* ───────────────────────── CHAPTER 4 — BIG DON'S ───────────────────────── */
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

  /* ───────────────────────── CHAPTER 5 — CARL FROM INSURANCE ───────────────────────── */
  {
    id: "carl_1",
    title: "Carl, from Insurance",
    chapter: "V · The Insurance Man",
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
    chapter: "V · The Insurance Man",
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
          setFlag: { key: "fixed_carl_comma", value: true },
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
    chapter: "V · The Insurance Man",
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
    chapter: "V · The Insurance Man",
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

  /* ───────────────────────── CHAPTER 6 — THE LINE ───────────────────────── */
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

  /* ───────────────────────── CHAPTER 7 — LEGACY WRITTEN IN ASH ───────────────────────── */
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
];

const sceneMap = new Map<string, Scene>(scenes.map((s) => [s.id, s]));

export function getScene(id: string): Scene {
  const s = sceneMap.get(id);
  if (!s) {
    // Soft fallback so a typo in a `next` doesn't brick the whole save.
    return {
      id,
      title: "Missing Page",
      chapter: "Errata",
      body: `The Editor cannot find scene "${id}". A page has, regrettably, been mislaid.`,
      editorNote:
        'When this happens in print, we set it in italics and pretend it was a stylistic choice.',
      choices: [
        {
          id: "back_to_start",
          label: "Begin again.",
          next: "ash_wake_1",
        },
      ],
    };
  }
  return s;
}

export function allScenes(): Scene[] {
  return scenes;
}

export const EDITOR_COMPLAINTS = [
  "That sentence ran a stop sign.",
  "I'd have set this paragraph in Caslon.",
  "Adjectives are not a personality.",
  "I see your comma and raise you a semicolon.",
  "Try again, but love yourself enough to use the serial comma.",
  "Brand consistency, please. We've discussed this.",
  "This is the kind of dialogue that gets blamed on a writers' room.",
  "Don't 'literally' me. I am the Editor.",
];
