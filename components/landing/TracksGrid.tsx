import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface TrackCard {
  glyph: string;
  name: string;
  desc: string;
  meta: string;
  tag: "IN PROGRESS" | "NEW" | "COMING SOON";
  href?: string;
  progressPct?: number;
}

function buildTracks(doneCount: number, lessonCount: number, pct: number): TrackCard[] {
  return [
    {
      glyph: "◆",
      name: "System Design",
      desc: "Scale from one server to planet-scale architecture.",
      meta: `${doneCount}/${lessonCount} LESSONS · ${pct}% COMPLETE`,
      tag: "IN PROGRESS",
      href: "/roadmap",
      progressPct: Math.max(4, pct),
    },
    {
      glyph: "●",
      name: "Data Structures",
      desc: "Arrays to graphs — the toolkit under every system.",
      meta: "24 LESSONS · 2,900 XP",
      tag: "NEW",
    },
    {
      glyph: "▲",
      name: "Algorithms",
      desc: "Sorting, searching and dynamic programming, mastered.",
      meta: "28 LESSONS · 3,400 XP",
      tag: "NEW",
    },
    {
      glyph: "■",
      name: "Frontend Engineering",
      desc: "From rendering pipelines to resilient interfaces.",
      meta: "22 LESSONS · 2,600 XP",
      tag: "NEW",
    },
    {
      glyph: "✦",
      name: "Backend Engineering",
      desc: "APIs, auth, databases and everything in between.",
      meta: "26 LESSONS · 3,100 XP",
      tag: "NEW",
    },
    {
      glyph: "✶",
      name: "DevOps & Infra",
      desc: "Ship, observe and scale with confidence.",
      meta: "IN THE WORKSHOP",
      tag: "COMING SOON",
    },
  ];
}

function Card({ track }: { track: TrackCard }) {
  const featured = track.tag === "IN PROGRESS";
  const comingSoon = track.tag === "COMING SOON";

  const body = (
    <>
      <div className="flex justify-between items-center">
        <div
          className={`w-11 h-11 rounded-xl grid place-items-center text-[17px] ${
            featured ? "bg-dark text-amber" : "bg-glyph-wash text-terracotta-deep"
          }`}
        >
          {track.glyph}
        </div>
        <div
          className={`font-mono text-[10.5px] tracking-[.08em] px-2.5 py-[5px] rounded-full ${
            featured
              ? "bg-amber-wash text-amber-text"
              : "bg-line-soft text-tab-inactive"
          }`}
        >
          {track.tag}
        </div>
      </div>
      <div className="text-[21px] font-bold tracking-[-.01em]">{track.name}</div>
      <div className="text-sm text-muted leading-[1.55]">{track.desc}</div>
      <div className="font-mono text-[11.5px] tracking-[.05em] text-tab-inactive mt-auto">
        {track.meta}
      </div>
      {track.progressPct !== undefined && <ProgressBar pct={track.progressPct} height={6} />}
    </>
  );

  const cls = `bg-card border rounded-[18px] p-[26px] flex flex-col gap-3 transition-all duration-150 ${
    featured ? "border-terracotta" : "border-line"
  } ${comingSoon ? "opacity-55" : "hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(43,26,14,.1)]"}`;

  if (track.href) {
    return (
      <Link href={track.href} className={cls}>
        {body}
      </Link>
    );
  }
  return <div className={cls}>{body}</div>;
}

export function TracksGrid({
  doneCount,
  lessonCount,
  pct,
}: {
  doneCount: number;
  lessonCount: number;
  pct: number;
}) {
  const tracks = buildTracks(doneCount, lessonCount, pct);

  return (
    <section className="max-w-[1160px] mx-auto px-6 sm:px-14 pt-20 pb-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-6">
        <div>
          <div className="font-mono text-xs tracking-[.14em] text-terracotta-deep mb-2.5">
            TRACKS
          </div>
          <h2 className="m-0 text-[40px] font-extrabold tracking-[-.02em]">
            Choose your quest line
          </h2>
        </div>
        <div className="text-[15px] text-muted sm:max-w-[320px] sm:text-right">
          Every track is a roadmap of readable, diagram-rich lessons with XP and milestones.
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {tracks.map((t) => (
          <Card key={t.name} track={t} />
        ))}
      </div>
    </section>
  );
}
