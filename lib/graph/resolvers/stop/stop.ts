import {
  V3DeparturesResponse,
  V3StopDetails,
  V3StopOnRoute,
} from "@/lib/ptv/client"
import { StopResolvers } from "../../__generated__/resolvers"
import { getFieldValue } from "../../util/get-field-value"
import { buildDepartureResolveValue } from "../departure/query/departures"

export type StopResolveValue = (V3StopOnRoute | V3StopDetails) & {
  direction_id?: number
  route_id?: number
  route_type?: number
}

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
    if ("routes" in value) return value.routes

    const response = await ctx.loaders.stops.load(
      [value.stop_id, value.route_type].join(":")
    )

    if (!response.stop) return []

    return response.stop.routes
  },
  departures: async (value, args, ctx) => {
    let data: V3DeparturesResponse

    if ("route_id" in value) {
      const response = await ctx.client.v3.departuresGetForStopAndRoute(
        value.route_type as any,
        value.stop_id!,
        value.route_id!.toString(),
        {
          direction_id: value.direction_id,
        }
      )
      if (!response.data) return []
      data = response.data
    } else {
      const response = await ctx.client.v3.departuresGetForStop(
        value.route_type as any,
        value.stop_id!,
        { direction_id: value.direction_id }
      )
      if (!response.data) return []
      data = response.data
    }

    return buildDepartureResolveValue(data)
  },
}
