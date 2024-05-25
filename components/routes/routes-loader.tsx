"use client"

import { RouteType } from "@/app/__generated__/types"

import { useQuery } from "@/lib/hooks/use-query"
import { gql } from "graphql-request"
import { RouteLoaderQueryDocument } from "./__generated__/routes-loader.generated"
import { RouteStop } from "./route-stop"

export function RoutesLoader({
  id,
  routeType,
}: {
  id: string
  routeType: string
}) {
  const { data } = useQuery(
    RouteLoaderQueryDocument,
    {
      id,
      routeType: routeType as RouteType,
    },
    {
      refreshInterval: 5e3,
    }
  )

  return (
    <div>
      {data?.stop.routes?.map((route) => (
        <RouteStop key={route.route.id} data={route} />
      ))}
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
        ...RouteStopComponent
      }
    }
  }
`
