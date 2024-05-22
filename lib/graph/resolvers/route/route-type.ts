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
