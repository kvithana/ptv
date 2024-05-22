import { SearchStopsLoader } from "@/components/search/search"

export default function Root() {
  return (
    <main>
      <div className="container mx-auto max-w-lg px-2">
        <h1 className="bold text-4xl mt-12 mb-2">Search for a stop</h1>
        <SearchStopsLoader />
      </div>
    </main>
  )
}
