"use client"
import { useState } from "react"
import { toggleChore, deleteChore, updateChoreTitle } from "./actions"

type Props = {
  id: number
  title: string
  done: boolean
  listId: number
}

export default function ChoreItem({ id, title, done, listId }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(title)

  async function handleSave() {
    if (!editValue.trim()) return
    await updateChoreTitle(id, editValue.trim(), listId)
    setIsEditing(false)
  }

  return (
    <li className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 group">
      <input
        className="w-5 h-5 accent-white cursor-pointer shrink-0"
        type="checkbox"
        defaultChecked={done}
        onChange={(e) => toggleChore(id, e.target.checked, listId)}
      />

      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-1 focus:outline-none focus:border-gray-400"
          autoFocus
        />
      ) : (
        <span className={`flex-1 ${done ? "line-through text-gray-600" : "text-white"}`}>
          {title}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-xs text-green-400 hover:text-green-300 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => deleteChore(id, listId)}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}