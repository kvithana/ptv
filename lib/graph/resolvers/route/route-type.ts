import { RouteType } from "../../__generated__/resolvers"

export function toRouteType(number?: number): RouteType | null {
  if (number === undefined) {
    return null
  }

  switch (number) {
    case 0:
      return "train"
    case 1:
      return "tram"
    case 2:
      return "bus"
    case 3:
      return "vline"
    default:
      return null
  }
}

export function fromRouteType(routeType: RouteType): 0 | 1 | 2 | 3 | 4 {
  switch (routeType) {
    case "train":
      return 0
    case "tram":
      return 1
    case "bus":
      return 2
    case "vline":
      return 3
    default:
      throw new Error(`Unknown route type: ${routeType}`)
  }
}
