import { QueryResolvers } from "@/lib/graph/__generated__/resolvers"
import { fromRouteType } from "../../route/route-type"

export const stop: QueryResolvers["stop"] = async (value, args, ctx) => {
  const response = await ctx.loaders.stops.load(
    [args.id, fromRouteType(args.routeType)].join(":")
  )

  if (!response.stop) {
    throw new Error("Stop not found")
  }

  return response.stop
}
