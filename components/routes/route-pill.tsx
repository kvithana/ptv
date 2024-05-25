import { RouteType } from "@/app/__generated__/types"

export function RoutePill({
  route,
}: {
  route: {
    route_name?: string | null
    route_type?: string | null
    route_number?: string | null
  }
}) {
  const { route_name, route_type, route_number } = route
  if (route_type === RouteType.train) {
    return (
      <div className="rounded-full px-4 py-1 text-xs text-nowrap font-semibold bg-train text-white">
        <span>{route_name}</span>
      </div>
    )
  }

  if (route_type === RouteType.bus) {
    return (
      <div className="rounded-full px-4 py-1 text-xs text-nowrap font-semibold bg-bus text-white">
        <span>{route_name}</span>
      </div>
    )
  }

  if (route_type === RouteType.tram) {
    //TODO support different coloured routes
    return (
      <div className="rounded-full px-4 py-1 text-xs text-nowrap font-semibold bg-tram text-white">
        <span>{route_number ?? route_name}</span>
      </div>
    )
  }

  if (route_type === RouteType.vline) {
    return (
      <div className="rounded-full px-4 py-1 text-xs text-nowrap font-semibold bg-vline text-white">
        <span>{route_name}</span>
      </div>
    )
  }

  return (
    <div className="rounded-full px-4 py-1 text-xs text-nowrap font-semibold bg-mid-grey text-white">
      <span>{route_name}</span>
    </div>
  )
}
