import { QueryResolvers } from "../__generated__/resolvers"
import { DepartureQuery } from "./departure/query"
import { RouteQuery } from "./route/query"
import { StopQuery } from "./stop/query"

export const Query: QueryResolvers = {
  ...RouteQuery,
  ...StopQuery,
  ...DepartureQuery,
}
