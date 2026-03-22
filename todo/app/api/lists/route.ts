import { NextResponse } from "next/server"
import { db } from "@/lib/db/index"
import { listsTable } from "@/lib/db/schema"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const { name } = await request.json()

  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    )
  }

  const [newList] = await db
    .insert(listsTable)
    .values({ name: name.trim() })
    .returning()

  revalidatePath("/")

  return NextResponse.json(newList, { status: 201 })
}