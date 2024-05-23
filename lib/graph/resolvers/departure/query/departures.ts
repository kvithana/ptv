import { QueryResolvers } from "@/lib/graph/__generated__/resolvers"
import { fromRouteType } from "../../route/route-type"
import { DepartureResolveValue } from "../departure"

export const departures: QueryResolvers["departures"] = async (
  value,
  args,
  ctx
) => {
  const d = await ctx.client.v3.departuresGetForStop(
    fromRouteType(args.routeType),
    parseInt(args.stopId),
    {
      expand: ["All"],
      max_results: 10,
    }
  )

  const { departures, stops, disruptions, runs, routes } = d.data

  const constructed =
    departures?.map(
      (departure): DepartureResolveValue => ({
        departure,
        stop: stops?.[departure.stop_id!],
        disruptions: departure.disruption_ids?.map((id) => disruptions?.[id]!),
        run: runs?.[departure.run_id!],
      })
    ) ?? []

  return {
    __typename: "DepartureResponse",
    departures: constructed,
    routes: routes ? Object.values(routes) : [],
    disruptions: disruptions ? Object.values(disruptions) : [],
  }
}
