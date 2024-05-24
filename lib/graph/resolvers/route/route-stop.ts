import { V3StopOnRoute } from "@/lib/ptv/client"
import { RouteStopResolvers } from "../../__generated__/resolvers"
import { RouteResolveValue } from "./route"

export type RouteStopResolveValue = {
  route: RouteResolveValue
  stop: V3StopOnRoute
}

export const RouteStop: RouteStopResolvers = {
  route: (value) => value.route,
  stop: (value) => value.stop,
  directions: async (value, args, ctx) => {
    const directions = await ctx.loaders.directionsForRoute.load(
      value.route.route_id!.toString()
    )
    return directions.map((direction) => ({
      direction,
      route: value.route,
      stop: value.stop,
    }))
  },
}
