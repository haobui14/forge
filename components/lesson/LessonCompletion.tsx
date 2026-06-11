"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CelebrationOverlay } from "@/components/ui/CelebrationOverlay";
import { completeLesson } from "@/lib/actions";

interface Props {
  lessonSlug: string;
  lessonTitle: string;
  xp: number;
  isCompleted: boolean;
  signedIn: boolean;
  next?: { slug: string; title: string; position: number };
  /** lessons left in this stage after completing this one, and the stage badge */
  milestone: { badge: string; remainingAfter: number };
}

// Footer row of the lesson page: "up next" teaser + mark-complete button,
// plus the celebration overlay on first completion. XP is awarded by the
// complete_lesson RPC server-side; this just renders the result.
export function LessonCompletion({
  lessonSlug,
  lessonTitle,
  xp,
  isCompleted,
  signedIn,
  next,
  milestone,
}: Props) {
  const router = useRouter();
  const [celebrate, setCelebrate] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completed = isCompleted || justCompleted;

  const onComplete = async () => {
    if (!signedIn) {
      router.push(`/auth/login?next=${encodeURIComponent(`/lessons/${lessonSlug}`)}`);
      return;
    }
    if (completed) {
      router.push("/roadmap");
      return;
    }
    setPending(true);
    setError(null);
    const result = await completeLesson(lessonSlug);
    setPending(false);
    if ("error" in result) {
      setError("Something broke on our anvil — try again in a moment.");
      return;
    }
    setJustCompleted(true);
    if (!result.already_completed) setCelebrate(true);
  };

  const teaser =
    milestone.remainingAfter === 0 ? (
      <>
        {lessonTitle} is in the books — and that forges the{" "}
        <strong className="text-ink">{milestone.badge}</strong> milestone. Wear it well.
      </>
    ) : (
      <>
        {lessonTitle} is in the books.{" "}
        {milestone.remainingAfter === 1
          ? "One more lesson"
          : `${milestone.remainingAfter} more lessons`}{" "}
        and the <strong className="text-ink">{milestone.badge}</strong> milestone is yours.
      </>
    );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[18px] mt-[18px] pt-[26px] border-t border-line">
        <div className="flex flex-col gap-[3px]">
          {next ? (
            // Reachable once this lesson is done — or any time when browsing
            // without an account (nothing to unlock without tracked progress).
            !signedIn || completed ? (
              <Link href={`/lessons/${next.slug}`} className="group flex flex-col gap-[3px]">
                <div className="font-mono text-[11px] tracking-[.1em] text-muted">
                  UP NEXT · LESSON {String(next.position).padStart(2, "0")}
                </div>
                <div className="text-[17px] font-bold group-hover:text-terracotta-deep transition-colors">
                  {next.title} →
                </div>
              </Link>
            ) : (
              <>
                <div className="font-mono text-[11px] tracking-[.1em] text-muted">
                  UP NEXT · LESSON {String(next.position).padStart(2, "0")}
                </div>
                <div className="text-[17px] font-bold">{next.title}</div>
              </>
            )
          ) : (
            <>
              <div className="font-mono text-[11px] tracking-[.1em] text-muted">
                FINAL LESSON
              </div>
              <div className="text-[17px] font-bold">This is the end of the track.</div>
            </>
          )}
          {error && (
            <div className="text-[13px] font-semibold text-terracotta-border">{error}</div>
          )}
        </div>
        <button
          onClick={onComplete}
          disabled={pending}
          className={`font-mono font-bold text-[15px] px-[30px] py-[17px] rounded-[13px] cursor-pointer transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait ${
            completed
              ? "bg-disabled-wash text-muted shadow-none"
              : "bg-terracotta text-cream shadow-[0_4px_0_#7e3014]"
          }`}
        >
          {!signedIn
            ? "Sign in to track progress →"
            : pending
              ? "Forging…"
              : completed
                ? "✓ Completed"
                : `Mark complete · earn +${xp} XP`}
        </button>
      </div>
      {celebrate && (
        <CelebrationOverlay
          xp={xp}
          title="Lesson complete!"
          teaser={teaser}
          onDismiss={() => {
            setCelebrate(false);
            router.push("/roadmap");
            router.refresh();
          }}
        />
      )}
    </>
  );
}
