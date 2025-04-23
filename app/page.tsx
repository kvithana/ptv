import { SearchStopsLoader } from "@/components/search/search"

export default function Root() {
  return (
    <main>
      <div className="container mx-auto max-w-2xl px-2">
        <h1 className="text-3xl font-bold mt-4 mb-6 text-text-primary">
          Find a stop
        </h1>
        <SearchStopsLoader />
      </div>
    </main>
  )
}
