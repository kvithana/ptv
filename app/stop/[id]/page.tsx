import { gql } from "@apollo/client"

export default function Home() {
  return (
    <div>
      <h1>Stop</h1>
    </div>
  )
}

gql`
  query Something($id: ID!) {
    stop(id: $id) {
      id
    }
  }
`
