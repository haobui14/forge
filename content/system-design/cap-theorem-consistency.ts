import type { LessonContent } from "@/lib/lessons";

export const capTheoremConsistency: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "Network partitions aren't a hypothetical edge case — they're a when, not an if. The moment two nodes can't talk to each other, you face a forced choice that no amount of clever engineering can avoid.",
    },
    { type: "h2", text: "CAP, properly stated" },
    {
      type: "p",
      parts: [
        "The CAP theorem says a distributed system can guarantee at most two of three properties: ",
        { hl: "Consistency" },
        " (every read sees the latest write), ",
        { hl: "Availability" },
        " (every request gets a non-error response), and ",
        { hl: "Partition tolerance" },
        " (the system keeps operating when nodes can't communicate). The critical nuance: in a real network, partitions happen — so P is not optional. The real choice is ",
        { em: "during a partition" },
        ", do you sacrifice consistency or availability?",
      ],
    },
    {
      type: "callout",
      label: "INTERVIEW TIP",
      body: "Never say \"I'll choose CA\" — a system that can't tolerate partitions isn't a distributed system, it's a single node. Interviewers hear \"CA\" and immediately know you've misunderstood the theorem. The real answer is always CP or AP.",
    },
    { type: "h2", text: "CP: consistency over availability" },
    {
      type: "p",
      parts: [
        "A ",
        { hl: "CP system" },
        " refuses to answer rather than answer incorrectly. During a partition, it blocks or rejects writes until a quorum — a majority of nodes — agrees and is re-established. ",
        { code: "ZooKeeper" },
        " is the textbook CP system — it'd rather go unavailable than let two clients see different states. Banking ledgers, inventory counts, and anything where a stale read causes real-world harm belong here. The tradeoff: some requests fail during a network blip, even when the individual node is healthy.",
      ],
    },
    { type: "h2", text: "AP: availability over consistency" },
    {
      type: "p",
      parts: [
        "An ",
        { hl: "AP system" },
        " keeps responding during a partition, accepting that different nodes may diverge. Your shopping cart returning slightly stale item counts is fine — the alternative, an error page, is not. Cassandra is a canonical AP system — during a partition it keeps accepting reads and writes on both sides, then converges the replicas afterward. DNS shows AP-like behavior too: it serves a cached record even if the authoritative server is unreachable. AP systems converge ",
        { em: "eventually" },
        " once the partition heals, resolving conflicts with strategies like last-write-wins — the value with the newest timestamp survives — or application-level merge logic.",
      ],
    },
    {
      type: "table",
      cols: ["CP", "AP"],
      rows: [
        {
          label: "DURING PARTITION",
          a: "Rejects writes, blocks until quorum",
          b: "Accepts writes, nodes diverge",
        },
        {
          label: "GIVES UP",
          a: "Availability — some requests fail",
          b: "Consistency — reads may be stale",
        },
        {
          label: "FEELS LIKE",
          a: "Error page during network blip",
          b: "Stale data that self-corrects",
        },
        {
          label: "REACH FOR IT",
          a: "Banking, inventory, ZooKeeper leader election",
          b: "Shopping carts, DNS, social feeds",
        },
      ],
    },
    {
      type: "diagram",
      id: "cap-partition",
      height: 300,
      alt: "Network partition splitting two replicas: left refuses writes (CP), right accepts and diverges (AP)",
    },
    { type: "h2", text: "The consistency spectrum" },
    {
      type: "p",
      parts: [
        "Consistency isn't binary. From strongest to weakest: ",
        { hl: "strong consistency" },
        " means reads always see the latest committed write — essentially a single-node guarantee. ",
        { em: "Read-your-writes" },
        " means you always see your own writes, but not necessarily others'. ",
        { em: "Monotonic reads" },
        " means if you've seen a value, you'll never see an older one — no time-traveling backwards. ",
        { hl: "Eventual consistency" },
        " promises only that, absent new writes, all replicas converge to the same value — the weakest guarantee, but the most scalable.",
      ],
    },
    { type: "h2", text: "PACELC: the grown-up version" },
    {
      type: "p",
      parts: [
        "CAP only speaks to partitioned scenarios. ",
        { hl: "PACELC" },
        " extends it: if a Partition (P) occurs, choose Availability (A) or Consistency (C); ",
        { em: "Else" },
        " (normal operation), choose between Latency (L) and Consistency (C). A system like ",
        { code: "DynamoDB" },
        " defaults to PA/EL — available during partitions, and optimized for low latency at the cost of consistency in normal operation (though it offers optional strongly consistent reads at higher latency). ",
        { code: "Spanner" },
        " (Google's globally distributed SQL database) is PC/EC — consistent in both modes, paying with higher latency. PACELC captures what CAP misses: even when nothing is broken, there's a consistency–latency tradeoff every database makes.",
      ],
    },
    {
      type: "takeaways",
      items: [
        "Partition tolerance is mandatory in distributed systems — the only real choice is CP (refuse requests to stay consistent) or AP (serve stale data to stay available).",
        "Pick CP for financial or inventory data where a stale read causes harm; pick AP for user-facing reads where a stale value is tolerable.",
        "PACELC extends CAP to normal operation: even without a partition, every database trades latency against consistency.",
      ],
    },
    {
      type: "quiz",
      question:
        "A distributed database detects a network partition and continues accepting writes on both sides of the split. Which CAP property has it sacrificed?",
      options: [
        "Partition tolerance",
        "Availability",
        "Consistency",
        "Durability",
      ],
      correctIndex: 2,
      correctMsg:
        "Correct — by accepting writes on both sides of the partition, the nodes diverge and consistency is sacrificed; this is the AP choice.",
      wrongMsg: "Not quite — think about which guarantee breaks when two nodes accept conflicting writes simultaneously. Try again.",
    },
  ],
};
