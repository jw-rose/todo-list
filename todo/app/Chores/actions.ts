"use server"
import { db } from "@/lib/db/index"
import { chores } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function toggleChore(id: number, done: boolean, listId: number) {
  await db
    .update(chores)
    .set({ done })
    .where(eq(chores.id, id))

  revalidatePath(`/lists/${listId}`)
  revalidatePath("/Chores")
}

export async function deleteChore(id: number, listId: number) {
  await db
    .delete(chores)
    .where(eq(chores.id, id))

  revalidatePath(`/lists/${listId}`)
  revalidatePath("/Chores")
}

export async function updateChoreTitle(id: number, title: string, listId: number) {
  await db
    .update(chores)
    .set({ title })
    .where(eq(chores.id, id))

  revalidatePath(`/lists/${listId}`)
  revalidatePath("/Chores")
}