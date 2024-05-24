import { gql } from "graphql-request"

export default async function Home() {
  return (
    <div>
      <h1>Stop</h1>
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
