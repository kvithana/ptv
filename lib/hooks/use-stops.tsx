import { SimplifiedStop } from "@/app/api/stops/route"
import { get, set } from "idb-keyval"
import { useCallback, useEffect, useState } from "react"

export function useStops() {
  const [stops, setStops] = useState<SimplifiedStop[] | null>(null)

  async function fetchStops() {
    const response = await fetch("/api/stops", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch stops")
    }
    const stops = (await response.json()) as SimplifiedStop[]
    return stops
  }

  const init = useCallback(async () => {
    const stops = await get("stops")
    if (stops) {
      return stops
    }
    const newStops = await fetchStops()
    await set("stops", newStops)
    return newStops
  }, [])

  useEffect(() => {
    init().then((stops) => setStops(stops))
  }, [init])

  return stops
}
