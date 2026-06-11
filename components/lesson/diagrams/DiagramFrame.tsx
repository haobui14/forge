import type { ReactNode } from "react";

// Figure slot for lesson architecture diagrams.
export function DiagramFrame({
  height,
  alt,
  children,
}: {
  height: number;
  alt: string;
  children?: ReactNode;
}) {
  if (!children) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full rounded-2xl border border-dashed border-sand bg-glyph-wash grid place-items-center"
        style={{ height }}
      >
        <div className="font-mono text-xs text-muted">{alt}</div>
      </div>
    );
  }
  return (
    <figure
      role="img"
      aria-label={alt}
      className="m-0 w-full rounded-2xl border border-line bg-card overflow-hidden"
      style={{ height }}
    >
      {children}
    </figure>
  );
}
