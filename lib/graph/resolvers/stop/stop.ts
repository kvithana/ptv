import { V3StopDetails, V3StopOnRoute } from "@/lib/ptv/client"
import { StopResolvers } from "../../__generated__/resolvers"
import { getFieldValue } from "../../util/get-field-value"
import { RouteResolveValue } from "../route/route"

export type StopResolveValue = V3StopOnRoute | V3StopDetails

export const Stop: StopResolvers = {
  id: (value) => value.stop_id!.toString(),
  stop_latitude: (value) =>
    getFieldValue("stop_latitude", value as V3StopOnRoute),
  stop_longitude: (value) =>
    getFieldValue("stop_longitude", value as V3StopOnRoute),
  stop_landmark: (value) => value.stop_landmark,
  stop_name: (value) => value.stop_name,
  stop_sequence: (value) =>
    getFieldValue("stop_sequence", value as V3StopOnRoute),
  stop_suburb: (value) => getFieldValue("stop_suburb", value as V3StopOnRoute),
  routes: async (value, args, ctx) => {
    let routes: RouteResolveValue[]
    if ("routes" in value) {
      routes = value.routes as RouteResolveValue[]
    }

    const response = await ctx.loaders.stops.load(
      [value.stop_id, value.route_type].join(":")
    )

    if (!response.stop) {
      routes = []
    } else {
      routes = response.stop.routes as RouteResolveValue[]
    }

    return routes.map((route) => ({
      route,
      stop: value,
    }))
  },
}
