export default function Diagram() {
  return (
    <svg
      viewBox="0 0 760 280"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fontFamily="var(--font-jetbrains), monospace"
    >
      <rect width="760" height="280" fill="#faf4eb" />

      {/* Title */}
      <text x="380" y="28" textAnchor="middle" fontSize={11} letterSpacing=".1em" fill="#8c7a68" fontWeight="700">45-MINUTE INTERVIEW TIMELINE</text>

      {/* Phase dimensions:
          clarify_requirements: 5-8 min → 14%  → width ~96
          napkin_math:          5 min  → 11%  → width ~76
          high_level_design:    10-15  → 27%  → width ~186
          deep_dive:            10-15  → 27%  → width ~186  (emphasized)
          wrap_up:              5 min  → 11%  → width ~76
          gaps: ~40 total
          total usable: 760-60=700
      */}

      {/* ── Phase blocks ── */}

      {/* 1: clarify_requirements */}
      <rect x="30" y="50" width="106" height="130" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="83" y="72" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">PHASE 1</text>
      <text x="83" y="90" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">CLARIFY</text>
      <text x="83" y="106" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">REQS</text>
      <text x="83" y="130" textAnchor="middle" fontSize={18} fontWeight="700" fill="#9e3e20">5–8</text>
      <text x="83" y="148" textAnchor="middle" fontSize={11} letterSpacing=".06em" fill="#8c7a68">min</text>

      {/* Arrow */}
      <line x1="136" y1="115" x2="152" y2="115" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#ag)" />

      {/* 2: napkin_math */}
      <rect x="152" y="68" width="88" height="112" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="196" y="88" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">PHASE 2</text>
      <text x="196" y="106" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">NAPKIN</text>
      <text x="196" y="122" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">MATH</text>
      <text x="196" y="148" textAnchor="middle" fontSize={18} fontWeight="700" fill="#9e3e20">~5</text>
      <text x="196" y="164" textAnchor="middle" fontSize={11} letterSpacing=".06em" fill="#8c7a68">min</text>

      {/* Arrow */}
      <line x1="240" y1="124" x2="256" y2="124" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#ag)" />

      {/* 3: high_level_design */}
      <rect x="256" y="50" width="130" height="130" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="321" y="72" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">PHASE 3</text>
      <text x="321" y="90" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">HIGH-LEVEL</text>
      <text x="321" y="106" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">DESIGN</text>
      <text x="321" y="130" textAnchor="middle" fontSize={18} fontWeight="700" fill="#9e3e20">10–15</text>
      <text x="321" y="148" textAnchor="middle" fontSize={11} letterSpacing=".06em" fill="#8c7a68">min</text>

      {/* Arrow */}
      <line x1="386" y1="115" x2="402" y2="115" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#ag)" />

      {/* 4: deep_dive — EMPHASIZED */}
      <rect x="402" y="38" width="154" height="154" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="2" />
      <text x="479" y="62" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#e89b18">PHASE 4</text>
      <text x="479" y="82" textAnchor="middle" fontSize={14} fontWeight="700" fill="#faf4eb">DEEP</text>
      <text x="479" y="100" textAnchor="middle" fontSize={14} fontWeight="700" fill="#faf4eb">DIVE</text>
      <text x="479" y="132" textAnchor="middle" fontSize={22} fontWeight="700" fill="#e89b18">10–15</text>
      <text x="479" y="152" textAnchor="middle" fontSize={11} letterSpacing=".06em" fill="#e89b18">min</text>
      <text x="479" y="172" textAnchor="middle" fontSize={10} letterSpacing=".06em" fill="#8c7a68">← interviewer steers</text>

      {/* Arrow */}
      <line x1="556" y1="115" x2="572" y2="115" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#ag)" />

      {/* 5: wrap_up */}
      <rect x="572" y="68" width="96" height="112" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="620" y="88" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">PHASE 5</text>
      <text x="620" y="106" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">WRAP</text>
      <text x="620" y="122" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">UP</text>
      <text x="620" y="148" textAnchor="middle" fontSize={18} fontWeight="700" fill="#9e3e20">~5</text>
      <text x="620" y="164" textAnchor="middle" fontSize={11} letterSpacing=".06em" fill="#8c7a68">min</text>

      {/* Timeline bar */}
      <rect x="30" y="210" width="638" height="8" rx="4" fill="#e9dcc9" />
      {/* Phase segments on bar */}
      <rect x="30" y="210" width="106" height="8" rx="4" fill="#c2522e" />
      <rect x="152" y="210" width="88" height="8" rx="4" fill="#c2522e" />
      <rect x="256" y="210" width="130" height="8" rx="4" fill="#c2522e" />
      <rect x="402" y="210" width="154" height="8" rx="4" fill="#e89b18" />
      <rect x="572" y="210" width="96" height="8" rx="4" fill="#c2522e" />

      {/* Total label */}
      <text x="349" y="240" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">TOTAL: ~45 MINUTES</text>

      {/* Grading labels */}
      <text x="30" y="268" fontSize={11} letterSpacing=".06em" fill="#8c7a68">GRADED ON:</text>
      <text x="122" y="268" fontSize={11} fill="#2b1a0e">structured thinking</text>
      <text x="272" y="268" fontSize={11} fill="#2b1a0e">trade-off fluency</text>
      <text x="412" y="268" fontSize={11} fill="#2b1a0e">depth on demand</text>
      <text x="560" y="268" fontSize={11} fill="#2b1a0e">communication</text>

      <defs>
        <marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8c7a68" />
        </marker>
      </defs>
    </svg>
  );
}
