import { db } from "@/lib/db/index"
import { chores, listsTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import CreateChoreInput from "@/app/components/CreateChoreInput"
import ChoreItem from "@/app/Chores/ChoreItem"
import Link from "next/link"

export default async function ListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listId = Number(id)

  const list = await db
    .select()
    .from(listsTable)
    .where(eq(listsTable.id, listId))
    .then((rows) => rows[0])

  const allChores = await db
    .select()
    .from(chores)
    .where(eq(chores.listId, listId))

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm mb-6 block">
          ← Back to lists
        </Link>
        <h1 className="text-4xl font-bold mb-2 text-white">{list?.name}</h1>
        <p className="text-gray-400 mb-8">{allChores.length} chore{allChores.length !== 1 ? "s" : ""}</p>

        <ul className="space-y-3 mb-6">
          {allChores.map((chore) => (
            <ChoreItem
              key={chore.id}
              id={chore.id}
              title={chore.title}
              done={chore.done}
              listId={listId}
            />
          ))}
        </ul>

        {allChores.length === 0 && (
          <p className="text-center text-gray-600 mt-12 mb-6">No chores yet — add one below</p>
        )}

        <CreateChoreInput listId={listId} />
      </div>
    </main>
  )
}