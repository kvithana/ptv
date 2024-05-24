import { RouteLoader, routeLoader } from "./route"
import { StopLoader, stopLoader } from "./stops"

export type Loaders = {
  stops: StopLoader
  routes: RouteLoader
}

export function createLoaders(): Loaders {
  return {
    stops: stopLoader,
    routes: routeLoader,
  }
}
