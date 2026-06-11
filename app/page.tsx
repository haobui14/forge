import { Button } from "@/components/ui/Button";
import { PlayerCard } from "@/components/landing/PlayerCard";
import { TracksGrid } from "@/components/landing/TracksGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { getUserState } from "@/lib/data";
import { CATALOG, TRACK_XP_TOTAL } from "@/content/system-design/_catalog";
import { STAGES, TRACK_BONUS_XP, fmt } from "@/lib/constants";

export default async function LandingPage() {
  const user = await getUserState();
  const done = new Set(user.completedSlugs);
  const current = CATALOG.find((l) => !done.has(l.slug)) ?? CATALOG[CATALOG.length - 1];
  const doneCount = user.completedSlugs.length;
  const pct = Math.round((doneCount / CATALOG.length) * 100);
  const allDone = doneCount === CATALOG.length;

  return (
    <>
      <section className="relative overflow-hidden grid-texture bg-dark text-paper px-6 sm:px-14 pt-[84px] pb-[92px]">
        <div className="relative max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-[72px] items-center">
          <div className="flex flex-col gap-[26px]">
            <div className="font-mono text-[13px] text-amber tracking-[.04em]">
              $ forge start --track=system-design
            </div>
            <h1 className="m-0 text-5xl sm:text-[74px] leading-none font-extrabold tracking-[-.025em]">
              Master the <span className="text-amber">systems</span> behind the software.
            </h1>
            <p className="m-0 text-[19px] leading-[1.6] text-[#cbb7a2] max-w-[520px]">
              Roadmap-driven deep dives into system design, frontend, backend, data structures
              and algorithms. Read deeply, earn XP, keep the streak alive.
            </p>
            <div className="flex flex-wrap gap-3.5 items-center">
              <Button variant="amber" href={`/lessons/${current.slug}`}>
                {allDone
                  ? "Revisit the track →"
                  : `${doneCount > 0 ? "Continue" : "Start"}: ${current.title} →`}
              </Button>
              <Button variant="ghost-dark" href="/roadmap">
                View the roadmap
              </Button>
            </div>
            <div className="font-mono text-xs tracking-[.08em] text-muted">
              {CATALOG.length} LESSONS · {STAGES.length} MILESTONES ·{" "}
              {fmt(TRACK_XP_TOTAL + TRACK_BONUS_XP)} XP IN TRACK 01
            </div>
          </div>
          <PlayerCard
            xp={user.xp}
            streak={user.streak}
            doneCount={doneCount}
            lessonCount={CATALOG.length}
            nextXp={current.xp}
          />
        </div>
      </section>

      <TracksGrid doneCount={doneCount} lessonCount={CATALOG.length} pct={pct} />
      <HowItWorks />
    </>
  );
}
