"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Filter, Plus, Search, Users } from "lucide-react"
import { api } from "@/lib/api"
import { useAuth } from "@/components/auth-provider"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { user } = useAuth()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    // Get userId from localStorage if not available in user object
    const storedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const currentUserId = user?._id || userId
        if (!currentUserId) {
          throw new Error("User ID not found. Please log in again.")
        }

        const response = await api.get("/projects", {
          headers: {
            'X-User-ID': currentUserId
          }
        })
        setProjects(response.data.data || [])
        setFilteredProjects(response.data.data || [])
      } catch (error) {
        console.error("Failed to fetch projects", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user?._id || userId) {
      fetchProjects()
    }
  }, [user, userId])

  useEffect(() => {
    // Filter projects based on search query and status filter
    let filtered = [...projects]

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }, [searchQuery, statusFilter, projects])

  const getStatusColor = (status) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-purple-100 text-purple-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">Loading projects...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project._id} href={`/dashboard/projects/${project._id}`}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(project.startDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{project.endDate ? formatDate(project.endDate) : 'No end date'}</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <div className="flex -space-x-2">
                          {(project.members || []).slice(0, 3).map((member) => (
                            <Avatar key={member._id} className="border-2 border-white h-6 w-6">
                              <AvatarImage
                                src={member.avatar || `/placeholder.svg?height=24&width=24`}
                                alt={member.email}
                              />
                              <AvatarFallback>
                                {member.email
                                  .split("@")[0]
                                  .split(".")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.members && project.members.length > 3 && (
                            <Avatar className="border-2 border-white h-6 w-6">
                              <AvatarFallback>+{project.members.length - 3}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No projects found</p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/dashboard/projects/new">Create your first project</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
