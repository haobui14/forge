import { fmt } from "@/lib/constants";
import type { LeaderboardRow } from "@/lib/user-state";

function avatarInitials(handle: string) {
  return handle.replace(/_/g, "").slice(0, 2).toUpperCase();
}

export function Leaderboard({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <div className="bg-card border border-line rounded-[20px] p-[26px] flex flex-col gap-3.5">
      <div className="flex justify-between items-baseline">
        <div className="text-[19px] font-bold">Leaderboard</div>
        <div className="font-mono text-xs text-muted">BUILDERS</div>
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((p) => (
          <div
            key={p.rank}
            className={`flex items-center gap-3 px-3 py-[9px] rounded-[11px] border ${
              p.isMe ? "bg-amber-wash border-amber-wash-border" : "border-line-soft"
            }`}
          >
            <div className="font-mono text-xs text-muted w-[22px]">
              {String(p.rank).padStart(2, "0")}
            </div>
            <div className="w-[30px] h-[30px] rounded-full bg-dark text-amber grid place-items-center font-mono text-[11px] font-bold">
              {avatarInitials(p.handle)}
            </div>
            <div className="font-bold text-sm flex-1 truncate">{p.handle}</div>
            <div className="font-mono text-[11px] text-muted">LVL {p.level}</div>
            <div className="font-mono text-xs font-bold text-terracotta-deep w-[58px] text-right">
              {fmt(p.xp)} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
