interface Props {
  level: number;
  pct: number;
  /** outer diameter px */
  size?: number;
  variant: "dark" | "light";
}

// Conic-gradient level ring: amber fill on dark surfaces (player card),
// terracotta fill on light surfaces (dashboard level card).
export function LevelRing({ level, pct, size = 84, variant }: Props) {
  const inner = Math.round(size * 0.762);
  const fill = variant === "dark" ? "#e89b18" : "#c2522e";
  const track = variant === "dark" ? "rgba(250,244,235,.12)" : "#f0e6d6";
  const innerBg = variant === "dark" ? "#2e1d12" : "#fffdf8";
  const numColor = variant === "dark" ? "#faf4eb" : "#9e3e20";

  return (
    <div
      className="rounded-full grid place-items-center shrink-0"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${fill} ${pct}%, ${track} 0)`,
      }}
    >
      <div
        className="rounded-full grid place-items-center font-mono font-bold"
        style={{
          width: inner,
          height: inner,
          background: innerBg,
          color: numColor,
          fontSize: Math.round(size * 0.27),
        }}
      >
        {level}
      </div>
    </div>
  );
}
