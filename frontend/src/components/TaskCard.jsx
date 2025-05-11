"use client"

import { useState } from "react"
import { Edit, Trash2, Calendar, CheckCircle, Circle, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { deleteTask, updateTask } from "../services/api"

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState({ ...task })

  const priorityColors = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  }

  const statusIcons = {
    Pending: <Circle className="h-5 w-5 text-gray-400" />,
    "In Progress": <Clock className="h-5 w-5 text-yellow-500" />,
    Done: <CheckCircle className="h-5 w-5 text-green-500" />,
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateTask(task._id, editedTask)
      onUpdate(editedTask)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(task._id)
      onDelete(task._id)
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus }
      await updateTask(task._id, updatedTask)
      onUpdate(updatedTask)
    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={editedTask.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={editedTask.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={editedTask.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <div className="flex space-x-2">
          <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-gray-700">
            <Edit className="h-5 w-5" />
          </button>
          <button onClick={handleDelete} className="text-gray-500 hover:text-red-600">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {task.description && <p className="text-gray-600 mb-3">{task.description}</p>}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>

        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
          {statusIcons[task.status]}
          <span>{task.status}</span>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
            <Calendar className="h-3 w-3" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">
          Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </span>

        <div className="flex space-x-2">
          {task.status !== "Pending" && (
            <button
              onClick={() => handleStatusChange("Pending")}
              className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
            >
              Set Pending
            </button>
          )}

          {task.status !== "In Progress" && (
            <button
              onClick={() => handleStatusChange("In Progress")}
              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
            >
              Start
            </button>
          )}

          {task.status !== "Done" && (
            <button
              onClick={() => handleStatusChange("Done")}
              className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
