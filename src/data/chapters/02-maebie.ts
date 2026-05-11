import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter2 = [
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
] as const satisfies readonly Scene[];
