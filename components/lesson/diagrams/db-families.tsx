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
        <marker id="dbf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="dbf-arrow-em" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ── Left: Relational ── */}
      <rect x="30" y="110" width="160" height="80" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="110" y="143" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#faf4eb">RELATIONAL</text>
      <text x="110" y="163" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#e89b18">SQL · ACID</text>
      <text x="110" y="178" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">Postgres · MySQL</text>

      {/* ── Center divider label ── */}
      <text x="260" y="155" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".10em" fill="#8c7a68">vs</text>

      {/* ── Right trunk: NoSQL ── */}
      <rect x="300" y="110" width="140" height="80" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="370" y="143" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">NOSQL</text>
      <text x="370" y="163" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#9e3e20">FOUR FAMILIES</text>
      <text x="370" y="178" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">flexible · scale-out</text>

      {/* ── Branches from NoSQL trunk ── */}
      {/* Document */}
      <line x1="440" y1="130" x2="560" y2="68" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#dbf-arrow)" />
      <rect x="560" y="30" width="168" height="56" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="644" y="52" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">DOCUMENT</text>
      <text x="644" y="68" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">MongoDB · DynamoDB</text>

      {/* Key-Value */}
      <line x1="440" y1="142" x2="560" y2="130" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#dbf-arrow)" />
      <rect x="560" y="104" width="168" height="56" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="644" y="126" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">KEY-VALUE</text>
      <text x="644" y="142" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">Redis · DynamoDB</text>

      {/* Wide-Column */}
      <line x1="440" y1="158" x2="560" y2="178" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#dbf-arrow)" />
      <rect x="560" y="152" width="168" height="56" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="644" y="174" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">WIDE-COLUMN</text>
      <text x="644" y="190" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">Cassandra · HBase</text>

      {/* Graph */}
      <line x1="440" y1="170" x2="560" y2="230" stroke="#8c7a68" strokeWidth="1.2" markerEnd="url(#dbf-arrow)" />
      <rect x="560" y="214" width="168" height="56" rx="10" fill="#faf4eb" stroke="#e9dcc9" strokeWidth="1.2" />
      <text x="644" y="236" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">GRAPH</text>
      <text x="644" y="252" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" letterSpacing=".06em" fill="#8c7a68">Neo4j · Amazon Neptune</text>
    </svg>
  );
}
