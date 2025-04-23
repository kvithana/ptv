"use client"

import { SimplifiedStop } from "@/app/api/stops/route"
import { useStops } from "@/lib/hooks/use-stops"
import Fuse, { IFuseOptions } from "fuse.js"
import { useState } from "react"
import { SearchResult } from "./search-result"

export function SearchStopsLoader() {
  const stops = useStops()

  if (!stops) {
    return (
      <div className="space-y-0">
        <div className="loading-skeleton w-full h-12 mb-4"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="display-row py-3">
            <div className="loading-skeleton h-5 w-4/5 mb-2"></div>
            <div className="loading-skeleton h-4 w-1/2 mb-3"></div>
            <div className="flex gap-2">
              {[...Array(Math.floor(Math.random() * 2) + 1)].map((_, j) => (
                <div key={j} className="loading-skeleton h-6 w-16"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return <SearchStops stops={stops} />
}

function SearchStops({ stops }: { stops: SimplifiedStop[] }) {
  const [results, setResults] = useState<SimplifiedStop[]>(stops.slice(0, 10))
  const [query, setQuery] = useState("")

  const options: IFuseOptions<SimplifiedStop> = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.1,
    keys: ["stop_name", "routes.route_name"],
    fieldNormWeight: 0.5,
  }

  const fuse = new Fuse(stops, options)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      setResults(stops.slice(0, 10))
      return
    }

    const results = fuse.search(value, { limit: 10 })
    const items = results.map((result) => result.item)
    setResults(items)
  }

  return (
    <div>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Enter stop name"
          value={query}
          onChange={handleSearch}
          className="display-input border-0 border-b border-divider w-full p-3 text-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-text-secondary"
        />
        {query && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
            onClick={() => {
              setQuery("")
              setResults(stops.slice(0, 10))
            }}
          >
            ✕
          </button>
        )}
      </div>
      <div>
        {results.length === 0 ? (
          <div className="py-6 text-center border-b border-divider">
            <p className="text-text-secondary">No matching stops found</p>
          </div>
        ) : (
          results.map((stop) => (
            <SearchResult key={stop.stop_id} entry={stop} />
          ))
        )}
      </div>
    </div>
  )
}
