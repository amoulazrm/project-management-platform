"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { BarChart3, CheckCircle2, Clock, Users } from "lucide-react"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { TasksOverview } from "@/components/dashboard/tasks-overview"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    teamMembers: 0,
    upcomingDeadlines: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const response = await api.get("/dashboard/stats")
        // setStats(response.data)

        // For demo purposes, we'll use mock data
        setStats({
          totalProjects: 12,
          completedProjects: 5,
          totalTasks: 48,
          completedTasks: 32,
          teamMembers: 8,
          upcomingDeadlines: 3,
        })
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const projectCompletionRate =
    stats.totalProjects > 0 ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0

  const taskCompletionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">{projectCompletionRate}% complete</p>
            <Progress value={projectCompletionRate} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.completedTasks}/{stats.totalTasks}
            </div>
            <p className="text-xs text-muted-foreground">{taskCompletionRate}% complete</p>
            <Progress value={taskCompletionRate} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingDeadlines}</div>
            <p className="text-xs text-muted-foreground">In the next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <RecentProjects />
            <TasksOverview />
          </div>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <RecentProjects fullWidth />
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <TasksOverview fullWidth />
        </TabsContent>
      </Tabs>
    </div>
  )
}
