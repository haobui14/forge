import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-[640px] mx-auto px-6 pt-24 pb-32 text-center flex flex-col items-center gap-5">
      <div className="font-mono text-[13px] text-terracotta-deep tracking-[.04em]">
        $ forge open --page
      </div>
      <h1 className="m-0 text-[64px] leading-none font-extrabold tracking-[-.025em]">
        404<span className="text-amber">_</span>
      </h1>
      <p className="m-0 text-[17px] text-muted leading-[1.6] max-w-[420px]">
        This page hasn&apos;t been forged yet — or the path cooled and cracked. Head back to the
        roadmap and keep the streak alive.
      </p>
      <Link
        href="/"
        className="font-mono font-bold text-sm px-[26px] py-4 rounded-xl bg-ink text-paper transition-colors hover:bg-terracotta"
      >
        Back to home →
      </Link>
    </section>
  );
}
