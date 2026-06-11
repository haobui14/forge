export default function Diagram() {
  return (
    <svg
      viewBox="0 0 760 300"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="ca-arrow-neutral" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="ca-arrow-hit" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#e89b18" />
        </marker>
        <marker id="ca-arrow-miss" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ── APP ── */}
      <rect x="30" y="116" width="130" height="68" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="95" y="144" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">APP</text>
      <text x="95" y="162" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#e89b18">checks cache first</text>

      {/* ── CACHE (Redis) ── */}
      <rect x="290" y="40" width="180" height="68" rx="10" fill="#faf4eb" stroke="#e89b18" strokeWidth="1.8" />
      <text x="380" y="68" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">CACHE</text>
      <text x="380" y="86" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#9e3e20">Redis · in-memory</text>

      {/* ── DB ── */}
      <rect x="290" y="192" width="180" height="68" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="380" y="220" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">DATABASE</text>
      <text x="380" y="238" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">Postgres · MySQL</text>

      {/* ── HIT PATH: App → Cache (amber) ── */}
      <line x1="160" y1="136" x2="288" y2="76" stroke="#e89b18" strokeWidth="2" markerEnd="url(#ca-arrow-hit)" />
      <text x="210" y="94" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#e89b18">1. GET key</text>

      {/* HIT return arrow (dashed amber) */}
      <line x1="290" y1="92" x2="162" y2="148" stroke="#e89b18" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ca-arrow-hit)" />
      <text x="200" y="136" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#e89b18">HIT ✓ return</text>

      {/* ── MISS PATH: App → Cache miss → DB (terracotta) ── */}
      {/* Miss indicator on cache */}
      <line x1="380" y1="108" x2="380" y2="190" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#ca-arrow-miss)" />
      <text x="410" y="156" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#c2522e">2. MISS</text>
      <text x="410" y="170" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#c2522e">→ query DB</text>

      {/* DB → Cache write-back */}
      <line x1="470" y1="210" x2="590" y2="210" stroke="#c2522e" strokeWidth="1.3" />
      <line x1="590" y1="210" x2="590" y2="74" stroke="#c2522e" strokeWidth="1.3" />
      <line x1="590" y1="74" x2="472" y2="74" stroke="#c2522e" strokeWidth="1.3" markerEnd="url(#ca-arrow-miss)" />
      <text x="620" y="148" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#c2522e">3. SET</text>
      <text x="620" y="162" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#c2522e">write-back</text>

      {/* App ← DB result */}
      <line x1="290" y1="240" x2="160" y2="184" stroke="#8c7a68" strokeWidth="1.2" strokeDasharray="4,3" markerEnd="url(#ca-arrow-neutral)" />
      <text x="200" y="225" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">4. return row</text>

      {/* ── Legend ── */}
      <line x1="30" y1="280" x2="60" y2="280" stroke="#e89b18" strokeWidth="2" />
      <text x="68" y="284" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#e89b18">cache hit</text>
      <line x1="140" y1="280" x2="170" y2="280" stroke="#c2522e" strokeWidth="2" />
      <text x="178" y="284" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">cache miss</text>
    </svg>
  );
}
