import { createContext } from "@/lib/graph/context"
import { server } from "@/lib/graph/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { NextRequest } from "next/server"

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => createContext(req),
})

export { handler as GET, handler as POST }
