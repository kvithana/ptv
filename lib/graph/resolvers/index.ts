import { Resolvers } from "../__generated__/resolvers"
import { Departure } from "./departure/departure"
import { Direction } from "./direction/direction"
import { Disruption } from "./disruption/disruption"
import { Query } from "./query"
import { Route } from "./route/route"
import { RouteStop } from "./route/route-stop"
import { RouteStopDirection } from "./route/route-stop-direction"
import { Run } from "./run/run"
import { Stop } from "./stop/stop"

export const resolvers: Resolvers = {
  Query,
  Run,
  Route,
  Stop,
  Departure,
  Direction,
  RouteStop,
  RouteStopDirection,
  Disruption,
}
