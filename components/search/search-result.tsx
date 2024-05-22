import { SimplifiedStop } from "@/app/api/stops/route"
import { routeTypeColor } from "@/lib/colors"
import Marquee from "react-fast-marquee"

export function SearchResult({ entry }: { entry: SimplifiedStop }) {
  const color = routeTypeColor(entry.routes[0].route_type)

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 overflow-hidden">
      <div>
        <h2 className="text-lg font-semibold">{entry.stop_name}</h2>
        <p className="text-sm text-gray-500">{entry.stop_suburb}</p>

        <div className="hidden bg-train bg-bus bg-vline bg-tram" />
        <div className="flex mt-2 w-full overflow-hidden">
          <Marquee
            gradient={false}
            play={
              entry.routes.length > 1 &&
              entry.routes.map((stop) => stop.route_name).join(" ").length > 30
            }
            speed={20}
          >
            {entry.routes.map((route) => (
              <div
                key={route.route_id}
                className={`rounded-full px-4 py-1 text-xs text-nowrap font-semibold mr-2 ${color} text-white`}
              >
                {route.route_name}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}
