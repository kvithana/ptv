"use client"

import { fetcher } from "@/lib/graph/client"
import { gql } from "graphql-request"
import useSWR from "swr"
import { RouteLoaderQueryDocument } from "./__generated__/routes-loader.generated"

export function RoutesLoader({
  id,
  routeType,
}: {
  id: string
  routeType: string
}) {
  const data = useSWR([RouteLoaderQueryDocument, { id, routeType }], fetcher)

  return (
    <div>
      <h1 className="bold text-4xl mb-2">{JSON.stringify(data)}</h1>
    </div>
  )
}

gql`
  query RouteLoaderQuery($id: ID!, $routeType: RouteType!) {
    stop(id: $id, routeType: $routeType) {
      id
      stop_name
      stop_suburb
      routes {
        route {
          route_name
          route_number
        }
        directions {
          direction {
            direction_name
          }
          departures(limit: 1) {
            estimated_departure_utc
            estimated_departure_utc
          }
        }
      }
    }
  }
`
