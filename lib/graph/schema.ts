import { makeExecutableSchema } from "@graphql-tools/schema"

import typeDefs from "../../schema.graphql"
import { resolvers } from "./resolvers"

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
