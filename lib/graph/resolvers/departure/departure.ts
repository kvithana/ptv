import { V3Departure, V3Disruption, V3Run, V3StopModel } from "@/lib/ptv/client"
import { head } from "ramda"
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
  run: async (value, args, ctx) => {
    if (value.run) {
      return value.run
    }
    if (!value.departure.run_ref) {
      return null
    }
    const response = await ctx.client.v3.runsForRun(value.departure.run_ref)

    return head(response.data.runs ?? [])
  },
  estimated_departure_utc: (value) => value.departure.estimated_departure_utc,
  platform_number: (value) => value.departure.platform_number,
  scheduled_departure_utc: (value) => value.departure.scheduled_departure_utc,
}
