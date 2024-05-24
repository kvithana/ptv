import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLClient, Variables } from "graphql-request"

export const client = new GraphQLClient("/api/graphql")

export function fetcher<T, U>(
  query: TypedDocumentNode<T, U>,
  variables: U | (() => U)
) {
  const _variables = variables instanceof Function ? variables() : variables

  return client.request<T>(query, _variables as Variables)
}
