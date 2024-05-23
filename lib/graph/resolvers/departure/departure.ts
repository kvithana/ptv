import { V3Departure, V3Disruption, V3Run, V3StopModel } from "@/lib/ptv/client"
import { DepartureResolvers } from "../../__generated__/resolvers"

export type DepartureResolveValue = {
  departure: V3Departure
  stop?: V3StopModel
  disruptions?: V3Disruption[]
  run?: V3Run
}

export const Departure: DepartureResolvers = {
  id: (value) => [value.departure.stop_id, value.departure.run_id].join(":"),
  at_platform: (value) => value.departure.at_platform,
  flags: (value) => (value.departure.flags ? [value.departure.flags] : []),
  departure_sequence: (value) => value.departure.departure_sequence,
  disruptions: (value) => value.disruptions ?? [],
  run: (value) => value.run,
  estimated_departure_utc: (value) => value.departure.estimated_departure_utc,
  platform_number: (value) => value.departure.platform_number,
  scheduled_departure_utc: (value) => value.departure.scheduled_departure_utc,
}
