import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter5 = [
  {
    id: "three_marks_path",
    title: "Three Roads, Lightly Burned",
    chapter: "V · Three Marks",
    body: `The path from the Third Stair bends left, then right, then forks into three.

You take none of them. There is a fourth path, which is the one between the other three, which is the one a man like you is required to use.

In the dust beside the fork: a broken column. Greek-looking, in the sense that everything old eventually looks Greek. Three burned marks circle its base — a small flame, a tidy spiral, and a third symbol the Editor has, in fact, refused to draw twice.`,
    editorNote:
      "I am declining to render the third symbol. Some glyphs eat the page. Walk past it and stop staring at me.",
    writersRoomNote:
      "Chapter V intro establishes the 'three' motif environmentally before any character voices it. Greek-relic flavor sets up that Arson's story has cycled before.",
    choices: [
      {
        id: "investigate_column",
        label: "Crouch down. Read the marks.",
        next: "three_marks_relic",
      },
    ],
  },
  {
    id: "three_marks_relic",
    title: "The Third Mark",
    chapter: "V · Three Marks",
    body: `Half-buried beside the column: a tablet, ash-grey, broken at one corner. The same three symbols repeat across its face in three tidy rows. Flame, spiral, and the thing the Editor will not name.

You feel a sentence rising from somewhere behind your sternum. Three is a pattern. Three is on purpose. Three is, possibly, a setup.

The Editor leans in. So does the dust.`,
    editorNote:
      "Pick one reading. They are all, in fairness, technically defensible. That is why people fight about them.",
    writersRoomNote:
      "Four-way interpretive fork: science, faith, coincidence, manipulation. Each sets an interpret_* flag so later scenes can call back.",
    onEnter: {
      addItems: [ITEMS.three_marked_relic],
    },
    choices: [
      {
        id: "interpret_science",
        label: "It's a pattern. Patterns mean engineering, not gods.",
        next: "three_marks_mason",
        effects: {
          stats: { evidence: 2, editorApproval: 1 },
          setFlags: [{ key: "interpret_science", value: true }],
        },
      },
      {
        id: "interpret_faith",
        label: "It's a sign. Threes don't repeat by accident.",
        next: "three_marks_mason",
        effects: {
          stats: { humanity: 1, editorApproval: 1 },
          setFlags: [{ key: "interpret_faith", value: true }],
        },
      },
      {
        id: "interpret_coincidence",
        label: "It's a thing some monk needed to keep busy.",
        next: "three_marks_mason",
        effects: {
          stats: { chaos: 2, editorApproval: -1 },
          setFlags: [{ key: "interpret_coincidence", value: true }],
        },
        tag: "bad joke",
      },
      {
        id: "interpret_manipulation",
        label: "It's bait. Somebody's selling the pattern.",
        next: "three_marks_mason",
        effects: {
          stats: { heat: 1, evidence: 1 },
          setFlags: [{ key: "interpret_manipulation", value: true }],
        },
      },
    ],
  },
  {
    id: "three_marks_mason",
    title: "Mason's Argument",
    chapter: "V · Three Marks",
    body: `The man who appears at the fork has your eyebrows, your jaw, and none of your priors. He is dressed the way you dress in the dream you have where you are a more reasonable person.

"Hello, brother," Mason says, evenly. He has a book in one hand and a small, neat smile in the other. "I'd like five minutes. I'd like them on the record."

He sits, uninvited, on the broken column. The marks at its base do not flinch.

"Fire without structure," he says, "is destruction. Structure without mercy is — I know. You'll say cage. I'll say frame. We can argue about furniture later. Listen first."`,
    editorNote:
      "Mason punctuates the way I would, if I were unwell about it. Note that he says 'frame.' Note that he is, technically, correct about furniture.",
    writersRoomNote:
      "Mason is intelligent and emotionally connected to Arson, not a stock villain. Four response choices test rage / sarcasm / restraint / vulnerability — each sets a mason_* flag.",
    onEnter: {
      addItems: [ITEMS.masons_rulebook],
    },
    choices: [
      {
        id: "mason_rage",
        label: "Stand up. Loom. Say nothing. Mean every word of nothing.",
        next: "three_marks_pearson",
        effects: {
          stats: { heat: 2, humanity: -1, editorApproval: -1 },
          setFlags: [{ key: "mason_sees_lost", value: true }],
        },
      },
      {
        id: "mason_sarcasm",
        label: '"Five minutes. I\'ll bill you in dry napkins."',
        next: "three_marks_pearson",
        effects: {
          stats: { chaos: 2, editorApproval: 1 },
          setFlags: [{ key: "mason_amused", value: true }],
        },
        tag: "bad joke",
      },
      {
        id: "mason_restraint",
        label: "Sit on the column. Across from him. Listen.",
        next: "three_marks_pearson",
        effects: {
          stats: { humanity: 1, editorApproval: 2 },
          setFlags: [{ key: "mason_sees_redeemable", value: true }],
        },
      },
      {
        id: "mason_vulnerability",
        label: '"Frame, then. Talk to me like we\'re still on the same shelf."',
        next: "three_marks_pearson",
        effects: {
          stats: { humanity: 2, editorApproval: 2 },
          setFlags: [
            { key: "mason_listens", value: true },
            { key: "saved_the_story", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "three_marks_pearson",
    title: "Sister Pearson's Table",
    chapter: "V · Three Marks",
    body: `Around a bend in the path, in a clearing where the ash has been swept into three neat half-moons, there is a folding table. Sitting at it, in a coat that is either monastic or just well-made, is a woman with your father's quiet eyes and none of your father's patience.

"Sister Pearson," she says, before you ask. "Yes. Yes. And yes, in that order, to the three questions you were about to ask me."

On the table, three things:

— a small religious icon, brass, calmly framed,
— a paper model of three particles arranged like a tidy committee,
— and a single scrap of paper, edges scorched, that reads, in a sentence she did not write: "and then he chose, again, the third thing."

"Pick the true one," she says. "It's a short test. You may have noticed it has three answers."`,
    editorNote:
      "Pearson is the smartest person in your family, which is, on this branch, not a high bar. Her diagrams have footnotes that argue with the equations. Behave.",
    writersRoomNote:
      "Three-objects scene maps to science / faith / story. The 'refuse' choice exists as a fourth — the brief said no answer is fully correct, so refusing reads as the actually-correct meta-answer.",
    choices: [
      {
        id: "pearson_icon",
        label: "The icon. Faith holds shapes the others don't.",
        next: "three_marks_oxford",
        effects: {
          stats: { editorApproval: 1, humanity: 1 },
          addItems: [ITEMS.pearsons_diagram],
          setFlags: [{ key: "pearson_faith", value: true }],
        },
      },
      {
        id: "pearson_science",
        label: "The diagram. Three particles. That's the engine.",
        next: "three_marks_oxford",
        effects: {
          stats: { evidence: 2 },
          addItems: [ITEMS.pearsons_diagram],
          setFlags: [{ key: "pearson_science", value: true }],
        },
      },
      {
        id: "pearson_story",
        label: "The scrap. Stories are what survive the other two.",
        next: "three_marks_oxford",
        effects: {
          stats: { humanity: 1, editorApproval: 2 },
          addItems: [ITEMS.burned_story_fragment],
          setFlags: [
            { key: "pearson_story", value: true },
            { key: "saved_the_story", value: true },
          ],
        },
      },
      {
        id: "pearson_refuse",
        label: '"None of them. Or all three. You set up the trick, Sister."',
        next: "three_marks_oxford",
        effects: {
          stats: { chaos: 1, evidence: 1, editorApproval: 1 },
          setFlags: [{ key: "pearson_refuse", value: true }],
        },
      },
    ],
  },
  {
    id: "three_marks_oxford",
    title: "Arson Mason and Pearson",
    chapter: "V · Three Marks",
    body: `Sister Pearson folds the table with the ease of someone who has folded it before, in a previous life, possibly. As she stands she says, mildly:

"It was good to see you again. Arson, Mason and Pearson."

You stop walking.

"Three things in a list," you say, and your voice is, frankly, more careful than you meant it. "Three. Comma between the second and the third one. Or it's not a list. It's a duet with a guest verse."

You reach into the inside pocket of your coat. The Oxford Comma Seal is, of course, there. It is always there. You press it into the dust at the edge of the path. It leaves the cleanest, smallest mark.

Sister Pearson looks at the mark, and then at you, and her face does the small private thing faces do when they are not going to admit anything.

"Noted," she says. "Arson, Mason, and Pearson, then."`,
    editorNote:
      "This is the only time in this game you will see me cry. I am not crying. Move along.",
    writersRoomNote:
      "Oxford comma joke that reveals character: Arson cares about precision when it concerns family. The seal isn't deployed in anger here — it's deployed for the record.",
    choices: [
      {
        id: "oxford_walk_on",
        label: "Walk on. The mark stays.",
        next: "three_marks_ranya",
        effects: {
          stats: { editorApproval: 2, humanity: 1 },
        },
      },
      {
        id: "oxford_pocket_seal",
        label: "Pocket the seal again. Some marks belong to the rain.",
        next: "three_marks_ranya",
        effects: {
          stats: { humanity: 1, editorApproval: 1 },
          setFlags: [{ key: "left_seal_for_rain", value: true }],
        },
      },
    ],
  },
  {
    id: "three_marks_ranya",
    title: "Rain Without Thunder",
    chapter: "V · Three Marks",
    body: `The clearing past Sister Pearson's folded table has been burned, recently, and politely — the way Arson would do it, if Arson did. There is no smoke. There is just a flat field of ash, the kind that takes a footprint and then thinks about it.

A woman is standing in the middle of it. She is not dressed for weather. She lifts one hand, almost lazily, and it begins to rain — softly, evenly, on roughly fifteen feet of ash and nothing else.

Letters rise out of the wet ground like a bruise coming up. Names. A list. The third name is yours.

"Fire remembers," she says, without looking at you. "Rain reveals."

She lowers her hand. The rain stops. The names remain.

"I'm Ranya," she says, finally turning. "I make it rain. Not like Storm. Quieter. I read what fire is too proud to say."`,
    editorNote:
      "She is, for the record, my favorite of your new collaborators. Note that she did not summon weather. She permitted it.",
    writersRoomNote:
      "Ranya's power is subtle and emotional. Three choices: trust / wariness / callback to her line. Callback option awards highest ranya_trust because it shows Arson listened.",
    onEnter: {
      addItems: [ITEMS.rain_stained_tablet],
    },
    choices: [
      {
        id: "ranya_trust",
        label: "Step into the wet ash. Read the third name aloud.",
        next: "three_marks_partners",
        effects: {
          stats: { evidence: 2, humanity: 1 },
          setFlags: [{ key: "ranya_trust", value: true }],
        },
      },
      {
        id: "ranya_wary",
        label: "Stay at the edge. Watch her hands.",
        next: "three_marks_partners",
        effects: {
          stats: { heat: 1, evidence: 1 },
        },
      },
      {
        id: "ranya_callback",
        label: '"Fire remembers. Rain reveals." (say it back)',
        next: "three_marks_partners",
        effects: {
          stats: { humanity: 2, editorApproval: 2 },
          setFlags: [
            { key: "ranya_trust", value: true },
            { key: "ranya_trust_high", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "three_marks_partners",
    title: "Good Partners",
    chapter: "V · Three Marks",
    body: `The two of you sit on the lip of an old observatory wall, which is what the clearing turns out to be. There is no danger here. There is, just for a moment, no plot.

"You burn," Ranya says. "Sometimes for the right reasons. Sometimes for reasons you don't tell anyone, including yourself."

"That tracks," you say.

"I rain. Not on you. With you. Or near you, when you've forgotten you're standing in the middle of something."

The observatory, behind you, contains exactly three dead telescopes. Maebie, three streets and a chapter back, is asleep in a sunbeam.

You think, almost in spite of yourself: good partners even each other out. You don't say it. The Editor writes it, in margin pencil, like it has been waiting for the page.`,
    editorNote:
      "Good partners even each other out. I am going to print that on something. Probably a bookmark. Probably yours.",
    writersRoomNote:
      "The required quiet scene. No combat, no danger. Two choices: acknowledge the balance (high reward) or deflect with humor (small reward, doesn't punish). Both are valid characterizations.",
    choices: [
      {
        id: "partners_acknowledge",
        label: '"Good partners even each other out."',
        next: "three_marks_converge",
        effects: {
          stats: { humanity: 2, editorApproval: 2 },
          setFlags: [
            { key: "ranya_trust_high", value: true },
            { key: "saved_the_story", value: true },
          ],
        },
      },
      {
        id: "partners_deflect",
        label: '"Are you going to make it rain on the next guy too, or is this exclusive?"',
        next: "three_marks_converge",
        effects: {
          stats: { chaos: 1, humanity: 1 },
          setFlags: [{ key: "ranya_trust", value: true }],
        },
        tag: "bad joke",
      },
    ],
  },
  {
    id: "three_marks_converge",
    title: "Toward the Insurance Man",
    chapter: "V · Three Marks",
    body: `You come down off the observatory wall. The dust on the path has been disturbed in three directions by three sets of feet, which is, by now, exactly the number you expected.

Mason is gone. Sister Pearson is gone. Ranya is, importantly, behind you and not gone — just elsewhere, waiting, in the way that good partners are not in your pocket but in your weather.

Somewhere ahead, on somebody's porch, Carl from Insurance is waiting in a windbreaker. He has not gotten any less Carl while you were away.`,
    editorNote:
      "You have met your siblings. You have met your weather. We are, technically, ready for the bureaucratic antagonist now. He's the easy one, comparatively.",
    choices: [
      {
        id: "three_marks_to_carl",
        label: "Keep walking. Toward the porch.",
        next: "carl_1",
      },
    ],
  },
] as const satisfies readonly Scene[];
