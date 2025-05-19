"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, Plus } from "lucide-react"

export function TasksOverview({ fullWidth = false }) {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const response = await api.get("/tasks/recent")
        // setTasks(response.data)

        // For demo purposes, we'll use mock data
        setTasks([
          {
            _id: "t1",
            title: "Design homepage mockup",
            description: "Create wireframes and mockups for the new homepage",
            status: "in-progress",
            priority: "high",
            dueDate: "2023-06-15",
            project: {
              _id: "1",
              title: "Website Redesign",
            },
            assignee: {
              _id: "u2",
              name: "Jane Smith",
            },
          },
          {
            _id: "t2",
            title: "Implement user authentication",
            description: "Set up JWT authentication for the mobile app",
            status: "todo",
            priority: "medium",
            dueDate: "2023-06-20",
            project: {
              _id: "2",
              title: "Mobile App Development",
            },
            assignee: {
              _id: "u1",
              name: "John Doe",
            },
          },
          {
            _id: "t3",
            title: "Create social media content",
            description: "Prepare content for Twitter and Instagram",
            status: "todo",
            priority: "low",
            dueDate: "2023-06-18",
            project: {
              _id: "3",
              title: "Marketing Campaign",
            },
            assignee: {
              _id: "u5",
              name: "Charlie Wilson",
            },
          },
          {
            _id: "t4",
            title: "Database schema design",
            description: "Design the new database schema for migration",
            status: "done",
            priority: "high",
            dueDate: "2023-06-10",
            project: {
              _id: "4",
              title: "Database Migration",
            },
            assignee: {
              _id: "u3",
              name: "Bob Johnson",
            },
          },
        ])
      } catch (error) {
        console.error("Failed to fetch tasks", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              status: task.status === "done" ? "todo" : "done",
            }
          : task,
      ),
    )
  }

  return (
    <Card className={fullWidth ? "col-span-2" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading tasks..."
              : `You have ${tasks.filter((t) => t.status !== "done").length} tasks to complete`}
          </CardDescription>
        </div>
        <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/tasks/new">
            <Plus className="h-4 w-4 mr-1" />
            New Task
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">Loading tasks...</div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                <Checkbox
                  id={`task-${task._id}`}
                  checked={task.status === "done"}
                  onCheckedChange={() => toggleTaskStatus(task._id)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`task-${task._id}`}
                      className={`font-medium ${task.status === "done" ? "line-through text-gray-500" : ""}`}
                    >
                      {task.title}
                    </label>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={task.assignee.avatar || `/placeholder.svg?height=24&width=24`}
                          alt={task.assignee.name}
                        />
                        <AvatarFallback>
                          {task.assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">
                        {task.project.title} • Due {formatDate(task.dueDate)}
                      </span>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="h-6 px-2">
                      <Link href={`/dashboard/tasks/${task._id}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No tasks found</p>
                <Button asChild className="mt-2 bg-purple-600 hover:bg-purple-700">
                  <Link href="/dashboard/tasks/new">Create your first task</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
