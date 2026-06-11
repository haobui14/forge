import type { InlinePart } from "@/lib/lessons";

// Renders the typed inline marks used in lesson prose: amber highlighter,
// mono code chips, emphasis.
export function InlineText({ parts }: { parts: InlinePart[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        if ("hl" in part)
          return (
            <strong key={i} className="hl">
              {part.hl}
            </strong>
          );
        if ("code" in part)
          return (
            <code
              key={i}
              className="font-mono text-[15px] bg-glyph-wash px-[7px] py-0.5 rounded-md"
            >
              {part.code}
            </code>
          );
        if ("em" in part) return <em key={i}>{part.em}</em>;
        return (
          <strong key={i} className="text-ink">
            {part.strong}
          </strong>
        );
      })}
    </>
  );
}
