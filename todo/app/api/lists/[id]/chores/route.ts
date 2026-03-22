import { NextResponse } from "next/server"
import { db } from "@/lib/db/index"
import { chores } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const listId = Number(id)

  const allChores = await db
    .select()
    .from(chores)
    .where(eq(chores.listId, listId))

  return NextResponse.json(allChores)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const listId = Number(id)
  const { title } = await request.json()

  if (!title || typeof title !== "string" || title.trim() === "") {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    )
  }

  const [newChore] = await db
    .insert(chores)
    .values({ listId, title: title.trim(), done: false })
    .returning()

  return NextResponse.json(newChore, { status: 201 })
}