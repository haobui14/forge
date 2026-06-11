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
        <marker id="cs-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="cs-arrow-ret" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* Browser */}
      <rect x="30" y="120" width="110" height="90" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="85" y="157" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">CLIENT</text>
      <text x="85" y="176" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">BROWSER</text>
      <text x="85" y="196" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#e89b18">GET /page</text>

      {/* DNS */}
      <rect x="200" y="30" width="110" height="70" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="255" y="58" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">LOOKUP</text>
      <text x="255" y="77" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">DNS</text>
      <text x="255" y="93" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">→ IP addr</text>

      {/* Arrow browser → DNS */}
      <line x1="140" y1="140" x2="200" y2="75" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
      {/* Arrow DNS → browser (return) */}
      <line x1="200" y1="90" x2="140" y2="155" stroke="#c2522e" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#cs-arrow-ret)" />

      {/* Front Door (load balancer — introduced lesson 05) */}
      <rect x="340" y="120" width="130" height="90" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="405" y="150" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">INGRESS</text>
      <text x="405" y="167" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">FRONT DOOR</text>
      <text x="405" y="182" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="8.5" fill="#8c7a68">(a load balancer — lesson 05)</text>
      <text x="405" y="198" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#9e3e20">TCP · TLS · HTTP</text>

      {/* Arrow browser → load balancer */}
      <line x1="140" y1="162" x2="340" y2="162" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#cs-arrow)" />

      {/* Server */}
      <rect x="540" y="120" width="120" height="90" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="600" y="153" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">ORIGIN</text>
      <text x="600" y="172" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">SERVER</text>
      <text x="600" y="192" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">auth · db · render</text>

      {/* Arrow LB → server */}
      <line x1="470" y1="162" x2="540" y2="162" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#cs-arrow)" />

      {/* Response arc — curved path below the nodes */}
      <path
        d="M 660 215 Q 400 290 140 215"
        stroke="#c2522e"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#cs-arrow-ret)"
      />
      <text x="400" y="287" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#c2522e">RESPONSE — bytes flow back</text>
    </svg>
  );
}
