import type { BadgeInfo } from "@/lib/progress";

export function BadgeCollection({ badges }: { badges: BadgeInfo[] }) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="bg-card border border-line rounded-[20px] p-7 flex flex-col gap-[18px]">
      <div className="flex justify-between items-baseline">
        <div className="text-[19px] font-bold">Badge collection</div>
        <div className="font-mono text-xs text-muted">
          {earnedCount} / {badges.length} EARNED
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {badges.map((b) => (
          <div
            key={b.name}
            className={`flex flex-col items-center gap-2 text-center px-2 py-4 rounded-[14px] bg-paper border border-line-soft ${
              b.earned ? "" : "opacity-60"
            }`}
          >
            <div
              className={`w-[52px] h-[52px] rounded-full grid place-items-center text-[19px] ${
                b.earned ? "bg-dark text-amber" : "bg-line-soft text-faint"
              }`}
            >
              {b.glyph}
            </div>
            <div className="font-bold text-[13px] leading-[1.2]">{b.name}</div>
            <div className="text-[11px] text-muted leading-[1.35] text-balance">{b.sub}</div>
            <div
              className={`font-mono text-[9px] tracking-[.12em] ${
                b.earned ? "text-amber-text-soft" : "text-faint"
              }`}
            >
              {b.earned ? "EARNED" : "LOCKED"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
