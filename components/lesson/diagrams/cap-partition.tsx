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
        <marker id="cap-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 7 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="cap-arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 7 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ── Title ── */}
      <text x="380" y="28" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">NETWORK PARTITION</text>

      {/* ── Partition lightning bolt ── */}
      <line x1="380" y1="40" x2="380" y2="260" stroke="#c2522e" strokeWidth="2" strokeDasharray="6 4" />
      <text x="380" y="148" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="18" fill="#c2522e">✕</text>

      {/* ── Left side: CP ── */}
      <text x="160" y="56" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">CP — CONSISTENT</text>

      {/* Replica A */}
      <rect x="60" y="70" width="140" height="64" rx="10" fill="#241710" stroke="#e9dcc9" />
      <text x="130" y="92" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">REPLICA A</text>
      <text x="130" y="112" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">v = 42</text>
      <text x="130" y="126" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#e89b18">ACCEPTED</text>

      {/* Refused write box */}
      <rect x="60" y="170" width="140" height="64" rx="10" fill="#faf4eb" stroke="#c2522e" strokeDasharray="5 3" />
      <text x="130" y="192" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#c2522e">WRITE REQUEST</text>
      <text x="130" y="213" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#9e3e20">REFUSED</text>
      <text x="130" y="228" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">no quorum</text>

      {/* Arrow write → refused */}
      <line x1="130" y1="134" x2="130" y2="168" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#cap-arrow-red)" />

      {/* ── Right side: AP ── */}
      <text x="600" y="56" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">AP — AVAILABLE</text>

      {/* Replica B */}
      <rect x="560" y="70" width="140" height="64" rx="10" fill="#241710" stroke="#e9dcc9" />
      <text x="630" y="92" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">REPLICA B</text>
      <text x="630" y="112" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">v = 42</text>
      <text x="630" y="126" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#e89b18">DIVERGING</text>

      {/* Accepted write box */}
      <rect x="560" y="170" width="140" height="64" rx="10" fill="#faf4eb" stroke="#8c7a68" />
      <text x="630" y="192" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">WRITE REQUEST</text>
      <text x="630" y="213" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">ACCEPTED</text>
      <text x="630" y="228" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">v = 43 (stale)</text>

      {/* Arrow write → accepted */}
      <line x1="630" y1="134" x2="630" y2="168" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#cap-arrow)" />

      {/* ── Sync arrow (blocked) ── */}
      <line x1="200" y1="102" x2="340" y2="102" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="420" y1="102" x2="558" y2="102" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="380" y="98" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">sync blocked</text>

      {/* ── Bottom note ── */}
      <text x="380" y="278" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">PARTITION HEALS → AP REPLICA CONVERGES TO LATEST VALUE</text>
    </svg>
  );
}
