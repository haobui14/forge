import type { LessonContent } from "@/lib/lessons";

export const whatIsSystemDesign: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "System design is the art of making decisions before you write a line of code — scoping what you're building, naming the constraints you can't ignore, and trading off speed against durability before a choice becomes impossible to reverse.",
    },
    { type: "h2", text: "What system design actually is" },
    {
      type: "p",
      parts: [
        "When an interviewer says \"design Twitter,\" they're not asking you to write tweets. They want to see how you ",
        { hl: "decompose a vague product ask into concrete architecture" },
        " — databases, services, APIs, storage formats, and the glue between them. System design lives at the intersection of product thinking and engineering: you're answering the question ",
        { em: "what structure will let this thing scale, survive failures, and stay operable?" },
      ],
    },
    {
      type: "p",
      parts: [
        "Every design exercise starts with two buckets of requirements. ",
        { hl: "Functional requirements" },
        " describe what the system does — users can post, follow, and read a feed. ",
        { hl: "Non-functional requirements" },
        " describe how well it does it — reads must complete in under ",
        { code: "200ms" },
        " at the ",
        { code: "p99" },
        " (the slowest 1-in-100 requests), and the service must stay up at ",
        { code: "99.9%" },
        ". Get both wrong and the resulting design solves the wrong problem at the wrong scale.",
      ],
    },
    {
      type: "callout",
      label: "INTERVIEW TIP",
      body: "Spend the first 5 minutes in any design interview just clarifying requirements. Interviewers reward candidates who ask \"what scale are we designing for?\" before touching the whiteboard.",
    },
    { type: "h2", text: "Back-of-envelope estimation" },
    {
      type: "p",
      parts: [
        "Estimation is how you sanity-check a design before you build it. The goal is never decimal-point precision — it's ",
        { hl: "orders of magnitude" },
        ". Is this cache 1 GB or 1 TB? Will this service field 100 requests/second or 100,000? Getting the exponent right lets you pick the right tool; getting it wrong sends you down an irreversible path.",
      ],
    },
    {
      type: "p",
      parts: [
        "The canonical estimation chain starts with ",
        { code: "DAU" },
        " (daily active users), converts to average QPS (queries per second) by dividing by seconds per day, then multiplies by your read/write ratio to get per-endpoint traffic. Storage follows the same pattern: records/day × bytes/record × retention days. Round everything to the nearest power of ten — a ",
        { code: "10×" },
        " error changes your architecture; a ",
        { code: "2×" },
        " error rarely does.",
      ],
    },
    {
      type: "diagram",
      id: "sd-requirements",
      height: 300,
      alt: "Product ask → functional + non-functional requirements → design loop",
    },
    { type: "h2", text: "The numbers you'll reach for every time" },
    {
      type: "p",
      parts: [
        "A handful of constants make estimation mechanical. Memorize these and you can rough-size any system in two minutes — which is exactly what a real design session demands.",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "seconds_per_day",
          description:
            "86,400 ≈ 10^5. Divide DAU by this to get average QPS. Peak is usually 2–3× average.",
        },
        {
          name: "1m_dau_→_qps",
          description:
            "1 M DAU ÷ 10^5 ≈ 10 avg QPS; assume 25–50 at peak. 100 M DAU → ~1,000–5,000 peak QPS.",
        },
        {
          name: "tweet_size",
          description:
            "A typical text post with metadata ≈ 1 KB. 100 M posts/day → ~100 GB/day of raw writes.",
        },
        {
          name: "image_size",
          description:
            "A compressed thumbnail ≈ 200 KB; a full mobile photo ≈ 2 MB. Storage budgets explode once media enters the picture.",
        },
        {
          name: "storage_headroom",
          description:
            "Plan for 3× raw data: one primary copy + replication + backups. Compression can claw back 2–5× on text.",
        },
      ],
    },
    {
      type: "callout",
      label: "RULE OF THUMB",
      body: "Round aggressively — to the nearest power of ten. The goal is catching a design that needs 10 TB acting like it only needs 10 GB, not shaving a factor of two.",
    },
    { type: "h2", text: "Trade-offs, not answers" },
    {
      type: "p",
      parts: [
        "System design has no canonical answers. Choosing a relational database is right at one scale and wrong at another. Caching every query is brilliant until you need strong consistency. The skill being tested — in interviews and in production — is your ability to ",
        { hl: "name the trade-off explicitly" },
        " and defend which side you chose given the constraints on the table.",
      ],
    },
    {
      type: "p",
      parts: [
        "A junior engineer asks \"what's the right architecture?\" A senior engineer asks ",
        { em: "\"what are we optimizing for, and what are we willing to sacrifice?\"" },
        " Those two questions are the whole game.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Split every problem into functional (what it does) and non-functional (how well) requirements before designing anything.",
        "Estimation is about order-of-magnitude accuracy — get the exponent right, not the coefficient.",
        "System design is a trade-off discipline: name what you're giving up, not just what you're gaining.",
      ],
    },
    {
      type: "quiz",
      question:
        "A service has 50 M DAU. Using the standard napkin-math constant, what is the approximate average QPS?",
      options: ["~5 QPS", "~50 QPS", "~500 QPS", "~5,000 QPS"],
      correctIndex: 2,
      correctMsg:
        "Correct — 50 M ÷ 10^5 seconds/day ≈ 500 average QPS; expect 1,000–1,500 at peak.",
      wrongMsg: "Not quite — divide DAU by ~100,000 seconds per day to get average QPS. Try again.",
    },
  ],
};
