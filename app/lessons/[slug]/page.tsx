import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBody } from "@/components/lesson/LessonBody";
import { LessonCompletion } from "@/components/lesson/LessonCompletion";
import { getUserState } from "@/lib/data";
import { CATALOG, getLessonMeta, nextLesson } from "@/content/system-design/_catalog";
import { LESSON_CONTENT } from "@/content/system-design";
import { STAGES } from "@/lib/constants";

export function generateStaticParams() {
  return CATALOG.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getLessonMeta(slug);
  if (!meta) return {};
  return { title: meta.title, description: meta.blurb };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getLessonMeta(slug);
  if (!meta) notFound();

  const content = LESSON_CONTENT[slug];
  const user = await getUserState();
  const done = new Set(user.completedSlugs);
  const stage = STAGES[meta.stage];
  const next = nextLesson(slug);

  // lessons left in this stage if this one were completed now
  const remainingAfter = CATALOG.filter(
    (l) => l.stage === meta.stage && l.slug !== slug && !done.has(l.slug),
  ).length;

  return (
    <section className="max-w-[880px] mx-auto px-6 sm:px-14 pt-12 pb-20 flex flex-col">
      <Link
        href="/roadmap"
        className="font-mono text-xs text-muted hover:text-terracotta-deep mb-[26px]"
      >
        ← BACK TO ROADMAP
      </Link>
      <div className="flex flex-col gap-3.5 pb-7 border-b border-line">
        <div className="font-mono text-xs tracking-[.12em] text-terracotta-deep">
          STAGE {String(meta.stage + 1).padStart(2, "0")} · {stage.name.toUpperCase()} · LESSON{" "}
          {String(meta.position).padStart(2, "0")} / {CATALOG.length}
        </div>
        <h1 className="m-0 text-4xl sm:text-[56px] font-extrabold tracking-[-.025em] leading-[1.02]">
          {meta.title}
        </h1>
        <div className="flex flex-wrap gap-x-[18px] gap-y-1 font-mono text-xs text-muted items-center">
          <span>{meta.minutes} MIN READ</span>
          <span className="text-sand">·</span>
          <span className="text-amber-text-soft font-bold">+{meta.xp} XP</span>
          <span className="text-sand">·</span>
          <span>UPDATED JUN 2026</span>
        </div>
      </div>

      {content ? (
        <LessonBody blocks={content.blocks} lessonSlug={slug} signedIn={user.signedIn} />
      ) : (
        <div className="mt-8 border border-dashed border-sand bg-glyph-wash rounded-2xl p-10 text-center">
          <div className="font-mono text-xs tracking-[.12em] text-muted mb-2">
            IN THE WORKSHOP
          </div>
          <div className="text-lg font-bold text-ink">
            This lesson is being forged. Check back soon.
          </div>
        </div>
      )}

      <LessonCompletion
        lessonSlug={slug}
        lessonTitle={meta.title}
        xp={meta.xp}
        isCompleted={done.has(slug)}
        signedIn={user.signedIn}
        next={next ? { slug: next.slug, title: next.title, position: next.position } : undefined}
        milestone={{ badge: stage.badge, remainingAfter }}
      />
    </section>
  );
}
