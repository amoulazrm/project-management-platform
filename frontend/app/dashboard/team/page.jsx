"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Plus, Search, User } from "lucide-react"

export default function TeamPage() {
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const response = await api.get("/users")
        // setMembers(response.data)

        // For demo purposes, we'll use mock data
        const mockMembers = [
          {
            _id: "u1",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            role: "Project Manager",
            projects: 3,
            tasks: 8,
          },
          {
            _id: "u2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "+1 (555) 987-6543",
            role: "UI/UX Designer",
            projects: 2,
            tasks: 12,
          },
          {
            _id: "u3",
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            phone: "+1 (555) 456-7890",
            role: "Backend Developer",
            projects: 2,
            tasks: 10,
          },
          {
            _id: "u4",
            name: "Alice Brown",
            email: "alice.brown@example.com",
            phone: "+1 (555) 234-5678",
            role: "Frontend Developer",
            projects: 2,
            tasks: 7,
          },
          {
            _id: "u5",
            name: "Charlie Wilson",
            email: "charlie.wilson@example.com",
            phone: "+1 (555) 876-5432",
            role: "Marketing Specialist",
            projects: 1,
            tasks: 5,
          },
          {
            _id: "u6",
            name: "Diana Miller",
            email: "diana.miller@example.com",
            phone: "+1 (555) 345-6789",
            role: "Content Writer",
            projects: 1,
            tasks: 4,
          },
          {
            _id: "u7",
            name: "Edward Davis",
            email: "edward.davis@example.com",
            phone: "+1 (555) 654-3210",
            role: "QA Engineer",
            projects: 2,
            tasks: 9,
          },
          {
            _id: "u8",
            name: "Fiona Clark",
            email: "fiona.clark@example.com",
            phone: "+1 (555) 789-0123",
            role: "DevOps Engineer",
            projects: 1,
            tasks: 6,
          },
        ]

        setMembers(mockMembers)
        setFilteredMembers(mockMembers)
      } catch (error) {
        console.error("Failed to fetch team members", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  useEffect(() => {
    // Filter members based on search query
    if (searchQuery) {
      const filtered = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredMembers(filtered)
    } else {
      setFilteredMembers(members)
    }
  }, [searchQuery, members])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/team/invite">
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search team members..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Team Members Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">Loading team members...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map((member) => (
            <Card key={member._id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={member.avatar || `/placeholder.svg?height=80&width=80`} alt={member.name} />
                    <AvatarFallback className="text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <Badge className="mt-1">{member.role}</Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <a href={`mailto:${member.email}`} className="text-purple-600 hover:underline">
                      {member.email}
                    </a>
                  </div>

                  {member.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`tel:${member.phone}`} className="text-purple-600 hover:underline">
                        {member.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <div>
                    <span className="font-medium text-gray-900">{member.projects}</span> Projects
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{member.tasks}</span> Tasks
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href={`/dashboard/team/${member._id}`}>
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}

          {filteredMembers.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No team members found</p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/dashboard/team/invite">Invite team members</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
