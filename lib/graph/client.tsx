import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLClient, Variables } from "graphql-request"

const GRAPHQL_API_URL = new URL(
  "/api/graphql",
  process.env.VERCEL_URL || "http://localhost:3000"
)

export const client = new GraphQLClient(GRAPHQL_API_URL.href)

export function fetcher<T, U>(
  query: TypedDocumentNode<T, U>,
  variables: U | (() => U)
) {
  let q: TypedDocumentNode<T, U>
  let v: U | (() => U)
  if (Array.isArray(query)) {
    const [_q, _v] = query
    q = _q
    v = _v instanceof Function ? _v() : _v
  } else {
    q = query
    v = variables instanceof Function ? variables() : variables
  }
  return client.request<T>(q, v as Variables)
}
