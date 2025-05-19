"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  CheckSquare,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/dashboard/projects", icon: ClipboardList },
    { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  ]

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm z-10">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <Link href="/dashboard" className="text-xl font-bold text-purple-700">
                        ProjectHub
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                          pathname === item.href ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100",
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-4 border-t">
                    <Button variant="ghost" className="w-full justify-start text-red-600" onClick={logout}>
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-purple-700 hidden md:block">ProjectHub</span>
              <span className="text-xl font-bold text-purple-700 md:hidden">PH</span>
            </Link>
          </div>

          {/* User dropdown */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 pt-16">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      pathname === item.href ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:pl-64 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
