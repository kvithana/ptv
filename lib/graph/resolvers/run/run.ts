import { V3Run } from "@/lib/ptv/client"
import { RunResolvers } from "../../__generated__/resolvers"
import { toRouteType } from "../route/route-type"

export type RunResolveValue = V3Run

export const Run: RunResolvers = {
  id: (value) => {
    if (value.run_ref) {
      return value.run_ref
    }
    if (value.run_id === undefined) {
      throw new Error("run_id is undefined")
    }
    return value.run_id.toString()
  },
  destination_name: (value) => value.destination_name!,
  express_stop_count: (value) => value.express_stop_count,
  final_stop: async (value, args, ctx) => {
    const { stop } = await ctx.loaders.stops.load(
      value.final_stop_id!.toString()
    )
    return stop
  },
  geopath: (value) => (value.geopath ? JSON.stringify(value.geopath) : null),
  route: async (value, args, ctx) => {
    const { route } = await ctx.loaders.routes.load(value.route_id!.toString())
    return route
  },
  route_type: (value) => toRouteType(value.route_type),
  run_sequence: (value) => value.run_sequence,
  status: (value) => value.status,
  vehicle_descriptor: (value) =>
    value.vehicle_descriptor
      ? {
          __typename: "VehicleDescriptor",
          ...value.vehicle_descriptor,
        }
      : null,
  vehicle_position: (value) =>
    value.vehicle_position
      ? {
          __typename: "VehiclePosition",
          ...value.vehicle_position,
        }
      : null,
}
