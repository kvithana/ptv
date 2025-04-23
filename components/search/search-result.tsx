import { SimplifiedStop } from "@/app/api/stops/route"
import { routeTypeColor } from "@/lib/colors"
import { buildStopRoute } from "@/lib/routes"
import Link from "next/link"
import Marquee from "react-fast-marquee"

export function SearchResult({ entry }: { entry: SimplifiedStop }) {
  const color = routeTypeColor(entry.routes[0].route_type)

  return (
    <div className="display-row">
      <Link
        href={buildStopRoute(entry.routes[0].route_type, entry)}
        prefetch={false}
        className="block py-3 hover:bg-display/30"
      >
        <div className="flex flex-col">
          <div className="w-full">
            <h2 className="text-lg font-bold text-text-primary">
              {entry.stop_name}
            </h2>
            <p className="text-sm text-text-secondary">{entry.stop_suburb}</p>

            <div className="hidden bg-train bg-bus bg-vline bg-tram" />
            <div className="flex mt-3 w-full overflow-hidden">
              <Marquee
                gradient={false}
                play={
                  entry.routes.length > 1 &&
                  entry.routes.map((stop) => stop.route_name).join(" ").length >
                    30
                }
                speed={20}
              >
                {entry.routes.map((route) => (
                  <div
                    key={route.route_id}
                    className={`ptv-pill mr-2 ${color}`}
                  >
                    {route.route_name}
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex justify-end mt-1 mb-2">
        <Link
          href={`/departures?stopId=${entry.stop_id}&routeType=${entry.routes[0].route_type}`}
          className="text-xs text-text-secondary hover:text-text-primary"
        >
          View all departures
        </Link>
      </div>
    </div>
  )
}
