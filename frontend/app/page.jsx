import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, CheckSquare, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Manage Your Projects Efficiently
              </h1>
              <p className="mt-3 text-lg sm:text-xl md:text-2xl">
                A comprehensive platform for project management, task tracking, and team collaboration.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Project Management Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Management</h3>
              <p className="text-gray-600">
                Create, track, and manage projects with ease. Set deadlines, milestones, and monitor progress.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>
              <p className="text-gray-600">
                Assign tasks, set priorities, and track completion status. Never miss a deadline again.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Collaborate with team members through comments, chat, and real-time notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your team's productivity?</h2>
          <p className="text-xl mb-8">Join thousands of teams who have transformed their workflow with our platform.</p>
          <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
            <Link href="/register">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">ProjectHub</h2>
              <p className="text-gray-400">Simplify your project management</p>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="hover:text-purple-300">
                About
              </Link>
              <Link href="/features" className="hover:text-purple-300">
                Features
              </Link>
              <Link href="/pricing" className="hover:text-purple-300">
                Pricing
              </Link>
              <Link href="/contact" className="hover:text-purple-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
