import { LevelRing } from "@/components/ui/LevelRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { fmt } from "@/lib/constants";
import { levelFromXp } from "@/lib/progress";

interface Props {
  xp: number;
  streak: number;
  doneCount: number;
  lessonCount: number;
  nextXp: number;
}

export function PlayerCard({ xp, streak, doneCount, lessonCount, nextXp }: Props) {
  const lvl = levelFromXp(xp);

  return (
    <div className="relative">
      <div className="bg-dark-2 border border-[rgba(250,244,235,.14)] rounded-[20px] p-7 flex flex-col gap-5 shadow-[0_24px_60px_rgba(0,0,0,.35)]">
        <div className="flex justify-between items-center">
          <div className="font-mono text-[11px] tracking-[.14em] text-muted">PLAYER CARD</div>
          <div className="font-mono text-[11px] text-amber">▲ {streak} DAYS</div>
        </div>
        <div className="flex items-center gap-[18px]">
          <LevelRing level={lvl.level} pct={lvl.pct} size={84} variant="dark" />
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold">{lvl.title}</div>
            <div className="font-mono text-xs text-muted">
              LEVEL {lvl.level} · {fmt(xp)} XP
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between font-mono text-[11px] text-muted">
            <span>NEXT LEVEL</span>
            <span>
              {fmt(xp)} / {fmt(lvl.nextLevelXp)} XP
            </span>
          </div>
          <ProgressBar pct={lvl.pct} height={8} onDark />
        </div>
        <div className="flex justify-between items-center pt-3.5 border-t border-[rgba(250,244,235,.1)]">
          <div className="font-mono text-xs text-muted">TRACK 01 PROGRESS</div>
          <div className="font-mono text-[13px] font-bold text-amber">
            {doneCount} / {lessonCount} LESSONS
          </div>
        </div>
      </div>
      <div className="absolute -top-[22px] -right-4 font-mono font-bold text-[13px] bg-terracotta text-cream px-[15px] py-[9px] rounded-full shadow-[0_4px_0_rgba(0,0,0,.3)] animate-float-y">
        +{nextXp} XP
      </div>
    </div>
  );
}
