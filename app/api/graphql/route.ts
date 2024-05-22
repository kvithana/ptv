import { resolvers } from "@/lib/graph/resolvers"
import { createContext } from "@/lib/graph/resolvers/context"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { readFileSync } from "fs"
import { NextRequest } from "next/server"

const typeDefs = readFileSync("schema.graphql", {
  encoding: "utf-8",
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => createContext(req),
})

export { handler as GET, handler as POST }
