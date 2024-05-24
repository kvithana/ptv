import { getPTVClient } from "@/lib/ptv"
import { V3DirectionWithDescription } from "@/lib/ptv/client"
import Dataloader from "dataloader"
import pLimit from "p-limit"

const fetcher = async (
  keys: readonly string[]
): Promise<V3DirectionWithDescription[][]> => {
  const client = getPTVClient()

  const limit = pLimit(2)

  const getStop = async (key: string) => {
    const stop = await client.v3.directionsForRoute(parseInt(key))
    return stop.data.directions!
  }

  return await Promise.all(keys.map((key) => limit(() => getStop(key))))
}

export type DirectionsForRouteLoader = Dataloader<
  string,
  V3DirectionWithDescription[]
>

export const directionsForRouteLoader = () => new Dataloader(fetcher)
