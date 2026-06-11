export default function Diagram() {
  return (
    <svg
      viewBox="0 0 760 360"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fontFamily="var(--font-jetbrains), monospace"
    >
      {/* Background */}
      <rect width="760" height="360" fill="#faf4eb" />

      {/* ── Write path label ── */}
      <text x="30" y="28" fontSize={11} letterSpacing=".08em" fill="#8c7a68" fontWeight="700">WRITE PATH</text>
      {/* ── Read path label ── */}
      <text x="30" y="200" fontSize={11} letterSpacing=".08em" fill="#8c7a68" fontWeight="700">READ PATH</text>

      {/* ===== WRITE PATH ===== */}

      {/* Client (write) */}
      <rect x="30" y="38" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="78" y="55" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">CLIENT</text>
      <text x="78" y="71" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">POST /urls</text>

      {/* Arrow client → LB */}
      <line x1="126" y1="60" x2="166" y2="60" stroke="#e89b18" strokeWidth="2" markerEnd="url(#arrowAmber)" />

      {/* Load Balancer */}
      <rect x="166" y="38" width="96" height="44" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="214" y="55" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#e89b18">LOAD</text>
      <text x="214" y="71" textAnchor="middle" fontSize={13} fontWeight="700" fill="#faf4eb">BALANCER</text>

      {/* Arrow LB → App */}
      <line x1="262" y1="60" x2="302" y2="60" stroke="#e89b18" strokeWidth="2" markerEnd="url(#arrowAmber)" />

      {/* App Servers */}
      <rect x="302" y="38" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="350" y="55" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">APP</text>
      <text x="350" y="71" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">SERVERS</text>

      {/* Arrow App → DB (write) */}
      <line x1="398" y1="60" x2="560" y2="60" stroke="#e89b18" strokeWidth="2" markerEnd="url(#arrowAmber)" />
      <text x="480" y="52" textAnchor="middle" fontSize={10} fill="#e89b18" letterSpacing=".06em">INSERT</text>

      {/* Database */}
      <rect x="560" y="38" width="96" height="44" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="608" y="55" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#e89b18">PRIMARY</text>
      <text x="608" y="71" textAnchor="middle" fontSize={13} fontWeight="700" fill="#faf4eb">DATABASE</text>

      {/* ===== READ PATH ===== */}

      {/* Client (read) */}
      <rect x="30" y="210" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="78" y="227" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">CLIENT</text>
      <text x="78" y="243" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">GET /:code</text>

      {/* Arrow client → LB (read) */}
      <line x1="126" y1="232" x2="166" y2="232" stroke="#c2522e" strokeWidth="2" markerEnd="url(#arrowTerra)" />

      {/* Load Balancer (read, shared) — reuse with dashed border */}
      <rect x="166" y="210" width="96" height="44" rx="10" fill="#241710" stroke="#e89b18" strokeWidth="1.5" />
      <text x="214" y="227" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#e89b18">LOAD</text>
      <text x="214" y="243" textAnchor="middle" fontSize={13} fontWeight="700" fill="#faf4eb">BALANCER</text>

      {/* Arrow LB → App (read) */}
      <line x1="262" y1="232" x2="302" y2="232" stroke="#c2522e" strokeWidth="2" markerEnd="url(#arrowTerra)" />

      {/* App Servers (read) */}
      <rect x="302" y="210" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="350" y="227" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">APP</text>
      <text x="350" y="243" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">SERVERS</text>

      {/* Arrow App → Cache */}
      <line x1="398" y1="232" x2="440" y2="232" stroke="#c2522e" strokeWidth="2" markerEnd="url(#arrowTerra)" />

      {/* Cache */}
      <rect x="440" y="210" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="488" y="227" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">CACHE</text>
      <text x="488" y="243" textAnchor="middle" fontSize={13} fontWeight="700" fill="#9e3e20">REDIS</text>

      {/* Cache HIT arrow back to App */}
      <path d="M 488 210 Q 488 186 414 186 Q 350 186 350 210" fill="none" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowTerra)" />
      <text x="418" y="181" textAnchor="middle" fontSize={10} fill="#c2522e" letterSpacing=".06em">HIT → redirect</text>

      {/* Arrow Cache → DB (miss) */}
      <line x1="536" y1="232" x2="560" y2="232" stroke="#8c7a68" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowGray)" />
      <text x="548" y="222" textAnchor="middle" fontSize={10} fill="#8c7a68" letterSpacing=".06em">MISS</text>

      {/* DB Read Replica */}
      <rect x="560" y="210" width="96" height="44" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="608" y="227" textAnchor="middle" fontSize={11} letterSpacing=".08em" fill="#8c7a68">READ</text>
      <text x="608" y="243" textAnchor="middle" fontSize={13} fontWeight="700" fill="#2b1a0e">REPLICA</text>

      {/* Replication arrow from primary to replica */}
      <line x1="608" y1="82" x2="608" y2="210" stroke="#8c7a68" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowGray)" />
      <text x="622" y="148" fontSize={10} fill="#8c7a68" letterSpacing=".06em">replicate</text>

      {/* CDN callout */}
      <rect x="30" y="290" width="700" height="48" rx="10" fill="#f4e9d8" stroke="#e9dcc9" strokeWidth="1.5" />
      <text x="52" y="310" fontSize={11} letterSpacing=".08em" fill="#8c7a68" fontWeight="700">CDN EDGE</text>
      <text x="52" y="328" fontSize={13} fill="#2b1a0e">Popular short codes served directly from CDN PoPs — redirect answered in single-digit ms, origin never reached</text>

      {/* Defs */}
      <defs>
        <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#e89b18" />
        </marker>
        <marker id="arrowTerra" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#c2522e" />
        </marker>
        <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8c7a68" />
        </marker>
      </defs>
    </svg>
  );
}
