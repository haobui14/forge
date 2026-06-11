import type { LessonContent } from "@/lib/lessons";

export const capstoneMockInterview: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "The system design interview isn't a test of memorized architectures — it's a test of how you think under ambiguity. The same 45 minutes, the same five phases, every time. Master the framework and the specific problem almost doesn't matter.",
    },
    { type: "h2", text: "The five-phase framework" },
    {
      type: "p",
      parts: [
        "Every senior system design interview follows the same arc. The exact minutes flex, but the ",
        { hl: "sequence never changes" },
        " — and violating it is the single most common reason strong engineers get rejected. Burn this structure in:",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "clarify_requirements",
          description:
            "5–8 min. Ask before you draw. Who are the users? What's the scale — DAU, QPS, data volume? Which features are in scope for today? Functional requirements (what it does) first, then non-functional (latency, durability, consistency). Write the answers on the whiteboard — they anchor every decision you make after.",
        },
        {
          name: "napkin_math",
          description:
            "~5 min. Rough numbers only. Reads vs writes ratio, QPS at peak, storage over 5 years. These estimates reveal which bottlenecks to design around and show the interviewer you're grounded in reality rather than sketching architecture with no numbers behind it.",
        },
        {
          name: "high_level_design",
          description:
            "10–15 min. Sketch the major components — clients, load balancers, services, caches, databases, queues. Draw data flow for the two or three most critical operations. Keep it intentionally simple; this is the foundation, not the final answer.",
        },
        {
          name: "deep_dive",
          description:
            "10–15 min. The interviewer picks a component and says 'tell me more about that.' This is where you earn the hire — explain trade-offs in detail, propose alternatives, discuss failure modes. Reference specific algorithms and data structures by name.",
        },
        {
          name: "wrap_up",
          description:
            "~5 min. Summarize bottlenecks, acknowledge what you'd build differently with more time, mention what you'd monitor — for example queue depth, p99 latency, and cache hit rate are the signals this track taught. This signals senior maturity: you know your own design's weaknesses.",
        },
      ],
    },
    {
      type: "diagram",
      id: "interview-framework",
      height: 280,
      alt: "Five-phase interview timeline with deep dive emphasized",
    },
    { type: "h2", text: "The deep dive, played out" },
    {
      type: "rows",
      items: [
        {
          name: "global_latency",
          description:
            "'How would you make this fast for users in Asia?' — CDNs and edge networks (lesson 6): push static assets and cacheable responses to edge PoPs close to the user; the winning answer is single-digit-millisecond edge delivery instead of round-tripping to a distant origin.",
        },
        {
          name: "read_scaling",
          description:
            "'Your database is getting hammered with reads — what do you do?' — replication and sharding (lesson 8) plus caching strategies (lesson 9): add read replicas to spread query load, place a cache-aside layer in front so hot rows never hit the DB, and shard by a high-cardinality key when replicas alone aren't enough.",
        },
        {
          name: "celebrity_post",
          description:
            "'What happens when a user with 10 M followers posts?' — hybrid fan-out from the News Feed lesson: precompute feed entries for normal users at write time, but skip fan-out for celebrities and inject their posts at read time instead, capping worst-case write amplification.",
        },
        {
          name: "consistency_choice",
          description:
            "'Should this be strongly consistent or eventually consistent?' — CAP theorem (lesson 12): pick CP for financial or inventory data where a stale read causes real-world harm; pick AP for user-facing counts or feeds where brief staleness is acceptable and availability matters more.",
        },
        {
          name: "async_work",
          description:
            "'How do you handle a spike in write traffic without dropping requests?' — message queues (lesson 10): publish events to a durable queue so downstream workers consume at their own pace; queue depth is the key metric to monitor, and a growing backlog is your early warning of under-provisioned consumers.",
        },
      ],
    },
    { type: "h2", text: "What interviewers actually grade" },
    {
      type: "p",
      parts: [
        "Interviewers are not checking whether you remembered the exact architecture of Twitter's feed service. They're evaluating four things: ",
        { hl: "structured thinking" },
        " (do you approach the problem methodically?), ",
        { hl: "trade-off fluency" },
        " (can you articulate why you chose X over Y?), ",
        { hl: "depth on demand" },
        " (when pushed, can you go deep rather than hand-wave?), and ",
        { hl: "communication" },
        " (can a teammate follow your reasoning in real time?).",
      ],
    },
    {
      type: "p",
      parts: [
        "Notice what's absent from that list: correct answers. There are no correct answers in system design — there are well-reasoned answers and poorly-reasoned answers. A candidate who chooses an unconventional approach and defends it with clear trade-offs outscores one who recites a canonical architecture without explaining it.",
      ],
    },
    { type: "h2", text: "The classic failure modes" },
    {
      type: "p",
      parts: [
        "Engineers fail system design interviews the same four ways, over and over. Recognize these in yourself and you've already improved your score:",
      ],
    },
    {
      type: "rows",
      items: [
        {
          name: "premature_detail",
          description:
            "Jumping into database schema or API endpoints before finishing requirements. You build the right system for the wrong problem. The fix: spend the full 5–8 minutes on requirements even when the problem seems obvious.",
        },
        {
          name: "monologue_mode",
          description:
            "Talking continuously without checking in. Interviewers have limited time and specific things they want to probe — if you don't pause and invite them in, they can't steer you toward your strengths. Pause every few minutes: 'Does this direction make sense? Is there an area you'd like me to go deeper on?'",
        },
        {
          name: "hint_blindness",
          description:
            "Missing or ignoring the interviewer's redirects. When they say 'interesting — what happens if that cache node goes down?' they are not making small talk. That is a hint to pivot. Acknowledge it, engage with it, follow it.",
        },
        {
          name: "magic_numbers",
          description:
            "Citing numbers you can't justify — 'we'll need about 500 servers' without any math. Interviewers ask 'how did you get that?' and the answer is silence. Do your napkin math out loud; a rough correct order-of-magnitude beats a precise number you can't defend.",
        },
      ],
    },
    { type: "h2", text: "Trade-off fluency: what it sounds like" },
    {
      type: "p",
      parts: [
        "Trade-off fluency is the skill the track has been building since lesson 1. You've now seen it applied to routing algorithms (round-robin vs least connections), caching strategies (write-through vs cache-aside), consistency models (strong vs eventual), and fan-out patterns (write vs read). Every one of those was a trade-off framed as: ",
        { em: "given these constraints, here's what I'd choose and here's what I'm giving up." },
      ],
    },
    {
      type: "p",
      parts: [
        "In the interview, vocalize that structure explicitly. Don't just say 'I'll use Kafka.' Say: 'I'll use a message queue here — specifically something like Kafka — because we need durable, ordered delivery and we expect bursts that would overwhelm the downstream service if we called it synchronously. The trade-off is operational complexity and the latency of async processing, which is acceptable here because...' That's the signal interviewers reward.",
      ],
    },
    { type: "h2", text: "The track as your toolkit" },
    {
      type: "p",
      parts: [
        "Every lesson in this track is a ",
        { hl: "named tool you can reach for" },
        " in an interview. When the interviewer asks about global latency — that's CDNs and edge networks (lesson 6). When they ask how you'd scale reads — that's replication and sharding (lesson 8), plus caching strategies (lesson 9). When they ask about service-to-service reliability — that's message queues (lesson 10) and microservices (lesson 11). When they ask what consistency model you want — that's CAP theorem (lesson 12).",
      ],
    },
    {
      type: "p",
      parts: [
        "The URL shortener (lesson 13) and news feed (lesson 14) were worked examples: one domain, all the tools applied together. In your real interview, you'll face a domain you haven't studied — but you've practiced the moves. Clarify, estimate, sketch, go deep, wrap up. Same five phases, same toolkit, different problem.",
      ],
    },
    {
      type: "callout",
      label: "INTERVIEW TIP",
      body: "When you don't know the 'right' answer, say so and reason out loud. 'I haven't designed this specific component before — here's how I'd think through it' earns more credit than silence or a bluff. Interviewers are evaluating your reasoning process, and reasoning out loud is the only way they can see it.",
    },
    {
      type: "takeaways",
      items: [
        "Follow the five phases in order — requirements, napkin math, high-level design, deep dive, wrap-up — and spend the right minutes on each. Violating the sequence is the most common reason strong engineers fail.",
        "Interviewers grade structured thinking, trade-off fluency, depth on demand, and communication — not whether your architecture matches a canonical diagram.",
        "Every lesson in this track named a concrete trade-off; fluency means voicing the constraint, the choice, and the cost in the same breath.",
      ],
    },
    {
      type: "quiz",
      question:
        "During a system design interview, the interviewer interrupts your database explanation and asks: 'What happens if that cache node fails?' What should you do?",
      options: [
        "Finish your current point first, then address the cache failure at the end",
        "Acknowledge the hint, pivot immediately, and discuss the failure mode and mitigation",
        "Note it as a future improvement and continue with the high-level design",
        "Ask the interviewer to clarify whether that's in scope for this session",
      ],
      correctIndex: 1,
      correctMsg:
        "Correct — the interviewer is steering you toward a specific depth; pivoting immediately to engage with the hint demonstrates hint awareness and earns you the deep-dive score.",
      wrongMsg:
        "Not quite — think about what an interviewer is signaling when they interrupt with a specific failure scenario. Try again.",
    },
  ],
};
