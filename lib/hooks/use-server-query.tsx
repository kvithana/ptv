import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { graphql, print } from "graphql"
import { createContext } from "../graph/context"
import { schema } from "../graph/schema"

export async function useServerQuery<T, U>(
  query: TypedDocumentNode<T, U>,
  variables?: U | (() => U)
) {
  const v = variables instanceof Function ? variables() : variables

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
