export default function Diagram() {
  return (
    <svg
      viewBox="0 0 760 330"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="arr-neutral" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="arr-miss" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ── ORIGIN SERVER (center-top) ── */}
      <rect x="305" y="20" width="150" height="52" rx="10" fill="#241710" stroke="#e9dcc9" />
      <text x="380" y="42" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">Origin Server</text>
      <text x="380" y="58" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#e89b18" letterSpacing=".06em">VIRGINIA · US-EAST</text>

      {/* ── EDGE POP LEFT (EU) ── */}
      <rect x="60" y="140" width="140" height="52" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="130" y="162" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">POP · EU</text>
      <text x="130" y="178" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68" letterSpacing=".06em">FRANKFURT</text>

      {/* ── EDGE POP CENTER (APAC, cache miss path) ── */}
      <rect x="310" y="140" width="140" height="52" rx="10" fill="#faf4eb" stroke="#c2522e" strokeWidth="1.5" />
      <text x="380" y="162" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">POP · APAC</text>
      <text x="380" y="178" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68" letterSpacing=".06em">SINGAPORE</text>

      {/* ── EDGE POP RIGHT (US-WEST) ── */}
      <rect x="560" y="140" width="140" height="52" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="630" y="162" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">POP · US-W</text>
      <text x="630" y="178" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68" letterSpacing=".06em">SAN JOSE</text>

      {/* Origin → POP EU (normal neutral) */}
      <line x1="305" y1="52" x2="200" y2="140" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-neutral)" />

      {/* Origin ↔ POP APAC (cache miss — terracotta, labeled) */}
      <line x1="380" y1="72" x2="380" y2="138" stroke="#c2522e" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr-miss)" />
      <text x="396" y="112" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">CACHE MISS</text>

      {/* Origin → POP US-W (neutral) */}
      <line x1="455" y1="52" x2="560" y2="140" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-neutral)" />

      {/* ── USERS ── */}
      {/* User EU */}
      <circle cx="70" cy="278" r="18" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="70" y="274" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="16" fill="#2b1a0e">👤</text>
      <text x="70" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">EU USER</text>

      <circle cx="185" cy="278" r="18" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="185" y="274" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="16" fill="#2b1a0e">👤</text>
      <text x="185" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">EU USER</text>

      {/* User APAC */}
      <circle cx="340" cy="278" r="18" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="340" y="274" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="16" fill="#2b1a0e">👤</text>
      <text x="340" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">SG USER</text>

      <circle cx="415" cy="278" r="18" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="415" y="274" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="16" fill="#2b1a0e">👤</text>
      <text x="415" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">SG USER</text>

      {/* User US-W */}
      <circle cx="575" cy="278" r="18" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="575" y="274" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="16" fill="#2b1a0e">👤</text>
      <text x="575" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">US USER</text>

      <circle cx="685" cy="278" r="18" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="685" y="274" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="16" fill="#2b1a0e">👤</text>
      <text x="685" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">US USER</text>

      {/* Users → POP arrows */}
      <line x1="70" y1="258" x2="110" y2="194" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#arr-neutral)" />
      <line x1="185" y1="258" x2="155" y2="194" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#arr-neutral)" />
      <line x1="340" y1="258" x2="358" y2="194" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#arr-neutral)" />
      <line x1="415" y1="258" x2="400" y2="194" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#arr-neutral)" />
      <line x1="575" y1="258" x2="602" y2="194" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#arr-neutral)" />
      <line x1="685" y1="258" x2="658" y2="194" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#arr-neutral)" />

      {/* Cache-miss legend */}
      <rect x="20" y="308" width="14" height="3" fill="#c2522e" />
      <text x="40" y="313" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">cache miss → origin fetch</text>
      <rect x="210" y="308" width="14" height="3" fill="#8c7a68" />
      <text x="230" y="313" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">cache hit (local POP)</text>
    </svg>
  );
}
