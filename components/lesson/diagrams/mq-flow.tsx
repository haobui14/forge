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
        <marker id="mq-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 7 3, 0 6" fill="#8c7a68" />
        </marker>
        <marker id="mq-arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 7 3, 0 6" fill="#c2522e" />
        </marker>
      </defs>

      {/* ── Producers ── */}
      <rect x="30" y="60" width="110" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="85" y="77" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">PRODUCER</text>
      <text x="85" y="93" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Order Svc</text>

      <rect x="30" y="140" width="110" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="85" y="157" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">PRODUCER</text>
      <text x="85" y="173" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Upload Svc</text>

      {/* Arrows producer → broker */}
      <line x1="140" y1="82" x2="208" y2="110" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#mq-arrow)" />
      <line x1="140" y1="162" x2="208" y2="162" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#mq-arrow)" />

      {/* ── Broker (dark box) ── */}
      <rect x="210" y="70" width="180" height="190" rx="10" fill="#241710" stroke="#e9dcc9" />
      <text x="300" y="95" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">BROKER</text>

      {/* Queue section */}
      <rect x="228" y="106" width="144" height="42" rx="8" fill="#faf4eb" stroke="#e9dcc9" strokeOpacity=".4" />
      <text x="300" y="122" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">QUEUE</text>
      <text x="300" y="139" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#2b1a0e">SQS / RabbitMQ</text>

      {/* Log section */}
      <rect x="228" y="162" width="144" height="42" rx="8" fill="#e89b18" fillOpacity=".15" stroke="#e89b18" strokeOpacity=".5" />
      <text x="300" y="178" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#e89b18">LOG (REPLAYABLE)</text>
      <text x="300" y="195" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="12" fontWeight="700" fill="#faf4eb">Kafka · offsets</text>

      {/* offset label */}
      <text x="300" y="236" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">CONSUMER GROUPS</text>

      {/* ── Consumer Group (normal) ── */}
      <rect x="470" y="80" width="120" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="530" y="97" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">CONSUMER</text>
      <text x="530" y="113" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Email Worker</text>

      <rect x="470" y="150" width="120" height="44" rx="10" fill="#faf4eb" stroke="#e9dcc9" />
      <text x="530" y="167" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#8c7a68">CONSUMER</text>
      <text x="530" y="183" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#2b1a0e">Fraud Check</text>

      {/* Arrows broker → consumers */}
      <line x1="390" y1="127" x2="468" y2="102" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#mq-arrow)" />
      <line x1="390" y1="183" x2="468" y2="172" stroke="#8c7a68" strokeWidth="1.5" markerEnd="url(#mq-arrow)" />

      {/* ── Dead-letter queue ── */}
      <rect x="470" y="230" width="120" height="44" rx="10" fill="#f4e9d8" stroke="#c2522e" strokeDasharray="5 3" />
      <text x="530" y="247" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="11" letterSpacing=".08em" fill="#c2522e">DEAD-LETTER</text>
      <text x="530" y="263" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="13" fontWeight="700" fill="#9e3e20">DLQ</text>

      {/* Arrow broker → DLQ (terracotta) */}
      <line x1="390" y1="245" x2="468" y2="252" stroke="#c2522e" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#mq-arrow-red)" />
      <text x="425" y="238" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#c2522e">failed</text>
    </svg>
  );
}
