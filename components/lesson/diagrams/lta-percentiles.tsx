export default function Diagram() {
  return (
    <svg
      viewBox="0 0 760 280"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background panel */}
      <rect x="30" y="20" width="700" height="220" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.5" />

      {/* Axes */}
      {/* Y axis */}
      <line x1="80" y1="40" x2="80" y2="210" stroke="#8c7a68" strokeWidth="1.5" />
      {/* X axis */}
      <line x1="80" y1="210" x2="700" y2="210" stroke="#8c7a68" strokeWidth="1.5" />

      {/* Axis labels */}
      <text x="390" y="240" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">LATENCY (ms)</text>
      <text x="50" y="130" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68" transform="rotate(-90 50 130)">REQUESTS</text>

      {/* Distribution curve — a right-skewed bell rendered as a smooth path */}
      {/* Peaks around x=200, long tail extending right */}
      <path
        d="M 85 208
           C 100 208, 120 207, 150 195
           C 180 180, 200 120, 230 80
           C 250 55, 270 50, 290 55
           C 310 62, 330 95, 360 140
           C 390 175, 420 195, 460 204
           C 500 208, 540 209, 580 209
           C 620 209, 660 209, 695 209"
        stroke="#9e3e20"
        strokeWidth="2.5"
        fill="#f4e9d8"
        fillOpacity="0.7"
      />

      {/* p50 marker */}
      <line x1="270" y1="50" x2="270" y2="210" stroke="#2b1a0e" strokeWidth="1" strokeDasharray="4 3" />
      <rect x="240" y="26" width="60" height="20" rx="4" fill="#241710" />
      <text x="270" y="40" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fontWeight="700" fill="#faf4eb">p50</text>
      <text x="270" y="224" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#2b1a0e">median</text>

      {/* p95 marker */}
      <line x1="490" y1="205" x2="490" y2="50" stroke="#9e3e20" strokeWidth="1" strokeDasharray="4 3" />
      <rect x="460" y="26" width="60" height="20" rx="4" fill="#9e3e20" />
      <text x="490" y="40" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fontWeight="700" fill="#faf4eb">p95</text>
      <text x="490" y="224" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#9e3e20">slow</text>

      {/* p99 marker */}
      <line x1="610" y1="209" x2="610" y2="50" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="580" y="26" width="60" height="20" rx="4" fill="#c2522e" />
      <text x="610" y="40" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fontWeight="700" fill="#faf4eb">p99</text>
      <text x="610" y="224" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">tail</text>

      {/* "long tail" annotation */}
      <text x="560" y="160" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#c2522e">LONG TAIL</text>
      <line x1="580" y1="163" x2="640" y2="195" stroke="#c2522e" strokeWidth="1" />
    </svg>
  );
}
