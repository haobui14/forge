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
        <marker id="arr-rest" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="arr-grpc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c2522e" />
        </marker>
        <marker id="arr-resp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8c7a68" />
        </marker>
      </defs>

      {/* ── LEFT SIDE: REST ── */}
      {/* Section label */}
      <text x="190" y="28" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68" fontWeight="700">REST / HTTP 1.1</text>

      {/* Client box */}
      <rect x="30" y="44" width="100" height="48" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="80" y="63" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Client</text>
      <text x="80" y="79" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">browser / app</text>

      {/* Server box */}
      <rect x="250" y="44" width="100" height="48" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="300" y="63" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Server</text>
      <text x="300" y="79" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">REST API</text>

      {/* Request arrow */}
      <line x1="132" y1="60" x2="248" y2="60" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-rest)" />
      <text x="190" y="54" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#2b1a0e">GET /users/42</text>

      {/* Response arrow */}
      <line x1="248" y1="76" x2="132" y2="76" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#arr-resp)" />
      <text x="190" y="90" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#2b1a0e">200 OK · JSON</text>

      {/* JSON payload block */}
      <rect x="30" y="120" width="320" height="100" rx="10" fill="#f4e9d8" stroke="#e9dcc9" />
      <text x="50" y="142" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68" letterSpacing=".04em">PAYLOAD (JSON · text)</text>
      <text x="50" y="162" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#2b1a0e">{"{"}</text>
      <text x="68" y="177" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#9e3e20">"id": 42,</text>
      <text x="68" y="192" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#9e3e20">"name": "Ada"</text>
      <text x="50" y="207" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#2b1a0e">{"}"}</text>
      <text x="270" y="207" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">~48 bytes</text>

      {/* Transport label */}
      <rect x="90" y="240" width="140" height="28" rx="8" fill="#241710" />
      <text x="160" y="258" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#e89b18">HTTP / 1.1</text>

      {/* divider */}
      <line x1="390" y1="20" x2="390" y2="280" stroke="#e9dcc9" strokeWidth="1" strokeDasharray="5,4" />

      {/* ── RIGHT SIDE: gRPC ── */}
      {/* Section label */}
      <text x="570" y="28" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68" fontWeight="700">gRPC / HTTP 2</text>

      {/* Client box */}
      <rect x="410" y="44" width="100" height="48" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="460" y="63" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Client</text>
      <text x="460" y="79" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">generated stub</text>

      {/* Server box */}
      <rect x="630" y="44" width="100" height="48" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="680" y="63" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Server</text>
      <text x="680" y="79" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">gRPC service</text>

      {/* Stream arrows (terracotta, multiple to suggest streaming) */}
      <line x1="512" y1="55" x2="628" y2="55" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#arr-grpc)" />
      <line x1="512" y1="64" x2="628" y2="64" stroke="#c2522e" strokeWidth="1" strokeDasharray="3,3" />
      <text x="570" y="49" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">GetUser(42)</text>

      <line x1="628" y1="76" x2="512" y2="76" stroke="#c2522e" strokeWidth="1.5" markerEnd="url(#arr-grpc)" />
      <text x="570" y="90" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">UserResponse{"{…}"}</text>

      {/* Protobuf payload block */}
      <rect x="410" y="120" width="320" height="100" rx="10" fill="#241710" stroke="#e9dcc9" />
      <text x="430" y="142" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#e89b18" letterSpacing=".04em">PAYLOAD (Protobuf · binary)</text>
      <text x="430" y="162" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#faf4eb">message User {"{"}</text>
      <text x="448" y="177" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#e89b18">int32 id = 1;</text>
      <text x="448" y="192" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#e89b18">string name = 2;</text>
      <text x="430" y="207" fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#faf4eb">{"}"}</text>
      <text x="650" y="207" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#8c7a68">~8 bytes</text>

      {/* Transport label */}
      <rect x="470" y="240" width="200" height="28" rx="8" fill="#241710" />
      <text x="570" y="258" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#e89b18">HTTP / 2 · MULTIPLEXED</text>
    </svg>
  );
}
