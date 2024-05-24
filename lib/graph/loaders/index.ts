import {
  DirectionsForRouteLoader,
  directionsForRouteLoader,
} from "./directions"
import { RouteLoader, routeLoader } from "./route"
import { StopLoader, stopLoader } from "./stops"

export type Loaders = {
  stops: StopLoader
  routes: RouteLoader
  directionsForRoute: DirectionsForRouteLoader
}

export function createLoaders(): Loaders {
  return {
    stops: stopLoader(),
    routes: routeLoader(),
    directionsForRoute: directionsForRouteLoader(),
  }
}
