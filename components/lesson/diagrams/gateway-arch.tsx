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
        <marker id="gw-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 7 3, 0 6" fill="#8c7a68" />
        </marker>
      </defs>

      {/* ── Clients ── */}
      <rect x="30" y="120" width="100" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="80" y="137" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">CLIENT</text>
      <text x="80" y="153" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Browser / App</text>

      {/* Arrow client → gateway */}
      <line x1="130" y1="142" x2="198" y2="142" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#gw-arrow)" />

      {/* ── API Gateway (dark box) ── */}
      <rect x="200" y="72" width="160" height="156" rx="10" fill="#241710" stroke="#e9dcc9" />
      <text x="280" y="96" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">API GATEWAY</text>

      <rect x="218" y="106" width="124" height="30" rx="7" fill="#e89b18" fillOpacity=".2" stroke="#e89b18" strokeOpacity=".5" />
      <text x="280" y="126" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#e89b18">AUTH</text>

      <rect x="218" y="144" width="124" height="30" rx="7" fill="#e89b18" fillOpacity=".2" stroke="#e89b18" strokeOpacity=".5" />
      <text x="280" y="164" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#e89b18">RATE LIMIT</text>

      <rect x="218" y="182" width="124" height="30" rx="7" fill="#e89b18" fillOpacity=".2" stroke="#e89b18" strokeOpacity=".5" />
      <text x="280" y="202" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#e89b18">ROUTE</text>

      {/* Arrows gateway → services */}
      <line x1="360" y1="110" x2="428" y2="75" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#gw-arrow)" />
      <line x1="360" y1="142" x2="428" y2="142" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#gw-arrow)" />
      <line x1="360" y1="175" x2="428" y2="210" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#gw-arrow)" />

      {/* ── Service A ── */}
      <rect x="430" y="44" width="110" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="485" y="61" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">SERVICE</text>
      <text x="485" y="77" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">User Svc</text>

      {/* DB A */}
      <rect x="580" y="44" width="80" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="620" y="62" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">DB</text>
      <text x="620" y="78" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#9e3e20">users</text>
      <line x1="540" y1="66" x2="578" y2="66" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#gw-arrow)" />

      {/* ── Service B ── */}
      <rect x="430" y="120" width="110" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="485" y="137" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">SERVICE</text>
      <text x="485" y="153" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Order Svc</text>

      {/* DB B */}
      <rect x="580" y="120" width="80" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="620" y="138" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">DB</text>
      <text x="620" y="154" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#9e3e20">orders</text>
      <line x1="540" y1="142" x2="578" y2="142" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#gw-arrow)" />

      {/* ── Service C ── */}
      <rect x="430" y="196" width="110" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="485" y="213" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">SERVICE</text>
      <text x="485" y="229" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Catalog Svc</text>

      {/* DB C */}
      <rect x="580" y="196" width="80" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="620" y="214" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">DB</text>
      <text x="620" y="230" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#9e3e20">catalog</text>
      <line x1="540" y1="218" x2="578" y2="218" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#gw-arrow)" />

      {/* Own DB label */}
      <text x="620" y="290" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">OWN DB</text>
    </svg>
  );
}
