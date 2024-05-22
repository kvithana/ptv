import * as crypto from "crypto"
import { Api } from "./client"

export enum RouteType {
  Train = 0,
  Tram = 1,
  Bus = 2,
  VLine = 3,
  NightBus = 4,
}

export type PTVClient = ReturnType<typeof getPTVClient>

export function getPTVClient() {
  const devid = process.env.PTV_DEVELOPER_ID!
  const apiKey = process.env.PTV_API_KEY!

  if (!devid || !apiKey) {
    throw new Error("PTV_USER_ID and PTV_API_KEY must be set")
  }

  return new Api({
    customFetch: (input, init) => {
      if (typeof input !== "string") {
        throw new Error("Only string URLs are supported")
      }
      // add devid and signature as query params to each request
      const url = new URL(input)
      url.searchParams.append("devid", devid)

      const signature = crypto
        .createHmac("sha1", apiKey)
        .update(url.href.replace(url.origin, ""))
        .digest("hex")

      url.searchParams.append("signature", signature)

      return fetch(url.toString(), init)
    },
  })
}
