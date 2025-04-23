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
  const { data, isLoading } = useQuery(
    RouteLoaderQueryDocument,
    {
      id,
      routeType: routeType as RouteType,
    },
    {
      refreshInterval: 5e3,
    }
  )

  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-divider mb-2">
          <div className="loading-skeleton h-6 w-24"></div>
          <div className="loading-skeleton h-5 w-20"></div>
        </div>

        {[...Array(5)].map((_, i) => (
          <div key={i} className="py-4 border-b border-divider">
            <div className="loading-skeleton h-5 w-2/5 mb-1"></div>
            <div className="mt-3 space-y-3">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="flex justify-between items-center">
                  <div className="loading-skeleton h-5 w-1/3"></div>
                  <div className="loading-skeleton h-5 w-1/5"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!data?.stop.routes?.length) {
    return (
      <div className="py-6 text-center border-b border-divider mt-4">
        <p className="text-text-secondary">No services scheduled</p>
      </div>
    )
  }

  return (
    <div className="mt-4">
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
        ...RouteStopComponent_RouteStop
      }
    }
  }
`
