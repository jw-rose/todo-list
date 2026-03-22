"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateListInput() {
  const [name, setName] = useState("")
  const router = useRouter()

  async function handleSubmit() {
    if (!name.trim()) return

    await fetch("/api/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    setName("")
    router.refresh()
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New list name..."
        className="flex-1 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
      />
      <button
        onClick={handleSubmit}
        className="bg-white text-gray-950 font-medium px-5 py-3 rounded-xl hover:bg-gray-200 transition-colors"
        
      >
        Create
      </button>
    </div>
  )
}