import { Resolvers } from "../__generated__/resolvers"
import { Departure } from "./departure/departure"
import { Disruption } from "./disruption/disruption"
import { Query } from "./query"
import { Route } from "./route/route"
import { Run } from "./run/run"
import { Stop } from "./stop/stop"

export const resolvers: Resolvers = {
  Query,
  Run,
  Route,
  Stop,
  Departure,
  Disruption,
}
