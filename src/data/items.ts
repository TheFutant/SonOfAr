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
  maebie_bandana: "maebie_bandana",
  emergency_chocolate: "emergency_chocolate",
  dog_logistics_clipboard: "dog_logistics_clipboard",
  road_pie: "road_pie",
  receipt_of_questionable_origin: "receipt_of_questionable_origin",
  immunity_gravy: "immunity_gravy",
  alien_extraction_shirt: "alien_extraction_shirt",
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
  maebie_bandana: "Maebie's Bandana",
  emergency_chocolate: "Emergency Chocolate",
  dog_logistics_clipboard: "Dog Logistics Clipboard",
  road_pie: "Road Pie",
  receipt_of_questionable_origin: "Receipt of Questionable Origin",
  immunity_gravy: "Immunity Gravy",
  alien_extraction_shirt: "Alien Extraction Shirt",
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
  maebie_bandana:
    "Faded red, soft from washing, smells faintly of dog and clean rain. She lets you carry it. She does not, strictly, need it back — but she will check.",
  emergency_chocolate:
    "A battered tin of squares, grandparent-issued. The label says FOR AFTER. Official recovery protocol. Not for the dog, under any circumstances.",
  dog_logistics_clipboard:
    "Water, leashes, emergency towels, snack schedule, and a box labeled EMOTIONAL SUPPORT JURISDICTION that nobody has dared check yes or no on. Two dog names at the top: Maebie, and — penciled in later, in a hopeful hand — Bishop.",
  road_pie:
    "A single slice in a clamshell, riding shotgun where a passenger isn't. The crust held through two states. Some pie is dessert; this pie is a travel companion with opinions about the route.",
  receipt_of_questionable_origin:
    "A diner receipt for items you do not remember ordering, totaled in a currency that is mostly dollars. The Editor has flagged line four ('SEE SERVER') as either foreshadowing or a health-code violation.",
  immunity_gravy:
    "A mason jar of gravy from a meal that became family lore. Survived it together once; you keep a jar in case the road serves you worse. Confers no actual immunity. Confers, arguably, worse.",
  alien_extraction_shirt:
    "A roadside-stand tee, three sizes of confident. Cartoon saucer, beam, cow mid-ascension, slogan: ASK ME ABOUT DISCLOSURE DAY. If aliens exist, they are also subject to character agency.",
};
