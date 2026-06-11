"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fmt } from "@/lib/constants";

interface Props {
  signedIn: boolean;
  streak: number;
  xp: number;
  currentLessonSlug: string;
}

export function StickyNav({ signedIn, streak, xp, currentLessonSlug }: Props) {
  const pathname = usePathname();

  const tabs = [
    { label: "HOME", href: "/", active: pathname === "/" },
    { label: "ROADMAP", href: "/roadmap", active: pathname === "/roadmap" },
    { label: "DASHBOARD", href: "/dashboard", active: pathname === "/dashboard" },
    {
      label: "LESSON",
      href: `/lessons/${currentLessonSlug}`,
      active: pathname.startsWith("/lessons"),
    },
  ];

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-8 py-[13px] bg-[rgba(250,244,235,.93)] backdrop-blur-[10px] border-b border-line">
      <div className="flex items-center gap-[26px]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[9px] bg-terracotta text-cream grid place-items-center font-mono font-bold text-base shadow-[0_3px_0_rgba(43,26,14,.18)]">
            F
          </div>
          <div className="font-mono font-bold text-base">forge://</div>
        </Link>
        <div className="hidden sm:flex gap-1">
          {tabs.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className={`font-mono text-xs tracking-[.05em] px-3.5 py-2 rounded-full transition-opacity hover:opacity-80 ${
                t.active ? "bg-ink text-paper" : "text-tab-inactive"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        {signedIn ? (
          <>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold px-[13px] py-[7px] rounded-full bg-ink text-amber">
              ▲ {streak}
              <span className="font-normal text-chip-soft">DAY STREAK</span>
            </div>
            <div className="font-mono text-xs font-bold px-[13px] py-[7px] rounded-full bg-amber-wash text-amber-text border border-amber-wash-border">
              {fmt(xp)} XP
            </div>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="font-mono text-xs font-bold px-[18px] py-[9px] rounded-full bg-ink text-paper transition-transform hover:-translate-y-px"
          >
            SIGN IN →
          </Link>
        )}
      </div>
    </nav>
  );
}
