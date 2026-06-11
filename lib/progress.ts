import type { LessonMeta } from "./lessons";
import { LEVEL_TITLES, STAGES, XP_PER_LEVEL } from "./constants";

export interface LevelInfo {
  level: number;
  title: string;
  /** % progress through the current level, clamped 5–100 like the prototype ring */
  pct: number;
  nextLevelXp: number;
  toNext: number;
}

export function levelFromXp(xp: number): LevelInfo {
  const level = Math.min(LEVEL_TITLES.length, Math.floor(xp / XP_PER_LEVEL) + 1);
  const nextLevelXp = level * XP_PER_LEVEL;
  const pct = Math.max(
    5,
    Math.min(100, Math.round(((xp - (level - 1) * XP_PER_LEVEL) / XP_PER_LEVEL) * 100)),
  );
  return {
    level,
    title: LEVEL_TITLES[level - 1] ?? "Legend",
    pct,
    nextLevelXp,
    toNext: Math.max(0, nextLevelXp - xp),
  };
}

export function stageEarned(
  lessons: LessonMeta[],
  completedSlugs: string[],
): boolean[] {
  const done = new Set(completedSlugs);
  return STAGES.map((_, si) =>
    lessons.every((l) => l.stage !== si || done.has(l.slug)),
  );
}

export function nextMilestone(earned: boolean[]): string {
  for (let i = 0; i < STAGES.length; i++) {
    if (!earned[i]) return STAGES[i].badge;
  }
  return STAGES[STAGES.length - 1].badge;
}

export interface BadgeInfo {
  glyph: string;
  name: string;
  sub: string;
  earned: boolean;
}

export function computeBadges(args: {
  lessons: LessonMeta[];
  completedSlugs: string[];
  streak: number;
  quizWhiz: boolean;
}): BadgeInfo[] {
  const { lessons, completedSlugs, streak, quizWhiz } = args;
  const earned = stageEarned(lessons, completedSlugs);
  return [
    {
      glyph: "●",
      name: "First Steps",
      sub: "Complete your first lesson",
      earned: completedSlugs.length > 0,
    },
    {
      glyph: "★",
      name: "Foundations Forged",
      sub: "Finish the Foundations stage",
      earned: earned[0],
    },
    {
      glyph: "▲",
      name: "On a Roll",
      sub: "Hold a 5-day learning streak",
      earned: streak >= 5,
    },
    {
      glyph: "✦",
      name: "Network Navigator",
      sub: "Finish Networking & APIs",
      earned: earned[1],
    },
    {
      glyph: "◆",
      name: "Data Wrangler",
      sub: "Finish Data & Storage",
      earned: earned[2],
    },
    {
      glyph: "■",
      name: "Scale Master",
      sub: "Finish Scaling Systems",
      earned: earned[3],
    },
    {
      glyph: "✶",
      name: "System Architect",
      sub: "Complete the whole track",
      earned: earned[4],
    },
    {
      glyph: "◉",
      name: "Quiz Whiz",
      sub: "10 perfect checks in a row",
      earned: quizWhiz,
    },
  ];
}
