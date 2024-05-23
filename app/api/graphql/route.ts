import { createContext } from "@/lib/graph/resolvers/context"
import { schema } from "@/lib/graph/schema"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { NextRequest } from "next/server"

const server = new ApolloServer({
  schema,
  introspection: true,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => createContext(req),
})

export { handler as GET, handler as POST }
