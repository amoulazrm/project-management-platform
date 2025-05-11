"use client"

import { useState } from "react"
import { Folder, MoreVertical, Edit, Trash2 } from "lucide-react"

const ProjectCard = ({ project, onSelect, isActive, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)

  const handleMenuToggle = (e) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    setShowMenu(false)
    onEdit(project)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    setShowMenu(false)
    onDelete(project._id)
  }

  return (
    <div
      className={`relative p-4 rounded-lg cursor-pointer transition-all ${
        isActive ? "bg-emerald-50 border border-emerald-200" : "bg-white border border-gray-200 hover:bg-gray-50"
      }`}
      onClick={() => onSelect(project)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-md ${isActive ? "bg-emerald-100" : "bg-gray-100"}`}>
            <Folder className={`h-5 w-5 ${isActive ? "text-emerald-600" : "text-gray-500"}`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{project.name}</h3>
            {project.taskCount !== undefined && <p className="text-sm text-gray-500">{project.taskCount} tasks</p>}
          </div>
        </div>

        <div className="relative">
          <button onClick={handleMenuToggle} className="p-1 rounded-full hover:bg-gray-200">
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <button
                onClick={handleEdit}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
