import { makeExecutableSchema } from "@graphql-tools/schema"

import { readFileSync } from "fs"
import { resolvers } from "./resolvers"

const typeDefs = readFileSync("schema.graphql", {
  encoding: "utf-8",
})

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
