import { RouteType } from "../ptv"

export function routeTypeColor(routeType: RouteType) {
  switch (routeType) {
    case RouteType.Train:
      return "bg-train"
    case RouteType.Tram:
      return "bg-tram"
    case RouteType.Bus:
      return "bg-bus"
    case RouteType.VLine:
      return "bg-vline"
    default:
      return "bg-network-grey"
  }
}
