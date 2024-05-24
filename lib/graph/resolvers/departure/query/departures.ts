import { QueryResolvers } from "@/lib/graph/__generated__/resolvers"
import { V3DeparturesResponse } from "@/lib/ptv/client"
import { fromRouteType } from "../../../util/route-type"
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

  const { disruptions, routes } = d.data

  return {
    __typename: "DepartureResponse",
    departures: buildDepartureResolveValue(d.data),
    routes: routes ? Object.values(routes) : [],
    disruptions: disruptions ? Object.values(disruptions) : [],
  }
}

export function buildDepartureResolveValue(
  res: V3DeparturesResponse
): DepartureResolveValue[] {
  const { departures, stops, disruptions, runs } = res

  return (
    departures?.map(
      (departure): DepartureResolveValue => ({
        departure,
        stop: stops?.[departure.stop_id!],
        disruptions: departure.disruption_ids?.map((id) => disruptions?.[id]!),
        run: runs?.[departure.run_id!],
      })
    ) ?? []
  )
}
