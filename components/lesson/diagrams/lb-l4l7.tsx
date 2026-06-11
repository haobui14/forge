export default function Diagram() {
  return (
    <svg
      viewBox="0 0 760 280"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="arr-l4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="arr-l7" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ── LANE BACKGROUNDS ── */}
      {/* L4 lane */}
      <rect x="16" y="16" width="728" height="108" rx="12" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="36" y="36" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fontWeight="700" fill="#8c7a68">L4 — TCP PASSTHROUGH</text>

      {/* L7 lane */}
      <rect x="16" y="152" width="728" height="112" rx="12" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="36" y="172" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fontWeight="700" fill="#9e3e20">L7 — HTTP-AWARE</text>

      {/* ── L4 LANE ── */}
      {/* Client */}
      <rect x="40" y="46" width="90" height="44" rx="8" fill="#fff" stroke="#e9dcc9" />
      <text x="85" y="65" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">Client</text>
      <text x="85" y="81" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">TCP :443</text>

      {/* L4 LB */}
      <rect x="220" y="46" width="120" height="44" rx="8" fill="#241710" stroke="#e89b18" />
      <text x="280" y="65" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#faf4eb">L4 Balancer</text>
      <text x="280" y="81" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#e89b18" letterSpacing=".06em">NO INSPECTION</text>

      {/* Servers */}
      <rect x="460" y="36" width="100" height="28" rx="7" fill="#fff" stroke="#e9dcc9" />
      <text x="510" y="54" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fontWeight="700" fill="#2b1a0e">Server A</text>

      <rect x="460" y="76" width="100" height="28" rx="7" fill="#fff" stroke="#e9dcc9" />
      <text x="510" y="94" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fontWeight="700" fill="#2b1a0e">Server B</text>

      {/* Arrows L4 */}
      <line x1="132" y1="68" x2="218" y2="68" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-l4)" />
      <text x="175" y="62" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">raw TCP</text>
      <line x1="342" y1="61" x2="458" y2="52" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-l4)" />
      <line x1="342" y1="74" x2="458" y2="88" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-l4)" />

      {/* Note: blind passthrough */}
      <text x="608" y="60" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">sees only</text>
      <text x="608" y="73" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">IP + port</text>

      {/* ── L7 LANE ── */}
      {/* Client */}
      <rect x="40" y="182" width="90" height="44" rx="8" fill="#fff" stroke="#e9dcc9" />
      <text x="85" y="201" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">Client</text>
      <text x="85" y="217" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">HTTPS</text>

      {/* L7 LB (TLS termination) */}
      <rect x="200" y="178" width="140" height="52" rx="8" fill="#241710" stroke="#e89b18" />
      <text x="270" y="198" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#faf4eb">L7 Balancer</text>
      <text x="270" y="213" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#e89b18" letterSpacing=".05em">TLS TERMINATE</text>
      <text x="270" y="225" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#e89b18" letterSpacing=".05em">READS HTTP PATH</text>

      {/* Video fleet */}
      <rect x="440" y="162" width="120" height="44" rx="8" fill="#fff" stroke="#c2522e" strokeWidth="1.5" />
      <text x="500" y="180" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fontWeight="700" fill="#9e3e20">Video Fleet</text>
      <text x="500" y="196" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">/api/video/*</text>

      {/* App fleet */}
      <rect x="440" y="220" width="120" height="34" rx="8" fill="#fff" stroke="#e9dcc9" />
      <text x="500" y="238" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fontWeight="700" fill="#2b1a0e">App Fleet</text>
      <text x="500" y="250" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">/api/* (other)</text>

      {/* Arrows L7 */}
      <line x1="132" y1="204" x2="198" y2="204" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#arr-l7)" />
      <text x="165" y="198" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#c2522e">HTTPS</text>

      {/* LB → Video fleet (path-based) */}
      <line x1="342" y1="195" x2="438" y2="185" stroke="#c2522e" strokeWidth="2" markerEnd="url(#arr-l7)" />
      <text x="388" y="182" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#c2522e">/api/video</text>

      {/* LB → App fleet */}
      <line x1="342" y1="215" x2="438" y2="232" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-l4)" />
      <text x="388" y="233" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#8c7a68">/api/*</text>

      {/* TLS badge */}
      <rect x="608" y="182" width="112" height="22" rx="6" fill="#241710" />
      <text x="664" y="197" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="9" fill="#e89b18" letterSpacing=".06em">TLS ENDS HERE</text>
    </svg>
  );
}
