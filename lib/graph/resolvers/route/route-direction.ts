import { V3Direction } from "@/lib/ptv/client"
import { RouteDirectionResolvers } from "../../__generated__/resolvers"
import { RouteResolveValue } from "./route"

export type RouteDirectionResolveValue = {
  direction: V3Direction
  route: RouteResolveValue
}

export const RouteDirection: RouteDirectionResolvers = {
  direction: (value) => value.direction,
  route: (value) => value.route,
  stops: async (value, args, ctx) => {
    const { data: stops } = await ctx.client.v3.stopsStopsForRoute(
      value.route.route_id!,
      value.route.route_type as any
    )
    if (!stops.stops) return []

    return stops.stops.map((stop) => ({
      stop: stop,
      route: value.route,
    }))
  },
}
