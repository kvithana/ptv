import { PTVClient, getPTVClient } from "@/lib/ptv"
import { NextRequest } from "next/server"
import { Loaders, createLoaders } from "./loaders"

export type Context = {
  client: PTVClient
  loaders: Loaders
}

export function createContext(req?: NextRequest): Context {
  return {
    client: getPTVClient(),
    loaders: createLoaders(),
  }
}
