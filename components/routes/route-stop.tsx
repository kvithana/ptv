import { gql } from "graphql-request"
import { useMemo } from "react"
import { RouteStopComponent_RouteStopFragment } from "./__generated__/route-stop.generated"
import { RoutePill } from "./route-pill"
import { RouteStopDeparture } from "./route-stop-departure"
import Link from "next/link"

export function RouteStop({
  data,
}: {
  data: RouteStopComponent_RouteStopFragment
}) {
  const validDirections = useMemo(
    () => data.directions?.filter((direction) => direction.departures?.length),
    [data]
  )

  return (
    <div className="border-b border-divider mb-4">
      <div className="flex items-center justify-between py-2">
        <RoutePill route={data.route} />
        {data.route.route_service_status?.description && (
          <div className="text-xs text-text-secondary">
            {data.route.route_service_status?.description}
          </div>
        )}
      </div>

      {validDirections?.map((direction, index) => (
        <div key={direction.direction?.direction_name} className="mt-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-text-secondary text-sm">
              Towards {direction.direction?.direction_name}
            </div>
            <Link
              href={`/api/departures?stop_id=${data.stop.id}&route_type=${
                data.route.route_type
              }${data.route.id ? `&route_id=${data.route.id}` : ""}${
                direction.direction?.id
                  ? `&direction_id=${direction.direction.id}`
                  : ""
              }`}
              target="_blank"
              className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              E-ink data
            </Link>
          </div>

          <div className="mt-1">
            {direction.departures?.map((departure) => (
              <RouteStopDeparture
                key={departure.scheduled_departure_utc}
                departure={departure}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

gql`
  fragment RouteStopComponent_RouteStop on RouteStop {
    stop {
      id
      stop_name
    }
    route {
      id
      route_type
      route_name
      route_number
      route_service_status {
        description
        timestamp
      }
    }
    directions {
      direction {
        id
        direction_name
      }
      departures(limit: 1) {
        estimated_departure_utc
        scheduled_departure_utc
        run {
          id
          destination_name
        }
        platform_number
      }
    }
  }
`
