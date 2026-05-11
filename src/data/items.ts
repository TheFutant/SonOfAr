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
};
