import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLError, graphql, print } from "graphql"
import { client } from "../graph/client"
import { createContext } from "../graph/context"
import { schema } from "../graph/schema"

export async function useServerQuery<T, U>(
  query: TypedDocumentNode<T, U>,
  variables?: U | (() => U)
) {
  const v = variables instanceof Function ? variables() : variables

  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_DEPLOYMENT_BASEPATH
  ) {
    // developers can hit the production backend from their local development
    try {
      const data = await client.request<T>(query, v as any)

      return {
        data: data as T,
        error: null,
      }
    } catch (err) {
      const reqRes = JSON.parse(JSON.stringify(err))

      return {
        data: null,
        error: reqRes.response.errors as GraphQLError[],
      }
    }
  }

  const response = await graphql({
    schema,
    source: print(query),
    variableValues: v ?? null,
    contextValue: createContext(),
  })

  return {
    data: response.data as T | null,
    error: response.errors,
  }
}
