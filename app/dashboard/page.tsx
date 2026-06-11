import type { Metadata } from "next";
import { ReminderBanner } from "@/components/dashboard/ReminderBanner";
import { UpNextCard } from "@/components/dashboard/UpNextCard";
import { BadgeCollection } from "@/components/dashboard/BadgeCollection";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { LevelCard } from "@/components/dashboard/LevelCard";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { getUserState } from "@/lib/data";
import { CATALOG } from "@/content/system-design/_catalog";
import { computeBadges } from "@/lib/progress";

export const metadata: Metadata = {
  title: "Dashboard",
};

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning, builder.";
  if (hour < 18) return "Good afternoon, builder.";
  return "Good evening, builder.";
}

export default async function DashboardPage() {
  const user = await getUserState();
  const done = new Set(user.completedSlugs);
  const current = CATALOG.find((l) => !done.has(l.slug));
  const badges = computeBadges({
    lessons: CATALOG,
    completedSlugs: user.completedSlugs,
    streak: user.streak,
    quizWhiz: user.quizWhiz,
  });

  const now = new Date();
  // Monday-first, in UTC to match daily_activity's calendar
  const todayIndex = (now.getUTCDay() + 6) % 7;
  const dateStr = now.toDateString().toUpperCase();

  return (
    <section className="max-w-[1160px] mx-auto px-6 sm:px-14 pt-12 pb-[72px] flex flex-col gap-[22px]">
      <ReminderBanner streak={user.streak} activeToday={user.activeToday} current={current} />

      <div className="flex flex-col sm:flex-row justify-between sm:items-end mt-2.5 gap-2">
        <h1 className="m-0 text-3xl sm:text-[44px] font-extrabold tracking-[-.02em]">
          {greetingFor(now.getHours())}
        </h1>
        <div className="font-mono text-xs tracking-[.08em] text-muted">{dateStr}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-[18px] items-start">
        <div className="flex flex-col gap-[18px]">
          <UpNextCard current={current} />
          <BadgeCollection badges={badges} />
        </div>
        <div className="flex flex-col gap-[18px]">
          <StreakCard
            streak={user.streak}
            weekActivity={user.weekActivity}
            todayIndex={todayIndex}
            activeToday={user.activeToday}
          />
          <LevelCard xp={user.xp} />
          <Leaderboard rows={user.leaderboard} />
        </div>
      </div>
    </section>
  );
}
