"use client"

import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "../graph/client"

export function useQuery<T, U>(
  query: TypedDocumentNode<T, U> | [TypedDocumentNode<T, U>, U | (() => U)],
  variables?: U | (() => U),
  config?: SWRConfiguration<T>
) {
  return useSWR<T>([query, variables], fetcher, {
    ...config,
  })
}
