import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-divider py-4 mb-6">
      <div className="container mx-auto max-w-2xl px-2 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          PTV
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-text-secondary hover:text-text-primary"
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
