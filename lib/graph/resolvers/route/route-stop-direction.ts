import { V3DirectionWithDescription } from "@/lib/ptv/client"
import { RouteStopDirectionResolvers } from "../../__generated__/resolvers"
import { buildDepartureResolveValue } from "../departure/query/departures"
import { StopResolveValue } from "../stop/stop"
import { RouteResolveValue } from "./route"

export type RouteStopDirectionResolveValue = {
  route: RouteResolveValue
  stop: StopResolveValue
  direction: V3DirectionWithDescription
}

export const RouteStopDirection: RouteStopDirectionResolvers = {
  stop: (value) => value.stop,
  departures: async (value, args, ctx) => {
    const result = await ctx.client.v3.departuresGetForStopAndRoute(
      value.route.route_type as any,
      value.stop.stop_id!,
      value.route.route_id!.toString(),
      {
        direction_id: value.direction.direction_id!,
        max_results: args.limit ?? 10,
      }
    )

    return buildDepartureResolveValue(result.data)
  },
  direction: async (value, args, ctx) => {
    const directions = await ctx.loaders.directionsForRoute.load(
      value.route.route_id!.toString()
    )

    return directions.find(
      (x) => x.direction_id === value.direction.direction_id!
    )
  },
}
