import { PTVClient, getPTVClient } from "@/lib/ptv"
import { NextRequest } from "next/server"

export type Context = {
  client: PTVClient
}

export function createContext(req: NextRequest): Context {
  return {
    client: getPTVClient(),
  }
}
