import type { LessonContent } from "@/lib/lessons";

export const latencyThroughputAvailability: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Latency, throughput, and availability are the three dials every distributed system turns. Interviewers throw them around loosely; engineers argue about them endlessly. Get their precise definitions pinned down first — then the trade-offs become obvious.",
    },
    { type: "h2", text: "Three words, three definitions" },
    {
      type: "p",
      parts: [
        { hl: "Latency" },
        " is the time a single request takes to complete — from the first byte sent to the last byte received. It's measured per request, reported as a percentile. ",
        { hl: "Throughput" },
        " is how many requests the system completes per second — a property of the whole system under load, not of one request. ",
        { hl: "Availability" },
        " is the fraction of time the system is serving requests successfully — usually expressed as a percentage of uptime over a rolling year.",
      ],
    },
    {
      type: "p",
      parts: [
        "These three are related but not identical. A system can have low latency per request but low throughput if it can only handle one at a time. A system can have high throughput but lousy availability if it crashes under load. Optimizing one often pressures the others — adding a synchronous cache check improves latency at the cost of availability if the cache goes down.",
      ],
    },
    {
      type: "callout",
      label: "NUMBERS TO KNOW",
      body: "Memorize the latency ladder. It tells you immediately whether a proposed solution is fast enough — and what's eating your budget when it isn't.",
    },
    { type: "h2", text: "The latency ladder" },
    {
      type: "p",
      parts: [
        "Jeff Dean's famous latency numbers have been updated as hardware improved, but the shape hasn't changed: each level is ",
        { code: "10–1,000×" },
        " slower than the one above it. Building fast systems means keeping hot data as high up the ladder as possible.",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "l1_cache",
          description: "~0.5 ns. CPU L1 cache read. Faster than anything else on this list by orders of magnitude.",
        },
        {
          name: "l2_cache",
          description: "~7 ns. CPU L2 cache. Still single-digit nanoseconds — negligible in practice.",
        },
        {
          name: "main_memory",
          description: "~100 ns. RAM access. 200× slower than L1 — still blazing fast in absolute terms.",
        },
        {
          name: "ssd_read",
          description: "~100–150 µs. SSD random read. Roughly 1,000–1,500× slower than RAM — the first number that feels slow to a CPU.",
        },
        {
          name: "dc_round_trip",
          description: "~0.5 ms. A round trip to another machine in the same data center. Network calls are expensive; batch them.",
        },
        {
          name: "hdd_seek",
          description: "~10 ms. Spinning disk seek. 100× slower than SSD — avoid random I/O on HDDs entirely.",
        },
        {
          name: "cross_region",
          description: "~60–150 ms. A round trip to another geographic region. Speed of light through fiber; you can't optimize it away.",
        },
      ],
    },
    { type: "h2", text: "Percentiles beat averages" },
    {
      type: "p",
      parts: [
        "Averages lie. If 95% of requests finish in ",
        { code: "10ms" },
        " and 5% take ",
        { code: "2 seconds" },
        ", the average looks fine — but every twentieth user hates your product. ",
        { hl: "Tail latency" },
        " is what users actually feel at scale: the ",
        { code: "p99" },
        " request is the one that hits a cold cache, a locked row, or a GC pause. Report ",
        { code: "p50" },
        " (median), ",
        { code: "p95" },
        ", and ",
        { code: "p99" },
        " — and set SLOs (Service Level Objectives — the latency/uptime targets you commit to) against ",
        { code: "p99" },
        ", not the mean.",
      ],
    },
    {
      type: "diagram",
      id: "lta-percentiles",
      height: 280,
      alt: "Latency distribution curve with p50, p95, p99 tail markers",
    },
    { type: "h2", text: "Availability nines and what they cost" },
    {
      type: "p",
      parts: [
        "Availability is quoted in \"nines\" — the number of 9s in the percentage. Going from ",
        { code: "99.9%" },
        " to ",
        { code: "99.99%" },
        " sounds like a rounding error. It means the difference between ",
        { hl: "roughly 8.8 hours of downtime per year" },
        " and ",
        { hl: "roughly 53 minutes" },
        " — and the architectural complexity (active-active redundancy, automatic failover, chaos testing) that closing that gap demands.",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "two_nines",
          description: "99% — ~87.6 hours down/year (~3.65 days). Basically \"we try our best.\"",
        },
        {
          name: "three_nines",
          description: "99.9% — ~8.76 hours down/year. The floor for any production web service.",
        },
        {
          name: "four_nines",
          description: "99.99% — ~52.6 min down/year. Requires redundancy, fast failover, and on-call runbooks.",
        },
        {
          name: "five_nines",
          description: "99.999% — ~5.3 min down/year. Telco-grade; demands active-active multi-region and heroic operational discipline.",
        },
      ],
    },
    {
      type: "p",
      parts: [
        "In practice, your availability is the product of every component's availability in the critical path. A chain of three services each at ",
        { code: "99.9%" },
        " yields ",
        { code: "99.7%" },
        " end-to-end — already worse than the weakest link. This is why redundancy, retries with backoff, and circuit breakers (which stop cascading failures by refusing calls to a known-down service) exist: to break the multiplicative downtime chain.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Latency is per-request time; throughput is system-wide requests/sec; availability is uptime fraction — don't conflate them.",
        "Report p95 and p99, not averages — tail latency is what users experience and what SLOs should target.",
        "Each additional nine of availability is exponentially harder: going from 99.9% to 99.99% cuts your allowed downtime by 10×.",
      ],
    },
    {
      type: "quiz",
      question:
        "A service SLO states p99 latency must stay under 200 ms. Why is the p99 used rather than the average?",
      options: [
        "p99 is easier to measure than the mean",
        "Averages hide tail latency — the slow outlier requests that real users encounter",
        "p99 is harder to compute than the mean and rarely worth tracking",
        "SLO contracts require percentile metrics by law",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — averages are pulled down by fast requests and mask the slow tail that degrades real user experience.",
      wrongMsg:
        "Not quite — think about what an average hides when most requests are fast but a few are very slow. Try again.",
    },
  ],
};
