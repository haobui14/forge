const STEPS = [
  {
    border: "border-t-terracotta",
    labelColor: "text-terracotta-deep",
    label: "01 / FOLLOW THE PATH",
    title: "A roadmap, not a pile of links",
    body: "Lessons unlock in order, so every concept builds on the last — from one server to planet scale.",
  },
  {
    border: "border-t-amber",
    labelColor: "text-amber-text",
    label: "02 / READ & PRACTICE",
    title: "Deep reading, real diagrams",
    body: "Every lesson pairs careful writing with architecture diagrams and a quick check of your understanding.",
  },
  {
    border: "border-t-ink",
    labelColor: "text-ink",
    label: "03 / EARN & KEEP GOING",
    title: "XP, badges and streaks",
    body: "Milestone badges mark real mastery, and daily streaks keep you coming back until it sticks.",
  },
];

export function HowItWorks() {
  return (
    <section className="max-w-[1160px] mx-auto px-6 sm:px-14 pt-16 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
        {STEPS.map((s) => (
          <div key={s.label} className={`flex flex-col gap-2.5 p-[26px] border-t-[3px] ${s.border}`}>
            <div className={`font-mono text-[13px] font-bold ${s.labelColor}`}>{s.label}</div>
            <div className="text-lg font-bold">{s.title}</div>
            <div className="text-sm text-muted leading-[1.55]">{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
