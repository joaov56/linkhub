import Link from "next/link"

export function Header() {
  return (
    <header className="w-full">
      <div className="flex h-14 items-center justify-between px-8">
        <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
                <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-xl font-bold">LinkHub</span>
            </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link href="/analytics" className="text-sm font-medium transition-colors hover:text-primary">
              Analytics
            </Link>
            <Link href="/links" className="text-sm font-medium transition-colors hover:text-primary ml-6">
              Links
            </Link>
            <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary ml-6">
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}