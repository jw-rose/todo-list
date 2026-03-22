import CreateListInput from "./components/CreateListInput"
import { db } from "@/lib/db/index"
import { listsTable } from "@/lib/db/schema"
import Link from "next/link"

export default async function Home() {
  const lists = await db.select().from(listsTable)

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-white">My Lists</h1>
        <p className="text-gray-400 mb-8">Manage your chores and tasks</p>

        <CreateListInput />

        <ul className="space-y-3 mt-6">
          {lists.map((list) => (
            <li key={list.id}>
              <Link
                href={`/lists/${list.id}`}
                className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 group"
              >
                <span className="text-white font-medium">{list.name}</span>
                <span className="text-gray-500 group-hover:text-white transition-colors">→</span>
              </Link>
            </li>
          ))}
        </ul>

        {lists.length === 0 && (
          <p className="text-center text-gray-600 mt-12">No lists yet — create one above</p>
        )}
      </div>
    </main>
  )
}