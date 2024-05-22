import { Resolvers } from "../__generated__/resolvers"
import { Query } from "./query"
import { Route } from "./route/route"
import { Run } from "./run/run"
import { Stop } from "./stop/stop"

export const resolvers: Resolvers = {
  Query,
  Run,
  Route,
  Stop,
}
