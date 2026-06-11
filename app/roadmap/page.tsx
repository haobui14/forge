import type { Metadata } from "next";
import { RoadmapCanvas } from "@/components/roadmap/RoadmapCanvas";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getUserState } from "@/lib/data";
import { CATALOG } from "@/content/system-design/_catalog";
import {
  computeRoadmapGeometry,
  DESKTOP_LAYOUT,
  MOBILE_LAYOUT,
} from "@/lib/roadmap";
import { stageEarned, nextMilestone } from "@/lib/progress";

export const metadata: Metadata = {
  title: "System Design Roadmap",
  description:
    "Fifteen lessons across five stages, from a single server to a full mock interview.",
};

export default async function RoadmapPage() {
  const user = await getUserState();
  const geoDesktop = computeRoadmapGeometry(CATALOG, user.completedSlugs, DESKTOP_LAYOUT);
  const geoMobile = computeRoadmapGeometry(CATALOG, user.completedSlugs, MOBILE_LAYOUT);
  const earned = stageEarned(CATALOG, user.completedSlugs);
  const doneCount = user.completedSlugs.length;
  const pct = Math.round((doneCount / CATALOG.length) * 100);

  return (
    <>
      <section className="max-w-[1160px] mx-auto px-6 sm:px-14 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-10 items-end">
          <div className="flex flex-col gap-3.5">
            <div className="font-mono text-xs tracking-[.14em] text-terracotta-deep">
              TRACK 01 · SYSTEM DESIGN
            </div>
            <h1 className="m-0 text-4xl sm:text-[54px] font-extrabold tracking-[-.025em] leading-[1.02]">
              The System Design roadmap
            </h1>
            <p className="m-0 text-[17px] text-muted leading-[1.6] max-w-[520px]">
              Fifteen lessons across five stages, from a single server to a full mock interview.
              Finish a stage to forge its milestone badge.
            </p>
          </div>
          <div className="bg-card border border-line rounded-[18px] px-[26px] py-6 flex flex-col gap-3.5">
            <div className="flex justify-between items-baseline">
              <div className="font-mono text-[11px] tracking-[.14em] text-muted">
                TRACK PROGRESS
              </div>
              <div className="font-mono text-[13px] font-bold text-terracotta-deep">
                {doneCount} / {CATALOG.length} · {pct}%
              </div>
            </div>
            <ProgressBar pct={pct} height={10} />
            <div className="flex justify-between items-center text-[13.5px]">
              <div className="text-muted">Next milestone</div>
              <div className="font-bold flex items-center gap-1.5">
                <span className="text-amber">★</span>
                {nextMilestone(earned)}
              </div>
            </div>
            <div className="flex gap-3.5 pt-3 border-t border-line-soft font-mono text-[10.5px] tracking-[.06em] text-muted flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-terracotta inline-block" />
                COMPLETE
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber inline-block" />
                UP NEXT
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-card border-[1.5px] border-sand inline-block" />
                {user.signedIn ? "LOCKED" : "TO READ"}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-[1160px] mx-auto px-6 sm:px-14 pt-2 pb-[72px] overflow-hidden">
        <div className="hidden md:block">
          <RoadmapCanvas
            geo={geoDesktop}
            variant="desktop"
            completedSlugs={user.completedSlugs}
            stageEarned={earned}
            browseAll={!user.signedIn}
          />
        </div>
        <div className="md:hidden">
          <RoadmapCanvas
            geo={geoMobile}
            variant="mobile"
            completedSlugs={user.completedSlugs}
            stageEarned={earned}
            browseAll={!user.signedIn}
          />
        </div>
      </section>
    </>
  );
}
