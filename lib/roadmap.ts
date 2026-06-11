import type { LessonMeta } from "./lessons";
import { STAGES } from "./constants";

// Sine-wave roadmap geometry, ported from the design prototype:
// node k sits at x = cx + amp·sin(k·0.85 + 0.45), y = topPad + k·step.
// Sequence interleaves the 15 lessons with a milestone diamond after the
// last lesson of each stage (20 nodes total).
//
// Two layouts: the 1040px desktop canvas with alternating outward labels,
// and a narrow mobile canvas where the path hugs the left edge and every
// label sits to the right of its node.

export interface RoadmapLayout {
  canvasW: number;
  cx: number;
  amp: number;
  step: number;
  topPad: number;
}

export const DESKTOP_LAYOUT: RoadmapLayout = {
  canvasW: 1040,
  cx: 520,
  amp: 230,
  step: 148,
  topPad: 120,
};

export const MOBILE_LAYOUT: RoadmapLayout = {
  canvasW: 330,
  cx: 76,
  amp: 40,
  step: 132,
  topPad: 90,
};

export type SeqEntry =
  | { kind: "lesson"; lesson: LessonMeta; index: number }
  | { kind: "milestone"; stage: number; badge: string };

export interface Point {
  x: number;
  y: number;
}

function buildSeq(lessons: LessonMeta[]): SeqEntry[] {
  const seq: SeqEntry[] = [];
  lessons.forEach((ls, i) => {
    seq.push({ kind: "lesson", lesson: ls, index: i });
    const last = i === lessons.length - 1 || lessons[i + 1].stage !== ls.stage;
    if (last) seq.push({ kind: "milestone", stage: ls.stage, badge: STAGES[ls.stage].badge });
  });
  return seq;
}

function seg(a: Point, b: Point): string {
  const h = (b.y - a.y) / 2;
  return ` C${a.x.toFixed(1)} ${(a.y + h).toFixed(1)} ${b.x.toFixed(1)} ${(b.y - h).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

function pathFrom(pts: Point[]): string {
  if (!pts.length) return "";
  return pts
    .slice(1)
    .reduce((d, p, j) => d + seg(pts[j], p), `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`);
}

export interface RoadmapGeometry {
  layout: RoadmapLayout;
  seq: SeqEntry[];
  points: Point[];
  pathD: string;
  /** solid terracotta prefix covering completed lessons up to the current node */
  pathDone: string;
  mapH: number;
  /** index (into lessons) of the first uncompleted lesson, or lessons.length if all done */
  currentIndex: number;
}

export function computeRoadmapGeometry(
  lessons: LessonMeta[],
  completedSlugs: string[],
  layout: RoadmapLayout = DESKTOP_LAYOUT,
): RoadmapGeometry {
  const done = new Set(completedSlugs);
  let currentIndex = lessons.findIndex((l) => !done.has(l.slug));
  if (currentIndex < 0) currentIndex = lessons.length;

  const seq = buildSeq(lessons);
  const points = seq.map((_, k) => ({
    x: layout.cx + layout.amp * Math.sin(k * 0.85 + 0.45),
    y: layout.topPad + k * layout.step,
  }));

  const pathD = pathFrom(points);
  let curSeq = -1;
  seq.forEach((n, k) => {
    if (curSeq < 0 && n.kind === "lesson" && n.index === currentIndex) curSeq = k;
  });
  const pathDone = pathFrom(points.slice(0, curSeq < 0 ? points.length : curSeq + 1));
  const mapH = layout.topPad + (seq.length - 1) * layout.step + 150;

  return { layout, seq, points, pathD, pathDone, mapH, currentIndex };
}

/** Which side of the centerline a node sits on — desktop labels go outward. */
export function nodeSide(p: Point, cx: number): "left" | "right" {
  return p.x > cx ? "left" : "right";
}
