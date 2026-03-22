"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateChoreInput({ listId }: { listId: number }) {
  const [title, setTitle] = useState("")
  const router = useRouter()

  async function handleSubmit() {
    if (!title.trim()) return

    await fetch(`/api/lists/${listId}/chores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })

    setTitle("")
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new chore..."
        className="flex-1 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
      />
      <button
        onClick={handleSubmit}
        className="bg-white text-gray-950 font-medium px-5 py-3 rounded-xl hover:bg-gray-200 transition-colors"
      >
        Add
      </button>
    </div>
  )
}