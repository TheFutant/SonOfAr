import type { Scene } from "../../types/game";
import { ITEMS } from "../items";

export const chapter6 = [
  {
    id: "mire_road",
    title: "The Mire Road",
    chapter: "VI · The Mire",
    body: `Down off the observatory wall the country goes low and wet. The ash gives way to reed and standing water that has not been introduced to the sky in some time.

There is a horse waiting at the bottom of the path. Grey, patient, borrowed — saddled by no one you can see, in the way of everything at the edges of this story. Ranya is a few steps behind you, not on the horse, not far from it. Maebie is on your heels, low to the ground, ears doing arithmetic.

The horse looks at the mire. The horse looks at you. The look says: I will go where you point me, and that is the problem with me.

"Fire remembers," Ranya says, quietly, watching the water. "Rain reveals. This place hasn't forgotten anything. It's just holding it under."`,
    editorNote:
      "A borrowed horse is a loaded object in any story. I am not going to tell you why. I am only going to ask, gently, that you remember Maebie is on your heels and that Maebie is, by writers'-room law, fine.",
    writersRoomNote:
      "Chapter VI opens the Reason arc. The horse is introduced calm and trusting so the next scene costs something. Ranya present but not steering — her line reframes the mire as a thing that hides truth, not weather to be conquered.",
    choices: [
      {
        id: "mire_mount",
        label: "Take the reins. Lead the horse onto the causeway you can half-see.",
        next: "mire_horse",
        effects: { stats: { evidence: 1 } },
      },
      {
        id: "mire_scout",
        label: "Send Maebie ahead three steps. Watch where she won't go.",
        next: "mire_horse",
        effects: {
          stats: { humanity: 1, evidence: 1 },
          setFlags: [{ key: "maebie_trust", value: true }],
        },
      },
    ],
  },
  {
    id: "mire_horse",
    title: "The Horse in the Mire",
    chapter: "VI · The Mire",
    body: `The causeway is a lie the water tells. Three strides in, the ground stops being ground.

The horse goes down to the knee, then the chest, calm at first, the way trusting things are calm right up until the moment they understand. Then it understands. It does not thrash so much as it asks — a long, low, terrible question, aimed at you, because you are the one who pointed.

Maebie is already back on solid reed, because you put her there, because that is not a decision you were ever going to get wrong. She does not bark. She watches you with the eyebrows, and the eyebrows, for once, have no joke in them.

Ranya is very still. "You can't carry it," she says. "Nobody could. The only question in front of you is which kind of man reaches in."`,
    editorNote:
      "I want this on the record: this is not the dog. The dog is on the reed. The dog is fine. This is the horse, and the horse is going to cost you something true, which is the only kind of cost I allow in a scene like this.",
    writersRoomNote:
      "The Artax beat. Restraint over shock. Three reaches: revelation (Ranya, best, requires earned trust), reflex (fire, saves it but exposes Arson's first instinct), and mercy (cut it loose, carry the dog, the hardest one). Each reveals the code rather than just spending stats.",
    choices: [
      {
        id: "horse_ranya_reveal",
        label: "\"Ranya. Read it.\" Let the rain show what's under the water.",
        next: "mire_chocolate",
        effects: {
          stats: { evidence: 2, humanity: 2, editorApproval: 2 },
          addItems: [ITEMS.rain_stained_tablet],
          setFlags: [
            { key: "horse_saved", value: true },
            { key: "ranya_trust_high", value: true },
          ],
        },
        requires: { flag: { key: "ranya_trust", value: true } },
      },
      {
        id: "horse_burn",
        label: "Burn the reeds into a raft of ash. Reach for fire, because you always do.",
        next: "mire_chocolate",
        effects: {
          stats: { heat: 2, chaos: 1, humanity: 1 },
          setFlags: [
            { key: "horse_saved", value: true },
            { key: "reached_for_fire", value: true },
          ],
        },
      },
      {
        id: "horse_mercy",
        label: "Cut the harness. Let it go quiet. Carry Maebie across yourself.",
        next: "mire_chocolate",
        effects: {
          stats: { humanity: 2, editorApproval: 1, heat: -1 },
          setFlags: [
            { key: "horse_released", value: true },
            { key: "chose_mercy", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "mire_chocolate",
    title: "Recovery Protocol",
    chapter: "VI · The Mire",
    body: `On the far bank there is a flat rock that is, almost suspiciously, the right height for sitting.

You sit. Maebie leans her whole weight against your shin, which is her way of saying she is checking that you are still load-bearing. You are. Mostly.

There is a tin in your coat you do not entirely remember packing — battered, grandparent-issued, the label reading FOR AFTER. This is, by every law you were raised under, an after. You break a square. You give exactly none of it to the dog, because chocolate is not for the dog, and you tell her so, and she takes the insult with grace because she can smell that you mean it kindly.

Ranya sits a polite distance away and lets the quiet be quiet. No plot happens for a moment. It is the best moment you've had in three chapters.`,
    editorNote:
      "Chocolate is not a solution, but it is often the first draft of one. Note that you did not give any to Maebie. Good. Theobromine is a margin note I never want to write.",
    writersRoomNote:
      "The required quiet, combat-free scene and the chocolate-recovery callback in one beat. onEnter grants the chocolate so the motif lands even for players who skipped the Third Stair side quest. Both choices are valid; neither punishes.",
    onEnter: {
      addItems: [ITEMS.emergency_chocolate],
    },
    choices: [
      {
        id: "recover_speak",
        label: "\"I pointed it where it didn't want to go. That's mine to keep.\"",
        next: "mason_confronts",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [{ key: "owns_the_cost", value: true }],
        },
      },
      {
        id: "recover_quiet",
        label: "Say nothing. Break a second square. Let Maebie lean.",
        next: "mason_confronts",
        effects: { stats: { humanity: 1 } },
      },
    ],
  },
  {
    id: "mason_confronts",
    title: "What the Mire Showed Him",
    chapter: "VI · The Mire",
    body: `Mason is standing where the reeds give way to a low stone road, and he has been there long enough to have an opinion.

"I watched," he says. No smile this time. "I wanted to see which hand you'd lead with."

He looks at the water, then at the place where the grey horse isn't anymore, then at the dog pressed warm against your leg. He is, you realize, doing his own arithmetic.

"Structure would have tested the ground first," he says. "Structure would not have pointed a trusting thing at a lie. You'll say I'm describing a cage again. I'm describing a fence around a hole. There's a difference, brother, and a horse just paid for it."`,
    editorNote:
      "Mason is not wrong here, which is what makes him Mason. The trick of writing him is to let him land a true hit and still leave room for the reader to disagree about what it means. Resist making him gloat.",
    writersRoomNote:
      "First of two Mason conflict scenes in this chapter. Conflict is moral, not physical. Choices test rage / accountability / deflection / shared grief and feed mason_tension or soften him.",
    choices: [
      {
        id: "mason_c_rage",
        label: "\"You watched and didn't help. Don't audit me.\"",
        next: "pearson_before",
        effects: {
          stats: { heat: 2, humanity: -1 },
          setFlags: [{ key: "mason_tension", value: true }],
        },
      },
      {
        id: "mason_c_accept",
        label: "\"You're right. I led with the wrong hand. Noted.\"",
        next: "pearson_before",
        effects: {
          stats: { humanity: 1, editorApproval: 2 },
          setFlags: [{ key: "mason_sees_redeemable", value: true }],
        },
      },
      {
        id: "mason_c_deflect",
        label: "\"A fence around a hole is just a hole with paperwork.\"",
        next: "pearson_before",
        effects: { stats: { chaos: 1, editorApproval: 1 } },
        tag: "bad joke",
      },
      {
        id: "mason_c_grief",
        label: "\"I know. I knew before the second stride. Sit with it a second.\"",
        next: "pearson_before",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [
            { key: "mason_listens", value: true },
            { key: "owns_the_cost", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "pearson_before",
    title: "Pearson, Before",
    chapter: "VI · The Mire",
    body: `The stone road climbs to a settlement that is too small to have a name and too organized to be an accident. In the square, at a plain table, Sister Pearson is settling a dispute about a well.

She is not mythic. She is a woman with ink on two fingers and a cold cup of tea she keeps forgetting to drink. She listens to a man, then to a woman, then to a child who is, technically, the only one telling the whole truth. She asks three questions. She writes one line.

There is no robe of office. There is no light from above. There is just a person who is very good at the difficult thing of hearing what is actually being said, and a small crowd that has started, you notice, to go quiet when she speaks.

She catches your eye over the child's head. "Arson," she says, like a fact she's filing. "You look like a man who pointed something somewhere it didn't want to go."`,
    editorNote:
      "Pearson is a person here. A scholar with cold tea, not an archetype. Keep her human as long as you can stand to; the myth is coming and it does not need your help arriving early.",
    writersRoomNote:
      "Scene A: 'Pearson Before Reason.' Deliberately small stakes — a well dispute — so her intelligence reads as character, not symbol. The crowd going quiet is the only foreshadow of what people will build around her.",
    choices: [
      {
        id: "pearson_b_respect",
        label: "\"Three questions, one line. You always did edit tighter than me.\"",
        next: "pearson_fairness",
        effects: {
          stats: { editorApproval: 2, humanity: 1 },
          setFlags: [{ key: "remembers_pearson", value: true }],
        },
      },
      {
        id: "pearson_b_wary",
        label: "\"People go quiet when you talk. That used to be my job.\"",
        next: "pearson_fairness",
        effects: { stats: { evidence: 1, heat: 1 } },
      },
      {
        id: "pearson_b_human",
        label: "\"Your tea's cold. Sit a second. Be my sister, not the bench.\"",
        next: "pearson_fairness",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [{ key: "remembers_pearson", value: true }],
        },
      },
    ],
  },
  {
    id: "pearson_fairness",
    title: "Fairness Is Not Kind",
    chapter: "VI · The Mire",
    body: `The next case is harder. A widow has been drawing water she is not, by the settlement's own dull arithmetic, entitled to. She has three children and no claim. The claim belongs to a man who does not need the water and will not share it and is, technically, completely in the right.

Pearson hears all of it. You watch her want a different answer. You watch her not take it.

"The well is his," she says. Quiet. Even. "The arithmetic doesn't care that he's a small man about it. Fair is fair. Fair is not kind. I won't pretend the two are the same to make this room feel better."

The widow does not cry. That is somehow worse. Ranya, beside you, lifts one hand a few inches — there is old writing under the well's rim, she can feel it — and then waits, because it is not her room to make it rain in.`,
    editorNote:
      "Reason can be fair, but fairness is not always kind. A godlike force does not have to be evil to terrify a room. Note that Ranya holds her hand. The truth is hers to reveal, but the timing is yours.",
    writersRoomNote:
      "Scene C: 'Fairness Is Not Kind.' The Ranya choice (reveal the older claim) is the merciful intervention — it doesn't overrule Pearson, it gives her better evidence. Anger/respect/discomfort/silence all set pearson_insight; the rain choice also sets mercy_over_fairness for the Reason ending's tone.",
    choices: [
      {
        id: "fair_ranya",
        label: "\"Ranya — the well's rim. Read it before anyone signs anything.\"",
        next: "pearson_first_called",
        effects: {
          stats: { evidence: 2, humanity: 2, editorApproval: 2 },
          setFlags: [
            { key: "pearson_insight", value: true },
            { key: "mercy_over_fairness", value: true },
            { key: "ranya_trust", value: true },
          ],
        },
        requires: { flag: { key: "ranya_trust", value: true } },
      },
      {
        id: "fair_anger",
        label: "\"Then the arithmetic is wrong. Burn the ledger and start it over.\"",
        next: "pearson_first_called",
        effects: {
          stats: { heat: 2, chaos: 1 },
          setFlags: [{ key: "pearson_insight", value: true }],
        },
      },
      {
        id: "fair_respect",
        label: "\"That cost you. I saw it cost you. I respect that it still cost you.\"",
        next: "pearson_first_called",
        effects: {
          stats: { humanity: 1, editorApproval: 2 },
          setFlags: [{ key: "pearson_insight", value: true }],
        },
      },
      {
        id: "fair_silence",
        label: "Say nothing. Put your coat over the widow's shoulders. Watch your sister.",
        next: "pearson_first_called",
        effects: {
          stats: { humanity: 2, editorApproval: 1 },
          setFlags: [
            { key: "pearson_insight", value: true },
            { key: "mercy_over_fairness", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "pearson_first_called",
    title: "The First Time They Called Her Reason",
    chapter: "VI · The Mire",
    body: `It is the child who does it. Not unkindly. The way children name things that adults are too careful to name.

"She's Reason," the child says, to another child, pointing at Pearson as the square empties. "When you can't tell who's right, you go to Reason."

The word lands and does not leave. You can see it not leave. A man repeats it to his wife. The wife nods like she'd already thought it. By the time the sun moves a hand's width, three separate people have said it, and Pearson has stopped correcting them, and the not-correcting is the loudest thing in the square.

She looks at you. "Don't," she says. "I can hear you deciding to be sentimental about my name."`,
    editorNote:
      "Pearson is a person. Reason is what happens when people stop treating her like one. This is the hinge of her whole arc — play it quiet. The myth is a thing other people are doing TO her. She gets a vote, and she's spending it on being annoyed at you.",
    writersRoomNote:
      "Scene B: 'The First Time They Called Her Reason.' The myth arrives via a child, not a coronation. Whether Arson insists on 'Pearson' sets remembers_pearson, which colors the Reason Remains ending toward the human reading.",
    choices: [
      {
        id: "called_insist",
        label: "\"You're Pearson. You'll always be Pearson to me. Let them build the rest.\"",
        next: "mason_pearson_debate",
        effects: {
          stats: { humanity: 2, editorApproval: 2 },
          setFlags: [
            { key: "remembers_pearson", value: true },
            { key: "called_her_reason", value: true },
          ],
        },
      },
      {
        id: "called_accept",
        label: "\"Reason. It fits. That's exactly why it scares me.\"",
        next: "mason_pearson_debate",
        effects: {
          stats: { evidence: 2, editorApproval: 1 },
          setFlags: [
            { key: "called_her_reason", value: true },
            { key: "fears_reason", value: true },
          ],
        },
      },
      {
        id: "called_joke",
        label: "\"Reason. Great. So when I'm unreasonable it's now technically a family matter.\"",
        next: "mason_pearson_debate",
        effects: {
          stats: { chaos: 1, humanity: 1 },
          setFlags: [{ key: "called_her_reason", value: true }],
        },
        tag: "bad joke",
      },
    ],
  },
  {
    id: "mason_pearson_debate",
    title: "Merciful and Vengeful",
    chapter: "VI · The Mire",
    body: `That night, at a fire that you did not start and are pointedly not tending, Mason and Pearson argue about God the way only siblings can — fluently, unfairly, and with real love underneath the knives.

"The old gods were merciful," Mason says. "And vengeful. The same gods. The same afternoon. Homer didn't think that was a contradiction. He thought it was weather."

"The old gods were stories people told to make fairness feel survivable," Pearson says. "I don't need a throne. I need the arithmetic to hold. Mercy is what you add after the arithmetic, not instead of it."

Mason wants divine order — a frame, a hand on the scale, a reason the three of you keep happening. Pearson wants no hand at all, just the cold true thing and the choice to be kind around its edges. You sit between structure and consequence, and you notice — not for the first time — that you are more afraid of your sister than your brother. Because Mason might be wrong. Reason might be right.`,
    editorNote:
      "Whether Arson fears Reason more than Mason is the real question of the chapter. Mason can be argued with. A correct thing cannot. Three readings of the same fire: mercy, justice, vengeance. Pick the one your code can carry.",
    writersRoomNote:
      "Scene K: 'Merciful and Vengeful,' the second Mason conflict and the three-motif gameplay interaction — the player literally chooses one of three readings of the same flame. Homeric gods material grounds the mercy/justice/vengeance triangle. fears_reason and mercy flags feed endings.",
    choices: [
      {
        id: "debate_mercy",
        label: "\"Mercy. Add it after the arithmetic. Every time. That's the whole job.\"",
        next: "mire_converge",
        effects: {
          stats: { humanity: 2, editorApproval: 2 },
          setFlags: [
            { key: "mercy_over_fairness", value: true },
            { key: "reading_mercy", value: true },
          ],
        },
      },
      {
        id: "debate_justice",
        label: "\"Justice. The cold true thing, held even when it costs. Like she did at the well.\"",
        next: "mire_converge",
        effects: {
          stats: { evidence: 2, editorApproval: 1 },
          setFlags: [
            { key: "fears_reason", value: true },
            { key: "reading_justice", value: true },
          ],
        },
      },
      {
        id: "debate_vengeance",
        label: "\"Vengeance. Don't dress it up. Sometimes the fire is just the fire.\"",
        next: "mire_converge",
        effects: {
          stats: { heat: 2, chaos: 1, humanity: -1 },
          setFlags: [
            { key: "mason_tension", value: true },
            { key: "reading_vengeance", value: true },
          ],
        },
      },
    ],
  },
  {
    id: "mire_converge",
    title: "Down From Reason",
    chapter: "VI · The Mire",
    body: `Morning comes the way it does after a night of real talk: thin, honest, a little embarrassed about itself.

Mason is gone before you wake, his book left open to a page he wanted you to read and a margin note in a hand too tidy to be anyone else's. Pearson — Reason, now, to everyone but you, maybe — is back at her plain table, settling something about a fence. She does not say goodbye. People who are becoming myths rarely get to.

Ranya falls into step beside you. Maebie ranges ahead and back, ahead and back, stitching the road together. Somewhere down the line, on somebody's porch, Carl from Insurance is still standing in a windbreaker, holding a clipboard, blissfully unaware that you have just spent a chapter learning the difference between fair and kind.

"Ready?" Ranya asks.

"No," you say, honestly. "Let's go anyway."`,
    editorNote:
      "Good. You learned the difference between fair and kind and you still have to go fight a man about commas. That is, structurally, how it works. The big lessons never excuse you from the small porches.",
    writersRoomNote:
      "Converge back to the Carl chapter (carl_1). pearson_insight, set on the Fairness fork, gates the Reason Remains ending in the finale. Mason's left-open book is a soft thread for future expansion.",
    choices: [
      {
        id: "mire_to_carl",
        label: "Toward the porch. Toward Carl.",
        next: "carl_1",
      },
    ],
  },
] as const satisfies readonly Scene[];
