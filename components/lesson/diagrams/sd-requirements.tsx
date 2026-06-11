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
        <marker id="sd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="sd-arrow-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* Product Ask box */}
      <rect x="30" y="110" width="150" height="80" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="105" y="144" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">PRODUCT</text>
      <text x="105" y="162" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">PRODUCT ASK</text>

      {/* Arrow: product ask → split */}
      <line x1="180" y1="150" x2="230" y2="150" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#sd-arrow)" />

      {/* Functional Requirements */}
      <rect x="235" y="60" width="180" height="70" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="325" y="88" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">FUNCTIONAL</text>
      <text x="325" y="107" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">What it does</text>
      <text x="325" y="122" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">post · follow · search</text>

      {/* Non-Functional Requirements */}
      <rect x="235" y="170" width="180" height="70" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="325" y="198" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">NON-FUNCTIONAL</text>
      <text x="325" y="217" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">How well it does it</text>
      <text x="325" y="232" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">latency · scale · uptime</text>

      {/* Arrows from ask to FR and NFR */}
      <line x1="230" y1="150" x2="235" y2="100" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#sd-arrow)" />
      <line x1="230" y1="150" x2="235" y2="200" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#sd-arrow)" />

      {/* Arrow: FR → design loop */}
      <line x1="415" y1="95" x2="470" y2="120" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#sd-arrow)" />
      {/* Arrow: NFR → design loop */}
      <line x1="415" y1="205" x2="470" y2="185" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#sd-arrow)" />

      {/* Design loop box */}
      <rect x="470" y="100" width="250" height="100" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="595" y="128" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#8c7a68">DESIGN LOOP</text>
      <text x="535" y="152" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#9e3e20">DESIGN</text>
      <text x="595" y="152" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#8c7a68">→</text>
      <text x="650" y="152" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#9e3e20">ESTIMATE</text>
      {/* Refine arc label */}
      <path d="M 680 165 Q 595 195 510 165" stroke="#c2522e" strokeWidth="1.5" fill="none" markerEnd="url(#sd-arrow-active)" />
      <text x="595" y="188" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#c2522e">REFINE</text>
    </svg>
  );
}
