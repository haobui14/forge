interface Props {
  pct: number;
  /** track height in px */
  height?: number;
  /** dark surfaces use a translucent paper track */
  onDark?: boolean;
}

export function ProgressBar({ pct, height = 8, onDark = false }: Props) {
  return (
    <div
      className={`rounded-full overflow-hidden ${onDark ? "bg-[rgba(250,244,235,.1)]" : "bg-line-soft"}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full progress-fill"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}
