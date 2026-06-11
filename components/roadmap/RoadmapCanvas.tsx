"use client";

import { useRouter } from "next/navigation";
import type { LessonMeta } from "@/lib/lessons";
import { nodeSide, type Point, type RoadmapGeometry } from "@/lib/roadmap";

type Variant = "desktop" | "mobile";

interface Props {
  geo: RoadmapGeometry;
  variant: Variant;
  completedSlugs: string[];
  stageEarned: boolean[];
}

function LessonNode({
  lesson,
  index,
  p,
  state,
  variant,
  cx,
  onOpen,
}: {
  lesson: LessonMeta;
  index: number;
  p: Point;
  state: "done" | "current" | "locked";
  variant: Variant;
  cx: number;
  onOpen: (slug: string) => void;
}) {
  // Mobile: path hugs the left edge, labels always sit to the right.
  const side = variant === "mobile" ? "right" : nodeSide(p, cx);
  const locked = state === "locked";
  const open = locked ? undefined : () => onOpen(lesson.slug);

  const circleColors =
    state === "done"
      ? "bg-terracotta border-terracotta-border text-cream"
      : state === "current"
        ? "bg-amber border-amber-deep text-cream animate-pulse-ring"
        : "bg-card border-line text-sand-deep";

  const meta =
    state === "done"
      ? `COMPLETE · +${lesson.xp} XP`
      : locked
        ? `LOCKED · ${lesson.minutes} MIN`
        : `+${lesson.xp} XP · ${lesson.minutes} MIN`;

  const metaColor =
    state === "done" ? "text-terracotta" : state === "current" ? "text-amber-text-soft" : "text-faint";

  const labelPos =
    side === "right"
      ? variant === "mobile"
        ? "left-[84px] text-left items-start w-[170px]"
        : "left-[86px] text-left items-start w-[210px]"
      : "-left-[228px] text-right items-end w-[210px]";

  return (
    <div className="absolute" style={{ left: p.x - 34, top: p.y - 34 }}>
      <div
        onClick={open}
        className={`w-[68px] h-[68px] rounded-full border-[3px] grid place-items-center font-mono font-bold text-xl shadow-[0_5px_0_rgba(43,26,14,.12)] transition-transform ${circleColors} ${
          locked ? "" : "cursor-pointer hover:scale-[1.06]"
        }`}
      >
        {state === "done" ? "✓" : String(index + 1).padStart(2, "0")}
      </div>
      <div
        onClick={open}
        className={`absolute top-1 flex flex-col gap-1 ${locked ? "" : "cursor-pointer"} ${labelPos}`}
      >
        {state === "current" && (
          <div className="font-mono text-[10px] font-bold tracking-[.1em] text-amber-text bg-amber-wash border border-amber-wash-border rounded-full px-[9px] py-[3px]">
            UP NEXT
          </div>
        )}
        <div
          className={`font-bold text-[15.5px] leading-[1.25] text-balance ${
            locked ? "text-faint" : "text-ink"
          }`}
        >
          {lesson.title}
        </div>
        <div className={`font-mono text-[10.5px] tracking-[.06em] ${metaColor}`}>{meta}</div>
      </div>
    </div>
  );
}

function MilestoneNode({
  badge,
  p,
  earned,
  variant,
}: {
  badge: string;
  p: Point;
  earned: boolean;
  variant: Variant;
}) {
  // Desktop: label centered beneath the diamond. Mobile: label to the right.
  const labelPos =
    variant === "mobile"
      ? "left-[78px] top-2 w-[170px] text-left items-start"
      : "-left-[76px] top-[74px] w-[212px] text-center items-center";

  return (
    <div className="absolute" style={{ left: p.x - 30, top: p.y - 30 }}>
      <div
        className={`w-[60px] h-[60px] rounded-[14px] rotate-45 grid place-items-center ${
          earned ? "bg-ink shadow-[0_5px_0_rgba(43,26,14,.35)]" : "bg-disabled-wash"
        }`}
      >
        <div className={`-rotate-45 text-[22px] ${earned ? "text-amber" : "text-faint"}`}>★</div>
      </div>
      <div className={`absolute flex flex-col gap-[3px] ${labelPos}`}>
        <div
          className={`font-mono text-[9.5px] tracking-[.12em] ${
            earned ? "text-amber-text-soft" : "text-faint"
          }`}
        >
          {earned ? "MILESTONE EARNED" : "MILESTONE LOCKED"}
        </div>
        <div className={`font-bold text-[14.5px] ${earned ? "text-ink" : "text-faint"}`}>
          {badge}
        </div>
      </div>
    </div>
  );
}

export function RoadmapCanvas({ geo, variant, completedSlugs, stageEarned }: Props) {
  const router = useRouter();
  const done = new Set(completedSlugs);
  const { layout, seq, points, pathD, pathDone, mapH, currentIndex } = geo;

  return (
    <div
      className={`relative ${variant === "desktop" ? "mx-auto max-w-full" : ""}`}
      style={{ width: layout.canvasW, height: mapH }}
    >
      <svg
        width={layout.canvasW}
        height={mapH}
        viewBox={`0 0 ${layout.canvasW} ${mapH}`}
        className="absolute left-0 top-0 max-w-full"
      >
        <path
          d={pathD}
          fill="none"
          stroke="#e0d2ba"
          strokeWidth="4"
          strokeDasharray="1 12"
          strokeLinecap="round"
        />
        <path
          d={pathDone}
          fill="none"
          stroke="#c2522e"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
      {seq.map((n, k) =>
        n.kind === "lesson" ? (
          <LessonNode
            key={k}
            lesson={n.lesson}
            index={n.index}
            p={points[k]}
            state={
              done.has(n.lesson.slug) ? "done" : n.index === currentIndex ? "current" : "locked"
            }
            variant={variant}
            cx={layout.cx}
            onOpen={(slug) => router.push(`/lessons/${slug}`)}
          />
        ) : (
          <MilestoneNode
            key={k}
            badge={n.badge}
            p={points[k]}
            earned={stageEarned[n.stage]}
            variant={variant}
          />
        ),
      )}
    </div>
  );
}
