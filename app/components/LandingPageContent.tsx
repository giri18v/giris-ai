'use client'

import Link from "next/link"
import { Github, BarChart, GitPullRequest, GitCompare, Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"
import LoginButton from "./LoginButton"
import { useState } from "react"

export default function LandingPageContent() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <Link className="flex items-center justify-center" href="#">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold">GULLA GIRI&apos;S AI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors duration-200" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors duration-200" href="#pricing">
            Pricing
          </Link>
          {session ? (
            <>
              <Link href="/dashboards" className="text-sm font-medium hover:text-blue-600 transition-colors duration-200">
                Dashboard
              </Link>
              <LoginButton />
            </>
          ) : (
            <>
              <LoginButton />
              <Link href="/signup" className="text-sm font-medium hover:text-blue-600 transition-colors duration-200">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="ml-auto md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-16 md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              className="text-lg font-medium hover:text-blue-600 transition-colors duration-200 p-2" 
              href="#features"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              className="text-lg font-medium hover:text-blue-600 transition-colors duration-200 p-2" 
              href="#pricing"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            {session ? (
              <>
                <Link 
                  href="/dashboards" 
                  className="text-lg font-medium hover:text-blue-600 transition-colors duration-200 p-2"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <div className="p-2">
                  <LoginButton />
                </div>
              </>
            ) : (
              <>
                <div className="p-2">
                  <LoginButton />
                </div>
                <Link 
                  href="/signup"
                  className="text-lg font-medium hover:text-blue-600 transition-colors duration-200 p-2"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      <main className="flex-grow pt-16">
        <section className="text-center py-12 md:py-20 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl mx-auto">
            GULLA GIRI&apos;S AI Github Analyser
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Get powerful insights into your open source repositories with our AI-powered analysis tool.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in-out text-center"
            >
              Get Started
            </Link>
            <Link 
              href="#features" 
              className="w-full sm:w-auto bg-white text-gray-800 border-2 border-gray-200 px-8 py-3 rounded-lg font-medium
                hover:border-blue-600 hover:text-blue-600 transition-all duration-200 shadow-md hover:shadow-lg text-center"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section id="features" className="py-16 md:py-20 bg-gray-100 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <BarChart className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Repository Insights</h3>
                <p className="text-gray-600">Get comprehensive summaries and status updates on your open source repositories.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <GitPullRequest className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">PR Analysis</h3>
                <p className="text-gray-600">Stay informed about the latest and most important pull requests in your projects.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <GitCompare className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Version Tracking</h3>
                <p className="text-gray-600">Keep track of version updates and changes across your repositories effortlessly.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Tier */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-2">Free Tier</h3>
                <p className="text-gray-600 mb-4">For individual developers</p>
                <p className="text-4xl font-bold mb-6">$0/mo</p>
                <ul className="mb-6 text-gray-600 space-y-3">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    5 repositories
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Basic insights
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Daily updates
                  </li>
                </ul>
                <Link 
                  href="/signup" 
                  className="block text-center bg-black text-white px-6 py-3 rounded-lg
                    hover:bg-gray-800 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg transition-shadow duration-300 relative">
                <div className="absolute right-4 top-4">
                  <span className="bg-[#F5B014] text-black px-3 py-1 rounded-md text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
                <div className="opacity-50">
                  <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                  <p className="text-gray-600 mb-4">For growing teams</p>
                  <p className="text-4xl font-bold mb-6">$29/mo</p>
                  <ul className="mb-6 text-gray-600 space-y-3">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Unlimited repositories
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Advanced insights
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Real-time updates
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Priority support
                    </li>
                  </ul>
                  <div 
                    className="block text-center bg-gray-400 text-white px-6 py-3 rounded-lg
                      cursor-not-allowed"
                  >
                    Upgrade to Pro
                  </div>
                </div>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg transition-shadow duration-300 relative">
                <div className="absolute right-4 top-4">
                  <span className="bg-[#F5B014] text-black px-3 py-1 rounded-md text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
                <div className="opacity-50">
                  <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
                  <p className="text-gray-600 mb-4">For large organizations</p>
                  <p className="text-4xl font-bold mb-6">Custom</p>
                  <ul className="mb-6 text-gray-600 space-y-3">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Dedicated support
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      On-premise options
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Advanced security
                    </li>
                  </ul>
                  <div 
                    className="block text-center bg-gray-400 text-white px-6 py-3 rounded-lg
                      cursor-not-allowed"
                  >
                    Contact Sales
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-gray-50 to-gray-100 py-8 text-center text-gray-600 px-4">
        <div className="container mx-auto">
          <p>&copy; 2023 GULLA GIRI&apos;S AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
