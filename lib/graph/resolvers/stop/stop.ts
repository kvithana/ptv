import { V3StopOnRoute } from "@/lib/ptv/client"
import { StopResolvers } from "../../__generated__/resolvers"

export type StopResolveValue = V3StopOnRoute

export const Stop: StopResolvers = {
  id: (value) => value.stop_id!.toString(),
  stop_latitude: (value) => value.stop_latitude,
  stop_longitude: (value) => value.stop_longitude,
  stop_landmark: (value) => value.stop_landmark,
  stop_name: (value) => value.stop_name,
  stop_sequence: (value) => value.stop_sequence,
  stop_suburb: (value) => value.stop_suburb,
}
