"use client";

const CONFETTI_COLORS = ["#c2522e", "#e89b18", "#f3d8a8", "#7a5c3e", "#9e3e20"];

interface Props {
  xp: number;
  title: string;
  /** e.g. "One more lesson and the Network Navigator milestone is yours." */
  teaser: React.ReactNode;
  onDismiss: () => void;
}

export function CelebrationOverlay({ xp, title, teaser, onDismiss }: Props) {
  return (
    <>
      <div className="fixed inset-0 bg-[rgba(36,23,16,.8)] z-50 grid place-items-center px-6">
        <div className="bg-card rounded-3xl px-10 sm:px-14 pt-12 pb-10 text-center max-w-[460px] animate-pop-in border border-line flex flex-col gap-3.5 items-center">
          <div className="w-[74px] h-[74px] bg-amber rotate-45 rounded-2xl grid place-items-center shadow-[0_6px_0_#c07f0b] mb-2.5">
            <div className="-rotate-45 text-[30px] text-dark">★</div>
          </div>
          <div className="font-mono font-bold text-[30px] text-terracotta">+{xp} XP</div>
          <h2 className="m-0 text-[30px] font-extrabold tracking-[-.02em]">{title}</h2>
          <p className="m-0 text-[15px] text-muted leading-[1.55]">{teaser}</p>
          <button
            onClick={onDismiss}
            className="mt-2.5 font-mono font-bold text-sm px-[26px] py-[15px] rounded-xl bg-ink text-paper cursor-pointer transition-colors hover:bg-terracotta"
          >
            Back to the roadmap →
          </button>
        </div>
      </div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-60">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-[9px] h-3.5 rounded-[2px]"
            style={{
              left: `${i * 3.4 + 1}%`,
              top: "-7vh",
              background: CONFETTI_COLORS[i % 5],
              animation: `confettiFall ${2.4 + (i % 5) * 0.4}s linear ${(i % 7) * 0.22}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
