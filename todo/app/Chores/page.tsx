import { db } from "@/lib/db/index"
import { chores } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import ChoreItem from "./ChoreItem"

export default async function Chores() {
  const allChores = await db
    .select()
    .from(chores)
    .orderBy(desc(chores.createdAt))

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-white">Chores</h1>
        <p className="text-gray-400 mb-8">{allChores.length} chore{allChores.length !== 1 ? "s" : ""} total</p>

        <ul className="space-y-3">
          {allChores.map((chore) => (
            <ChoreItem
              key={chore.id}
              id={chore.id}
              title={chore.title}
              done={chore.done}
              listId={chore.listId ?? 0}
            />
          ))}
        </ul>

        {allChores.length === 0 && (
          <p className="text-center text-gray-600 mt-12">No chores yet</p>
        )}
      </div>
    </main>
  )
}