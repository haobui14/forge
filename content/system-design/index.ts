import type { LessonContent } from "@/lib/lessons";
import { whatIsSystemDesign } from "./what-is-system-design";
import { clientServerModel } from "./client-server-model";
import { latencyThroughputAvailability } from "./latency-throughput-availability";
import { httpRestGrpc } from "./http-rest-grpc";
import { loadBalancing } from "./load-balancing";
import { cdnsEdgeNetworks } from "./cdns-edge-networks";
import { sqlVsNosql } from "./sql-vs-nosql";
import { replicationSharding } from "./replication-sharding";
import { cachingStrategies } from "./caching-strategies";
import { messageQueuesAsyncWork } from "./message-queues-async-work";
import { microservicesApiGateways } from "./microservices-api-gateways";
import { capTheoremConsistency } from "./cap-theorem-consistency";
import { designUrlShortener } from "./design-url-shortener";
import { designNewsFeed } from "./design-news-feed";
import { capstoneMockInterview } from "./capstone-mock-interview";

// slug → authored lesson content.
export const LESSON_CONTENT: Record<string, LessonContent> = {
  "what-is-system-design": whatIsSystemDesign,
  "client-server-model": clientServerModel,
  "latency-throughput-availability": latencyThroughputAvailability,
  "http-rest-grpc": httpRestGrpc,
  "load-balancing": loadBalancing,
  "cdns-edge-networks": cdnsEdgeNetworks,
  "sql-vs-nosql": sqlVsNosql,
  "replication-sharding": replicationSharding,
  "caching-strategies": cachingStrategies,
  "message-queues-async-work": messageQueuesAsyncWork,
  "microservices-api-gateways": microservicesApiGateways,
  "cap-theorem-consistency": capTheoremConsistency,
  "design-url-shortener": designUrlShortener,
  "design-news-feed": designNewsFeed,
  "capstone-mock-interview": capstoneMockInterview,
};
