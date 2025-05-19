"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function InviteTeamMemberPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [invites, setInvites] = useState([{ email: "", role: "member" }])

  const handleAddInvite = () => {
    setInvites([...invites, { email: "", role: "member" }])
  }

  const handleRemoveInvite = (index) => {
    if (invites.length > 1) {
      setInvites(invites.filter((_, i) => i !== index))
    }
  }

  const handleInviteChange = (index, field, value) => {
    const updatedInvites = [...invites]
    updatedInvites[index] = { ...updatedInvites[index], [field]: value }
    setInvites(updatedInvites)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate emails
    const invalidEmails = invites.filter((invite) => !invite.email || !/\S+@\S+\.\S+/.test(invite.email))
    if (invalidEmails.length > 0) {
      toast({
        title: "Invalid email addresses",
        description: "Please enter valid email addresses for all invites.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your API
      // await api.post("/users/invite", { invites })

      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Invitations sent",
        description: `Successfully sent ${invites.length} invitation${invites.length > 1 ? "s" : ""}.`,
      })

      router.push("/dashboard/team")
    } catch (error) {
      console.error("Failed to send invitations", error)
      toast({
        title: "Error",
        description: "Failed to send invitations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Invite Team Members</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Team Invitations</CardTitle>
            <CardDescription>
              Invite new members to join your team. They will receive an email with instructions to set up their
              account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {invites.map((invite, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor={`email-${index}`}>Email Address</Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="colleague@example.com"
                    value={invite.email}
                    onChange={(e) => handleInviteChange(index, "email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 w-[180px]">
                  <Label htmlFor={`role-${index}`}>Role</Label>
                  <Select value={invite.role} onValueChange={(value) => handleInviteChange(index, "role", value)}>
                    <SelectTrigger id={`role-${index}`}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveInvite(index)}
                  disabled={invites.length === 1}
                  className="mb-0.5"
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={handleAddInvite} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Invitation
            </Button>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invitations"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
