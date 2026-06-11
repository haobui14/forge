import type { LessonContent } from "@/lib/lessons";

export const messageQueuesAsyncWork: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "The user clicked \"Place Order\". They don't care about your receipt email, your inventory sync, or your fraud check — they care about seeing a confirmation screen in under 200 ms. Async work is the art of doing the rest later.",
    },
    { type: "h2", text: "The case for async" },
    {
      type: "p",
      parts: [
        "Synchronous processing means the HTTP response waits for every downstream call to finish. Chain three slow services together and your ",
        { hl: "p99 latency" },
        " multiplies. The fix is to accept the request, persist the intent, and return immediately — then process in the background. The user gets a fast response; the hard work happens after the page loads.",
      ],
    },
    {
      type: "p",
      parts: [
        "This also gives you ",
        { hl: "natural rate limiting" },
        " against spikes. A Black Friday surge that would crash a synchronous pipeline simply fills the queue — workers drain it at whatever pace they can sustain, and no requests are dropped.",
      ],
    },
    { type: "h2", text: "Queues vs logs" },
    {
      type: "p",
      parts: [
        "Two abstractions dominate the space. A ",
        { hl: "message queue" },
        " — think ",
        { code: "RabbitMQ" },
        " or ",
        { code: "Amazon SQS" },
        " — hands each message to exactly one consumer (the work-queue/competing-consumers default; RabbitMQ fanout/topic exchanges can also broadcast to multiple consumers) and deletes it once acknowledged. Simple, low-overhead, great when you just need work distributed across a worker pool. A ",
        { hl: "log" },
        " — ",
        { code: "Kafka" },
        " is the canonical example — appends messages and lets consumers track their own position via ",
        { em: "offsets" },
        " (each message's sequential position number in the log, which consumers advance as they read). Messages aren't deleted after consumption; multiple ",
        { em: "consumer groups" },
        " — each keeping its own offset, so an analytics consumer and a billing consumer can both independently read every event — can replay the same stream. Logs are the right tool when auditability, reprocessing after a bug fix, or fan-out to heterogeneous systems matters more than simplicity.",
      ],
    },
    { type: "h2", text: "Delivery guarantees" },
    {
      type: "p",
      parts: [
        "Every queue makes a promise about how many times it will deliver a message. Understand the promise before you write the consumer — it determines whether your side effects need to be defensive.",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "at_most_once",
          description:
            "Fire and forget — message delivered zero or one time. Fastest, but lost messages are silent. Acceptable for metrics or cache-busting pings where a miss is harmless.",
        },
        {
          name: "at_least_once",
          description:
            "Acknowledged only after the consumer confirms processing. A crash before the ack means the broker redelivers. Your consumer must be idempotent — the practical default.",
        },
        {
          name: "exactly_once",
          description:
            "The marketing holy grail. Brokers like Kafka offer transactional/idempotent producers that achieve exactly-once within the log itself, but true end-to-end exactly-once across arbitrary downstream systems still requires consumer-side idempotency and deduplication — the broker cannot guarantee it alone.",
        },
      ],
    },
    {
      type: "callout",
      label: "RULE OF THUMB",
      body: "Design every consumer as if it will receive duplicates. Attach a unique idempotency key to each message and check it before applying side effects — a database upsert keyed on that ID costs almost nothing and buys you \"effectively exactly-once\" without broker magic.",
    },
    {
      type: "diagram",
      id: "mq-flow",
      height: 330,
      alt: "Producers → broker (queue and log) → consumer group fan-out, with dead-letter queue branch",
    },
    { type: "h2", text: "Dead-letter queues" },
    {
      type: "p",
      parts: [
        "A message that fails processing repeatedly shouldn't block the whole queue. After a configurable retry threshold — typically 3–5 attempts — brokers move the message to a ",
        { hl: "dead-letter queue" },
        " (DLQ). Engineers inspect the DLQ to diagnose bugs, replay fixed messages, or discard poison pills. Without a DLQ, one malformed message can stall a worker pool indefinitely.",
      ],
    },
    { type: "h2", text: "Backpressure" },
    {
      type: "p",
      parts: [
        "Backpressure is the signal that propagates upstream when consumers can't keep up with producers. A healthy queue depth is near-zero; a growing queue is a warning. At the infrastructure level, brokers can ",
        { em: "block" },
        " producers once a queue reaches a high-water mark — preventing unbounded memory growth. At the application level, you react by scaling consumers, throttling ingest, or shedding non-critical work. Ignoring backpressure signals until the queue hits gigabytes is how you arrive at an 03:00 incident.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Return fast, process async — decouple latency from throughput by handing work to a queue.",
        "Use a queue (RabbitMQ/SQS) for work distribution; use a log (Kafka) when you need replay, auditing, or multiple independent consumers — and watch queue depth: a growing queue is backpressure telling you to scale consumers or throttle producers.",
        "\"Exactly-once\" is at-least-once + idempotency — always design consumers to handle duplicate delivery.",
      ],
    },
    {
      type: "quiz",
      question:
        "A consumer crashes mid-processing before sending an acknowledgement. Under at-least-once delivery, what does the broker do?",
      options: [
        "Discards the message — the consumer missed its window",
        "Redelivers the message to an available consumer",
        "Stores the message in the dead-letter queue immediately",
        "Promotes the message to exactly-once delivery",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — without an ack, the broker assumes failure and redelivers the message, which is why consumers must be idempotent.",
      wrongMsg: "Not quite — think about what the broker infers from a missing acknowledgement. Try again.",
    },
  ],
};
