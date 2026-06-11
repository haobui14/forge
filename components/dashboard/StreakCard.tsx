interface Props {
  streak: number;
  /** Monday-first trailing week, true = completed a lesson that day */
  weekActivity: boolean[];
  /** index of today within the week row (0 = Monday) */
  todayIndex: number;
  activeToday: boolean;
}

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakCard({ streak, weekActivity, todayIndex, activeToday }: Props) {
  return (
    <div className="bg-card border border-line rounded-[20px] p-[26px] flex flex-col gap-4">
      <div className="flex justify-between items-baseline">
        <div className="text-[19px] font-bold">Streak</div>
        <div className="font-mono text-xs text-muted">THIS WEEK</div>
      </div>
      <div className="flex items-baseline gap-2.5">
        <div className="font-mono text-[56px] font-bold text-terracotta leading-none">
          {streak}
        </div>
        <div className="text-[15px] text-muted">days in a row</div>
      </div>
      <div className="flex gap-2">
        {DAY_LABELS.map((d, i) => {
          const done = weekActivity[i];
          const isToday = i === todayIndex;
          const pending = isToday && !done;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-[38px] h-[38px] rounded-full grid place-items-center text-[15px] font-bold border-2 ${
                  done
                    ? "bg-terracotta text-cream border-terracotta-border border-solid"
                    : "bg-card text-faint border-sand border-dashed"
                } ${pending ? "animate-pulse-ring" : ""}`}
              >
                {done ? "✓" : "·"}
              </div>
              <div className="font-mono text-[10px] text-muted">{d}</div>
            </div>
          );
        })}
      </div>
      <div className="text-[13.5px] text-muted bg-paper rounded-[10px] px-3.5 py-2.5">
        {activeToday ? (
          <>
            Today is locked in. Come back tomorrow to make it{" "}
            <strong className="text-terracotta-deep">{streak + 1} days</strong>.
          </>
        ) : (
          <>
            Complete a lesson today to make it{" "}
            <strong className="text-terracotta-deep">{streak + 1} days</strong> and stay on pace.
          </>
        )}
      </div>
    </div>
  );
}
