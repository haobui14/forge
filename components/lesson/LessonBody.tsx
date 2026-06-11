import type { Block } from "@/lib/lessons";
import { InlineText } from "./InlineText";
import { Quiz } from "./Quiz";
import { DiagramFrame } from "./diagrams/DiagramFrame";
import { DIAGRAMS } from "./diagrams";

export function LessonBody({
  blocks,
  lessonSlug,
  signedIn,
}: {
  blocks: Block[];
  lessonSlug: string;
  signedIn: boolean;
}) {
  return (
    <div className="text-[17.5px] leading-[1.75] text-body flex flex-col gap-[22px] pt-8 max-w-[760px]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lede":
            return (
              <p key={i} className="m-0 text-xl leading-[1.65] text-ink">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="m-0 mt-[18px] text-[26px] sm:text-[30px] font-extrabold tracking-[-.015em] text-ink"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="m-0">
                <InlineText parts={block.parts} />
              </p>
            );
          case "callout":
            return (
              <div
                key={i}
                className="border border-amber-wash-border bg-amber-wash rounded-[14px] px-[22px] py-[18px] flex flex-col sm:flex-row gap-2 sm:gap-3.5 sm:items-baseline"
              >
                <div className="font-mono text-[11px] font-bold tracking-[.1em] text-amber-text whitespace-nowrap">
                  {block.label}
                </div>
                <div className="text-[15px] leading-[1.6] text-reminder-text">{block.body}</div>
              </div>
            );
          case "diagram": {
            const Diagram = DIAGRAMS[block.id];
            return (
              <DiagramFrame key={i} height={block.height} alt={block.alt}>
                {Diagram ? <Diagram /> : undefined}
              </DiagramFrame>
            );
          }
          case "rows":
            return (
              <div key={i} className="flex flex-col gap-2.5">
                {block.items.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-[18px] bg-card border border-line rounded-[13px] px-5 py-4 items-baseline"
                  >
                    <div className="font-mono text-[13.5px] font-bold text-terracotta-deep">
                      {item.name}
                    </div>
                    <div className="text-[15px] leading-[1.6] text-body">{item.description}</div>
                  </div>
                ))}
              </div>
            );
          case "table":
            return (
              <div key={i} className="border border-line rounded-[14px] overflow-hidden">
                <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[160px_1fr_1fr] bg-dark text-paper font-mono text-xs tracking-[.06em]">
                  <div className="px-3 sm:px-5 py-[13px] text-muted" />
                  <div className="px-3 sm:px-5 py-[13px] text-amber">{block.cols[0]}</div>
                  <div className="px-3 sm:px-5 py-[13px] text-amber">{block.cols[1]}</div>
                </div>
                {block.rows.map((row, j) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[160px_1fr_1fr] bg-card text-[14.5px] ${
                      j < block.rows.length - 1 ? "border-b border-line-soft" : ""
                    }`}
                  >
                    <div className="px-3 sm:px-5 py-[13px] font-mono text-xs text-muted">
                      {row.label}
                    </div>
                    <div className="px-3 sm:px-5 py-[13px]">{row.a}</div>
                    <div className="px-3 sm:px-5 py-[13px]">{row.b}</div>
                  </div>
                ))}
              </div>
            );
          case "takeaways":
            return (
              <div
                key={i}
                className="bg-dark text-paper rounded-2xl px-[30px] py-[26px] flex flex-col gap-3 mt-2"
              >
                <div className="font-mono text-[11px] tracking-[.14em] text-amber">
                  KEY TAKEAWAYS
                </div>
                {block.items.map((item, j) => (
                  <div key={j} className="flex gap-3 text-[15px] leading-[1.6]">
                    <span className="text-amber font-mono">{String(j + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            );
          case "quiz":
            return (
              <Quiz
                key={i}
                lessonSlug={lessonSlug}
                signedIn={signedIn}
                question={block.question}
                options={block.options}
                correctIndex={block.correctIndex}
                correctMsg={block.correctMsg}
                wrongMsg={block.wrongMsg}
              />
            );
        }
      })}
    </div>
  );
}
