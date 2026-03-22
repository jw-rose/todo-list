"use server"
import { db } from "@/lib/db/index"
import { listsTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function deleteList(id: number) {
  await db.delete(listsTable).where(eq(listsTable.id, id))
  revalidatePath("/")
}