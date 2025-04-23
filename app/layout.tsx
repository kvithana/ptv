import type { Metadata } from "next"
import localFont from "next/font/local"
import { Header } from "@/components/header"

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
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <Header />
        <main className="py-6">
          <div className="container mx-auto max-w-2xl px-2 led-text">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
