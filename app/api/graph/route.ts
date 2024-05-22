import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  // return hello world
  return new NextResponse("Hello World", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
