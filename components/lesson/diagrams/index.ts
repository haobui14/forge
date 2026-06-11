import type { ComponentType } from "react";
import SdRequirements from "./sd-requirements";
import CsRequestFlow from "./cs-request-flow";
import LtaPercentiles from "./lta-percentiles";
import ApiRestGrpc from "./api-rest-grpc";
import LbPool from "./lb-pool";
import LbL4L7 from "./lb-l4l7";
import CdnEdge from "./cdn-edge";
import DbFamilies from "./db-families";
import RepTopology from "./rep-topology";
import CacheAside from "./cache-aside";
import MqFlow from "./mq-flow";
import GatewayArch from "./gateway-arch";
import CapPartition from "./cap-partition";
import UrlshortArch from "./urlshort-arch";
import FeedFanout from "./feed-fanout";
import InterviewFramework from "./interview-framework";

// Registry of hand-built SVG diagram components, keyed by the `id` used in
// lesson `diagram` blocks. Unregistered ids render as labelled drop-zones.
export const DIAGRAMS: Record<string, ComponentType> = {
  "sd-requirements": SdRequirements,
  "cs-request-flow": CsRequestFlow,
  "lta-percentiles": LtaPercentiles,
  "api-rest-grpc": ApiRestGrpc,
  "lb-pool": LbPool,
  "lb-l4l7": LbL4L7,
  "cdn-edge": CdnEdge,
  "db-families": DbFamilies,
  "rep-topology": RepTopology,
  "cache-aside": CacheAside,
  "mq-flow": MqFlow,
  "gateway-arch": GatewayArch,
  "cap-partition": CapPartition,
  "urlshort-arch": UrlshortArch,
  "feed-fanout": FeedFanout,
  "interview-framework": InterviewFramework,
};
