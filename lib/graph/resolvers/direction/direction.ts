import { V3Direction } from "@/lib/ptv/client"
import { DirectionResolvers } from "../../__generated__/resolvers"

export type DirectionResolveValue = V3Direction

export const Direction: DirectionResolvers = {
  id: (value) => value.direction_id!.toString(),
  direction_name: (value) => value.direction_name,
  route: async (value, args, ctx) => {
    const route = await ctx.loaders.routes.load(value.route_id!.toString())

    if (!route.route) return null

    return route.route
  },
}
