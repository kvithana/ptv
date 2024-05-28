import { NextRequest, NextResponse } from "next/server"

const allowedOrigins = ["http://localhost:3000", "https://ptv.kal.im"]

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export default function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") ?? ""
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflighted requests
  const isPreflight = req.method === "OPTIONS"

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  const response = NextResponse.next()

  console.log("origin", origin)

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: "/api/:path*",
}
