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

  // Use route number for display if available (especially for trams)
  const displayText = route_number || route_name

  if (route_type === RouteType.train) {
    return (
      <div className="rounded-lg px-3 py-1 text-sm font-semibold bg-train text-white inline-block">
        {displayText}
      </div>
    )
  }

  if (route_type === RouteType.bus) {
    return (
      <div className="rounded-lg px-3 py-1 text-sm font-semibold bg-bus text-white inline-block">
        {displayText}
      </div>
    )
  }

  if (route_type === RouteType.tram) {
    return (
      <div className="rounded-lg px-3 py-1 text-sm font-semibold bg-tram text-white inline-block">
        {displayText}
      </div>
    )
  }

  if (route_type === RouteType.vline) {
    return (
      <div className="rounded-lg px-3 py-1 text-sm font-semibold bg-vline text-white inline-block">
        {displayText}
      </div>
    )
  }

  return (
    <div className="rounded-lg px-3 py-1 text-sm font-semibold bg-mid-grey text-white inline-block">
      {displayText}
    </div>
  )
}
