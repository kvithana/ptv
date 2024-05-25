import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLClient, Variables } from "graphql-request"
import useSWR, { SWRConfiguration } from "swr"

const GRAPHQL_API_URL = new URL(
  "/api/graphql",
  process.env.VERCEL_URL || "http://localhost:3000"
)

export const client = new GraphQLClient(GRAPHQL_API_URL.href)

export function fetcher<T, U>(
  query: TypedDocumentNode<T, U> | [TypedDocumentNode<T, U>, U | (() => U)],
  variables?: U | (() => U)
) {
  let q: TypedDocumentNode<T, U>
  let v: U | (() => U)
  if (Array.isArray(query)) {
    const [_q, _v] = query
    q = _q
    v = _v instanceof Function ? _v() : _v
  } else {
    q = query
    if (variables) {
      v = variables instanceof Function ? variables() : variables
    } else {
      v = {} as U
    }
  }
  return client.request<T>(q, v as Variables)
}

export function useQuery<T, U>(
  query: TypedDocumentNode<T, U> | [TypedDocumentNode<T, U>, U | (() => U)],
  variables?: U | (() => U),
  config?: SWRConfiguration<T>
) {
  return useSWR<T>([query, variables], fetcher, {
    ...config,
  })
}
