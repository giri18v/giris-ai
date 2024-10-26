'use client'

import Link from "next/link"
import { Github } from "lucide-react"
import { Session } from "next-auth"
import LoginButton from "./LoginButton"

interface LandingPageContentProps {
  session: Session | null
}

export default function LandingPageContent({ session }: LandingPageContentProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold">GULLA GIRI'S AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          {session ? (
            <>
              <Link href="/dashboards" className="text-sm font-medium hover:underline underline-offset-4">
                Dashboard
              </Link>
              <LoginButton />
            </>
          ) : (
            <>
              <LoginButton />
              <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
      {/* Rest of your component content */}
    </div>
  )
}
