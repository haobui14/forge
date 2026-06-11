export default function Diagram() {
  return (
    <svg
      viewBox="0 0 760 330"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fontFamily="var(--font-jetbrains), monospace"
    >
      <rect width="760" height="330" fill="#faf4eb" />

      {/* ===== Section labels ===== */}
      <text x="30" y="24" fontSize={11} letterSpacing=".08em" fill="#8c7a68" fontWeight="700">NORMAL USER — FAN-OUT ON WRITE</text>
      <text x="30" y="188" fontSize={11} letterSpacing=".08em" fill="#8c7a68" fontWeight="700">CELEBRITY — FAN-OUT ON READ</text>

      {/* ===== WRITE PATH (normal user) ===== */}

      {/* Normal user posts */}
      <rect x="30" y="34" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="78" y="51" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">USER</text>
      <text x="78" y="67" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">posts</text>

      {/* Arrow to Queue */}
      <line x1="126" y1="56" x2="172" y2="56" stroke="#e89b18" strokeWidth="2" markerEnd="url(#aw)" />

      {/* Message Queue */}
      <rect x="172" y="34" width="96" height="44" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="220" y="51" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#e89b18">MESSAGE</text>
      <text x="220" y="67" textAnchor="middle" fontSize={13} fontWeight="700" fill="#faf4eb">QUEUE</text>

      {/* Arrow to fan-out workers */}
      <line x1="268" y1="56" x2="314" y2="56" stroke="#e89b18" strokeWidth="2" markerEnd="url(#aw)" />

      {/* Fan-out worker */}
      <rect x="314" y="34" width="106" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="367" y="51" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">FAN-OUT</text>
      <text x="367" y="67" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">WORKERS</text>

      {/* Three feed caches */}
      {/* Cache 1 */}
      <line x1="420" y1="50" x2="468" y2="36" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#at)" />
      <rect x="468" y="20" width="96" height="36" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="516" y="33" textAnchor="middle" fontSize={10} letterSpacing=".06em" fill="#8c7a68">FOLLOWER A</text>
      <text x="516" y="47" textAnchor="middle" fontSize={12} fontWeight="700" fill="#9e3e20">feed cache</text>

      {/* Cache 2 */}
      <line x1="420" y1="56" x2="468" y2="56" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#at)" />
      <rect x="468" y="40" width="96" height="36" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="516" y="53" textAnchor="middle" fontSize={10} letterSpacing=".06em" fill="#8c7a68">FOLLOWER B</text>
      <text x="516" y="67" textAnchor="middle" fontSize={12} fontWeight="700" fill="#9e3e20">feed cache</text>

      {/* Cache 3 */}
      <line x1="420" y1="62" x2="468" y2="78" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#at)" />
      <rect x="468" y="62" width="96" height="36" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="516" y="75" textAnchor="middle" fontSize={10} letterSpacing=".06em" fill="#8c7a68">FOLLOWER C</text>
      <text x="516" y="89" textAnchor="middle" fontSize={12} fontWeight="700" fill="#9e3e20">feed cache</text>

      {/* Read label on right */}
      <text x="590" y="50" fontSize={11} letterSpacing=".06em" fill="#8c7a68">→ instant read</text>
      <text x="590" y="64" fontSize={11} letterSpacing=".06em" fill="#8c7a68">→ instant read</text>
      <text x="590" y="78" fontSize={11} letterSpacing=".06em" fill="#8c7a68">→ instant read</text>

      {/* Explanation text */}
      <text x="30" y="132" fontSize={12} fill="#2b1a0e">Post ID pushed to every follower's Redis sorted set by fan-out workers. Read = fetch precomputed list.</text>

      {/* Divider */}
      <line x1="30" y1="155" x2="730" y2="155" stroke="#e9dcc9" strokeWidth="1" strokeDasharray="6,4" />

      {/* ===== READ PATH (celebrity) ===== */}

      {/* Celebrity posts */}
      <rect x="30" y="198" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="78" y="215" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">CELEBRITY</text>
      <text x="78" y="231" textAnchor="middle" fontSize={13} fontWeight="700" fill="#9e3e20">posts</text>

      {/* Arrow to DB only — no fan-out */}
      <line x1="126" y1="220" x2="220" y2="220" stroke="#e89b18" strokeWidth="2" markerEnd="url(#aw)" />

      {/* DB */}
      <rect x="220" y="198" width="96" height="44" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="268" y="215" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#e89b18">POST</text>
      <text x="268" y="231" textAnchor="middle" fontSize={13} fontWeight="700" fill="#faf4eb">DATABASE</text>

      {/* No fan-out marker */}
      <text x="332" y="215" fontSize={12} fill="#8c7a68">← no fan-out</text>
      <text x="332" y="231" fontSize={12} fill="#8c7a68">  (10M writes avoided)</text>

      {/* At read time: viewer fetches */}
      <rect x="30" y="268" width="700" height="48" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="52" y="288" fontSize={11} letterSpacing=".08em" fill="#8c7a68" fontWeight="700">AT READ TIME</text>
      <text x="52" y="306" fontSize={13} fill="#2b1a0e">API merges viewer's precomputed feed + recent posts fetched directly from followed celebrities → ranked result</text>

      {/* Defs */}
      <defs>
        <marker id="aw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#e89b18" />
        </marker>
        <marker id="at" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#c2522e" />
        </marker>
      </defs>
    </svg>
  );
}
