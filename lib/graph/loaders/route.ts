import { getPTVClient } from "@/lib/ptv"
import { V3RouteResponse } from "@/lib/ptv/client"
import Dataloader from "dataloader"
import pLimit from "p-limit"

const fetcher = async (keys: readonly string[]): Promise<V3RouteResponse[]> => {
  const client = getPTVClient()

  const limit = pLimit(3)

  const getStop = async (key: string) => {
    const stop = await client.v3.routesRouteFromId(parseInt(key))
    return stop.data
  }

  return await Promise.all(keys.map((key) => limit(() => getStop(key))))
}

export type RouteLoader = Dataloader<string, V3RouteResponse>

export const routeLoader = new Dataloader(fetcher)
