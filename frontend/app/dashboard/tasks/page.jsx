"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Filter, Plus, Search } from "lucide-react"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const response = await api.get("/tasks")
        // setTasks(response.data)

        // For demo purposes, we'll use mock data
        const mockTasks = [
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
          {
            _id: "t5",
            title: "API documentation",
            description: "Document all API endpoints for the mobile app",
            status: "in-progress",
            priority: "medium",
            dueDate: "2023-06-25",
            project: {
              _id: "2",
              title: "Mobile App Development",
            },
            assignee: {
              _id: "u4",
              name: "Alice Brown",
            },
          },
          {
            _id: "t6",
            title: "Fix responsive layout issues",
            description: "Address layout problems on mobile devices",
            status: "todo",
            priority: "high",
            dueDate: "2023-06-12",
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
            _id: "t7",
            title: "Set up analytics",
            description: "Implement Google Analytics tracking",
            status: "done",
            priority: "low",
            dueDate: "2023-06-05",
            project: {
              _id: "1",
              title: "Website Redesign",
            },
            assignee: {
              _id: "u1",
              name: "John Doe",
            },
          },
          {
            _id: "t8",
            title: "Create email templates",
            description: "Design email templates for the marketing campaign",
            status: "in-progress",
            priority: "medium",
            dueDate: "2023-06-22",
            project: {
              _id: "3",
              title: "Marketing Campaign",
            },
            assignee: {
              _id: "u5",
              name: "Charlie Wilson",
            },
          },
        ]

        setTasks(mockTasks)
        setFilteredTasks(mockTasks)
      } catch (error) {
        console.error("Failed to fetch tasks", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  useEffect(() => {
    // Filter tasks based on search query, status filter, and priority filter
    let filtered = [...tasks]

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.project.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter)
    }

    setFilteredTasks(filtered)
  }, [searchQuery, statusFilter, priorityFilter, tasks])

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

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "done":
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/tasks/new">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks List */}
      {isLoading ? (
        <div className="flex justify-center py-12">Loading tasks...</div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task._id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={`task-${task._id}`}
                      checked={task.status === "done"}
                      onCheckedChange={() => toggleTaskStatus(task._id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <label
                            htmlFor={`task-${task._id}`}
                            className={`font-medium ${task.status === "done" ? "line-through text-gray-500" : ""}`}
                          >
                            {task.title}
                          </label>
                          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status === "todo" ? "To Do" : task.status === "in-progress" ? "In Progress" : "Done"}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
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
                            <span className="text-sm">{task.assignee.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{task.project.title}</span>
                        </div>

                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-sm">Due {formatDate(task.dueDate)}</span>
                          <Button asChild variant="ghost" size="sm" className="ml-4">
                            <Link href={`/dashboard/tasks/${task._id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No tasks found</p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/dashboard/tasks/new">Create your first task</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
