import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-purple-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6">
        <div className="flex items-center space-x-8">
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
            <span className="text-xl font-bold text-white">LinkHub</span>
          </Link>
          <nav className="hidden space-x-8 text-sm font-medium text-gray-200 md:flex">
            <Link href="/templates" className="hover:text-white">
              Templates
            </Link>
            <Link href="/marketplace" className="hover:text-white">
              Marketplace
            </Link>
            <Link href="/discover" className="hover:text-white">
              Discover
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/learn" className="hover:text-white">
              Learn
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium text-gray-200 hover:text-white">
            Log in
          </Link>
          <Button asChild className="bg-white text-purple-900 hover:bg-gray-100">
            <Link href="/register">Sign up free</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-lime-300 md:text-6xl lg:text-7xl">
              Everything you are. In one, simple link in bio.
            </h1>
            <p className="mb-8 text-lg text-gray-200 md:text-xl">
              Join 50M+ people using LinkHub for their link in bio. One link to help you share everything you create,
              curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </p>
            <div className="flex max-w-md flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="linkhub/yourname"
                  className="h-12 w-full bg-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                Claim your LinkHub
              </Button>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[600px] w-[300px] rounded-[3rem] bg-gradient-to-br from-purple-400 to-blue-400 p-6">
                <div className="flex h-full flex-col items-center rounded-[2.5rem] bg-white/10 p-8 backdrop-blur-sm">
                  <div className="h-24 w-24 rounded-full bg-white/20" />
                  <h3 className="mt-4 text-xl font-semibold text-white">@username</h3>
                  <p className="text-sm text-white/80">Digital Creator</p>
                  <div className="mt-8 flex w-full flex-col space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-12 w-full rounded-full bg-white/20" />
                    ))}
                  </div>
                  <div className="mt-auto flex space-x-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-10 w-10 rounded-full bg-white/20" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-12 right-1/4 h-24 w-24 rounded-full bg-purple-500/20 blur-xl" />
        <div className="absolute bottom-12 right-1/3 h-32 w-32 rounded-full bg-blue-500/20 blur-xl" />
        <div className="absolute -bottom-8 right-1/2 h-40 w-40 rounded-full bg-purple-600/20 blur-xl" />
      </div>
    </div>
  )
}

