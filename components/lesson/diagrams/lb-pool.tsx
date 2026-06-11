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
        <marker id="arr-lb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="arr-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ── CLIENTS ── */}
      <circle cx="70" cy="80" r="20" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="70" y="76" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="15" fill="#2b1a0e">👤</text>
      <text x="70" y="112" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68" letterSpacing=".06em">CLIENT</text>

      <circle cx="70" cy="165" r="20" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="70" y="161" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="15" fill="#2b1a0e">👤</text>
      <text x="70" y="197" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68" letterSpacing=".06em">CLIENT</text>

      <circle cx="70" cy="250" r="20" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="70" y="246" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="15" fill="#2b1a0e">👤</text>
      <text x="70" y="282" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68" letterSpacing=".06em">CLIENT</text>

      {/* Client → LB arrows */}
      <line x1="92" y1="80" x2="218" y2="130" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-lb)" />
      <line x1="92" y1="165" x2="218" y2="158" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-lb)" />
      <line x1="92" y1="250" x2="218" y2="188" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-lb)" />

      {/* ── LOAD BALANCER ── */}
      <rect x="218" y="118" width="130" height="80" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="283" y="148" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">Load</text>
      <text x="283" y="165" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">Balancer</text>
      <text x="283" y="186" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#e89b18" letterSpacing=".08em">LEAST CONN</text>

      {/* ── SERVER POOL ── */}
      {/* Server 1 - healthy */}
      <rect x="440" y="30" width="120" height="52" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="500" y="52" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Server 1</text>
      <text x="500" y="68" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">● healthy</text>

      {/* Server 2 - healthy */}
      <rect x="440" y="110" width="120" height="52" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="500" y="132" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Server 2</text>
      <text x="500" y="148" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">● healthy</text>

      {/* Server 3 - FAILED */}
      <rect x="440" y="190" width="120" height="52" rx="10" fill="#f4e9d8" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.55" />
      <text x="500" y="212" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#8c7a68">Server 3</text>
      <text x="500" y="228" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">✗ health-check failed</text>

      {/* Server 4 - healthy */}
      <rect x="440" y="270" width="120" height="52" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="500" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Server 4</text>
      <text x="500" y="308" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">● healthy</text>

      {/* LB → Server 1 */}
      <line x1="348" y1="142" x2="438" y2="60" stroke="#c2522e" strokeWidth="2" markerEnd="url(#arr-active)" />
      {/* LB → Server 2 */}
      <line x1="348" y1="155" x2="438" y2="140" stroke="#c2522e" strokeWidth="2" markerEnd="url(#arr-active)" />
      {/* LB → Server 3 (greyed — no traffic) */}
      <line x1="348" y1="163" x2="438" y2="208" stroke="#8c7a68" strokeWidth="1" strokeDasharray="4,4" opacity="0.35" />
      {/* LB → Server 4 */}
      <line x1="348" y1="170" x2="438" y2="288" stroke="#c2522e" strokeWidth="2" markerEnd="url(#arr-active)" />

      {/* Pool brace label */}
      <text x="580" y="175" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68" letterSpacing=".06em">SERVER POOL</text>

      {/* Legend */}
      <line x1="30" y1="312" x2="60" y2="312" stroke="#c2522e" strokeWidth="2" />
      <text x="68" y="316" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">active traffic</text>
      <line x1="168" y1="312" x2="198" y2="312" stroke="#8c7a68" strokeWidth="1" strokeDasharray="4,4" />
      <text x="206" y="316" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">bypassed (failed health check)</text>
    </svg>
  );
}
