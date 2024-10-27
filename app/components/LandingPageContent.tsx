'use client'

import Link from "next/link"
import { Github, BarChart, GitPullRequest, GitCompare } from "lucide-react"
import { useSession } from "next-auth/react"
import LoginButton from "./LoginButton"

export default function LandingPageContent() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold">GULLA GIRI&apos;S AI</span>
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

      <main className="flex-grow">
        <section className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">GULLA GIRI&apos;S AI Github Analyser</h1>
          <p className="text-xl mb-8">
            Get powerful insights into your open source repositories with our AI-powered analysis tool.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="bg-black text-white px-6 py-2 rounded">
              Get Started
            </Link>
            <Link href="#features" className="bg-white text-black border border-black px-6 py-2 rounded">
              Learn More
            </Link>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <BarChart className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Repository Insights</h3>
                <p>Get comprehensive summaries and status updates on your open source repositories.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <GitPullRequest className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">PR Analysis</h3>
                <p>Stay informed about the latest and most important pull requests in your projects.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <GitCompare className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Version Tracking</h3>
                <p>Keep track of version updates and changes across your repositories effortlessly.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-2xl font-semibold mb-2">Free Tier</h3>
                <p className="text-gray-600 mb-4">For individual developers</p>
                <p className="text-4xl font-bold mb-6">$0/mo</p>
                <ul className="mb-6">
                  <li className="mb-2">5 repositories</li>
                  <li className="mb-2">Basic insights</li>
                  <li className="mb-2">Daily updates</li>
                </ul>
                <Link href="/signup" className="block text-center bg-black text-white px-6 py-2 rounded">
                  Get Started
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                <p className="text-gray-600 mb-4">For growing teams</p>
                <p className="text-4xl font-bold mb-6">$29/mo</p>
                <ul className="mb-6">
                  <li className="mb-2">Unlimited repositories</li>
                  <li className="mb-2">Advanced insights</li>
                  <li className="mb-2">Real-time updates</li>
                  <li className="mb-2">Priority support</li>
                </ul>
                <Link href="/signup" className="block text-center bg-black text-white px-6 py-2 rounded">
                  Upgrade to Pro
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">For large organizations</p>
                <p className="text-4xl font-bold mb-6">Custom</p>
                <ul className="mb-6">
                  <li className="mb-2">Custom integrations</li>
                  <li className="mb-2">Dedicated support</li>
                  <li className="mb-2">On-premise options</li>
                  <li className="mb-2">Advanced security features</li>
                </ul>
                <Link href="/contact" className="block text-center bg-black text-white px-6 py-2 rounded">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6 text-center">
        <p>&copy; 2023 GULLA GIRI&apos;S AI. All rights reserved.</p>
      </footer>
    </div>
  )
}
