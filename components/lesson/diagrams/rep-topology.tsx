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
        <marker id="rt-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="rt-arrow-em" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ═══════════════ LEFT SIDE: REPLICATION ═══════════════ */}
      <text x="175" y="28" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".10em" fill="#8c7a68">REPLICATION</text>

      {/* Leader */}
      <rect x="105" y="42" width="140" height="64" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="175" y="68" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">LEADER</text>
      <text x="175" y="86" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#e89b18">ACCEPTS WRITES</text>

      {/* Arrow to replica 1 */}
      <line x1="175" y1="106" x2="105" y2="178" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#rt-arrow-em)" />
      {/* Arrow to replica 2 */}
      <line x1="175" y1="106" x2="245" y2="178" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#rt-arrow-em)" />

      {/* Replication label */}
      <text x="100" y="150" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#c2522e">async stream</text>

      {/* Replica 1 */}
      <rect x="30" y="182" width="140" height="58" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="100" y="206" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">REPLICA 1</text>
      <text x="100" y="224" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">serves reads</text>

      {/* Replica 2 */}
      <rect x="180" y="182" width="140" height="58" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="250" y="206" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">REPLICA 2</text>
      <text x="250" y="224" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">serves reads</text>

      {/* Lag warning */}
      <rect x="60" y="262" width="230" height="36" rx="8" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1" />
      <text x="175" y="278" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#9e3e20">⚠ replication lag — replicas</text>
      <text x="175" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#9e3e20">may be milliseconds behind</text>

      {/* ═══════════════ DIVIDER ═══════════════ */}
      <line x1="380" y1="20" x2="380" y2="310" stroke="#e9dcc9" strokeWidth="1" strokeDasharray="4,4" />

      {/* ═══════════════ RIGHT SIDE: SHARDING ═══════════════ */}
      <text x="570" y="28" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".10em" fill="#8c7a68">SHARDING</text>

      {/* Router / client */}
      <rect x="495" y="42" width="150" height="52" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="570" y="64" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">SHARD ROUTER</text>
      <text x="570" y="80" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".08em" fill="#e89b18">hash(key) mod N</text>

      {/* Arrow to shard A */}
      <line x1="520" y1="94" x2="430" y2="178" stroke="#8c7a68" strokeWidth="1.3" markerEnd="url(#rt-arrow)" />
      {/* Arrow to shard B */}
      <line x1="570" y1="94" x2="570" y2="178" stroke="#8c7a68" strokeWidth="1.3" markerEnd="url(#rt-arrow)" />
      {/* Arrow to shard C */}
      <line x1="620" y1="94" x2="710" y2="178" stroke="#8c7a68" strokeWidth="1.3" markerEnd="url(#rt-arrow)" />

      {/* Shard A */}
      <rect x="395" y="182" width="110" height="64" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="450" y="207" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">SHARD A</text>
      <text x="450" y="222" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">keys 0–33 %</text>

      {/* Shard B */}
      <rect x="515" y="182" width="110" height="64" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="570" y="207" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">SHARD B</text>
      <text x="570" y="222" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">keys 34–66 %</text>

      {/* Shard C */}
      <rect x="635" y="182" width="110" height="64" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="690" y="207" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">SHARD C</text>
      <text x="690" y="222" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">keys 67–100 %</text>

      {/* Hot spot callout */}
      <rect x="410" y="264" width="320" height="36" rx="8" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1" />
      <text x="570" y="278" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#9e3e20">⚠ skewed key = hot spot — one shard</text>
      <text x="570" y="292" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#9e3e20">handles all celebrity traffic</text>
    </svg>
  );
}
