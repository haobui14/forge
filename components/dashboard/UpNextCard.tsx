import { Button } from "@/components/ui/Button";
import type { LessonMeta } from "@/lib/lessons";
import { STAGES } from "@/lib/constants";

export function UpNextCard({ current }: { current?: LessonMeta }) {
  if (!current) {
    return (
      <div className="relative overflow-hidden grid-texture-fine bg-dark text-paper rounded-[20px] p-[30px] flex flex-col gap-3.5">
        <div className="relative font-mono text-[11px] tracking-[.14em] text-amber">
          TRACK 01 COMPLETE
        </div>
        <div className="relative text-[34px] font-extrabold tracking-[-.02em]">
          System Architect, forged.
        </div>
        <p className="relative m-0 text-[15px] text-[#cbb7a2] leading-[1.6] max-w-[480px]">
          All fifteen lessons are in the books. Revisit any lesson from the roadmap, or keep the
          streak alive while new tracks are in the workshop.
        </p>
        <div className="relative mt-1.5">
          <Button variant="amber" href="/roadmap">
            Back to the roadmap →
          </Button>
        </div>
      </div>
    );
  }

  const stage = STAGES[current.stage];

  return (
    <div className="relative overflow-hidden grid-texture-fine bg-dark text-paper rounded-[20px] p-[30px] flex flex-col gap-3.5">
      <div className="relative flex justify-between items-center">
        <div className="font-mono text-[11px] tracking-[.14em] text-amber">
          UP NEXT · STAGE {String(current.stage + 1).padStart(2, "0")} /{" "}
          {stage.name.toUpperCase()}
        </div>
        <div className="font-mono text-[11.5px] font-bold text-paper bg-[rgba(250,244,235,.1)] px-[11px] py-[5px] rounded-full">
          +{current.xp} XP
        </div>
      </div>
      <div className="relative text-[34px] font-extrabold tracking-[-.02em]">{current.title}</div>
      <p className="relative m-0 text-[15px] text-[#cbb7a2] leading-[1.6] max-w-[480px]">
        {current.blurb}.
      </p>
      <div className="relative flex items-center gap-3.5 mt-1.5">
        <Button variant="amber" href={`/lessons/${current.slug}`}>
          Resume lesson →
        </Button>
        <div className="font-mono text-xs text-muted">{current.minutes} MIN READ</div>
      </div>
    </div>
  );
}
