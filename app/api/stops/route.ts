import { RouteType, getPTVClient } from "@/lib/ptv"
import { V3RouteWithStatus } from "@/lib/ptv/client"
import { kv } from "@vercel/kv"
import pLimit from "p-limit"
import { flatten, uniqBy } from "ramda"

export type SimplifiedStop = {
  routes: {
    route_name: string
    route_id: number
    route_type: RouteType
  }[]
  stop_id: number
  stop_name: string
  stop_suburb: string
  stop_latitude: number
  stop_longitude: number
}

export async function GET(request: Request) {
  const types = [RouteType.Train, RouteType.Tram]

  async function fetchStopsForRouteWithCache(routeType: RouteType) {
    type CacheData = {
      stops: SimplifiedStop[]
      time: string
    }

    const cacheKey = `stops-for-route-${routeType}`
    const cached = await kv.get<CacheData>(cacheKey)

    if (cached) {
      console.log("Using cached stops for:", routeType)
      return cached.stops
    }

    console.log("Fetching stops for:", routeType)
    const stops = await getStopsForRouteType(routeType)
    await kv.set(
      cacheKey,
      {
        stops,
        time: new Date().toISOString(),
      },
      { ex: 60 * 60 * 24 * 30 }
    )

    return stops
  }

  const stops: {
    [stopId: number]: SimplifiedStop
  } = {}

  for (const type of types) {
    const result = await fetchStopsForRouteWithCache(type)

    for (const stop of result) {
      if (!stops[stop.stop_id]) {
        stops[stop.stop_id] = {
          ...stop,
          routes: stop.routes,
        }
      }

      stops[stop.stop_id].routes = uniqBy(
        (route) => route.route_id,
        stops[stop.stop_id].routes.concat(stop.routes)
      )
    }
  }

  return new Response(JSON.stringify(Object.values(stops)), {
    headers: {
      "content-type": "application/json",
    },
  })
}

async function getStopsForRouteType(routeType: RouteType) {
  const client = getPTVClient()
  const routes = await client.v3.routesOneOrMoreRoutes({
    route_types: [routeType],
  })

  const limit = pLimit(2)

  const fetchStopsForRoute = async (
    route: V3RouteWithStatus
  ): Promise<SimplifiedStop[]> => {
    try {
      const stops = await client.v3.stopsStopsForRoute(
        route.route_id!,
        route.route_type as RouteType
      )

      return (
        stops.data.stops?.map((stop) => ({
          routes: [
            {
              route_name: route.route_name!,
              route_id: route.route_id!,
              route_type: route.route_type!,
            },
          ],
          stop_id: stop.stop_id!,
          stop_name: stop.stop_name!,
          stop_suburb: stop.stop_suburb!,
          stop_latitude: stop.stop_latitude!,
          stop_longitude: stop.stop_longitude!,
        })) ?? []
      )
    } catch (err) {
      console.error("Error fetching stops for route", route.route_id, err)
      throw err
    }
  }

  const results = await Promise.all(
    (routes.data as { routes: V3RouteWithStatus[] }).routes.map((route) =>
      limit(() => fetchStopsForRoute(route))
    )
  )

  return flatten(results)
}
