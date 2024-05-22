"use client"

import { SimplifiedStop } from "@/app/api/stops/route"
import { useStops } from "@/lib/hooks/use-stops"
import Fuse, { IFuseOptions } from "fuse.js"
import { useState } from "react"
import { SearchResult } from "./search-result"

export function SearchStopsLoader() {
  const stops = useStops()

  if (!stops) {
    return <div>Loading...</div>
  }

  return <SearchStops stops={stops} />
}

function SearchStops({ stops }: { stops: SimplifiedStop[] }) {
  const [results, setResults] = useState<SimplifiedStop[]>(stops.slice(0, 10))

  const options: IFuseOptions<SimplifiedStop> = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["stop_name", "routes.route_name"],
    fieldNormWeight: 0.5,
  }

  const fuse = new Fuse(stops, options)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      setResults(stops.slice(0, 10))
      return
    }

    const results = fuse.search(value, { limit: 10 })
    const items = results.map((result) => result.item)
    setResults(items)
    console.log(items)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a stop"
        onChange={handleSearch}
        className="border border-network-grey placeholder-mid-grey rounded-sm p-2 w-full my-4 text-lg"
      />
      <div>
        {results.map((stop) => (
          <SearchResult key={stop.stop_id} entry={stop} />
        ))}
      </div>
    </div>
  )
}
