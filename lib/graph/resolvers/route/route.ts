import { V3RouteWithStatus } from "@/lib/ptv/client"
import { ascend, sortWith } from "ramda"
import { RouteResolvers } from "../../__generated__/resolvers"
import { toRouteType } from "./route-type"

export type RouteResolveValue = V3RouteWithStatus

export const Route: RouteResolvers = {
  id: (value) => value.route_id!.toString(),
  route_name: (value) => value.route_name!,
  route_number: (value) => value.route_number!,
  route_service_status: (value) =>
    value.route_service_status
      ? {
          __typename: "RouteServiceStatus",
          description: value.route_service_status.description,
          timestamp: value.route_service_status.timestamp,
        }
      : null,
  route_type: (value) => toRouteType(value.route_type),
  geopath: (value) => (value.geopath ? JSON.stringify(value.geopath) : null),
  stops: async (value, args, ctx) => {
    const { data: directions } = await ctx.client.v3.directionsForRoute(
      value.route_id!
    )

    if (!directions) return []

    const response = await ctx.client.v3.stopsStopsForRoute(
      value.route_id!,
      value.route_type as any,
      {
        direction_id: directions.directions?.[0].direction_id,
      }
    )

    if (!response.data.stops) return []

    return sortWith([ascend((x) => x.stop_sequence ?? 0)], response.data.stops)
  },
}
