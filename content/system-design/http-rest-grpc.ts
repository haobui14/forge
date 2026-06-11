import type { LessonContent } from "@/lib/lessons";

export const httpRestGrpc: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Every service call is a negotiation: who sends what, in which format, over which protocol. Get the contract right and services evolve independently; get it wrong and a one-line change cascades into a four-team outage.",
    },
    { type: "h2", text: "HTTP — the contract language of the web" },
    {
      type: "p",
      parts: [
        "HTTP gives every request three things: a ",
        { hl: "verb" },
        " that describes intent, a path that names the resource, and headers that carry metadata. The verbs aren't arbitrary — ",
        { code: "GET" },
        " is safe and idempotent (no side effects, retry freely); ",
        { code: "PUT" },
        " is idempotent but not safe (it overwrites, though retrying causes no extra harm); ",
        { code: "POST" },
        " is neither. That distinction shapes every retry-on-timeout decision your client makes.",
      ],
    },
    {
      type: "p",
      parts: [
        "Responses speak back in status code families. Know them cold — an interviewer will hand you a failure scenario and expect you to name the right range in seconds:",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "2xx_success",
          description:
            "Request received, understood, accepted. 200 OK is the workhorse; 201 Created follows a POST that made a new resource; 204 No Content means success with nothing to return.",
        },
        {
          name: "3xx_redirect",
          description:
            "The resource moved — follow the Location header. 301 Moved Permanently lets browsers cache the new URL forever; 302 Found is temporary.",
        },
        {
          name: "4xx_client_error",
          description:
            "The caller did something wrong and retrying without changing the request won't help. 404 Not Found is the classic; 429 Too Many Requests tells the client to back off.",
        },
        {
          name: "5xx_server_error",
          description:
            "The server failed despite a valid request — retrying later might work. 500 Internal Server Error is the generic catch-all; 503 Service Unavailable means the server is overloaded or down for maintenance.",
        },
      ],
    },
    { type: "h2", text: "REST — resources, nouns, statelessness" },
    {
      type: "p",
      parts: [
        "REST is a set of constraints on top of HTTP, not a spec you implement. The two rules that matter most: name things with ",
        { hl: "nouns not verbs" },
        " (",
        { code: "GET /orders/42" },
        " not ",
        { code: "POST /getOrder" },
        "), and keep the server stateless — every request carries everything the server needs, so any instance can handle it. That statelessness is what makes horizontal scaling trivial.",
      ],
    },
    {
      type: "p",
      parts: [
        "Version the API in the URL (",
        { code: "/v2/users" },
        ") so old clients don't break when you evolve schemas. Paginate with ",
        { code: "?limit=20&cursor=…" },
        " — returning unbounded lists is how you learn about pagination the hard way at 3 a.m.",
      ],
    },
    { type: "h2", text: "gRPC — typed contracts at wire speed" },
    {
      type: "p",
      parts: [
        "gRPC replaces JSON with ",
        { hl: "Protocol Buffers" },
        " — a binary schema you define in a ",
        { code: ".proto" },
        " file, then compile into type-safe client and server stubs in any language. The payload is 3–10× smaller than equivalent JSON, and the toolchain catches contract drift at compile time, not at 2 a.m.",
      ],
    },
    {
      type: "p",
      parts: [
        "Under the hood it runs over ",
        { hl: "HTTP/2" },
        ", which multiplexes many logical streams on one TCP connection — eliminating HTTP-level head-of-line blocking (though a single lost TCP packet can still stall every stream; HTTP/3 over QUIC fixes that). Server-push streaming also comes for free, unlocking four call patterns: unary (classic request/response), server streaming, client streaming, and bidirectional streaming. REST over HTTP/1.1 can't do that natively.",
      ],
    },
    {
      type: "diagram",
      id: "api-rest-grpc",
      height: 300,
      alt: "REST JSON over HTTP/1.1 vs gRPC protobuf over HTTP/2",
    },
    { type: "h2", text: "Choosing between them" },
    {
      type: "p",
      parts: [
        "REST wins for ",
        { hl: "public-facing APIs" },
        " — browsers speak HTTP/1.1, curl speaks JSON, and every API gateway on the planet knows REST. gRPC wins for ",
        { hl: "internal service-to-service calls" },
        " where you control both ends: the binary encoding and streaming cut latency and bandwidth meaningfully at scale, and the generated stubs eliminate an entire class of integration bugs.",
      ],
    },
    {
      type: "table",
      cols: ["REST", "GRPC"],
      rows: [
        { label: "PAYLOAD", a: "JSON — human-readable, verbose", b: "Protobuf binary — compact, typed" },
        { label: "CONTRACT", a: "Informal (OpenAPI — a machine-readable API description format — optional)", b: "Strict .proto schema, codegen stubs" },
        { label: "TRANSPORT", a: "HTTP/1.1 or HTTP/2", b: "HTTP/2 always" },
        {
          label: "REACH FOR IT",
          a: "Public APIs, browsers, third-party integrations",
          b: "Internal service-to-service calls, streaming, polyglot teams",
        },
      ],
    },
    {
      type: "callout",
      label: "WATCH OUT",
      body: "gRPC is hard to consume from a browser — browsers don't expose raw HTTP/2 framing. You'll need grpc-web or a transcoding proxy at the edge if browser clients are in scope.",
    },
    {
      type: "takeaways",
      items: [
        "HTTP verbs signal intent and idempotency — GET/PUT are safe to retry; POST is not.",
        "REST keeps servers stateless and names resources with nouns, making horizontal scaling straightforward.",
        "gRPC's protobuf + HTTP/2 stack wins for internal services; REST wins for anything a browser or third party needs to call.",
      ],
    },
    {
      type: "quiz",
      question:
        "A payment service exposes an endpoint at POST /processPayment. What REST design principle does this violate?",
      options: [
        "Statelessness — the server is storing session data",
        "Nouns not verbs — the path encodes an action instead of a resource",
        "Versioning — there is no version prefix in the URL",
        "Idempotency — POST should be replaced with PUT",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — REST paths should name resources (nouns) like /payments, not actions (verbs) like /processPayment.",
      wrongMsg: "Not quite — look at the path itself, not the method. Try again.",
    },
  ],
};
