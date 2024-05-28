import { gql } from "graphql-request"
import { useMemo } from "react"
import { RouteStopComponentFragment } from "./__generated__/route-stop.generated"
import { RoutePill } from "./route-pill"
import { RouteStopDeparture } from "./route-stop-departure"

export function RouteStop({ data }: { data: RouteStopComponentFragment }) {
  const validDirections = useMemo(
    () => data.directions?.filter((direction) => direction.departures?.length),
    [data]
  )

  return (
    <div className="">
      <div className="py-8">
        {validDirections?.map((direction, index) => (
          <div key={direction.direction?.direction_name} className="mt-4">
            <div className="text-gray-600 text-sm">
              Towards {direction.direction?.direction_name}
            </div>

            {direction.departures?.map((departure) => (
              <RouteStopDeparture
                key={departure.scheduled_departure_utc}
                departure={departure}
                routePill={<RoutePill route={data.route} />}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

gql`
  fragment RouteStopComponent_RouteStop on RouteStop {
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
