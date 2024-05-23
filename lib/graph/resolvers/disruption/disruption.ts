import { V3Disruption } from "@/lib/ptv/client"
import { DisruptionResolvers } from "../../__generated__/resolvers"

export type DisruptionResolveValue = V3Disruption

export const Disruption: DisruptionResolvers = {
  id: (value) => value.disruption_id!.toString(),
  description: (value) => value.description,
  disruption_type: (value) => value.disruption_type,
  status: (value) => value.disruption_status,
  published_on: (value) => value.published_on,
  last_updated: (value) => value.last_updated,
  routes: (value) => value.routes ?? [],
  title: (value) => value.title,
  from_date: (value) => value.from_date,
  to_date: (value) => value.to_date,
  stops: (value) => value.stops ?? [],
  url: (value) => value.url,
}
