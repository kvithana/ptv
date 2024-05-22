import { V3Run } from "@/lib/ptv/client"
import { RunResolvers } from "../../__generated__/resolvers"
import { toRouteType } from "../route/route-type"

export type RunResolveValue = V3Run

export const Run: RunResolvers = {
  id: (value) => {
    if (value.run_id === undefined) {
      throw new Error("run_id is undefined")
    }
    if (value.run_id === -1) {
      return value.run_ref!.toString()
    }
    return value.run_id.toString()
  },
  destination_name: (value) => value.destination_name!,
  express_stop_count: (value) => value.express_stop_count,
  final_stop: (value, args, context) => {
    // TODO
    return null!
  },
  geopath: (value) => (value.geopath ? JSON.stringify(value.geopath) : null),
  interchange: (value) => {
    // TODO
    return null
  },
  route: (value, args, context) => {
    // TODO
    return null!
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
