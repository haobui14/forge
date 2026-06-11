import type { LessonContent } from "@/lib/lessons";

export const microservicesApiGateways: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Microservices are a solution to an org-chart problem, not a technical one. Most teams split too early, pay the distributed-systems tax before they've earned it, and spend the next year undoing the damage.",
    },
    { type: "h2", text: "Monolith first — and stay there longer than you think" },
    {
      type: "p",
      parts: [
        "A well-structured monolith is ",
        { hl: "faster to develop" },
        ", easier to debug, and cheaper to operate than a microservices architecture. You get free transactions, shared memory, and a single deployment artifact. The classic mistake is treating microservices as a sign of maturity — they are a cost you pay when the alternative becomes more painful.",
      ],
    },
    {
      type: "callout",
      label: "CAUTION",
      body: "Don't distribute a problem you could refactor. If your monolith is slow, profile it. If your codebase is tangled, modularize it. Microservices fix team scaling and blast radius — they do not fix bad code.",
    },
    { type: "h2", text: "What actually forces the split" },
    {
      type: "p",
      parts: [
        "Three forces create genuine pressure to decompose. First, ",
        { hl: "team scaling" },
        ": when more than two or three independent teams deploy to the same repo, merge conflicts and coordination overhead become the bottleneck. Second, ",
        { hl: "independent deploy velocity" },
        ": a payment team shouldn't wait on a recommendations team to ship a hotfix. Third, ",
        { hl: "blast radius containment" },
        ": a memory leak in the video encoder shouldn't take down checkout. When these pressures are real, a service boundary pays for itself.",
      ],
    },
    { type: "h2", text: "The API gateway's duties" },
    {
      type: "p",
      parts: [
        "Splitting services creates an immediate problem: clients shouldn't need to know about every internal service. The ",
        { hl: "API gateway" },
        " is the single entry point — a reverse proxy that clients talk to while routing, authentication, and rate limiting happen transparently behind it.",
      ],
    },
    {
      type: "p",
      parts: [
        "Concretely, the gateway handles: ",
        { em: "routing" },
        " (",
        { code: "/api/orders" },
        " → order-service, ",
        { code: "/api/users" },
        " → user-service), ",
        { em: "authentication" },
        " (verify JWTs — signed tokens that prove who the caller is — once instead of in every service), ",
        { em: "rate limiting" },
        " (protect the whole fleet of services from one abusive client), and optionally ",
        { em: "response aggregation" },
        " (fetch from three services and stitch one response). Each of those is a cross-cutting concern — handle it once.",
      ],
    },
    {
      type: "diagram",
      id: "gateway-arch",
      height: 330,
      alt: "Clients → API gateway (AUTH / RATE LIMIT / ROUTE) → three services each with their own database",
    },
    { type: "h2", text: "Service discovery" },
    {
      type: "p",
      parts: [
        "In a static deployment, you hardcode IPs. In a dynamic one — containers launching and dying every few minutes — you need ",
        { hl: "service discovery" },
        ". Each service registers itself with a registry (",
        { code: "Consul" },
        " or ",
        { code: "etcd" },
        " — service registries that track which instances are live — or the platform's built-in DNS in Kubernetes, the standard container-orchestration platform). The gateway (or another service) resolves a logical name like ",
        { code: "order-service" },
        " to a live IP at call time, and routes around unhealthy instances automatically.",
      ],
    },
    { type: "h2", text: "The distributed-monolith trap" },
    {
      type: "p",
      parts: [
        "The worst outcome of a microservices migration is the ",
        { hl: "distributed monolith" },
        " — services that look independent but aren't. Two failure modes are almost universal. The first: multiple services share one database, so schema changes still require coordinated deploys. The second: synchronous chains — service A calls B which calls C which calls D — where a slowdown anywhere creates cascading timeouts. You've added network hops without gaining independence. The fix is strict ownership (each service owns its data) and async communication wherever latency allows.",
      ],
    },
    {
      type: "table",
      cols: ["MONOLITH", "MICROSERVICES"],
      rows: [
        {
          label: "DEPLOYS",
          a: "One artifact, whole app ships together",
          b: "Each service deploys independently",
        },
        {
          label: "FAILURE BLAST",
          a: "Any bug can take down everything",
          b: "Faults isolated to one service domain",
        },
        {
          label: "TEAM SHAPE",
          a: "Works well up to ~3 teams",
          b: "Scales when teams own clear boundaries",
        },
        {
          label: "REACH FOR IT",
          a: "Default — until the pain is real",
          b: "When team scaling or blast radius forces it",
        },
      ],
    },
    {
      type: "takeaways",
      items: [
        "Start with a monolith — only split when team scaling, deploy independence, or blast radius create genuine pain.",
        "The API gateway is the architecture's single entry point: route, authenticate, and rate-limit once instead of in every service.",
        "A distributed monolith — shared databases or synchronous call chains — is worse than the monolith you started with.",
      ],
    },
    {
      type: "quiz",
      question:
        "Two services both read and write to the same database. What systemic problem does this create?",
      options: [
        "Higher query latency due to network round trips",
        "Schema changes require coordinated deploys, defeating independent release cycles",
        "The gateway cannot route between them correctly",
        "Service discovery stops working without a shared data source",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — shared databases couple schema changes across service boundaries, making independent deploys impossible and re-creating monolith-level coordination overhead.",
      wrongMsg: "Not quite — think about what changes to a shared schema require across every service that depends on it. Try again.",
    },
  ],
};
