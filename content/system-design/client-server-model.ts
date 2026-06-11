import type { LessonContent } from "@/lib/lessons";

export const clientServerModel: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Every web interaction is a conversation. You press Enter on a URL and a carefully choreographed sequence of lookups, handshakes, and byte transfers unfolds in under 100 milliseconds. Understanding that sequence is the baseline for everything else in system design.",
    },
    { type: "h2", text: "Clients and servers are roles, not machines" },
    {
      type: "p",
      parts: [
        "The terms are relational, not physical. A ",
        { hl: "client" },
        " is anything that initiates a request; a ",
        { hl: "server" },
        " is anything that receives it and produces a response. Your laptop is a client when it fetches news — and a server when it runs a local dev environment that your phone's browser hits. The same process can be both: a backend service is a client to the database it queries and a server to the mobile app hitting its API.",
      ],
    },
    {
      type: "p",
      parts: [
        "What actually travels the wire between them is an ",
        { hl: "HTTP request/response pair" },
        " — a structured text message with a verb (",
        { code: "GET" },
        ", ",
        { code: "POST" },
        " …), headers, and an optional body. HTTP is stateless by design: each request carries all the context the server needs. No request remembers the one before it. That constraint feels limiting at first; it's actually the property that lets you put ten servers behind a load balancer and have any one of them answer any request.",
      ],
    },
    {
      type: "callout",
      label: "RULE OF THUMB",
      body: "Statelessness is a scaling superpower. If your server holds session state in memory, adding a second server breaks every user whose session lives on server 1. Move state to a shared store — a database or an in-memory store like Redis — and every server becomes interchangeable.",
    },
    { type: "h2", text: "The full journey from Enter to render" },
    {
      type: "p",
      parts: [
        "Typing ",
        { code: "https://example.com" },
        " and pressing Enter kicks off a precise sequence. Each step adds latency — some negligible, some significant. Knowing where time goes is how you know where to optimize.",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "dns_lookup",
          description:
            "Browser asks a DNS (the Domain Name System — the internet's phone book) resolver: what IP is example.com? Cached answer ≈ 0 ms; cold lookup ≈ 20–120 ms across a chain of resolvers.",
        },
        {
          name: "tcp_handshake",
          description:
            "SYN → SYN-ACK → ACK. One round trip to the server before a byte of application data moves. Same-city ≈ 1 ms; cross-continent ≈ 60–150 ms.",
        },
        {
          name: "tls_handshake",
          description:
            "TLS (Transport Layer Security) negotiates encryption on top of TCP — adds 1 extra round trip (TLS 1.3) or 2 (TLS 1.2). Non-negotiable for any production service.",
        },
        {
          name: "http_request",
          description:
            "Browser sends the GET with headers. A typical request is < 1 KB; a POST with a form body can be larger.",
        },
        {
          name: "server_processing",
          description:
            "Server handles auth, queries the DB, renders or serializes the response. This is the step your code controls — and the one most likely to blow the latency budget.",
        },
        {
          name: "http_response",
          description:
            "Server streams bytes back. An HTML page is ~50–100 KB; a JSON API response for a feed might be 10–30 KB.",
        },
        {
          name: "browser_render",
          description:
            "Parse HTML, fetch sub-resources (CSS, JS, images), execute scripts, paint. The critical path here is why CDNs and code-splitting matter.",
        },
      ],
    },
    {
      type: "diagram",
      id: "cs-request-flow",
      height: 330,
      alt: "Browser → DNS → front door → server → response arc",
    },
    { type: "h2", text: "Why statelessness drives every scaling decision" },
    {
      type: "p",
      parts: [
        "HTTP's statelessness is not a bug — it's the architectural property that makes horizontal scaling straightforward. When any server can handle any request, a load balancer can route freely; a failed server can be replaced without data loss; new servers can start taking traffic immediately. The moment you pin a user to a specific server — because their session lives there — you've traded that flexibility for stickiness, and stickiness is expensive to maintain at scale.",
      ],
    },
    {
      type: "p",
      parts: [
        "The canonical solution is to externalize state: store sessions in ",
        { code: "Redis" },
        " (a fast in-memory key-value store), user data in a relational database, blobs in object storage. Your server tier becomes a ",
        { hl: "pure computation layer" },
        " — it reads inputs, applies logic, writes outputs, returns a response. Swap the machine; the behavior is identical.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Clients and servers are roles defined by who initiates — the same machine can be both depending on context.",
        "A URL → render journey touches DNS, TCP, TLS, HTTP, server logic, and browser rendering — know where each millisecond lives.",
        "HTTP statelessness is the property that makes horizontal scaling tractable; preserve it by externalizing session state.",
      ],
    },
    {
      type: "quiz",
      question:
        "Why does HTTP statelessness make horizontal scaling straightforward?",
      options: [
        "Because HTTP compresses requests automatically",
        "Because any server can handle any request — no user is pinned to a specific machine",
        "Because stateless servers use less CPU",
        "Because DNS caching eliminates round trips",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — statelessness means no request depends on in-memory state from a previous one, so any server in the pool can handle it.",
      wrongMsg:
        "Not quite — think about what happens when a load balancer tries to route a request to a server that has never seen that user before. Try again.",
    },
  ],
};
