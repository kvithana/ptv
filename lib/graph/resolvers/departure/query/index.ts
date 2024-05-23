import { QueryResolvers } from "@/lib/graph/__generated__/resolvers"
import { departures } from "./departures"

export const DepartureQuery: QueryResolvers = {
  departures,
}
