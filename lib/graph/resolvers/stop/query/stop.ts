import { QueryResolvers } from "@/lib/graph/__generated__/resolvers"
import { fromRouteType } from "../../route/route-type"

export const stop: QueryResolvers["stop"] = async (value, args, ctx) => {
  const departures = await ctx.client.v3.departuresGetForStop(
    fromRouteType(args.routeType),
    parseInt(args.id),
    {
      expand: ["Stop"],
      max_results: 1,
    }
  )

  const stop = departures.data.stops?.[0]

  if (!stop) {
    throw new Error(`Stop with id ${args.id} not found`)
  }

  return stop
}
