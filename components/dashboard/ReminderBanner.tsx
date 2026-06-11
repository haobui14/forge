import { Button } from "@/components/ui/Button";
import type { LessonMeta } from "@/lib/lessons";

interface Props {
  streak: number;
  activeToday: boolean;
  current?: LessonMeta;
}

export function ReminderBanner({ streak, activeToday, current }: Props) {
  if (!current) return null;

  const copy = activeToday ? (
    <>
      <strong className="text-ink">Today&apos;s lesson is in the books.</strong> Come back
      tomorrow to push the streak to {streak + 1} — or keep going while you&apos;re warm.
    </>
  ) : (
    <>
      <strong className="text-ink">Your streak hits {streak + 1} tomorrow.</strong> One lesson
      today keeps it alive — {current.title} takes {current.minutes} minutes.
    </>
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-amber-wash border border-amber-wash-border rounded-2xl px-[22px] py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="font-mono text-[10.5px] font-bold tracking-[.12em] bg-ink text-amber px-[11px] py-1.5 rounded-full whitespace-nowrap self-start sm:self-auto">
          DAILY REMINDER
        </div>
        <div className="text-[15px] text-reminder-text">{copy}</div>
      </div>
      <Button variant="terracotta" size="md" href={`/lessons/${current.slug}`} className="whitespace-nowrap">
        {activeToday ? "Next lesson →" : "Start today's lesson →"}
      </Button>
    </div>
  );
}
