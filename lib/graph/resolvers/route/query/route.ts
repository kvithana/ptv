import { QueryResolvers } from "@/lib/graph/__generated__/resolvers"

export const route: QueryResolvers["route"] = async (value, args, ctx) => {
  // ! currently geopath is not queried
  const response = await ctx.client.v3.routesRouteFromId(parseInt(args.id))

  if (!response.data.route) {
    throw new Error(`Route with id ${args.id} not found`)
  }

  return response.data.route
}
