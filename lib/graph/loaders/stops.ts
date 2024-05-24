import { getPTVClient } from "@/lib/ptv"
import { V3StopResponse } from "@/lib/ptv/client"
import Dataloader from "dataloader"
import pLimit from "p-limit"

const fetcher = async (keys: readonly string[]): Promise<V3StopResponse[]> => {
  const client = getPTVClient()

  const limit = pLimit(3)

  const getStop = async (key: string) => {
    const [stopId, routeType] = key.split(":")
    const stop = await client.v3.stopsStopDetails(
      parseInt(stopId),
      parseInt(routeType) as 0 | 1 | 2 | 3 | 4
    )
    return stop.data
  }

  return await Promise.all(keys.map((key) => limit(() => getStop(key))))
}

export type StopLoader = Dataloader<string, V3StopResponse>

export const stopLoader = () => new Dataloader(fetcher)
