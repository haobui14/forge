import type { LessonContent } from "@/lib/lessons";

export const loadBalancing: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Your app just got popular. One server handled everything yesterday; today it's dropping requests at peak. Before you reach for a bigger machine, reach for more machines — and something to spread the traffic between them.",
    },
    { type: "h2", text: "Why a single server isn't enough" },
    {
      type: "p",
      parts: [
        "Vertical scaling — buying a beefier box — hits a ceiling fast, and that ceiling has a single point of failure on top of it. Horizontal scaling replaces the one big server with a ",
        { hl: "pool of identical servers" },
        ", and puts a load balancer in front to decide which one answers each request. If a server dies, traffic flows around it; if traffic doubles, you add servers instead of panicking.",
      ],
    },
    {
      type: "callout",
      label: "RULE OF THUMB",
      body: "Every server has a ceiling — CPU, memory, open file descriptors. An I/O-bound service might ride to tens of thousands of concurrent connections; heavy per-request work caps out far sooner. Either way the ceiling exists, and past it you're load balancing — the only question is how well.",
    },
    {
      type: "diagram",
      id: "lb-pool",
      height: 330,
      alt: "Clients → load balancer → server pool",
    },
    { type: "h2", text: "Routing algorithms" },
    {
      type: "p",
      parts: [
        "The load balancer's whole job is one decision, made millions of times: ",
        { em: "which server gets this request?" },
        " Four strategies cover most of the real world:",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "round_robin",
          description:
            "Deal requests like cards — server 1, 2, 3, repeat. Dead simple, great when servers and requests are uniform.",
        },
        {
          name: "least_connections",
          description:
            "Send each new request to the server with the fewest active connections. Adapts when some requests are slow — the safe adaptive default when request durations vary.",
        },
        {
          name: "ip_hash",
          description:
            "Hash the client's IP so the same user always lands on the same server — session affinity without storing per-session state on the server.",
        },
        {
          name: "weighted",
          description:
            "Give bigger servers a bigger share. Useful mid-migration, when old and new hardware serve side by side.",
        },
      ],
    },
    { type: "h2", text: "Layer 4 vs Layer 7" },
    {
      type: "p",
      parts: [
        "Network traffic can be inspected at different depths — Layer 4 sees only connection info (IPs and ports), while Layer 7 reads the actual HTTP request. Load balancers come in both flavors. An ",
        { hl: "L4 balancer" },
        " works at the connection level — blind to request content, but blazingly fast. An ",
        { hl: "L7 balancer" },
        " reads the HTTP request itself, so it can route ",
        { code: "/api/video" },
        " to the video fleet and terminate TLS on the way (decrypt HTTPS at the balancer so backends speak plain HTTP).",
      ],
    },
    {
      type: "table",
      cols: ["LAYER 4", "LAYER 7"],
      rows: [
        { label: "SEES", a: "IPs & TCP ports", b: "Full HTTP request" },
        { label: "SPEED", a: "Fastest — no parsing", b: "Slower, smarter" },
        {
          label: "CAN DO",
          a: "Spread raw connections",
          b: "Path routing, TLS termination, retries",
        },
        {
          label: "REACH FOR IT",
          a: "Extreme throughput, simple routing",
          b: "Microservices, APIs — the default",
        },
      ],
    },
    {
      type: "diagram",
      id: "lb-l4l7",
      height: 280,
      alt: "L4 vs L7 comparison",
    },
    { type: "h2", text: "Health checks & failover" },
    {
      type: "p",
      parts: [
        "A balancer is only as good as its picture of the pool. Every few seconds it pings each server — a ",
        { code: "GET /healthz" },
        " that should answer 200. Miss a few in a row and the server is quietly pulled from rotation; recover, and it's eased back in. Users never see the failure — that's the whole point.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Scale horizontally: many small servers behind a balancer beat one giant one.",
        "Pick the routing algorithm to match your traffic — least connections is the safe adaptive default.",
        "L7 is the default for modern services; L4 when raw throughput is everything.",
      ],
    },
    {
      type: "quiz",
      question:
        "Which algorithm sends each new request to the server that is currently the least busy?",
      options: ["Round robin", "Least connections", "IP hash", "Weighted round robin"],
      correctIndex: 1,
      correctMsg:
        "Correct — least connections routes each new request to the least-busy server.",
      wrongMsg: "Not quite — that describes a different strategy. Try again.",
    },
  ],
};
