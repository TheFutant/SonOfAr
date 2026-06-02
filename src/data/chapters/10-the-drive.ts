import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

/**
 * Optional road-trip detour. Reachable from the Third Stair hub
 * (third_stair_corkboards) and loops back to it — it does NOT touch the I–IX
 * mainline or its endings. Theme: "the drive is the story." Diners, dog
 * logistics, the two Portlands, meal planning under collapse, and a little
 * optional alien/Fermi flavor. Chapter label is "Detour · The Drive" on
 * purpose: a side road, not Chapter X.
 */
export const chapter10 = [
  {
    id: "drive_hub",
    title: "The Map With Three Addresses",
    chapter: "Detour · The Drive",
    body: `You take the hand-drawn map down off the corkboard. It comes away with three pins and the faint reluctance of a thing that liked being on a wall.

Three addresses. Two coasts and a gulf between them, the country drawn in someone's careful, optimistic hand. A coffee ring sits over what might be Kansas, which feels about right.

"We could just go," Ranya says, leaning in to read it upside down, which is how she reads everything. "But the going is the point. You fly over a country, you land in the same argument you took off in. You drive it, the argument changes shape. Picks up a diner. Loses a grudge somewhere around the third state."

Maebie puts her chin on the table's edge and regards the map with the gravity of a senior logistics officer who has not yet been consulted and has opinions about that.`,
    editorNote:
      "The drive is the story. I will keep saying it until somebody books a road and not a flight. You can skip all of this — it loops back, nobody's holding the plot hostage — but skipping it is itself a choice, and Maebie has noticed you reaching for the fast option.",
    writersRoomNote:
      "Hub for the optional Drive detour. Every spoke returns here or to drive_return → third_stair_corkboards, so the mainline (stew → Three Marks) is never blocked. Establishes 'the going is the point' before any route choice.",
    choices: [
      {
        id: "drive_plan_route",
        label: "Lay out the route. Scenic, straight, or ask the dog.",
        next: "drive_route",
      },
      {
        id: "drive_do_logistics",
        label: "\"Before anyone drives anywhere — dog logistics. It's a whole department.\"",
        next: "drive_logistics",
        effects: { stats: { chaos: 1 } },
      },
      {
        id: "drive_fold_map",
        label: "Fold the map. Pin it back. Back to the corkboards.",
        next: "third_stair_corkboards",
      },
    ],
  },
  {
    id: "drive_route",
    title: "Too Many Side Quests to Fly",
    chapter: "Detour · The Drive",
    body: `There are, the way there are always three of everything in this family, three ways to do this.

The fast way is a straight line and a thin gray interstate that promises to be over soon. The scenic way wanders — it has a squiggle near the coast that Ranya has labeled, in pencil, HERE BE DINERS. And then there is the third way, which is to put the map on the floor and watch which line Maebie steps on, because she has been right before and nobody has fully forgiven her for it.

"Flying skips too many side quests," Ranya says, not pushing. "That's not a moral position. It's just true. You miss the gas-station with the good pie. You miss the town that's only a name. You miss whatever the drive was going to tell you about yourself, which — knowing you — you'd have preferred to miss."`,
    editorNote:
      "Three options, and not one of them is wrong on paper. That is how I like a choice: it shapes the man who makes it instead of grading him. Pick fast and I'll respect it and also note it, the way I note everything.",
    writersRoomNote:
      "The route fork. Fast = drive_fly_skip (regret beat, recoverable). Scenic = drive_diner. Ask-the-dog = drive_maebie_route → diner, the 'companion chooses the better path' beat. No option is mechanically punished; flags color flavor only.",
    choices: [
      {
        id: "route_fast",
        label: "Straight line. We have things to burn down. Fly the gap.",
        next: "drive_fly_skip",
        effects: { stats: { chaos: 1 }, setFlags: [{ key: "flew", value: true }] },
      },
      {
        id: "route_scenic",
        label: "The squiggle. HERE BE DINERS. Take the long way on purpose.",
        next: "drive_diner",
        effects: {
          stats: { humanity: 1, editorApproval: 1 },
          setFlags: [
            { key: "took_scenic_route", value: true },
            { key: "road_weirdness", value: true },
          ],
        },
      },
      {
        id: "route_dog",
        label: "Put the map on the floor. \"Maebie. You pick.\"",
        next: "drive_maebie_route",
      },
    ],
  },
  {
    id: "drive_maebie_route",
    title: "Maebie Chooses the Road",
    chapter: "Detour · The Drive",
    body: `She takes her time, because the senior partner is not to be rushed.

She smells the fast line and dismisses it the way she dismisses an empty bowl. She walks the length of the scenic squiggle, nose down, reading the paper like it's ground. Then she stops — not at the diner squiggle, but a little past it, at a fork nobody had drawn in, where the road forks toward something the map didn't bother to name. She sits on it. She looks up. She is, unmistakably, waiting for the rest of you to catch up to a decision she made some time ago.

"That's not even on here," you say.

"It is now," Ranya says, and pencils it in, and the fork onto the unnamed road is suddenly a fork that was always there, the way the third staircase is always there once you stop counting.`,
    editorNote:
      "Maebie is not a compass and she is not a metaphor. She is a creature who has been right before and is choosing again, which is the whole of what agency is. Follow her or don't. She'll forgive 'don't.' She forgives most things. Not all.",
    writersRoomNote:
      "Companion agency, not plot furniture: Maebie makes an actual choice that changes the map, and the player elects to honor it. Sets maebie_trust + road_weirdness, then folds into drive_diner so the dog's pick is the better road.",
    choices: [
      {
        id: "maebie_route_follow",
        label: "Follow the dog onto the road that wasn't on the map.",
        next: "drive_diner",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [
            { key: "maebie_trust", value: true },
            { key: "road_weirdness", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "drive_fly_skip",
    title: "The Gap You Flew Over",
    chapter: "Detour · The Drive",
    body: `So you take the line. Fast, gray, efficient, over before it starts.

It works exactly the way fast things work. You arrive. You have arrived. There is a satisfaction to it that lasts about as long as the engine takes to tick cool.

What you don't get: the gas station with the hand-lettered PIE sign you'd have stopped at out of spite and remembered for a decade. The town that was only a name and a dog asleep in the road. The argument you and Ranya were going to have somewhere around the third state, the one that would have ended with one of you being right and neither of you keeping score. Maebie looks back the way you didn't drive and then forward at the nothing you bought with the time, and says nothing, because the worst thing she does is not bark.`,
    editorNote:
      "Flying skips too many side quests. I told you it wasn't a moral position; I lied a little — it's faster, and faster has a price, and the price is everything that would have happened in the slow part. The drive was the story. You can still go back and have it.",
    writersRoomNote:
      "The fast-route regret beat. Not a punishment — no stat hit — but the lost discoveries are named so the cost is felt. Both exits valid: take the long way after all (drive_diner, recover the thread) or commit to the skip and bounce to the hub.",
    choices: [
      {
        id: "fly_reconsider",
        label: "Turn around. Drive the part you skipped. The pie is waiting.",
        next: "drive_diner",
        effects: {
          stats: { humanity: 1, editorApproval: 1 },
          setFlags: [{ key: "road_weirdness", value: true }],
        },
      },
      {
        id: "fly_commit",
        label: "No. We arrived. That's what arriving is for. Back to the map.",
        next: "drive_hub",
        effects: { stats: { chaos: 1, editorApproval: -1 } },
      },
    ],
  },
  {
    id: "drive_logistics",
    title: "The Dog Logistics Department",
    chapter: "Detour · The Drive",
    body: `"Okay," you say, and Ranya produces a clipboard from somewhere, because someone in this operation has always already produced a clipboard.

"Water," she says. "Two bowls, the collapsible kind. Leashes, plural, because one will go missing in a state we can't pronounce. Emergency towels — non-negotiable, the ocean is involved later. Snack schedule. And this." She taps a box on the form. "Emotional support jurisdiction. Whose dog is she, in a crisis, in a county that doesn't know us."

"She's her own dog," you say.

"Wrong answer, legally, but the right one spiritually." She pencils something. "And if Bishop comes — and Bishop wants to come — we double all of it and add a column. Two dogs isn't twice the dogs. It's a department. We'd need a whole dog logistics department."

Maebie sits very straight during all of this, the way one does at the reading of one's own importance.`,
    editorNote:
      "Before any road-trip chapter proceeds, confirm food, water, leashes, emergency towels, and emotional support jurisdiction. This is the only paperwork I have ever endorsed. Note who the second name on the clipboard is. Bishop is a good dog. Bishop is also, structurally, a promise — don't make one you won't keep.",
    writersRoomNote:
      "Scene C: 'Dog Logistics Department.' Warm, practical, funny. Introduces Bishop as a possible second road-crew dog without overcommitting his role. Grants the Dog Logistics Clipboard, sets bishop_road_crew, returns to the hub.",
    onEnter: {
      addItems: [ITEMS.dog_logistics_clipboard],
    },
    choices: [
      {
        id: "logistics_bishop_in",
        label: "\"Add the column. Bishop's in. Build the department.\"",
        next: "drive_hub",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [{ key: "bishop_road_crew", value: true }],
        },
      },
      {
        id: "logistics_just_maebie",
        label: "\"Just Maebie this run. Keep the department small enough to love properly.\"",
        next: "drive_hub",
        effects: {
          stats: { humanity: 1 },
          setFlags: [{ key: "maebie_trust", value: true }],
        },
      },
    ],
  },
  {
    id: "drive_diner",
    title: "The Dirty Spoon",
    chapter: "Detour · The Drive",
    body: `The diner has no name on the front and no windows on the side, which Ranya says is either a health-code thing or a portal thing and that the two are not mutually exclusive.

Inside: vinyl the color of a long-healed bruise, coffee that has been on since an administration nobody misses, and a pie case lit like a museum. A waitress named, the tag says, FERN, brings menus you don't open. Down the counter, a man in a faded tee — cartoon saucer, abducted cow — is arguing quietly with his eggs about the Fermi paradox.

"Three things every real road trip needs," Ranya says, counting on her fingers, because of course three. "One life-changing diner. One meal that becomes family lore. And one moment you don't talk about, you just sit in." She slides the pie case a meaningful look. "I'm calling this one for the diner. The lore comes later. Sometimes that night. Sometimes the gravy."`,
    editorNote:
      "This diner is either foreshadowing or a health-code violation, and I have decided, in the spirit of the Third Stair, not to choose. The pie is real. The pie is the only thing in this scene I will vouch for under oath.",
    writersRoomNote:
      "Scene D: 'The Dirty Spoon.' The life-changing diner. Hub-let: branch to the worst-meal lore beat, the optional alien/Fermi flavor at the counter, or straight on to the coast. Dirty Spoon as a recurring location-type tag.",
    choices: [
      {
        id: "diner_order_pie",
        label: "Order whatever Fern recommends. Trust the dirty spoon.",
        next: "drive_worst_meal",
        effects: { stats: { humanity: 1 } },
      },
      {
        id: "diner_alien_guy",
        label: "Slide down the counter to the man arguing with his eggs.",
        next: "drive_disclosure",
        effects: { stats: { chaos: 1, evidence: 1 } },
      },
      {
        id: "diner_just_coffee",
        label: "Coffee, a quiet minute, then back to the road. Don't push your luck.",
        next: "drive_coast",
        effects: { stats: { editorApproval: 1 } },
      },
    ],
  },
  {
    id: "drive_worst_meal",
    title: "The Gravy Incident",
    chapter: "Detour · The Drive",
    body: `Fern recommends the special. You should have read the room — the room had no windows — but you trust the dirty spoon, and the dirty spoon repays trust the way it repays everything: completely, and not at all the way you meant.

It is the worst meal any of you has ever been served. It is also, somehow, free of malice — the gravy is simply *wrong* in a way that feels less like bad cooking than like a message in a language none of you took in school. Ranya gets the giggles first. Then you. Then even Maebie, who gets none of it and wouldn't be allowed, catches the mood and does her play-bow at the booth.

You will talk about this meal for the rest of your lives. That is the function it was built to serve. Fern, ringing you up, slides across a receipt for things you do not remember ordering and a mason jar, lid screwed tight. "For the road," she says. "In case it ever serves you worse."`,
    editorNote:
      "A proper road trip needs at least one meal so bad it becomes family lore. This is that meal. The jar is not a threat. The jar is a *dare*, and you are the kind of people who keep dares in the trunk. I've added it to the manifest. I've added the receipt too — line four still says SEE SERVER and I am choosing peace.",
    writersRoomNote:
      "Scene E: 'Worst Meal Ever Served.' The disastrous-meal-as-bonding beat — humor from situation, warmth underneath, nobody hurt. Grants Immunity Gravy + Receipt of Questionable Origin, sets collapse_appetite, on to the coast.",
    onEnter: {
      addItems: [ITEMS.immunity_gravy, ITEMS.receipt_of_questionable_origin],
    },
    choices: [
      {
        id: "worst_meal_lore",
        label: "Keep the jar. Keep the receipt. Some lore you carry on purpose.",
        next: "drive_coast",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [{ key: "collapse_appetite", value: true }],
        },
      },
    ],
  },
  {
    id: "drive_disclosure",
    title: "Disclosure Day, Eventually",
    chapter: "Detour · The Drive",
    body: `The man's name doesn't come up. His shirt does most of his talking: cartoon saucer, a beam, a cow halfway to somewhere better, ASK ME ABOUT DISCLOSURE DAY across the chest.

"The universe is too big for us to be alone," he says, to his eggs, to you, to the windowless room. "And too quiet for that to be comforting. So where is everybody?" He counts it off, and it is, naturally, three. "Maybe the Great Filter's behind us and we already got lucky. Maybe it's ahead of us and we won't. Or maybe—" he gestures with a fork at the pie case, the coffee, the dog, the whole improbable diner "—it's sitting right here at the counter eating pie, and the answer to the Fermi paradox is that anyone smart enough to find us took one look and decided to wait for better snacks."

He peels the shirt's twin off the seat beside him — fresh, folded, roadside-stand confident — and pushes it down the counter to you. "Disclosure day's coming," he says. "Eventually. Everything is, eventually. You'll want to be dressed for it."`,
    editorNote:
      "If aliens exist, they are also subject to character agency — they get to want things, including, apparently, better snacks. This is flavor, not lore; do not let it metastasize into a plot. A man in a diner had a theory and a spare shirt. That is the entire event. Let them wonder.",
    writersRoomNote:
      "Scene N: 'Disclosure Day, Eventually.' Optional alien/Fermi/Great-Filter flavor — joke-lore, never required exposition. The Great-Filter three-way (behind/ahead/eating pie) keeps the three-motif. Grants the Alien Extraction Shirt, returns to the road.",
    onEnter: {
      addItems: [ITEMS.alien_extraction_shirt],
    },
    choices: [
      {
        id: "disclosure_take_shirt",
        label: "Take the shirt. Thank him. Get dressed for the eventually.",
        next: "drive_coast",
        effects: {
          stats: { chaos: 1, evidence: 1 },
          setFlags: [{ key: "saw_disclosure", value: true }],
        },
      },
      {
        id: "disclosure_one_more",
        label: "\"What if Catholic guilt learned martial arts?\" Change the subject entirely.",
        next: "drive_guilt",
        effects: { stats: { chaos: 1 } },
        tag: "bad joke",
      },
    ],
  },
  {
    id: "drive_guilt",
    title: "Guilt Learned Martial Arts",
    chapter: "Detour · The Drive",
    body: `The man takes the swerve in stride; diner men always do.

"Funny you ask," he says. "Town two exits back. There's a fella trains in the lot behind the church at night. Moves like — okay — like unresolved guilt took boxing lessons. Blocks like he's apologizing. Throws a hook like he means to confess it later. They say he only fights things that already had it coming, which is a hell of a way to never be wrong about a punch."

Ranya leans in. "Does it work?"

"Define work," the man says, which is the most honest answer anyone has given you all chapter.

You file it under things-that-are-true-somewhere and let it go. Not every weird light on the road needs chasing. Some of them are just a man in a parking lot, swinging at what he can't forgive, getting better at it.`,
    editorNote:
      "A guilt-haunted fighter, gestured at, never named, never anyone's intellectual property but ours. That is exactly the right dose. One more sentence and it's fan fiction; one fewer and it's nothing. Sparingly, I said. This was the spare.",
    writersRoomNote:
      "Scene M: 'Guilt Learned Martial Arts.' Tiny optional flavor — the 'Catholic guilt learned martial arts' gag, fictionalized so it references no copyrighted character. Pure offshoot; returns to the road and the coast.",
    choices: [
      {
        id: "guilt_let_it_go",
        label: "File it under true-somewhere. Back to the road and the coast.",
        next: "drive_coast",
        effects: {
          stats: { humanity: 1, editorApproval: 1 },
          setFlags: [{ key: "guilt_dojo", value: true }],
        },
      },
    ],
  },
  {
    id: "drive_coast",
    title: "Both Portlands and a Gulf",
    chapter: "Detour · The Drive",
    body: `The road gives way to coast the way a held breath gives way to a sigh.

Ranya has the map out again, both Portlands circled, a line drawn between them that crosses the whole country like a dare. "Maine first," she says. "Acadia. Bar Harbor at sunset, the rocky kind of coast, ferries going out gold. Then someday the other one — Oregon, the wet green Portland, the Pacific kind of edge. Three corners of the states, give or take. We'll get the fourth eventually."

You make Bar Harbor by evening. The ferry pulls out into a sun going down like a coin into a slot, and Maebie stands at the rail with her ears doing something soft, and a seal surfaces close enough to judge you all. There is a slice of pie riding shotgun in a clamshell because of course there is. Ranya doesn't make it rain. The day is dry and gold and does not need revealing. Some things are already true in the light.

"Good thing there are two coasts and a gulf in the middle," she says quietly. "Buys us a lot of road before we run out of country."`,
    editorNote:
      "Bar Harbor at sunset and nobody dies and the dog is at the rail and the rain stays in its pocket because the moment doesn't need it. Fire remembers. Rain reveals. And some evenings just are, and you let them, and you write down the pie. Keep the pie line. The pie line is earned.",
    writersRoomNote:
      "Scenes F+G: 'The Two Portlands' + 'Bar Harbor at Sunset.' The coastal travel-dream beat — Acadia, ferries, wildlife, the two-Portlands map. Ranya pointedly does NOT make it rain (quiet, not Storm; the dry moment is the point). Grants Road Pie, on to meal planning.",
    onEnter: {
      addItems: [ITEMS.road_pie],
    },
    choices: [
      {
        id: "coast_sit_in_it",
        label: "Don't narrate it. Just sit in it. Let the ferry go gold.",
        next: "drive_meal_planning",
        effects: {
          stats: { humanity: 2, editorApproval: 2 },
          setFlags: [{ key: "road_weirdness", value: true }],
        },
      },
      {
        id: "coast_plan_oregon",
        label: "\"Promise me the other Portland. The wet green one. Someday.\"",
        next: "drive_meal_planning",
        effects: {
          stats: { humanity: 1, editorApproval: 1 },
          setFlags: [{ key: "ranya_trust", value: true }],
        },
      },
    ],
  },
  {
    id: "drive_meal_planning",
    title: "Late-Stage Meal Planning",
    chapter: "Detour · The Drive",
    body: `On the ferry rail, with the gold going purple, Ranya says the thing out loud.

"Here's the plan, if the world keeps doing what it's doing." She ticks it off on the rail. "We eat our way around the coasts while it all goes to shit. Lobster rolls up here. Whatever they're frying down in the gulf. The wet green Portland when we make it. Dogs in the back. Bad coffee. Weird little stops. We don't fix it, because we can't, and we don't pretend it isn't happening, because we're not cowards. We just — refuse to spend the time we've got being miserable about the time we've got."

It should sound like giving up. It doesn't. It sounds like the opposite, said sideways. Maebie leans her whole weight on your shin, checking you're still load-bearing. You are. Out here, with the pie and the dog and the woman doing arithmetic on joy, you mostly are.`,
    editorNote:
      "That is not nihilism. That is meal planning under collapse. The world may end on schedule or it may not, but people still need food and dogs and weird little plans, and choosing those on purpose, with your eyes open, is the bravest small thing I know how to put in a story. Order the lobster roll. I'm serious. Order it.",
    writersRoomNote:
      "Scenes H+10: 'Late-Stage Meal Planning' / 'Eat Our Way Around the Coasts.' The travel-collapse thesis with the emotional truth made explicit (joy under collapse, not giving up). Sets collapse_appetite, flows to drive_return. No new ending — loops home by design.",
    choices: [
      {
        id: "meal_plan_in",
        label: "\"Deal. Coasts, dogs, bad coffee, eyes open. Let's eat the apocalypse slowly.\"",
        next: "drive_return",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [{ key: "collapse_appetite", value: true }],
        },
      },
      {
        id: "meal_plan_quiet",
        label: "Say nothing. Hand her half the pie. Watch the water go dark together.",
        next: "drive_return",
        effects: {
          stats: { humanity: 2 },
          setFlags: [{ key: "ranya_trust", value: true }],
        },
      },
    ],
  },
  {
    id: "drive_return",
    title: "The Long Way Back",
    chapter: "Detour · The Drive",
    body: `You drive back the way the dog chose, because the way back is also road and the road is still the story.

Somewhere around the third state the argument you were owed finally arrives, and ends the way Ranya promised — one of you right, neither keeping score. Maebie sleeps in the back with a paw over the bandana like a customs officer guarding a stamp. The jar of gravy rides in the trunk, a dare you haven't lost yet. The country scrolls back past in reverse, picking up the diners it lent you.

By the time the Third Stair's three crooked chimneys come back over the trees, you are a slightly different man than the one who took the map off the wall, which is the only thing a drive was ever for. You pin the map back up. There are three pins. There were always three pins.

The corkboards are where you left them. The stew, you suspect, is still warm.`,
    editorNote:
      "Good. You took the long way and it cost you a day and gave you a decade. Now go eat the stew and get on with the story — the big drives never excuse you from the small porches, and there's a man with a clipboard down the line who still thinks commas are optional.",
    writersRoomNote:
      "Detour exit. Loops back to third_stair_corkboards so the player resumes the mainline via the existing stew → three_marks_path path. Callbacks (map pins, the dog-chosen road, the owed argument) close the thread without a new ending.",
    choices: [
      {
        id: "return_to_stair",
        label: "Back inside. The stew's still warm.",
        next: "third_stair_corkboards",
        effects: { stats: { editorApproval: 1 } },
      },
    ],
  },
] as const satisfies readonly Scene[];
