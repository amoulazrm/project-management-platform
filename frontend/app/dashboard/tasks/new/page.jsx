"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function NewTaskPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    projectId: "",
    assigneeId: "",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  })

  useEffect(() => {
    // Fetch projects and users for dropdowns
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const projectsResponse = await api.get("/projects")
        // const usersResponse = await api.get("/users")
        // setProjects(projectsResponse.data)
        // setUsers(usersResponse.data)

        // For demo purposes, we'll use mock data
        setProjects([
          { _id: "1", title: "Website Redesign" },
          { _id: "2", title: "Mobile App Development" },
          { _id: "3", title: "Marketing Campaign" },
          { _id: "4", title: "Database Migration" },
          { _id: "5", title: "CRM Integration" },
        ])

        setUsers([
          { _id: "u1", name: "John Doe" },
          { _id: "u2", name: "Jane Smith" },
          { _id: "u3", name: "Bob Johnson" },
          { _id: "u4", name: "Alice Brown" },
          { _id: "u5", name: "Charlie Wilson" },
        ])
      } catch (error) {
        console.error("Failed to fetch data", error)
        toast({
          title: "Error",
          description: "Failed to load projects and users. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchData()
  }, [toast])

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.projectId || !formData.assigneeId) {
      toast({
        title: "Validation Error",
        description: "Please select a project and assignee.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your API
      // await api.post("/tasks", formData)

      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Task created",
        description: "Your new task has been created successfully.",
      })

      router.push("/dashboard/tasks")
    } catch (error) {
      console.error("Failed to create task", error)
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Create New Task</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>Fill in the information below to create a new task.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={formData.projectId} onValueChange={(value) => handleChange("projectId", value)}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project._id} value={project._id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Select value={formData.assigneeId} onValueChange={(value) => handleChange("assigneeId", value)}>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => handleChange("dueDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
