export const XP_PER_LEVEL = 450;

export const LEVEL_TITLES = [
  "Novice",
  "Tinkerer",
  "Builder",
  "Architect",
  "Master",
  "Legend",
] as const;

export const STAGES = [
  { name: "Foundations", badge: "Foundations Forged", glyph: "★" },
  { name: "Networking & APIs", badge: "Network Navigator", glyph: "✦" },
  { name: "Data & Storage", badge: "Data Wrangler", glyph: "◆" },
  { name: "Scaling Systems", badge: "Scale Master", glyph: "■" },
  { name: "Applied Design", badge: "System Architect", glyph: "✶" },
] as const;

export const TRACK_ID = "system-design";

/** Display-only XP shown for the track on the landing hero (lesson XP + milestone bonus). */
export const TRACK_BONUS_XP = 500;

export const fmt = (n: number) => n.toLocaleString("en-US");
