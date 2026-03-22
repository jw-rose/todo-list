import { NextResponse } from "next/server"
import { db } from "@/lib/db/index"
import { chores } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { done } = await request.json()

  const [updated] = await db
    .update(chores)
    .set({ done })
    .where(eq(chores.id, Number(id)))
    .returning()

  return NextResponse.json(updated)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await db.delete(chores).where(eq(chores.id, Number(id)))

  return NextResponse.json({ success: true })
}