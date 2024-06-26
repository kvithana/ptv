import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"

const networkSans = localFont({
  src: [
    {
      path: "./fonts/NETWORKSANS-2019-BOLD.ttf",
      weight: "bold",
      style: "normal",
    },
    {
      path: "./fonts/NETWORKSANS-2019-REGULAR.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./fonts/NETWORKSANS-2019-REGULARITALIC.ttf",
      weight: "normal",
      style: "italic",
    },
    {
      path: "./fonts/NETWORKSANS-2019-LIGHT.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/NETWORKSANS-2019-MEDIUM.ttf",
      weight: "500",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "PTV",
  description: "A simple app to enhance your public transport experience.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={networkSans.className}>
      <body>
        <main>
          <div className="container mx-auto max-w-lg px-2">{children}</div>
        </main>
      </body>
    </html>
  )
}
