import type { LessonContent } from "@/lib/lessons";

export const replicationSharding: LessonContent = {
  blocks: [
    {
      type: "lede",
      text: "One database node is a single point of failure with a finite ceiling. The moment your data outgrows a single machine — or your uptime requirements exceed what one node can promise — you need two different tools: replication for safety, sharding for size.",
    },
    { type: "h2", text: "Replication: copies for safety and reads" },
    {
      type: "p",
      parts: [
        "In leader-follower replication — the most common setup — one node accepts all writes and streams changes to one or more read replicas. The replicas serve read traffic, so your ",
        { hl: "read capacity scales horizontally" },
        " while writes stay serialized on the leader. A reporting query that would murder your production leader at 3 AM runs just fine against a replica.",
      ],
    },
    {
      type: "p",
      parts: [
        "The gotcha is ",
        { hl: "replication lag" },
        ". Asynchronous replication — the default because it's fast — means a replica is typically sub-millisecond to tens of milliseconds behind the leader in the same datacenter; lag stretching into seconds signals an overloaded replica or network trouble. A user who writes a record and immediately reads it back may hit a stale replica and see nothing. The fix is ",
        { em: "read-your-own-writes consistency" },
        ": route a user's reads to the leader (or a replica guaranteed to have caught up) for a short window after their write.",
      ],
    },
    {
      type: "callout",
      label: "WATCH OUT",
      body: "Async replication is the default — and the replica lag can bite you. If a user posts a comment and refreshes to find it missing, you have a read-your-own-writes violation. Fix it by routing post-write reads to the leader for a brief window, or use synchronous replication on the critical path.",
    },
    {
      type: "p",
      parts: [
        "Synchronous replication waits for at least one replica to confirm before acknowledging the write — zero lag, but every write pays the replica's round-trip latency. Most systems use a ",
        { hl: "semi-synchronous" },
        " compromise: one replica is synchronous, the rest async. Failover promotes a replica to leader automatically — the main risk is split-brain, where two nodes both believe they are the leader and accept conflicting writes; tools like Patroni (an open-source Postgres failover orchestrator) or AWS RDS Multi-AZ (a managed equivalent) use fencing and quorum to prevent this, completing failover in under 30 seconds.",
      ],
    },
    { type: "h2", text: "Sharding: pieces for size and writes" },
    {
      type: "p",
      parts: [
        "Replication gives you copies of the same data. Sharding gives you ",
        { hl: "partitions of different data" },
        " across multiple nodes. When a single machine can no longer hold your dataset — or write throughput saturates one node's disk — you split rows across shards by a shard key.",
      ],
    },
    {
      type: "p",
      parts: [
        "A good shard key distributes writes evenly. A bad one creates ",
        { hl: "hot spots" },
        " — the celebrity problem: if you shard a social network by user ID and one user has 200 million followers, every notification write goes to the same shard. Composite keys, hash-based routing, or special-casing viral entities all address it.",
      ],
    },
    {
      type: "p",
      parts: [
        "The deepest pain in sharding is ",
        { em: "resharding" },
        ": when a shard fills up and you need to split it, every key in the affected range must move. ",
        { hl: "Consistent hashing" },
        " softens the blow — it arranges nodes on a virtual ring so that adding or removing a node only remaps the keys adjacent to it on the ring, not the entire dataset. Cassandra and DynamoDB both use consistent hashing under the hood.",
      ],
    },
    {
      type: "diagram",
      id: "rep-topology",
      height: 330,
      alt: "Leader-follower replication on the left; data split across three shards on the right",
    },
    { type: "h2", text: "Replication vs Sharding" },
    {
      type: "table",
      cols: ["REPLICATION", "SHARDING"],
      rows: [
        {
          label: "SOLVES",
          a: "Availability and read scale",
          b: "Write scale and dataset size",
        },
        {
          label: "DATA LAYOUT",
          a: "Full copy on every node",
          b: "Subset of rows on each node",
        },
        {
          label: "FAILURE MODE",
          a: "Replication lag; split-brain on failover",
          b: "Hot spots; cross-shard JOINs break",
        },
        {
          label: "COST",
          a: "Storage multiplied by replica count",
          b: "Operational complexity; resharding pain",
        },
      ],
    },
    {
      type: "takeaways",
      items: [
        "Replication makes copies — use it for fault tolerance and scaling reads; async lag is the trade-off.",
        "Sharding splits data — use it when writes or storage outgrow one machine; choose your shard key to avoid hot spots.",
        "Most production systems combine both: shards with replicas per shard, giving you scale-out writes and resilient reads.",
      ],
    },
    {
      type: "quiz",
      question:
        "A social platform shards user data by user ID. After a viral post, one shard handles 10× the write load of the others. What is this called?",
      options: [
        "Replication lag",
        "Split-brain",
        "A hot spot",
        "Consistent hashing",
      ],
      correctIndex: 2,
      correctMsg:
        "A hot spot occurs when a shard key concentrates disproportionate traffic on one node — the classic celebrity or viral-content problem.",
      wrongMsg:
        "That term describes a different failure mode in distributed databases. Try again.",
    },
  ],
};
