/**
 * Inventory IDs used as canonical keys; labels live in ITEM_LABELS so the UI
 * can render a friendly name. Keep these in sync with scene effects.
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
  three_marked_relic: "three_marked_relic",
  rain_stained_tablet: "rain_stained_tablet",
  masons_rulebook: "masons_rulebook",
  pearsons_diagram: "pearsons_diagram",
  burned_story_fragment: "burned_story_fragment",
} as const;

export type ItemId = (typeof ITEMS)[keyof typeof ITEMS];

export const ITEM_LABELS: Record<ItemId, string> = {
  damp_napkin: "Damp Napkin",
  strongly_worded_letter: "Strongly Worded Letter",
  old_laptop: "Old Laptop",
  oxford_comma_seal: "Oxford Comma Seal",
  maebies_collar: "Maebie's Collar",
  fire_marshal_warning: "Fire Marshal Warning",
  warranty_scroll: "Warranty Scroll",
  burned_plate: "Burned License Plate (NEWSTRT)",
  three_marked_relic: "Three-Marked Relic",
  rain_stained_tablet: "Rain-Stained Tablet",
  masons_rulebook: "Mason's Rulebook",
  pearsons_diagram: "Sister Pearson's Diagram",
  burned_story_fragment: "Burned Story Fragment",
};

export const ITEM_FLAVOR: Record<ItemId, string> = {
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
  three_marked_relic:
    "An ash-covered tablet, broken at one corner. Three symbols are burned into it in a tidy row — a flame, a spiral, and something the Editor will not name out loud.",
  rain_stained_tablet:
    "A flat stone with writing only visible when wet. Ranya rinsed it once and the ink came up like a bruise.",
  masons_rulebook:
    "A small bound volume, leather, pristine. Tabs in three colors. The footnotes argue with each other politely.",
  pearsons_diagram:
    "A folded paper diagram. Proton, neutron, electron, drawn in calm hand. Beneath, in the same hand: 'or whatever you'd like to call them.'",
  burned_story_fragment:
    "A scrap of paper, edges scorched. One legible line: 'and then he chose, again, the third thing.'",
};
