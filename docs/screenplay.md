# Son of Ar — Screenplay

**Compiled for editorial review.**

_70 scenes · 10 acts (9 on the main line + 1 optional detour) · 9 endings · 20 catalogued items._
_Generated from the canonical story data in `src/data/` by `scripts/build-screenplay.ts` — run `npm run screenplay` to refresh. Do not hand-edit; edit the chapter files and regenerate._

> **How to read this.** Son of Ar is branching interactive fiction, so this
> manuscript flattens the story into authoring order rather than one linear
> path. Each scene is numbered **§N**; every choice names the scene it leads
> to (**→ §M**), so any branch can be traced. The prose is the scene as the
> player reads it. Everything else is annotation, set off from the prose:
>
> - **EDITOR** notes are the in-story Editor's margin commentary (these ship in the game).
> - **WRITERS' ROOM** notes are the normally-hidden craft/intent notes.
> - **↳ fx / needs / tag** lines under a choice are game mechanics: stat changes, gating conditions, flags set, and items gained or lost.

> **Stats** (shown as `fx` deltas, clamped to [−10, +20]): Heat (HT) · Humanity (HU) · Evidence (EV) · Chaos (CH) · Editor (ED).
> **Vows** a player may swear, each gating later branches: “Never start the fire.” · “Never burn a home with people inside.” · “Never punish without proof.” · “Never let garbage hide behind paperwork.”.

---

## Contents

1. **Cold Open — The Prologue** (6 panels)
1. **Act I · The Ash Wake** — §1–§6 (6 scenes)
1. **Act II · Maebie** — §7–§13 (7 scenes)
1. **Act III · Public Works** — §14–§19 (6 scenes)
1. **Act IV · The Third Stair** — §20–§26 (7 scenes)
1. **Act V · Three Marks** — §27–§34 (8 scenes)
1. **Act VI · The Mire** — §35–§43 (9 scenes)
1. **Act VII · The Insurance Man** — §44–§47 (4 scenes)
1. **Act VIII · The Line** — §48 (1 scene)
1. **Act IX · Legacy Written in Ash** — §49–§58 (10 scenes)
1. **Detour · The Drive** — §59–§70 (12 scenes) — _optional detour_
1. **Appendix A · The Inventory** — 20 items
1. **Appendix B · The Endings** — 9 endings, and how each is reached
1. **Appendix C · The Editor's Standing Complaints** — 18 margin barbs

---

## Cold Open — The Prologue

_A skippable typographic "comic" that runs once before a new game; replayable from the title screen. Story-as-data, like the scenes — panels live in `src/data/prologue.ts`._

**Panel 1 — ASH.**

> A town wakes smelling of burnt sugar and wet drywall and something that wants to be rosemary but isn't. It has smelled this way before.

_[Panel art: `prologue/p1-ash.webp` — A burned-out small-town street at dusk, smoke rising from the houses and a faint ember glow on the horizon.]_

**Panel 2 — YOU.**

> You come to under a ceiling fan that is, mostly, still attached to the ceiling. Your right palm is bandaged. Badly. By you, probably.

_[Panel art: `prologue/p2-you.webp` — A man slumped on a wrecked floor seen from above, a crooked ceiling fan overhead, one hand reaching toward the viewer.]_

**Panel 3**

> A note is tucked in your cuff, in a hand that punctuates like it means it:
> 
> “You are awake. Try not to make this confusing — we are barely two paragraphs in.”
> 
> _— The Editor_

_[Panel art: `prologue/p3-note.webp` — A folded paper note tucked into a frayed, soot-darkened shirt cuff, lit warm against the dark, its markings illegible.]_

**Panel 4 — THREE COLUMNS OF SMOKE.**

> One past the kitchen window. A closet you don't remember closing. And the floor, which has opinions about where you should be.

_[Panel art: `prologue/p4-smoke.webp` — A dark room with three separate columns of smoke rising — past a window, from a closet door, and from the floor.]_

**Panel 5**

> There's a smudge on the wall that almost spells a name. You're not going to read it yet. Three streets over, a dog you'd burn the world to keep is barking at nothing in particular. Her name is Maebie.

_[Panel art: `prologue/p5-name.webp` — A scorched wall bearing an unreadable mark; beyond it, a brown pit bull mix stands alert in a burned street.]_

**Panel 6 — PUNCTUATE YOURSELF ACCORDINGLY.**

> He never starts the fire. He only uses what is already there.

_[Panel art: `prologue/p6-punctuate.webp` — A man silhouetted from behind in a doorway, facing a town already on fire ahead of him.]_

---

## Act I · The Ash Wake

_Scenes §1–§6._

### §1 · The Ash Wake
<sub>`ash_wake_1`</sub>

You wake up under a ceiling fan that is, mostly, still attached to the ceiling.

The smell is the first thing back: burnt sugar, wet drywall, and something that wants to be called rosemary but isn't. There is grit on your tongue. There is grit, of course, everywhere.

A neat handwritten note has been tucked under the cuff of your sleeve.

"You are awake. Try not to make this confusing — we are barely two paragraphs in. Punctuate yourself accordingly. — The Editor"

> **EDITOR.** Welcome. I am the Editor. I keep your tense consistent and your enemies plural. We will get along, or we will at least share footnotes.

> **WRITERS' ROOM.** Scene 1 needs to do three jobs in three beats: orient the player, introduce the Editor, present the Hide / Investigate / Smoke fork. Resist exposition. Smoke is louder than backstory.

**Choices**

- **Sit up. Take stock.** → §2 · *Three Directions of Smoke*

### §2 · Three Directions of Smoke
<sub>`ash_wake_2`</sub>

Your right palm is bandaged. Badly. By you, probably. There is a burned smudge on the wall that almost spells a name, but you are not going to read it yet.

Three things pull at you:

— a soft column of smoke rising past the kitchen window,  
— a closet you do not remember closing,  
— and a smaller, more useful instinct that suggests the floor.

(The Editor has circled the comma after "closing" twice. Approvingly.)

> **EDITOR.** Note the serial comma above. Yes, I added it. No, we are not going to argue.

**Choices**

- **Follow the smoke.** → §5 · *Smoke, but Polite*
  ↳ fx: Heat +1, Chaos +1, Editor +1
- **Open the closet you do not remember closing.** → §3 · *The Closet*
  ↳ fx: Evidence +1, Editor +1
- **Get down. Wait. Listen.** → §4 · *The Floor's Counsel*
  ↳ fx: Humanity +1, Editor +1
- **"Smells like… opportunity." (bad joke)** → _(stays on this scene)_
  ↳ fx: Chaos +2, Editor -2 · tag: _bad joke_

### §3 · The Closet
<sub>`ash_wake_investigate`</sub>

The closet door swings on a hinge that has, frankly, given up. Inside:

— a coat you do not own,  
— a license plate, scorched, that reads NEWSTRT,  
— and a small wax seal, oxblood-red, marked with three calm dots.

(The Editor's pen lingers near the third item. "A serial seal," she writes. "How wonderfully on-brand.")

> **EDITOR.** The wax seal is the Oxford Comma Seal. Use it on anything that ought to remember the third item in a list, which is everything.

**Choices**

- **Take the plate and the seal.** → §6 · *On the Walk Home*
  ↳ fx: Evidence +1, +Burned License Plate (NEWSTRT), +Oxford Comma Seal
- **Touch nothing. Brand consistency demands restraint.** → §6 · *On the Walk Home*
  ↳ fx: Editor +1 · tag: _brand consistency_

### §4 · The Floor's Counsel
<sub>`ash_wake_hide`</sub>

The floor is a good listener. It tells you about three sets of footsteps that came through earlier and a fourth that did not have feet.

You hear, very faintly, the sound of a man explaining to a clipboard.

Beneath the couch you find a folded letter, headed "STRONGLY WORDED" in a font that knows what it has done.

> **EDITOR.** A strongly worded letter properly punctuated outweighs three weakly worded fires. I have, on occasion, settled disputes with one.

**Choices**

- **Pocket the letter.** → §6 · *On the Walk Home*
  ↳ fx: Humanity +1, Evidence +1, +Strongly Worded Letter
- **Leave it. Some letters are bait.** → §6 · *On the Walk Home*
  ↳ fx: Editor +1

### §5 · Smoke, but Polite
<sub>`ash_wake_smoke`</sub>

Smoke that knows what it's doing rises in a neat column from a trash can on the curb — one of those municipal ones with the small, suspiciously friendly slot on top.

You think, almost without permission: that can looks flammable. That can has always looked flammable.

There's a damp napkin folded next to it. Someone, sometime, was prepared.

> **EDITOR.** Suspiciously flammable trash cans are a recurring motif. Take the napkin; we may need to dab.

**Choices**

- **Take the damp napkin.** → §6 · *On the Walk Home*
  ↳ fx: Humanity +1, +Damp Napkin
- **Walk on. The can did not start it.** → §6 · *On the Walk Home*
  ↳ fx: Heat +1, Editor +1

### §6 · On the Walk Home
<sub>`ash_wake_converge`</sub>

You walk a long block. The sky has that brushed-aluminum look it gets after fires that nobody is going to write a report about.

A child on a tricycle stares at your bandage. You stare back, professionally.

Three streets over, a dog barks. Not a warning bark. A welcome bark. Familiar. You start walking faster, because she does not bark twice for no reason and you have been gone a few days too long.

> **EDITOR.** The bark belongs to Maebie. She is on the porch, she has opinions, and she is going to ask, with her eyebrows, where you've been.

**Choices**

- **Keep walking.** → §7 · *Home Already Knows*

---

## Act II · Maebie

_Scenes §7–§13._

### §7 · Home Already Knows
<sub>`maebie_1`</sub>

Maebie is on the porch.

She has been waiting in the way that only dogs can wait — as if she invented patience, finds the rest of you sloppy at it, and is willing to forgive that, but only conditionally. Small. Brown. Eyebrows like a tiny accountant.

She looks at your bandage. Looks at you. Looks at the bandage again. The look says: we are going to have a conversation about this later, and you are going to lose.

She trots over and headbutts your knee, hard enough that you sit down on the step. The bandage hurts less, for no medical reason at all. You scratch behind her ear. The ear is the ear it has always been. The world, for one breath, is correct.

> **EDITOR.** Maebie is the emotional anchor of this story. Treat her as such. We do not ironize Maebie.

**Choices**

- **Open the door. Let her lead you in.** → §8 · *The Hook by the Door*
- **Stay on the step a minute longer. Let her sit with you.** → §9 · *What She Means Now*
  ↳ fx: Humanity +1, Editor +1

### §8 · The Hook by the Door
<sub>`maebie_collar`</sub>

Inside, by the door, there is a hook with her spare collar.

Leather, well-loved, brass tag in a calm serif: MAEBIE. She nudges it with her nose, which is unmistakable — yes, take it, you keep losing things, this is not the first time we have done this.

You take it. She turns once on the kitchen rug and lies down, satisfied, in the way of a small brown dog who has, in her view, just successfully managed a person.

> **EDITOR.** Good serif. Solid kerning. I'd have set the tag in Caslon, but I am, as you may have noticed, particular.

**Choices**

- **Pocket the spare collar.** → §9 · *What She Means Now*
  ↳ fx: Humanity +2, Editor +1, +Maebie's Collar

### §9 · What She Means Now
<sub>`maebie_choice`</sub>

Maebie finds the sunbeam on the kitchen floor and settles into it like she's worked for it, which she has. The eyebrows are doing the eyebrow thing — they're judging your judgment, gently, in advance.

The thing about a partner is that they can be a weight, a comfort, or a window. Maebie is all three, in rotation.

You can decide, today, in this kitchen, which shape that partnership takes when you walk back out the door. She'll be here when you're back. She always is.

> **EDITOR.** Three knobs. Vengeance burns down sets I built. Protection asks me to write more children. Mystery, frankly, is the cheapest to print.

**Choices**

- **Vengeance. Someone tried to grab her leash last spring. Not twice.** → §10 · *A Short List*
  ↳ fx: Heat +2, Humanity -1, Chaos +1
- **Protection. Nothing happens to her. Or to anyone else, while I'm watching.** → §11 · *A Slower Promise*
  ↳ fx: Humanity +2, Editor +1
- **Mystery. She knows something I don't. Follow her lead.** → §12 · *She's Sitting on Something*
  ↳ fx: Evidence +2, Editor +1

### §10 · A Short List
<sub>`maebie_vengeance`</sub>

You keep a short list.

Last spring a man in a windbreaker tried to grab Maebie's leash off the porch — not for keeps, just to be unpleasant. The license plate of his pickup is the first thing on the list. The second is a landlord on the next block. The third is somebody you haven't met yet.

The Editor draws a small frowning face in the margin and does not say anything else for half a page.

> **EDITOR.** Lists like this should still have an Oxford comma. Standards.

**Choices**

- **Fold the list. Keep walking.** → §13 · *Back On the Sidewalk*
  ↳ fx: flag `leans_vengeance` → true

### §11 · A Slower Promise
<sub>`maebie_protection`</sub>

You don't write anything down. You just decide.

The promise lives, for now, in the way you check stairwells before strangers do, and in the way you start tipping the maintenance guys absurd amounts. You walk past a daycare and notice, for the first time, which way the exits open. They open inward.

You make a note. The note is in your head. Maebie would approve of the note, although for her all approval is conditional on belly access.

> **EDITOR.** Inward-opening exits are a fire-code violation in most municipalities. I'll allow it as foreshadowing.

**Choices**

- **Walk on.** → §13 · *Back On the Sidewalk*
  ↳ fx: flag `leans_protection` → true

### §12 · She's Sitting on Something
<sub>`maebie_mystery`</sub>

Maebie trots over to a stack of mail on the kitchen island and sits, deliberately, on the third envelope from the top.

You ease the envelope out from underneath her. She permits it. Inside: stationery you've seen before — the porch-haunter, windbreaker, clipboard. Folded with it, a hand-drawn map and a list of three addresses, one of them too familiar.

You look at Maebie. Maebie, who has, in the way of small brown dogs, solved the case, returns to the sunbeam.

> **EDITOR.** Maps drawn by men in windbreakers are, in my professional view, the most useful kind of evidence. The technical term is 'we have you now.'

**Choices**

- **Pocket the map. Keep walking.** → §13 · *Back On the Sidewalk*
  ↳ fx: Evidence +1, flag `leans_mystery` → true

### §13 · Back On the Sidewalk
<sub>`maebie_converge`</sub>

You step out. Maebie watches from the front window, eyebrows still working.

The sidewalk does not care which knob you turned. It has its own problems — a man in a vest is putting up a fluorescent notice about parking, two birds are arguing about a fry, and somebody's HOA is making somebody else's morning worse.

You move toward the worse morning. She'll be here when you're back.

> **EDITOR.** Good. We are walking toward the problem. That is, technically, plot. She's pleased.

**Choices**

- **Toward the HOA notice.** → §14 · *Aggressive Recycling*

---

## Act III · Public Works

_Scenes §14–§19._

### §14 · Aggressive Recycling
<sub>`public_works_1`</sub>

The notice is on a fence around the kind of property that has had two coats of paint and one of them is for tax purposes.

The HOA president — let's call her Mrs. Hennings, because everyone else does, in the same tired tone — is currently fining an elderly tenant for "non-compliant trash can placement."

The trash can is, you note with professional interest, suspiciously flammable.

> **EDITOR.** Mrs. Hennings is a recurring antagonist class. The technical term is "tyrant, but small."

> **WRITERS' ROOM.** Public Works gives the player four genuinely different solutions. Resist letting controlled fire be the obvious good choice; controlled fire should be the bad-good choice.

**Choices**

- **Stand very close to her and say nothing.** → §15 · *Loudness Optional*
  ↳ fx: Heat +1, Humanity -1, Chaos +1
- **Ask the tenant if you can see her files.** → §16 · *The Tenant's Files*
  ↳ fx: Evidence +1, Editor +1
- **Out-bureaucracy her.** → §17 · *Sanitation, With Flair*
  ↳ needs has Oxford Comma Seal · fx: Chaos +1, Editor +2 · shown greyed-out if unmet
- **Use what is already there.** → §18 · *What Was Already There*
  ↳ needs flag `leans_vengeance` = true · fx: Heat +2, Humanity -1, Chaos +1 · shown greyed-out if unmet

### §15 · Loudness Optional
<sub>`public_intimidate`</sub>

You stand close. Closer than is socially permitted. Not threatening — just present, the way smoke is present.

Mrs. Hennings finishes a sentence she did not intend to finish, returns the can to the tenant, and walks back to a car that costs more than the building.

The tenant looks at you the way people look at unexplained weather.

> **EDITOR.** Intimidation without violence is technically a literary device. Don't make me proud about it.

**Choices**

- **Walk on.** → §19 · *Off the Block*

### §16 · The Tenant's Files
<sub>`public_investigate`</sub>

The tenant has, in a manila folder labeled "INSURANCE — DO NOT TRUST," a stack of letters from a man named Carl.

The letters are masterpieces of polite menace. Each one cites a clause that doesn't exist. Each one is signed with a flourish.

Beneath the Carl letters: a single architectural drawing, neat, foundation-level, signed in a hand that is much, much tidier — Mason. The tenant catches your eye, says nothing, and slides the drawing back under the folder.

You feel the back of your neck warm. Not heat — recognition.

> **EDITOR.** Carl from Insurance signs "Best," with a comma. The other one signs his foundation drawings. Note the brothers in a list. Note the missing third. We will get there.

**Choices**

- **Take the tenant's old laptop. (She offers it.)** → §19 · *Off the Block*
  ↳ fx: Evidence +1, +Old Laptop
- **Thank her. Leave the laptop.** → §19 · *Off the Block*
  ↳ fx: Humanity +1, Editor +1

### §17 · Sanitation, With Flair
<sub>`public_bureaucracy`</sub>

You produce the Oxford Comma Seal. You produce a clipboard. You produce, from somewhere, the calm energy of a man named Glen who has worked at the county for thirty-one years.

Within an hour, Mrs. Hennings has been served with a "Notice of Improper Notice." Within two, her HOA is being audited by an entity that may or may not exist.

The tenant offers you a casserole. You decline, because casseroles, like fires, should not be borrowed.

> **EDITOR.** Triple paperwork is more devastating than any flame. Yes, I am the Editor and yes, I have favorites.

**Choices**

- **Accept the warranty scroll the tenant slides across the table.** → §19 · *Off the Block*
  ↳ fx: Evidence +1, +Warranty Scroll

### §18 · What Was Already There
<sub>`public_fire`</sub>

You don't start anything. You never start anything. You only notice.

You notice that the trash can has, somehow, become full of paperwork from Mrs. Hennings's car. You notice that her car has, somehow, idled too long beside the can. You notice the can is, somehow, suspiciously flammable.

The fire, when it happens, is brief, polite, and confined to documents. The Editor, watching, makes a small unhappy sound, then a small, complicated, less unhappy one.

> **EDITOR.** There is always heat in the burn barrel, but borrowing it without consent is, technically, "using what is already there." Technicalities are a fire code.

**Choices**

- **Walk away before someone reads the paperwork.** → §19 · *Off the Block*
  ↳ fx: Heat +1, Chaos +1

### §19 · Off the Block
<sub>`public_converge`</sub>

Two blocks later, your hands stop shaking, mostly.

A grocery clerk you've never met salutes you. A retired postal worker tips an invisible hat. You have become, briefly, a public figure of a kind that doesn't require photos.

You should probably go somewhere they can't find you yet.

> **EDITOR.** Public figures of "a kind that doesn't require photos" is a category I made up. I encourage you to live up to it.

**Choices**

- **Head for the Third Stair.** → §20 · *The Third Stair*

---

## Act IV · The Third Stair

_Scenes §20–§26._

### §20 · The Third Stair
<sub>`third_stair_1`</sub>

Off a road that has been a road since before the road had a name, there is a cabin.

It has been added to, acre by acre, for what is either decades or a more impolite stretch of time. The roofs do not entirely agree with each other. The sides are clapboard, then stone, then clapboard again. From the front yard you can count three chimneys, none of which is currently emitting smoke and one of which is, apparently, decorative.

A small hand-lettered sign, weather-bleached but legible, reads: THE THIRD STAIR. Below it, in a hand that is more recent and more particular about typography: PLEASE WIPE YOUR FEET. PLEASE WIPE YOUR INTENT.

> **EDITOR.** I have a chair here. The chair is upstairs, on the floor with the staircases. You'll get to that. Keep walking.

**Choices**

- **"Why is it called the Third Stair?"** → §21 · *Counted Wrong, On Purpose*
  ↳ fx: Chaos +1
- **Wipe your feet. Wipe your intent. Walk in.** → §22 · *Inside the Cabin*

### §21 · Counted Wrong, On Purpose
<sub>`third_stair_lore`</sub>

Nobody who lives nearby will give you a straight answer about The Third Stair.

The most consistent version is this: somewhere on the top floor, there are three staircases. Some accounts say two of them go up, and one of them goes somewhere else. Some accounts say all three lead to the same room, which has, in the way of these places, three doors. New visitors have been known to start counting and lose track at the second one.

Locals will tell you the cabin has been added to "in pieces" by people who passed through and felt like building a corner. Nobody appears to be in charge. Somebody is clearly keeping the floors swept.

> **EDITOR.** Three staircases on the top floor is either symbolism or a contractor with unresolved issues. I have, for the record, decided not to choose.

**Choices**

- **Accept that you will not be told.** → §22 · *Inside the Cabin*
  ↳ fx: Chaos -1, Editor +1

### §22 · Inside the Cabin
<sub>`third_stair_corkboards`</sub>

Inside, three things become apparent at once.

The first is the corkboards — four of them, around a room that smells of old paper and good thread. Pinned across them: timelines, photographs, a hand-drawn map with three addresses, and a paper diagram of three particles in a calm committee arrangement, signed P. in a quiet corner.

The second is the whiteboard, on which someone has written THE WRITERS ROOM in confident block capitals, then underlined it twice, then underlined it a third time at a slightly different angle, like a person mid-thought.

The third is the chair in the corner. It is wooden. It is plain. It has been labelled EDITOR in calm serif type on a brass plate. It has been polished, recently, by no one you can see.

> **EDITOR.** The chair is mine. The brass plate is mine. The polish is, regrettably, also mine. We are working on delegation.

> **WRITERS' ROOM.** Third Stair becomes the writers'-room/safehouse beat. Sister Pearson's diagram pinned here is a soft forward reference — players who haven't met her yet will recognize it later; players who have will feel the loop closing.

**Choices**

- **Maebie's hackles rise. She's locked onto the third staircase.** → §23 · *Maebie Knows the Room*
- **Take the hand-drawn map with three addresses off the corkboard.** → §59 · *The Map With Three Addresses*
  ↳ tag: _optional detour_
- **There's a cot. You haven't slept in three days. Lie down.** → §24 · *The Pest-Control Prophecy*
  ↳ fx: Humanity +1
- **Sit. There is, somehow, stew.** → §26 · *The Stew*

### §23 · Maebie Knows the Room
<sub>`stair_maebie_knows`</sub>

Maebie does not bark. Barking is for problems she thinks you can handle on your own.

This is the other thing — the low, still, full-body attention she does maybe three times a year. She is pointed at the third staircase, the one the locals can't agree goes up. The fur along her spine has an opinion. Her eyebrows have escalated to management.

You follow where she's looking instead of where you'd look, which is the entire trick of trusting a dog. Under the bottom step, behind a loose riser no human eye would have flagged, there's a hook. On the hook: a faded red bandana, soft from washing, and a battered tin labelled FOR AFTER.

She found them the way she finds everything — before you knew they were lost. She sits, pleased, and accepts the bandana being tied back on as her rightful tribute.

_On entering this scene: +Maebie's Bandana, +Emergency Chocolate._

> **EDITOR.** Maebie reveals hidden things without speaking, which is more than I can say for most of my authors. Note: the tin is for you. The bandana is hers. Do not, I beg you, confuse the protocol.

> **WRITERS' ROOM.** Scene F: 'Maebie Knows the Room.' Companion-as-danger-sensor used gently — a discovery, not a threat. Grants the bandana and chocolate and sets maebie_trust. Returns to the hub so it stays optional.

**Choices**

- **Tie the bandana back on. Pocket the tin. Tell her she's the senior partner.** → §22 · *Inside the Cabin*
  ↳ fx: Humanity +2, Editor +1, flag `maebie_trust` → true

### §24 · The Pest-Control Prophecy
<sub>`stair_dream`</sub>

You sleep, which is to say you fall sideways into a dream that has clearly been waiting for the cot to open up.

In it, you are younger, or someone is, standing in a yard in front of a house that hasn't been built yet. A man in a company polo and a clipboard is doing something oddly specific to the foundation — not pest control, exactly, more like he's checking the house against a list only he can see. His van says SIDE QUEST COORDINATOR where a phone number should be.

"You're early," he tells you, not unkindly, spraying nothing at the base of a wall. "The third thing always thinks it's early. Tell the dog I said the floor's fine. The floor is the only part of this I can guarantee."

Maebie, in the dream, will not enter the yard. She stands at the property line with her ears flat, telling you something the dream is too polite to subtitle.

> **EDITOR.** I have read this dream four times and I still don't know if it's foreshadowing or a man doing his job. That is, I'm told, the correct amount to know about a prophecy.

> **WRITERS' ROOM.** Scene H: 'The Pest-Control Prophecy.' The optional absurd side quest. Deliberately weird, short, low-literal. Maebie refusing the yard is the only real signal. Leads into the Editor Objects beat.

**Choices**

- **"What's the third thing? What floor? Coordinator of WHAT?"** → §25 · *The Editor Objects*
  ↳ fx: Evidence +1, Chaos +1, flag `saw_the_prophecy` → true
- **Cross to the property line. Stand with Maebie instead.** → §25 · *The Editor Objects*
  ↳ fx: Humanity +1, flag `saw_the_prophecy` → true, flag `maebie_trust` → true

### §25 · The Editor Objects
<sub>`stair_editor_objects`</sub>

"No," says the Editor, and the dream stops like a film hitting a splice.

She is standing in the yard now, in the dream, holding the dream the way you'd hold a manuscript that has gotten ideas above its station. The pest-control man freezes mid-spray, politely.

"A prophetic handyman is fine. A prophetic handyman whose van spells out the metaphor is a man yelling 'I AM A SYMBOL' at a reader who was, until two seconds ago, having a nice time. We do not do that here." She taps the van. The lettering blurs, tactfully, into an ordinary smudged phone number. "Better. Let them wonder. Wondering is the rent they pay to stay in the story."

She turns to you. "You can keep the floor line. The floor line is earned. Now wake up; there's stew, and I refuse to let it get a skin on it for the sake of your subconscious."

> **EDITOR.** Symbolism is salt. The amount that makes the dish is a tenth of the amount that announces itself. I edit dreams too. Somebody has to.

> **WRITERS' ROOM.** Scene I: 'The Editor Objects.' The Editor breaks in when symbolism gets too on-the-nose — a meta-joke that also enforces the project's own style rule (don't over-explain symbols). Returns to the hub.

**Choices**

- **Wake up. Concede the point. The floor line stays.** → §22 · *Inside the Cabin*
  ↳ fx: Editor +2

### §26 · The Stew
<sub>`third_stair_stew`</sub>

A bowl is on the small table beside the Editor's chair. You did not see anyone put it there. The bowl is warm. The spoon is heavier than it has any right to be.

A small typewritten card has been left beside the bowl. It reads:

"Every story I ever heard about you went into the pot. Some of it boiled out. Some of it caramelized at the bottom. That's where the lore lives. The recipe gets written down last."

You look up at the staircases — there are, in this light, three of them, or possibly two, or possibly one being shy. None of them invite you up yet.

> **EDITOR.** Worldbuilding is a stew. You keep the bones. You add what you can spare. You write the recipe last. I left the card. I am not, today, going to admit which staircase is mine.

**Choices**

- **Eat the stew.** → §27 · *Three Roads, Lightly Burned*
  ↳ fx: Humanity +1, Editor +1
- **Decline. Politely. Leave the spoon where it is.** → §27 · *Three Roads, Lightly Burned*
  ↳ fx: Chaos +1, Editor -1

---

## Act V · Three Marks

_Scenes §27–§34._

### §27 · Three Roads, Lightly Burned
<sub>`three_marks_path`</sub>

The path from the Third Stair bends left, then right, then forks into three.

You take none of them. There is a fourth path, which is the one between the other three, which is the one a man like you is required to use.

In the dust beside the fork: a broken column. Greek-looking, in the sense that everything old eventually looks Greek. Three burned marks circle its base — a small flame, a tidy spiral, and a third symbol the Editor has, in fact, refused to draw twice.

> **EDITOR.** I am declining to render the third symbol. Some glyphs eat the page. Walk past it and stop staring at me.

> **WRITERS' ROOM.** Chapter V intro establishes the 'three' motif environmentally before any character voices it. Greek-relic flavor sets up that Arson's story has cycled before.

**Choices**

- **Crouch down. Read the marks.** → §28 · *The Third Mark*

### §28 · The Third Mark
<sub>`three_marks_relic`</sub>

Half-buried beside the column: a tablet, ash-grey, broken at one corner. The same three symbols repeat across its face in three tidy rows. Flame, spiral, and the thing the Editor will not name.

You feel a sentence rising from somewhere behind your sternum. Three is a pattern. Three is on purpose. Three is, possibly, a setup.

The Editor leans in. So does the dust.

_On entering this scene: +Three-Marked Relic._

> **EDITOR.** Pick one reading. They are all, in fairness, technically defensible. That is why people fight about them.

> **WRITERS' ROOM.** Four-way interpretive fork: science, faith, coincidence, manipulation. Each sets an interpret_* flag so later scenes can call back.

**Choices**

- **It's a pattern. Patterns mean engineering, not gods.** → §29 · *Mason's Argument*
  ↳ fx: Evidence +2, Editor +1, flag `interpret_science` → true
- **It's a sign. Threes don't repeat by accident.** → §29 · *Mason's Argument*
  ↳ fx: Humanity +1, Editor +1, flag `interpret_faith` → true
- **It's a thing some monk needed to keep busy.** → §29 · *Mason's Argument*
  ↳ fx: Chaos +2, Editor -1, flag `interpret_coincidence` → true · tag: _bad joke_
- **It's bait. Somebody's selling the pattern.** → §29 · *Mason's Argument*
  ↳ fx: Heat +1, Evidence +1, flag `interpret_manipulation` → true

### §29 · Mason's Argument
<sub>`three_marks_mason`</sub>

The man who appears at the fork has your eyebrows, your jaw, and none of your priors. He is dressed the way you dress in the dream you have where you are a more reasonable person.

"Hello, brother," Mason says, evenly. He has a book in one hand and a small, neat smile in the other. "I'd like five minutes. I'd like them on the record."

He sits, uninvited, on the broken column. The marks at its base do not flinch.

"Fire without structure," he says, "is destruction. Structure without mercy is — I know. You'll say cage. I'll say frame. We can argue about furniture later. Listen first."

_On entering this scene: +Mason's Rulebook._

> **EDITOR.** Mason punctuates the way I would, if I were unwell about it. Note that he says 'frame.' Note that he is, technically, correct about furniture.

> **WRITERS' ROOM.** Mason is intelligent and emotionally connected to Arson, not a stock villain. Four response choices test rage / sarcasm / restraint / vulnerability — each sets a mason_* flag.

**Choices**

- **Stand up. Loom. Say nothing. Mean every word of nothing.** → §30 · *Sister Pearson's Table*
  ↳ fx: Heat +2, Humanity -1, Editor -1, flag `mason_sees_lost` → true
- **"Five minutes. I'll bill you in dry napkins."** → §30 · *Sister Pearson's Table*
  ↳ fx: Chaos +2, Editor +1, flag `mason_amused` → true · tag: _bad joke_
- **Sit on the column. Across from him. Listen.** → §30 · *Sister Pearson's Table*
  ↳ fx: Humanity +1, Editor +2, flag `mason_sees_redeemable` → true
- **"Frame, then. Talk to me like we're still on the same shelf."** → §30 · *Sister Pearson's Table*
  ↳ fx: Humanity +2, Editor +2, flag `mason_listens` → true, flag `saved_the_story` → true

### §30 · Sister Pearson's Table
<sub>`three_marks_pearson`</sub>

Around a bend in the path, in a clearing where the ash has been swept into three neat half-moons, there is a folding table. Sitting at it, in a coat that is either monastic or just well-made, is a woman with your father's quiet eyes and none of your father's patience.

"Sister Pearson," she says, before you ask. "Yes. Yes. And yes, in that order, to the three questions you were about to ask me."

On the table, three things:

— a small religious icon, brass, calmly framed,  
— a paper model of three particles arranged like a tidy committee,  
— and a single scrap of paper, edges scorched, that reads, in a sentence she did not write: "and then he chose, again, the third thing."

"Pick the true one," she says. "It's a short test. You may have noticed it has three answers."

> **EDITOR.** Pearson is the smartest person in your family, which is, on this branch, not a high bar. Her diagrams have footnotes that argue with the equations. Behave.

> **WRITERS' ROOM.** Three-objects scene maps to science / faith / story. The 'refuse' choice exists as a fourth — the brief said no answer is fully correct, so refusing reads as the actually-correct meta-answer.

**Choices**

- **The icon. Faith holds shapes the others don't.** → §31 · *Arson Mason and Pearson*
  ↳ fx: Humanity +1, Editor +1, +Sister Pearson's Diagram, flag `pearson_faith` → true
- **The diagram. Three particles. That's the engine.** → §31 · *Arson Mason and Pearson*
  ↳ fx: Evidence +2, +Sister Pearson's Diagram, flag `pearson_science` → true
- **The scrap. Stories are what survive the other two.** → §31 · *Arson Mason and Pearson*
  ↳ fx: Humanity +1, Editor +2, +Burned Story Fragment, flag `pearson_story` → true, flag `saved_the_story` → true
- **"None of them. Or all three. You set up the trick, Sister."** → §31 · *Arson Mason and Pearson*
  ↳ fx: Evidence +1, Chaos +1, Editor +1, flag `pearson_refuse` → true

### §31 · Arson Mason and Pearson
<sub>`three_marks_oxford`</sub>

Sister Pearson folds the table with the ease of someone who has folded it before, in a previous life, possibly. As she stands she says, mildly:

"It was good to see you again. Arson, Mason and Pearson."

You stop walking.

"Three things in a list," you say, and your voice is, frankly, more careful than you meant it. "Three. Comma between the second and the third one. Or it's not a list. It's a duet with a guest verse."

You crouch at the edge of the path and press a small mark into the dust, between the second name and the third — with the Oxford Comma Seal if it's on you, with a soot-blackened thumb if it isn't. The principle does not care which. It leaves the cleanest, smallest comma.

Sister Pearson looks at the mark, and then at you, and her face does the small private thing faces do when they are not going to admit anything.

"Noted," she says. "Arson, Mason, and Pearson, then."

> **EDITOR.** This is the only time in this game you will see me cry. I am not crying. Move along.

> **WRITERS' ROOM.** Oxford comma joke that reveals character: Arson cares about precision when it concerns family. The seal isn't deployed in anger here — it's deployed for the record.

**Choices**

- **Walk on. The mark stays.** → §32 · *Rain Without Thunder*
  ↳ fx: Humanity +1, Editor +2
- **Leave the mark. Some marks belong to the rain.** → §32 · *Rain Without Thunder*
  ↳ fx: Humanity +1, Editor +1, flag `left_seal_for_rain` → true

### §32 · Rain Without Thunder
<sub>`three_marks_ranya`</sub>

The clearing past Sister Pearson's folded table has been burned, recently, and politely — the way Arson would do it, if Arson did. There is no smoke. There is just a flat field of ash, the kind that takes a footprint and then thinks about it.

A woman is standing in the middle of it. She is not dressed for weather. She lifts one hand, almost lazily, and it begins to rain — softly, evenly, on roughly fifteen feet of ash and nothing else.

Letters rise out of the wet ground like a bruise coming up. Names. A list. The third name is yours.

"Fire remembers," she says, without looking at you. "Rain reveals."

She lowers her hand. The rain stops. The names remain.

"I'm Ranya," she says, finally turning. "I make it rain. Not like Storm. Quieter. I read what fire is too proud to say."

_On entering this scene: +Rain-Stained Tablet._

> **EDITOR.** She is, for the record, my favorite of your new collaborators. Note that she did not summon weather. She permitted it.

> **WRITERS' ROOM.** Ranya's power is subtle and emotional. Three choices: trust / wariness / callback to her line. Callback option awards highest ranya_trust because it shows Arson listened.

**Choices**

- **Step into the wet ash. Read the third name aloud.** → §33 · *Good Partners*
  ↳ fx: Humanity +1, Evidence +2, flag `ranya_trust` → true
- **Stay at the edge. Watch her hands.** → §33 · *Good Partners*
  ↳ fx: Heat +1, Evidence +1
- **"Fire remembers. Rain reveals." (say it back)** → §33 · *Good Partners*
  ↳ fx: Humanity +2, Editor +2, flag `ranya_trust` → true, flag `ranya_trust_high` → true

### §33 · Good Partners
<sub>`three_marks_partners`</sub>

The two of you sit on the lip of an old observatory wall, which is what the clearing turns out to be. There is no danger here. There is, just for a moment, no plot.

"You burn," Ranya says. "Sometimes for the right reasons. Sometimes for reasons you don't tell anyone, including yourself."

"That tracks," you say.

"I rain. Not on you. With you. Or near you, when you've forgotten you're standing in the middle of something."

The observatory, behind you, contains exactly three dead telescopes. Maebie, three streets and a chapter back, is asleep in a sunbeam.

You think, almost in spite of yourself: good partners even each other out. You don't say it. The Editor writes it, in margin pencil, like it has been waiting for the page.

> **EDITOR.** Good partners even each other out. I am going to print that on something. Probably a bookmark. Probably yours.

> **WRITERS' ROOM.** The required quiet scene. No combat, no danger. Two choices: acknowledge the balance (high reward) or deflect with humor (small reward, doesn't punish). Both are valid characterizations.

**Choices**

- **"Good partners even each other out."** → §34 · *Toward the Insurance Man*
  ↳ fx: Humanity +2, Editor +2, flag `ranya_trust_high` → true, flag `saved_the_story` → true
- **"Are you going to make it rain on the next guy too, or is this exclusive?"** → §34 · *Toward the Insurance Man*
  ↳ fx: Humanity +1, Chaos +1, flag `ranya_trust` → true · tag: _bad joke_

### §34 · Toward the Insurance Man
<sub>`three_marks_converge`</sub>

You come down off the observatory wall. The dust on the path has been disturbed in three directions by three sets of feet, which is, by now, exactly the number you expected.

Mason is gone. Sister Pearson is gone. Ranya is, importantly, behind you and not gone — just elsewhere, waiting, in the way that good partners are not in your pocket but in your weather.

Somewhere ahead, on somebody's porch, Carl from Insurance is waiting in a windbreaker. He has not gotten any less Carl while you were away.

> **EDITOR.** You have met your siblings. You have met your weather. We are, technically, ready for the bureaucratic antagonist now. He's the easy one, comparatively.

**Choices**

- **Keep walking. Down toward the wet country.** → §35 · *The Mire Road*

---

## Act VI · The Mire

_Scenes §35–§43._

### §35 · The Mire Road
<sub>`mire_road`</sub>

Down off the observatory wall the country goes low and wet. The ash gives way to reed and standing water that has not been introduced to the sky in some time.

There is a horse waiting at the bottom of the path. Grey, patient, borrowed — saddled by no one you can see, in the way of everything at the edges of this story. Ranya is a few steps behind you, not on the horse, not far from it. Maebie is on your heels, low to the ground, ears doing arithmetic.

The horse looks at the mire. The horse looks at you. The look says: I will go where you point me, and that is the problem with me.

"Fire remembers," Ranya says, quietly, watching the water. "Rain reveals. This place hasn't forgotten anything. It's just holding it under."

> **EDITOR.** A borrowed horse is a loaded object in any story. I am not going to tell you why. I am only going to ask, gently, that you remember Maebie is on your heels and that Maebie is, by writers'-room law, fine.

> **WRITERS' ROOM.** Chapter VI opens the Reason arc. The horse is introduced calm and trusting so the next scene costs something. Ranya present but not steering — her line reframes the mire as a thing that hides truth, not weather to be conquered.

**Choices**

- **Take the reins. Lead the horse onto the causeway you can half-see.** → §36 · *The Horse in the Mire*
  ↳ fx: Evidence +1
- **Send Maebie ahead three steps. Watch where she won't go.** → §36 · *The Horse in the Mire*
  ↳ fx: Humanity +1, Evidence +1, flag `maebie_trust` → true

### §36 · The Horse in the Mire
<sub>`mire_horse`</sub>

The causeway is a lie the water tells. Three strides in, the ground stops being ground.

The horse goes down to the knee, then the chest, calm at first, the way trusting things are calm right up until the moment they understand. Then it understands. It does not thrash so much as it asks — a long, low, terrible question, aimed at you, because you are the one who pointed.

Maebie is already back on solid reed, because you put her there, because that is not a decision you were ever going to get wrong. She does not bark. She watches you with the eyebrows, and the eyebrows, for once, have no joke in them.

Ranya is very still. "You can't carry it," she says. "Nobody could. The only question in front of you is which kind of man reaches in."

> **EDITOR.** I want this on the record: this is not the dog. The dog is on the reed. The dog is fine. This is the horse, and the horse is going to cost you something true, which is the only kind of cost I allow in a scene like this.

> **WRITERS' ROOM.** The Artax beat. Restraint over shock. Three reaches: revelation (Ranya, best, requires earned trust), reflex (fire, saves it but exposes Arson's first instinct), and mercy (cut it loose, carry the dog, the hardest one). Each reveals the code rather than just spending stats.

**Choices**

- **"Ranya. Read it." Let the rain show what's under the water.** → §37 · *Recovery Protocol*
  ↳ needs flag `ranya_trust` = true · fx: Humanity +2, Evidence +2, Editor +2, +Rain-Stained Tablet, flag `horse_saved` → true, flag `ranya_trust_high` → true
- **Burn the reeds into a raft of ash. Reach for fire, because you always do.** → §37 · *Recovery Protocol*
  ↳ fx: Heat +2, Humanity +1, Chaos +1, flag `horse_saved` → true, flag `reached_for_fire` → true
- **Cut the harness. Let it go quiet. Carry Maebie across yourself.** → §37 · *Recovery Protocol*
  ↳ fx: Heat -1, Humanity +2, Editor +1, flag `horse_released` → true, flag `chose_mercy` → true

### §37 · Recovery Protocol
<sub>`mire_chocolate`</sub>

On the far bank there is a flat rock that is, almost suspiciously, the right height for sitting.

You sit. Maebie leans her whole weight against your shin, which is her way of saying she is checking that you are still load-bearing. You are. Mostly.

There is a tin in your coat you do not entirely remember packing — battered, grandparent-issued, the label reading FOR AFTER. This is, by every law you were raised under, an after. You break a square. You give exactly none of it to the dog, because chocolate is not for the dog, and you tell her so, and she takes the insult with grace because she can smell that you mean it kindly.

Ranya sits a polite distance away and lets the quiet be quiet. No plot happens for a moment. It is the best moment you've had in three chapters.

_On entering this scene: +Emergency Chocolate._

> **EDITOR.** Chocolate is not a solution, but it is often the first draft of one. Note that you did not give any to Maebie. Good. Theobromine is a margin note I never want to write.

> **WRITERS' ROOM.** The required quiet, combat-free scene and the chocolate-recovery callback in one beat. onEnter grants the chocolate so the motif lands even for players who skipped the Third Stair side quest. Both choices are valid; neither punishes.

**Choices**

- **"I pointed it where it didn't want to go. That's mine to keep."** → §38 · *What the Mire Showed Him*
  ↳ fx: Humanity +2, Editor +1, flag `owns_the_cost` → true
- **Say nothing. Break a second square. Let Maebie lean.** → §38 · *What the Mire Showed Him*
  ↳ fx: Humanity +1

### §38 · What the Mire Showed Him
<sub>`mason_confronts`</sub>

Mason is standing where the reeds give way to a low stone road, and he has been there long enough to have an opinion.

"I watched," he says. No smile this time. "I wanted to see which hand you'd lead with."

He looks at the water, then at the place where the grey horse isn't anymore, then at the dog pressed warm against your leg. He is, you realize, doing his own arithmetic.

"Structure would have tested the ground first," he says. "Structure would not have pointed a trusting thing at a lie. You'll say I'm describing a cage again. I'm describing a fence around a hole. There's a difference, brother, and a horse just paid for it."

> **EDITOR.** Mason is not wrong here, which is what makes him Mason. The trick of writing him is to let him land a true hit and still leave room for the reader to disagree about what it means. Resist making him gloat.

> **WRITERS' ROOM.** First of two Mason conflict scenes in this chapter. Conflict is moral, not physical. Choices test rage / accountability / deflection / shared grief and feed mason_tension or soften him.

**Choices**

- **"You watched and didn't help. Don't audit me."** → §39 · *Pearson, Before*
  ↳ fx: Heat +2, Humanity -1, flag `mason_tension` → true
- **"You're right. I led with the wrong hand. Noted."** → §39 · *Pearson, Before*
  ↳ fx: Humanity +1, Editor +2, flag `mason_sees_redeemable` → true
- **"A fence around a hole is just a hole with paperwork."** → §39 · *Pearson, Before*
  ↳ fx: Chaos +1, Editor +1 · tag: _bad joke_
- **"I know. I knew before the second stride. Sit with it a second."** → §39 · *Pearson, Before*
  ↳ fx: Humanity +2, Editor +1, flag `mason_listens` → true, flag `owns_the_cost` → true

### §39 · Pearson, Before
<sub>`pearson_before`</sub>

The stone road climbs to a settlement that is too small to have a name and too organized to be an accident. In the square, at a plain table, Sister Pearson is settling a dispute about a well.

She is not mythic. She is a woman with ink on two fingers and a cold cup of tea she keeps forgetting to drink. She listens to a man, then to a woman, then to a child who is, technically, the only one telling the whole truth. She asks three questions. She writes one line.

There is no robe of office. There is no light from above. There is just a person who is very good at the difficult thing of hearing what is actually being said, and a small crowd that has started, you notice, to go quiet when she speaks.

She catches your eye over the child's head. "Arson," she says, like a fact she's filing. "You look like a man who pointed something somewhere it didn't want to go."

> **EDITOR.** Pearson is a person here. A scholar with cold tea, not an archetype. Keep her human as long as you can stand to; the myth is coming and it does not need your help arriving early.

> **WRITERS' ROOM.** Scene A: 'Pearson Before Reason.' Deliberately small stakes — a well dispute — so her intelligence reads as character, not symbol. The crowd going quiet is the only foreshadow of what people will build around her.

**Choices**

- **"Three questions, one line. You always did edit tighter than me."** → §40 · *Fairness Is Not Kind*
  ↳ fx: Humanity +1, Editor +2, flag `remembers_pearson` → true
- **"People go quiet when you talk. That used to be my job."** → §40 · *Fairness Is Not Kind*
  ↳ fx: Heat +1, Evidence +1
- **"Your tea's cold. Sit a second. Be my sister, not the bench."** → §40 · *Fairness Is Not Kind*
  ↳ fx: Humanity +2, Editor +1, flag `remembers_pearson` → true

### §40 · Fairness Is Not Kind
<sub>`pearson_fairness`</sub>

The next case is harder. A widow has been drawing water she is not, by the settlement's own dull arithmetic, entitled to. She has three children and no claim. The claim belongs to a man who does not need the water and will not share it and is, technically, completely in the right.

Pearson hears all of it. You watch her want a different answer. You watch her not take it.

"The well is his," she says. Quiet. Even. "The arithmetic doesn't care that he's a small man about it. Fair is fair. Fair is not kind. I won't pretend the two are the same to make this room feel better."

The widow does not cry. That is somehow worse. Ranya, beside you, lifts one hand a few inches — there is old writing under the well's rim, she can feel it — and then waits, because it is not her room to make it rain in.

> **EDITOR.** Reason can be fair, but fairness is not always kind. A godlike force does not have to be evil to terrify a room. Note that Ranya holds her hand. The truth is hers to reveal, but the timing is yours.

> **WRITERS' ROOM.** Scene C: 'Fairness Is Not Kind.' The Ranya choice (reveal the older claim) is the merciful intervention — it doesn't overrule Pearson, it gives her better evidence. Anger/respect/discomfort/silence all set pearson_insight; the rain choice also sets mercy_over_fairness for the Reason ending's tone.

**Choices**

- **"Ranya — the well's rim. Read it before anyone signs anything."** → §41 · *The First Time They Called Her Reason*
  ↳ needs flag `ranya_trust` = true · fx: Humanity +2, Evidence +2, Editor +2, flag `pearson_insight` → true, flag `mercy_over_fairness` → true, flag `ranya_trust` → true
- **"Then the arithmetic is wrong. Burn the ledger and start it over."** → §41 · *The First Time They Called Her Reason*
  ↳ fx: Heat +2, Chaos +1, flag `pearson_insight` → true
- **"That cost you. I saw it cost you. I respect that it still cost you."** → §41 · *The First Time They Called Her Reason*
  ↳ fx: Humanity +1, Editor +2, flag `pearson_insight` → true
- **Say nothing. Put your coat over the widow's shoulders. Watch your sister.** → §41 · *The First Time They Called Her Reason*
  ↳ fx: Humanity +2, Editor +1, flag `pearson_insight` → true, flag `mercy_over_fairness` → true

### §41 · The First Time They Called Her Reason
<sub>`pearson_first_called`</sub>

It is the child who does it. Not unkindly. The way children name things that adults are too careful to name.

"She's Reason," the child says, to another child, pointing at Pearson as the square empties. "When you can't tell who's right, you go to Reason."

The word lands and does not leave. You can see it not leave. A man repeats it to his wife. The wife nods like she'd already thought it. By the time the sun moves a hand's width, three separate people have said it, and Pearson has stopped correcting them, and the not-correcting is the loudest thing in the square.

She looks at you. "Don't," she says. "I can hear you deciding to be sentimental about my name."

> **EDITOR.** Pearson is a person. Reason is what happens when people stop treating her like one. This is the hinge of her whole arc — play it quiet. The myth is a thing other people are doing TO her. She gets a vote, and she's spending it on being annoyed at you.

> **WRITERS' ROOM.** Scene B: 'The First Time They Called Her Reason.' The myth arrives via a child, not a coronation. Whether Arson insists on 'Pearson' sets remembers_pearson, which colors the Reason Remains ending toward the human reading.

**Choices**

- **"You're Pearson. You'll always be Pearson to me. Let them build the rest."** → §42 · *Merciful and Vengeful*
  ↳ fx: Humanity +2, Editor +2, flag `remembers_pearson` → true, flag `called_her_reason` → true
- **"Reason. It fits. That's exactly why it scares me."** → §42 · *Merciful and Vengeful*
  ↳ fx: Evidence +2, Editor +1, flag `called_her_reason` → true, flag `fears_reason` → true
- **"Reason. Great. So when I'm unreasonable it's now technically a family matter."** → §42 · *Merciful and Vengeful*
  ↳ fx: Humanity +1, Chaos +1, flag `called_her_reason` → true · tag: _bad joke_

### §42 · Merciful and Vengeful
<sub>`mason_pearson_debate`</sub>

That night, at a fire that you did not start and are pointedly not tending, Mason and Pearson argue about God the way only siblings can — fluently, unfairly, and with real love underneath the knives.

"The old gods were merciful," Mason says. "And vengeful. The same gods. The same afternoon. Homer didn't think that was a contradiction. He thought it was weather."

"The old gods were stories people told to make fairness feel survivable," Pearson says. "I don't need a throne. I need the arithmetic to hold. Mercy is what you add after the arithmetic, not instead of it."

Mason wants divine order — a frame, a hand on the scale, a reason the three of you keep happening. Pearson wants no hand at all, just the cold true thing and the choice to be kind around its edges. You sit between structure and consequence, and you notice — not for the first time — that you are more afraid of your sister than your brother. Because Mason might be wrong. Reason might be right.

> **EDITOR.** Whether Arson fears Reason more than Mason is the real question of the chapter. Mason can be argued with. A correct thing cannot. Three readings of the same fire: mercy, justice, vengeance. Pick the one your code can carry.

> **WRITERS' ROOM.** Scene K: 'Merciful and Vengeful,' the second Mason conflict and the three-motif gameplay interaction — the player literally chooses one of three readings of the same flame. Homeric gods material grounds the mercy/justice/vengeance triangle. fears_reason and mercy flags feed endings.

**Choices**

- **"Mercy. Add it after the arithmetic. Every time. That's the whole job."** → §43 · *Down From Reason*
  ↳ fx: Humanity +2, Editor +2, flag `mercy_over_fairness` → true, flag `reading_mercy` → true
- **"Justice. The cold true thing, held even when it costs. Like she did at the well."** → §43 · *Down From Reason*
  ↳ fx: Evidence +2, Editor +1, flag `fears_reason` → true, flag `reading_justice` → true
- **"Vengeance. Don't dress it up. Sometimes the fire is just the fire."** → §43 · *Down From Reason*
  ↳ fx: Heat +2, Humanity -1, Chaos +1, flag `mason_tension` → true, flag `reading_vengeance` → true

### §43 · Down From Reason
<sub>`mire_converge`</sub>

Morning comes the way it does after a night of real talk: thin, honest, a little embarrassed about itself.

Mason is gone before you wake, his book left open to a page he wanted you to read and a margin note in a hand too tidy to be anyone else's. Pearson — Reason, now, to everyone but you, maybe — is back at her plain table, settling something about a fence. She does not say goodbye. People who are becoming myths rarely get to.

Ranya falls into step beside you. Maebie ranges ahead and back, ahead and back, stitching the road together. Somewhere down the line, on somebody's porch, Carl from Insurance is still standing in a windbreaker, holding a clipboard, blissfully unaware that you have just spent a chapter learning the difference between fair and kind.

"Ready?" Ranya asks.

"No," you say, honestly. "Let's go anyway."

> **EDITOR.** Good. You learned the difference between fair and kind and you still have to go fight a man about commas. That is, structurally, how it works. The big lessons never excuse you from the small porches.

> **WRITERS' ROOM.** Converge back to the Carl chapter (carl_1). pearson_insight, set on the Fairness fork, gates the Reason Remains ending in the finale. Mason's left-open book is a soft thread for future expansion.

**Choices**

- **Toward the porch. Toward Carl.** → §44 · *Carl, from Insurance*

---

## Act VII · The Insurance Man

_Scenes §44–§47._

### §44 · Carl, from Insurance
<sub>`carl_1`</sub>

Carl is waiting on the porch.

Carl is always waiting on porches. Carl was, you suspect, born on a porch, in a windbreaker, holding a clipboard.

"Hey there, friend," he says, with a smile that knows exactly which clauses don't exist. "Carl. Adjuster-Counselor. Just had a couple little questions about a couple little fires."

> **EDITOR.** "Adjuster-Counselor" is not a job. It is a posture. Resist his commas, but engage his commas.

**Choices**

- **Ask to see the paperwork.** → §45 · *The Forms*
  ↳ fx: Evidence +1
- **Beat him with his own form language.** → §46 · *Loopholes Are Just Slow Fires*
  ↳ needs has Strongly Worded Letter · fx: Chaos +1, Editor +1 · shown greyed-out if unmet
- **Tell him you know about the fourth set of footsteps.** → §47 · *The Fire Marshal Warns*
  ↳ needs flag `leans_mystery` = true · fx: Heat +1, Evidence +1 · shown greyed-out if unmet
- **"Sign here," and point at the porch. (bad joke)** → _(stays on this scene)_
  ↳ fx: Chaos +2, Editor -1 · tag: _bad joke_

### §45 · The Forms
<sub>`carl_forms`</sub>

Carl hands you the forms. They are warm, somehow.

Three pages, single-spaced. Two pages are written in language that pretends to be English. The third page is, on inspection, mostly a list — and the list, on closer inspection, is missing its final comma.

Your hand drifts to the inside pocket where the Oxford Comma Seal lives — or would, if you'd opened the right door this morning.

> **EDITOR.** Carl uses Oxford commas only when convenient. We do not. We use them always. This is how we know who he is.

**Choices**

- **Use the seal. Fix the list.** → §47 · *The Fire Marshal Warns*
  ↳ needs has Oxford Comma Seal · fx: Evidence +1, Editor +2, flag `fixed_carl_comma` → true · shown greyed-out if unmet
- **Sign anyway. Let the missing comma sit.** → §46 · *Loopholes Are Just Slow Fires*
  ↳ fx: Humanity -1, Chaos +1, Editor -2

### §46 · Loopholes Are Just Slow Fires
<sub>`carl_loophole`</sub>

You read the form back to Carl, slowly, with your finger.

The clause about "damp napkin warranties." The footnote that voids itself. The sub-paragraph that, on a careful reading, obligates Carl personally to "absorb any moisture incidental to a claim."

Carl's smile becomes the smile of a man being slowly handed a glass of water.

> **EDITOR.** You can defeat a man with his own paperwork. It is, in fact, my favorite genre.

**Choices**

- **Hand him the damp napkin.** → §47 · *The Fire Marshal Warns*
  ↳ needs has Damp Napkin · fx: Evidence +2, Chaos +1, Editor +2, −Damp Napkin · shown greyed-out if unmet
- **Press the point without props.** → §47 · *The Fire Marshal Warns*
  ↳ fx: Evidence +1, Editor +1

### §47 · The Fire Marshal Warns
<sub>`carl_confront`</sub>

Just as it gets interesting, an envelope arrives in the hands of a kid on a bicycle who absolutely does not want to be a delivery service. The envelope is, of course, from the Fire Marshal.

"WARNING," it says, simply. Below: a paragraph of inarguable, lovely, beautifully-punctuated prose.

Carl recognizes the letterhead. He stops smiling for the first time, and the porch becomes, briefly, just a porch.

> **EDITOR.** The Fire Marshal writes better than anyone I have ever met. His sentences are short. His commas are correct. We do not start fires near him; he writes them out of existence.

**Choices**

- **Take the warning. Tuck it in your jacket.** → §48 · *The Line*
  ↳ fx: Humanity +1, Evidence +1, +Fire Marshal Warning
- **Hand the warning to Carl.** → §48 · *The Line*
  ↳ fx: Heat +1, Chaos +1

---

## Act VIII · The Line

_Scenes §48._

### §48 · The Line
<sub>`the_line_1`</sub>

You sit, eventually, on a curb that is colder than the rest of the curb.

The Editor takes off her glasses. She looks tired in a way only people who actually love what they're protecting can be tired.

"Every man who burns," she says, "is one decision away from a man who only stands near burning. Three siblings. Three roads. Three readings of the same mark. The line is yours, not mine. But it's load-bearing. Pick one."

> **EDITOR.** I am, for the next few lines, declining to be funny. This is the spine of the story. Pick one.

> **WRITERS' ROOM.** Four codes are the honest lines. A fifth — the refusal — only surfaces if Mason already wrote you off (mason_sees_lost): the player who raged at him in Three Marks is the only one offered the chance to prove him right. It sets chose_cruelty, the sole gate to The Monster ending; declining a code IS the monstrous choice.

**Choices**

- **"I never start the fire."** → §49 · *Legacy Written in Ash*
  ↳ fx: Humanity +1, Editor +1, vow set → “Never start the fire.”
- **"I never burn a home with people inside."** → §49 · *Legacy Written in Ash*
  ↳ fx: Humanity +2, Editor +1, vow set → “Never burn a home with people inside.”
- **"I never punish without proof."** → §49 · *Legacy Written in Ash*
  ↳ fx: Evidence +1, Editor +2, vow set → “Never punish without proof.”
- **"I never let garbage hide behind paperwork."** → §49 · *Legacy Written in Ash*
  ↳ fx: Evidence +2, Editor +1, vow set → “Never let garbage hide behind paperwork.”
- **"No line. I burn what I decide needs burning."** → §49 · *Legacy Written in Ash*
  ↳ needs flag `mason_sees_lost` = true · fx: Heat +2, Humanity -2, Chaos +1, Editor -2, flag `chose_cruelty` → true · tag: _no code_

---

## Act IX · Legacy Written in Ash

_Scenes §49–§58._

### §49 · Legacy Written in Ash
<sub>`legacy_1`</sub>

By morning, three things are true:

— Carl from Insurance has filed something somewhere,  
— Mrs. Hennings is no longer the president of anything,  
— and somebody is going to remember how this ends.

You stand at the edge of a quiet block. There's a burned plate on the curb. There's a dog, three streets over, barking at nothing in particular. There's a stew, by now, somewhere reaching a tender point.

Legacy is written in ash. Blood remembers. Destiny endures. Pick the line, and walk it.

> **EDITOR.** The roads forward have multiplied since we last counted. Some of them only open if someone bothered to read the room. Each is honest. None of them is clean. Choose the one your code can live with.

**Choices**

- **Disappear. Let the story do the work.** → §50 · *The Myth of Ar*
  ↳ needs Heat ≥ 2, Chaos ≥ 2 · shown greyed-out if unmet
- **Pocket the spare collar. Go home to her.** → §51 · *The Two of Them*
  ↳ needs has Maebie's Collar · shown greyed-out if unmet
- **Sign on. Officially. Sanitation, with flair.** → §52 · *Public Servant of Fire*
  ↳ needs Humanity ≥ 2, Editor ≥ 2 · shown greyed-out if unmet
- **Let her bring the rain. Let it do the telling.** → §53 · *Rain Reveals*
  ↳ needs Humanity ≥ 2, flag `ranya_trust_high` = true · shown greyed-out if unmet
- **Hand the manuscript back. Let the Editor close it.** → §54 · *The Editor's Ending*
  ↳ needs Editor ≥ 4, flag `saved_the_story` = true · shown greyed-out if unmet
- **Become the thing he warned you about.** → §55 · *The Monster*
  ↳ needs Heat ≥ 4, flag `chose_cruelty` = true · shown greyed-out if unmet
- **Put the matches down. Be a person about it. All the way down.** → §57 · *The Man*
  ↳ needs Humanity ≥ 4, Heat ≤ 3 · shown greyed-out if unmet
- **Stand witness while Pearson becomes Reason. Decide what that costs.** → §58 · *Reason Remains*
  ↳ needs flag `pearson_insight` = true · shown greyed-out if unmet
- **Sign Carl's paperwork. Walk into the office.** → §56 · *Carl from Insurance Wins*

### §50 · The Myth of Ar
<sub>`ending_myth`</sub>

> ## ✦ ENDING — “The Myth of Ar”

You disappear the way smoke disappears: methodically, in upward stages.

People you have never met will tell stories about you for years. Some of them will be true. The true ones will sound the most made-up.

A burned license plate reading NEWSTRT is found, sometime later, on a dock somewhere. There is no boat.

The Editor leaves a final margin note in the file. It reads, simply: "Set in Caslon, please."

_On entering this scene: unlocks ending → **The Myth of Ar**._

> **EDITOR.** Myth is what survives when the man stops correcting his own legend. I'll miss correcting yours.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §51 · The Two of Them
<sub>`ending_two_of_them`</sub>

> ## ✦ ENDING — “The Two of Them”

You pocket the spare collar and you go home.

The man named Arson is, today, retired. You open a hardware store on a corner where two streets used to be one, and call it Maebie & Co. because she is the more reliable partner and you wanted that on the sign. From then on every hallway in the neighborhood opens outward. The shop bell chimes in something just shy of a perfect fifth, because Maebie startles at major thirds and the Editor has notes.

She has a dog bed by the register. She has opinions. She has the better collar. A small brown dog with serious eyebrows naps in your sunbeam, occasionally, when the sunbeam is correctly placed. She approves. She always did.

_On entering this scene: unlocks ending → **The Two of Them**._

> **EDITOR.** Partnership is, structurally, also a redemption arc. I'll allow it. Note that 'Maebie & Co.' is, technically, an Oxford-comma-compliant business name. Carry on.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §52 · Public Servant of Fire
<sub>`ending_servant`</sub>

> ## ✦ ENDING — “Public Servant of Fire”

You take the job. There is, somehow, a job.

Your business card reads: SANITATION (WITH FLAIR). Your office is, in practice, three corkboards and a stew pot. The Fire Marshal becomes, in time, your most devoted pen pal. Carl from Insurance is rotated quietly out of town, into a posture-corrective seminar from which he will, mostly, return.

There is always heat in the burn barrel. You use it on paperwork, which is, of all the things to burn, the only one I formally endorse.

_On entering this scene: unlocks ending → **Public Servant of Fire**._

> **EDITOR.** Pro tip: public service is dramatic when the audience is correct. Yours is.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §53 · Rain Reveals
<sub>`ending_rain`</sub>

> ## ✦ ENDING — “Rain Reveals”

It rains.

Not on you. Near you. On the flat field of ash where the third name was, and the third name was, in the rain's careful telling, never yours — it was a name someone burned into the list so that you would walk into a room and answer to it.

You don't.

Ranya lowers her hand. The rain stops. The truth stays out, like a stone you can't put back. Mason reads it from a distance, and his face does the small private thing his sister's face does, and he closes his book.

You don't disappear. You don't burn a building down. You don't sign a thing. You walk away with a woman who reads what fire was too proud to say, and the story, for once, is told by the rain.

_On entering this scene: unlocks ending → **Rain Reveals**._

> **EDITOR.** Fire remembers. Rain reveals. Print that on the back of the cover. We can argue about font later. (Caslon. Obviously Caslon.)

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §54 · The Editor's Ending
<sub>`ending_editor`</sub>

> ## ✦ ENDING — “The Editor's Ending”

You hand her the manuscript. You do not say "manuscript." You say, "Take it." She takes it.

The Editor sets it on the table at the Third Stair, three staircases above her chair, and reads it once, slowly, in the way only people who actually love what they're protecting can read.

She makes seven margin notes. She fixes two commas. She lets one joke stand that she should have cut, because the joke meant something the writer didn't know he meant.

She closes the file.

You live. The story lives. They live, frankly, longer than either of you would have expected.

Somewhere, in a different file, on a different desk, somebody writes, simply, in calm serif type: "Set in Caslon, please."

_On entering this scene: unlocks ending → **The Editor's Ending**._

> **EDITOR.** Stories survive when someone cares enough to revise them. Not rewrite. Revise. There is a difference. I have, today, made it.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §55 · The Monster
<sub>`ending_monster`</sub>

> ## ✦ ENDING — “The Monster”

Mason told you, once, on a broken column at a fork in a road, that fire without structure is destruction.

You decide, today, that he was right about the noun and wrong about whether it's a problem.

You burn a thing that did not need burning. Then another. Then the third one, because three is the number that makes a pattern, and you wanted a pattern. The block remembers. The next block hears about it. Carl from Insurance, somewhere in his neat little office, opens a new folder with your name on the tab and goes home, on time, smiling.

The Editor stops correcting you. That is the worst thing that happens to you, and you will not realize it for years.

_On entering this scene: unlocks ending → **The Monster**._

> **EDITOR.** I do not, today, have a margin note. That is also a margin note.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §56 · Carl from Insurance Wins
<sub>`ending_carl`</sub>

> ## ✦ ENDING — “Carl from Insurance Wins”

You sign.

You shouldn't have. The form had a missing comma in a list of three. You knew. You signed anyway.

Carl smiles, neatly, and offers you a windbreaker. The windbreaker fits, which is the most disappointing thing that happens to you all year.

In a margin somewhere, the Editor is, for the first time, silent.

_On entering this scene: unlocks ending → **Carl from Insurance Wins**._

> **EDITOR.** We do not, under any circumstances, sign a list of three without the comma. We just learned this. Try again.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §57 · The Man
<sub>`ending_man`</sub>

> ## ✦ ENDING — “The Man”

You put the matches down. Not dramatically. You just set them on a windowsill and leave them there, the way you'd leave a habit you've decided to outlive.

It turns out a man is harder to be than a myth. A myth doesn't have to apologize to a widow, or learn a neighbor's name, or sit through the long unglamorous middle of being trusted again. You do all of it, badly at first, then less badly. Maebie supervises. The bandana fades further. The tin of chocolate gets refilled, which is its own quiet proof that there keep being afters worth recovering from.

You never fully stop being the man who notices that things are flammable. You just stop being only that. Mason hears, eventually, and does not write to say he was wrong, but he leaves a door propped where there used to be a wall.

The Editor writes one line and underlines it once, gently, like she means it: "He chose the third thing. He chose to stay."

_On entering this scene: unlocks ending → **The Man**._

> **EDITOR.** The Man is the hardest ending to write because nothing explodes. Connection over legend, person over symbol. I am, for the record, proud of you, and I will deny having said so in any subsequent edition.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

### §58 · Reason Remains
<sub>`ending_reason`</sub>

> ## ✦ ENDING — “Reason Remains”

You don't leave. You stay, at the edge of the square, and you watch the myth finish closing over your sister like water over a stone.

By winter, no one calls her Pearson. They come from three towns over to stand at her plain table and be told the cold true thing. She is fair. She is, by every account, scrupulously, frighteningly fair — a godlike quiet that does not need a throne, only the arithmetic and the nerve to read it aloud.

Whether that is mercy or vengeance depends, in the end, on what you taught her was allowed. You were the one who kept saying her name. You were the one in the room when fairness cost something and someone had to decide whether kindness was permitted around its edges.

Reason remains. She always will, now. The only question the story leaves open — the one the Editor refuses to answer in the margin, for once — is whether the world got a judge, or got a god, and whether you can still tell the difference between the two from where you're standing.

_On entering this scene: unlocks ending → **Reason Remains**._

> **EDITOR.** Pearson is a person. Reason is what happens when people stop treating her like one. I am not going to tell you whether this ending is hopeful. You were there. You decide. That's the whole point of letting you hold the pen.

**After the ending**

- **Roll credits.** → §1 · *The Ash Wake*

---

## Detour · The Drive

_Scenes §59–§70._

> _Optional detour — branches off The Third Stair (Act IV) and loops back without touching the main line (Acts I–IX) or its endings._

### §59 · The Map With Three Addresses
<sub>`drive_hub`</sub>

You take the hand-drawn map down off the corkboard. It comes away with three pins and the faint reluctance of a thing that liked being on a wall.

Three addresses. Two coasts and a gulf between them, the country drawn in someone's careful, optimistic hand. A coffee ring sits over what might be Kansas, which feels about right.

"We could just go," Ranya says, leaning in to read it upside down, which is how she reads everything. "But the going is the point. You fly over a country, you land in the same argument you took off in. You drive it, the argument changes shape. Picks up a diner. Loses a grudge somewhere around the third state."

Maebie puts her chin on the table's edge and regards the map with the gravity of a senior logistics officer who has not yet been consulted and has opinions about that.

> **EDITOR.** The drive is the story. I will keep saying it until somebody books a road and not a flight. You can skip all of this — it loops back, nobody's holding the plot hostage — but skipping it is itself a choice, and Maebie has noticed you reaching for the fast option.

> **WRITERS' ROOM.** Hub for the optional Drive detour. Every spoke returns here or to drive_return → third_stair_corkboards, so the mainline (stew → Three Marks) is never blocked. Establishes 'the going is the point' before any route choice.

**Choices**

- **Lay out the route. Scenic, straight, or ask the dog.** → §60 · *Too Many Side Quests to Fly*
- **"Before anyone drives anywhere — dog logistics. It's a whole department."** → §63 · *The Dog Logistics Department*
  ↳ fx: Chaos +1
- **Fold the map. Pin it back. Back to the corkboards.** → §22 · *Inside the Cabin*

### §60 · Too Many Side Quests to Fly
<sub>`drive_route`</sub>

There are, the way there are always three of everything in this family, three ways to do this.

The fast way is a straight line and a thin gray interstate that promises to be over soon. The scenic way wanders — it has a squiggle near the coast that Ranya has labeled, in pencil, HERE BE DINERS. And then there is the third way, which is to put the map on the floor and watch which line Maebie steps on, because she has been right before and nobody has fully forgiven her for it.

"Flying skips too many side quests," Ranya says, not pushing. "That's not a moral position. It's just true. You miss the gas-station with the good pie. You miss the town that's only a name. You miss whatever the drive was going to tell you about yourself, which — knowing you — you'd have preferred to miss."

> **EDITOR.** Three options, and not one of them is wrong on paper. That is how I like a choice: it shapes the man who makes it instead of grading him. Pick fast and I'll respect it and also note it, the way I note everything.

> **WRITERS' ROOM.** The route fork. Fast = drive_fly_skip (regret beat, recoverable). Scenic = drive_diner. Ask-the-dog = drive_maebie_route → diner, the 'companion chooses the better path' beat. No option is mechanically punished; flags color flavor only.

**Choices**

- **Straight line. We have things to burn down. Fly the gap.** → §62 · *The Gap You Flew Over*
  ↳ fx: Chaos +1, flag `flew` → true
- **The squiggle. HERE BE DINERS. Take the long way on purpose.** → §64 · *The Dirty Spoon*
  ↳ fx: Humanity +1, Editor +1, flag `took_scenic_route` → true, flag `road_weirdness` → true
- **Put the map on the floor. "Maebie. You pick."** → §61 · *Maebie Chooses the Road*

### §61 · Maebie Chooses the Road
<sub>`drive_maebie_route`</sub>

She takes her time, because the senior partner is not to be rushed.

She smells the fast line and dismisses it the way she dismisses an empty bowl. She walks the length of the scenic squiggle, nose down, reading the paper like it's ground. Then she stops — not at the diner squiggle, but a little past it, at a fork nobody had drawn in, where the road forks toward something the map didn't bother to name. She sits on it. She looks up. She is, unmistakably, waiting for the rest of you to catch up to a decision she made some time ago.

"That's not even on here," you say.

"It is now," Ranya says, and pencils it in, and the fork onto the unnamed road is suddenly a fork that was always there, the way the third staircase is always there once you stop counting.

> **EDITOR.** Maebie is not a compass and she is not a metaphor. She is a creature who has been right before and is choosing again, which is the whole of what agency is. Follow her or don't. She'll forgive 'don't.' She forgives most things. Not all.

> **WRITERS' ROOM.** Companion agency, not plot furniture: Maebie makes an actual choice that changes the map, and the player elects to honor it. Sets maebie_trust + road_weirdness, then folds into drive_diner so the dog's pick is the better road.

**Choices**

- **Follow the dog onto the road that wasn't on the map.** → §64 · *The Dirty Spoon*
  ↳ fx: Humanity +2, Editor +1, flag `maebie_trust` → true, flag `road_weirdness` → true

### §62 · The Gap You Flew Over
<sub>`drive_fly_skip`</sub>

So you take the line. Fast, gray, efficient, over before it starts.

It works exactly the way fast things work. You arrive. You have arrived. There is a satisfaction to it that lasts about as long as the engine takes to tick cool.

What you don't get: the gas station with the hand-lettered PIE sign you'd have stopped at out of spite and remembered for a decade. The town that was only a name and a dog asleep in the road. The argument you and Ranya were going to have somewhere around the third state, the one that would have ended with one of you being right and neither of you keeping score. Maebie looks back the way you didn't drive and then forward at the nothing you bought with the time, and says nothing, because the worst thing she does is not bark.

> **EDITOR.** Flying skips too many side quests. I told you it wasn't a moral position; I lied a little — it's faster, and faster has a price, and the price is everything that would have happened in the slow part. The drive was the story. You can still go back and have it.

> **WRITERS' ROOM.** The fast-route regret beat. Not a punishment — no stat hit — but the lost discoveries are named so the cost is felt. Both exits valid: take the long way after all (drive_diner, recover the thread) or commit to the skip and bounce to the hub.

**Choices**

- **Turn around. Drive the part you skipped. The pie is waiting.** → §64 · *The Dirty Spoon*
  ↳ fx: Humanity +1, Editor +1, flag `road_weirdness` → true
- **No. We arrived. That's what arriving is for. Back to the map.** → §59 · *The Map With Three Addresses*
  ↳ fx: Chaos +1, Editor -1

### §63 · The Dog Logistics Department
<sub>`drive_logistics`</sub>

"Okay," you say, and Ranya produces a clipboard from somewhere, because someone in this operation has always already produced a clipboard.

"Water," she says. "Two bowls, the collapsible kind. Leashes, plural, because one will go missing in a state we can't pronounce. Emergency towels — non-negotiable, the ocean is involved later. Snack schedule. And this." She taps a box on the form. "Emotional support jurisdiction. Whose dog is she, in a crisis, in a county that doesn't know us."

"She's her own dog," you say.

"Wrong answer, legally, but the right one spiritually." She pencils something. "And if Bishop comes — and Bishop wants to come — we double all of it and add a column. Two dogs isn't twice the dogs. It's a department. We'd need a whole dog logistics department."

Maebie sits very straight during all of this, the way one does at the reading of one's own importance.

_On entering this scene: +Dog Logistics Clipboard._

> **EDITOR.** Before any road-trip chapter proceeds, confirm food, water, leashes, emergency towels, and emotional support jurisdiction. This is the only paperwork I have ever endorsed. Note who the second name on the clipboard is. Bishop is a good dog. Bishop is also, structurally, a promise — don't make one you won't keep.

> **WRITERS' ROOM.** Scene C: 'Dog Logistics Department.' Warm, practical, funny. Introduces Bishop as a possible second road-crew dog without overcommitting his role. Grants the Dog Logistics Clipboard, sets bishop_road_crew, returns to the hub.

**Choices**

- **"Add the column. Bishop's in. Build the department."** → §59 · *The Map With Three Addresses*
  ↳ fx: Humanity +2, Editor +1, flag `bishop_road_crew` → true
- **"Just Maebie this run. Keep the department small enough to love properly."** → §59 · *The Map With Three Addresses*
  ↳ fx: Humanity +1, flag `maebie_trust` → true

### §64 · The Dirty Spoon
<sub>`drive_diner`</sub>

The diner has no name on the front and no windows on the side, which Ranya says is either a health-code thing or a portal thing and that the two are not mutually exclusive.

Inside: vinyl the color of a long-healed bruise, coffee that has been on since an administration nobody misses, and a pie case lit like a museum. A waitress named, the tag says, FERN, brings menus you don't open. Down the counter, a man in a faded tee — cartoon saucer, abducted cow — is arguing quietly with his eggs about the Fermi paradox.

"Three things every real road trip needs," Ranya says, counting on her fingers, because of course three. "One life-changing diner. One meal that becomes family lore. And one moment you don't talk about, you just sit in." She slides the pie case a meaningful look. "I'm calling this one for the diner. The lore comes later. Sometimes that night. Sometimes the gravy."

> **EDITOR.** This diner is either foreshadowing or a health-code violation, and I have decided, in the spirit of the Third Stair, not to choose. The pie is real. The pie is the only thing in this scene I will vouch for under oath.

> **WRITERS' ROOM.** Scene D: 'The Dirty Spoon.' The life-changing diner. Hub-let: branch to the worst-meal lore beat, the optional alien/Fermi flavor at the counter, or straight on to the coast. Dirty Spoon as a recurring location-type tag.

**Choices**

- **Order whatever Fern recommends. Trust the dirty spoon.** → §65 · *The Gravy Incident*
  ↳ fx: Humanity +1
- **Slide down the counter to the man arguing with his eggs.** → §66 · *Disclosure Day, Eventually*
  ↳ fx: Evidence +1, Chaos +1
- **Coffee, a quiet minute, then back to the road. Don't push your luck.** → §68 · *Both Portlands and a Gulf*
  ↳ fx: Editor +1

### §65 · The Gravy Incident
<sub>`drive_worst_meal`</sub>

Fern recommends the special. You should have read the room — the room had no windows — but you trust the dirty spoon, and the dirty spoon repays trust the way it repays everything: completely, and not at all the way you meant.

It is the worst meal any of you has ever been served. It is also, somehow, free of malice — the gravy is simply *wrong* in a way that feels less like bad cooking than like a message in a language none of you took in school. Ranya gets the giggles first. Then you. Then even Maebie, who gets none of it and wouldn't be allowed, catches the mood and does her play-bow at the booth.

You will talk about this meal for the rest of your lives. That is the function it was built to serve. Fern, ringing you up, slides across a receipt for things you do not remember ordering and a mason jar, lid screwed tight. "For the road," she says. "In case it ever serves you worse."

_On entering this scene: +Immunity Gravy, +Receipt of Questionable Origin._

> **EDITOR.** A proper road trip needs at least one meal so bad it becomes family lore. This is that meal. The jar is not a threat. The jar is a *dare*, and you are the kind of people who keep dares in the trunk. I've added it to the manifest. I've added the receipt too — line four still says SEE SERVER and I am choosing peace.

> **WRITERS' ROOM.** Scene E: 'Worst Meal Ever Served.' The disastrous-meal-as-bonding beat — humor from situation, warmth underneath, nobody hurt. Grants Immunity Gravy + Receipt of Questionable Origin, sets collapse_appetite, on to the coast.

**Choices**

- **Keep the jar. Keep the receipt. Some lore you carry on purpose.** → §68 · *Both Portlands and a Gulf*
  ↳ fx: Humanity +2, Editor +1, flag `collapse_appetite` → true

### §66 · Disclosure Day, Eventually
<sub>`drive_disclosure`</sub>

The man's name doesn't come up. His shirt does most of his talking: cartoon saucer, a beam, a cow halfway to somewhere better, ASK ME ABOUT DISCLOSURE DAY across the chest.

"The universe is too big for us to be alone," he says, to his eggs, to you, to the windowless room. "And too quiet for that to be comforting. So where is everybody?" He counts it off, and it is, naturally, three. "Maybe the Great Filter's behind us and we already got lucky. Maybe it's ahead of us and we won't. Or maybe—" he gestures with a fork at the pie case, the coffee, the dog, the whole improbable diner "—it's sitting right here at the counter eating pie, and the answer to the Fermi paradox is that anyone smart enough to find us took one look and decided to wait for better snacks."

He peels the shirt's twin off the seat beside him — fresh, folded, roadside-stand confident — and pushes it down the counter to you. "Disclosure day's coming," he says. "Eventually. Everything is, eventually. You'll want to be dressed for it."

_On entering this scene: +Alien Extraction Shirt._

> **EDITOR.** If aliens exist, they are also subject to character agency — they get to want things, including, apparently, better snacks. This is flavor, not lore; do not let it metastasize into a plot. A man in a diner had a theory and a spare shirt. That is the entire event. Let them wonder.

> **WRITERS' ROOM.** Scene N: 'Disclosure Day, Eventually.' Optional alien/Fermi/Great-Filter flavor — joke-lore, never required exposition. The Great-Filter three-way (behind/ahead/eating pie) keeps the three-motif. Grants the Alien Extraction Shirt, returns to the road.

**Choices**

- **Take the shirt. Thank him. Get dressed for the eventually.** → §68 · *Both Portlands and a Gulf*
  ↳ fx: Evidence +1, Chaos +1, flag `saw_disclosure` → true
- **"What if Catholic guilt learned martial arts?" Change the subject entirely.** → §67 · *Guilt Learned Martial Arts*
  ↳ fx: Chaos +1 · tag: _bad joke_

### §67 · Guilt Learned Martial Arts
<sub>`drive_guilt`</sub>

The man takes the swerve in stride; diner men always do.

"Funny you ask," he says. "Town two exits back. There's a fella trains in the lot behind the church at night. Moves like — okay — like unresolved guilt took boxing lessons. Blocks like he's apologizing. Throws a hook like he means to confess it later. They say he only fights things that already had it coming, which is a hell of a way to never be wrong about a punch."

Ranya leans in. "Does it work?"

"Define work," the man says, which is the most honest answer anyone has given you all chapter.

You file it under things-that-are-true-somewhere and let it go. Not every weird light on the road needs chasing. Some of them are just a man in a parking lot, swinging at what he can't forgive, getting better at it.

> **EDITOR.** A guilt-haunted fighter, gestured at, never named, never anyone's intellectual property but ours. That is exactly the right dose. One more sentence and it's fan fiction; one fewer and it's nothing. Sparingly, I said. This was the spare.

> **WRITERS' ROOM.** Scene M: 'Guilt Learned Martial Arts.' Tiny optional flavor — the 'Catholic guilt learned martial arts' gag, fictionalized so it references no copyrighted character. Pure offshoot; returns to the road and the coast.

**Choices**

- **File it under true-somewhere. Back to the road and the coast.** → §68 · *Both Portlands and a Gulf*
  ↳ fx: Humanity +1, Editor +1, flag `guilt_dojo` → true

### §68 · Both Portlands and a Gulf
<sub>`drive_coast`</sub>

The road gives way to coast the way a held breath gives way to a sigh.

Ranya has the map out again, both Portlands circled, a line drawn between them that crosses the whole country like a dare. "Maine first," she says. "Acadia. Bar Harbor at sunset, the rocky kind of coast, ferries going out gold. Then someday the other one — Oregon, the wet green Portland, the Pacific kind of edge. Three corners of the states, give or take. We'll get the fourth eventually."

You make Bar Harbor by evening. The ferry pulls out into a sun going down like a coin into a slot, and Maebie stands at the rail with her ears doing something soft, and a seal surfaces close enough to judge you all. There is a slice of pie riding shotgun in a clamshell because of course there is. Ranya doesn't make it rain. The day is dry and gold and does not need revealing. Some things are already true in the light.

"Good thing there are two coasts and a gulf in the middle," she says quietly. "Buys us a lot of road before we run out of country."

_On entering this scene: +Road Pie._

> **EDITOR.** Bar Harbor at sunset and nobody dies and the dog is at the rail and the rain stays in its pocket because the moment doesn't need it. Fire remembers. Rain reveals. And some evenings just are, and you let them, and you write down the pie. Keep the pie line. The pie line is earned.

> **WRITERS' ROOM.** Scenes F+G: 'The Two Portlands' + 'Bar Harbor at Sunset.' The coastal travel-dream beat — Acadia, ferries, wildlife, the two-Portlands map. Ranya pointedly does NOT make it rain (quiet, not Storm; the dry moment is the point). Grants Road Pie, on to meal planning.

**Choices**

- **Don't narrate it. Just sit in it. Let the ferry go gold.** → §69 · *Late-Stage Meal Planning*
  ↳ fx: Humanity +2, Editor +2, flag `road_weirdness` → true
- **"Promise me the other Portland. The wet green one. Someday."** → §69 · *Late-Stage Meal Planning*
  ↳ fx: Humanity +1, Editor +1, flag `ranya_trust` → true

### §69 · Late-Stage Meal Planning
<sub>`drive_meal_planning`</sub>

On the ferry rail, with the gold going purple, Ranya says the thing out loud.

"Here's the plan, if the world keeps doing what it's doing." She ticks it off on the rail. "We eat our way around the coasts while it all goes to shit. Lobster rolls up here. Whatever they're frying down in the gulf. The wet green Portland when we make it. Dogs in the back. Bad coffee. Weird little stops. We don't fix it, because we can't, and we don't pretend it isn't happening, because we're not cowards. We just — refuse to spend the time we've got being miserable about the time we've got."

It should sound like giving up. It doesn't. It sounds like the opposite, said sideways. Maebie leans her whole weight on your shin, checking you're still load-bearing. You are. Out here, with the pie and the dog and the woman doing arithmetic on joy, you mostly are.

> **EDITOR.** That is not nihilism. That is meal planning under collapse. The world may end on schedule or it may not, but people still need food and dogs and weird little plans, and choosing those on purpose, with your eyes open, is the bravest small thing I know how to put in a story. Order the lobster roll. I'm serious. Order it.

> **WRITERS' ROOM.** Scenes H+10: 'Late-Stage Meal Planning' / 'Eat Our Way Around the Coasts.' The travel-collapse thesis with the emotional truth made explicit (joy under collapse, not giving up). Sets collapse_appetite, flows to drive_return. No new ending — loops home by design.

**Choices**

- **"Deal. Coasts, dogs, bad coffee, eyes open. Let's eat the apocalypse slowly."** → §70 · *The Long Way Back*
  ↳ fx: Humanity +2, Editor +1, flag `collapse_appetite` → true
- **Say nothing. Hand her half the pie. Watch the water go dark together.** → §70 · *The Long Way Back*
  ↳ fx: Humanity +2, flag `ranya_trust` → true

### §70 · The Long Way Back
<sub>`drive_return`</sub>

You drive back the way the dog chose, because the way back is also road and the road is still the story.

Somewhere around the third state the argument you were owed finally arrives, and ends the way Ranya promised — one of you right, neither keeping score. Maebie sleeps in the back with a paw over the bandana like a customs officer guarding a stamp. The jar of gravy rides in the trunk, a dare you haven't lost yet. The country scrolls back past in reverse, picking up the diners it lent you.

By the time the Third Stair's three crooked chimneys come back over the trees, you are a slightly different man than the one who took the map off the wall, which is the only thing a drive was ever for. You pin the map back up. There are three pins. There were always three pins.

The corkboards are where you left them. The stew, you suspect, is still warm.

> **EDITOR.** Good. You took the long way and it cost you a day and gave you a decade. Now go eat the stew and get on with the story — the big drives never excuse you from the small porches, and there's a man with a clipboard down the line who still thinks commas are optional.

> **WRITERS' ROOM.** Detour exit. Loops back to third_stair_corkboards so the player resumes the mainline via the existing stew → three_marks_path path. Callbacks (map pins, the dog-chosen road, the owed argument) close the thread without a new ending.

**Choices**

- **Back inside. The stew's still warm.** → §22 · *Inside the Cabin*
  ↳ fx: Editor +1

---

## Appendix A · The Inventory

_Every catalogued item, with the flavor text the player sees. Canonical IDs in `src/data/items.ts`._

- **Damp Napkin** — _Folded twice. Damp in the way only a napkin from a glove compartment can be._ <sub>`damp_napkin`</sub>
- **Strongly Worded Letter** — _Three pages. Two of them are footnotes. The Oxford comma is correctly applied._ <sub>`strongly_worded_letter`</sub>
- **Old Laptop** — _An old laptop. Battery says 4%, has said 4% for several years now._ <sub>`old_laptop`</sub>
- **Oxford Comma Seal** — _A wax seal the color of dried oxblood, stamped with three small dots in a tidy row._ <sub>`oxford_comma_seal`</sub>
- **Maebie's Collar** — _Leather, well-worn. The brass tag reads 'Maebie' in clean serif type. The spare — she's wearing the other one right now._ <sub>`maebies_collar`</sub>
- **Fire Marshal Warning** — _Letterhead, watermark, and a faint smell of righteousness._ <sub>`fire_marshal_warning`</sub>
- **Warranty Scroll** — _Rolled, ribboned, and fully expired. Carl from Insurance keeps mailing them anyway._ <sub>`warranty_scroll`</sub>
- **Burned License Plate (NEWSTRT)** — _License plate, edges blackened. It reads 'NEWSTRT.' Someone is starting something._ <sub>`burned_plate`</sub>
- **Three-Marked Relic** — _An ash-covered tablet, broken at one corner. Three symbols are burned into it in a tidy row — a flame, a spiral, and something the Editor will not name out loud._ <sub>`three_marked_relic`</sub>
- **Rain-Stained Tablet** — _A flat stone with writing only visible when wet. Ranya rinsed it once and the ink came up like a bruise._ <sub>`rain_stained_tablet`</sub>
- **Mason's Rulebook** — _A small bound volume, leather, pristine. Tabs in three colors. The footnotes argue with each other politely._ <sub>`masons_rulebook`</sub>
- **Sister Pearson's Diagram** — _A folded paper diagram. Proton, neutron, electron, drawn in calm hand. Beneath, in the same hand: 'or whatever you'd like to call them.'_ <sub>`pearsons_diagram`</sub>
- **Burned Story Fragment** — _A scrap of paper, edges scorched. One legible line: 'and then he chose, again, the third thing.'_ <sub>`burned_story_fragment`</sub>
- **Maebie's Bandana** — _Faded red, soft from washing, smells faintly of dog and clean rain. She lets you carry it. She does not, strictly, need it back — but she will check._ <sub>`maebie_bandana`</sub>
- **Emergency Chocolate** — _A battered tin of squares, grandparent-issued. The label says FOR AFTER. Official recovery protocol. Not for the dog, under any circumstances._ <sub>`emergency_chocolate`</sub>
- **Dog Logistics Clipboard** — _Water, leashes, emergency towels, snack schedule, and a box labeled EMOTIONAL SUPPORT JURISDICTION that nobody has dared check yes or no on. Two dog names at the top: Maebie, and — penciled in later, in a hopeful hand — Bishop._ <sub>`dog_logistics_clipboard`</sub>
- **Road Pie** — _A single slice in a clamshell, riding shotgun where a passenger isn't. The crust held through two states. Some pie is dessert; this pie is a travel companion with opinions about the route._ <sub>`road_pie`</sub>
- **Receipt of Questionable Origin** — _A diner receipt for items you do not remember ordering, totaled in a currency that is mostly dollars. The Editor has flagged line four ('SEE SERVER') as either foreshadowing or a health-code violation._ <sub>`receipt_of_questionable_origin`</sub>
- **Immunity Gravy** — _A mason jar of gravy from a meal that became family lore. Survived it together once; you keep a jar in case the road serves you worse. Confers no actual immunity. Confers, arguably, worse._ <sub>`immunity_gravy`</sub>
- **Alien Extraction Shirt** — _A roadside-stand tee, three sizes of confident. Cartoon saucer, beam, cow mid-ascension, slogan: ASK ME ABOUT DISCLOSURE DAY. If aliens exist, they are also subject to character agency._ <sub>`alien_extraction_shirt`</sub>

---

## Appendix B · The Endings

_The 9 endings, each with the scene it resolves at and the choice(s) that lead straight into it. The conditions shown gate that final step only — most endings also depend on stats, vows, and flags accumulated across the run, so read them alongside the scenes above._

### The Myth of Ar
Resolves at §50 · *The Myth of Ar* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Disappear. Let the story do the work.** — needs Heat ≥ 2, Chaos ≥ 2

### The Two of Them
Resolves at §51 · *The Two of Them* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Pocket the spare collar. Go home to her.** — needs has Maebie's Collar

### Public Servant of Fire
Resolves at §52 · *Public Servant of Fire* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Sign on. Officially. Sanitation, with flair.** — needs Humanity ≥ 2, Editor ≥ 2

### Rain Reveals
Resolves at §53 · *Rain Reveals* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Let her bring the rain. Let it do the telling.** — needs Humanity ≥ 2, flag `ranya_trust_high` = true

### The Editor's Ending
Resolves at §54 · *The Editor's Ending* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Hand the manuscript back. Let the Editor close it.** — needs Editor ≥ 4, flag `saved_the_story` = true

### The Monster
Resolves at §55 · *The Monster* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Become the thing he warned you about.** — needs Heat ≥ 4, flag `chose_cruelty` = true

### Carl from Insurance Wins
Resolves at §56 · *Carl from Insurance Wins* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Sign Carl's paperwork. Walk into the office.**

### The Man
Resolves at §57 · *The Man* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Put the matches down. Be a person about it. All the way down.** — needs Humanity ≥ 4, Heat ≤ 3

### Reason Remains
Resolves at §58 · *Reason Remains* — Act IX · Legacy Written in Ash.

Reached by:
- from §49 · *Legacy Written in Ash*, choosing **Stand witness while Pearson becomes Reason. Decide what that costs.** — needs flag `pearson_insight` = true

---

## Appendix C · The Editor's Standing Complaints

_Not tied to any scene. With **Chaos Mode** on, each scene surfaces one of these in the Editor's Notes panel — picked deterministically by a hash of the scene's id, so a given scene always shows the same gripe. Collected here because an editorial review should know what the Editor is like off the leash. From `src/data/editor-complaints.ts`._

- “That sentence ran a stop sign.”
- “I'd have set this paragraph in Caslon.”
- “Adjectives are not a personality.”
- “I see your comma and raise you a semicolon.”
- “Try again, but love yourself enough to use the serial comma.”
- “Brand consistency, please. We've discussed this.”
- “This is the kind of dialogue that gets blamed on a writers' room.”
- “Don't 'literally' me. I am the Editor.”
- “Two spaces after a period is a cry for help.”
- “That metaphor is working overtime it never clocked in for.”
- “You buried the verb. Go dig it back out.”
- “An em dash, an en dash, and a hyphen walk into a bar. You used the wrong one.”
- “Passive voice was used here. By you. Own it.”
- “Cut three words. Any three. Start with the ones you love.”
- “This paragraph and I are not, currently, on speaking terms.”
- “Kerning this tight should be, at minimum, a misdemeanor.”
- “A dash is not a personality, but it's closer than the adjectives were.”
- “I have notes. I always have notes.”
