import { RouteType } from "@/app/__generated__/types"
import { RoutesLoader } from "@/components/departures/routes-loader"
import { fetcher } from "@/lib/graph/client"
import { gql } from "graphql-request"
import { ServerStopQueryDocument } from "./__generated__/page.generated"

export default async function Home({
  params,
}: {
  params: {
    routeType: string
    slug: string
  }
}) {
  const [id] = params.slug.split("-")
  const data = await fetcher(ServerStopQueryDocument, {
    id: id,
    routeType: params.routeType as RouteType,
  })

  const stop = data.stop

  return (
    <div className="mt-12">
      <h1 className="bold text-4xl mb-2">{stop.stop_name}</h1>
      <RoutesLoader id={id} routeType={params.routeType} />
    </div>
  )
}

gql`
  query ServerStopQuery($id: ID!, $routeType: RouteType!) {
    stop(id: $id, routeType: $routeType) {
      id
      stop_name
      stop_suburb
    }
  }
`
