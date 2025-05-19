"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Plus } from "lucide-react"

export function RecentProjects({ fullWidth = false }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const response = await api.get("/projects/recent")
        // setProjects(response.data)

        // For demo purposes, we'll use mock data
        setProjects([
          {
            _id: "1",
            title: "Website Redesign",
            description: "Redesign the company website with modern UI/UX",
            status: "active",
            progress: 75,
            members: [
              { _id: "u1", name: "John Doe" },
              { _id: "u2", name: "Jane Smith" },
              { _id: "u3", name: "Bob Johnson" },
            ],
          },
          {
            _id: "2",
            title: "Mobile App Development",
            description: "Develop a new mobile app for iOS and Android",
            status: "active",
            progress: 40,
            members: [
              { _id: "u1", name: "John Doe" },
              { _id: "u4", name: "Alice Brown" },
            ],
          },
          {
            _id: "3",
            title: "Marketing Campaign",
            description: "Q2 marketing campaign for new product launch",
            status: "on-hold",
            progress: 20,
            members: [
              { _id: "u2", name: "Jane Smith" },
              { _id: "u5", name: "Charlie Wilson" },
            ],
          },
          {
            _id: "4",
            title: "Database Migration",
            description: "Migrate from MongoDB to PostgreSQL",
            status: "completed",
            progress: 100,
            members: [
              { _id: "u3", name: "Bob Johnson" },
              { _id: "u1", name: "John Doe" },
            ],
          },
        ])
      } catch (error) {
        console.error("Failed to fetch projects", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className={fullWidth ? "col-span-2" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>
            {isLoading ? "Loading projects..." : `You have ${projects.length} active projects`}
          </CardDescription>
        </div>
        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/projects/new">
            <Plus className="h-4 w-4 mr-1" />
            New Project
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">Loading projects...</div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-500">{project.description}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member, index) => (
                      <Avatar key={member._id} className="border-2 border-white h-8 w-8">
                        <AvatarImage src={member.avatar || `/placeholder.svg?height=32&width=32`} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <Avatar className="border-2 border-white h-8 w-8">
                        <AvatarFallback>+{project.members.length - 3}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/dashboard/projects/${project._id}`}>
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No projects found</p>
                <Button asChild className="mt-2 bg-purple-600 hover:bg-purple-700">
                  <Link href="/dashboard/projects/new">Create your first project</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
