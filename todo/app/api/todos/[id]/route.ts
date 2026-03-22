import { NextResponse } from "next/server";
import { db } from "@/lib/db/index"
import { chores } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function PATCH(
    request: Request,
    { params }: { params: {id: string } }
) {
    const { done } = await request.json()
    const id = Number(params.id)

    const [updated] = await db
    .update(chores)
    .set({ done })
    .where(eq(chores.id, id))
    .returning()

    return NextResponse.json(updated)
}

export async function DELETE(
    _request: Request,
    { params }: { params: {id: string} }
) {
    const id = Number(params.id)

    await db.delete(chores).where(eq(chores.id, id))

    return NextResponse.json({ success: true})
}
    
