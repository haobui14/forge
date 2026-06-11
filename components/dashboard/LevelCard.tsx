import { LevelRing } from "@/components/ui/LevelRing";
import { fmt } from "@/lib/constants";
import { levelFromXp } from "@/lib/progress";

export function LevelCard({ xp }: { xp: number }) {
  const lvl = levelFromXp(xp);
  const lessonsToNext = Math.max(1, Math.round(lvl.toNext / 140));

  return (
    <div className="bg-card border border-line rounded-[20px] p-[26px] flex flex-col gap-4">
      <div className="text-[19px] font-bold">
        Level {lvl.level} · {lvl.title}
      </div>
      <div className="flex items-center gap-4">
        <LevelRing level={lvl.level} pct={lvl.pct} size={72} variant="light" />
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[13px] font-bold">
            {fmt(xp)} / {fmt(lvl.nextLevelXp)} XP
          </div>
          <div className="text-[13px] text-muted">
            {fmt(lvl.toNext)} XP to level {lvl.level + 1} — about{" "}
            {lessonsToNext === 1 ? "one lesson" : lessonsToNext === 2 ? "two lessons" : `${lessonsToNext} lessons`}.
          </div>
        </div>
      </div>
    </div>
  );
}
