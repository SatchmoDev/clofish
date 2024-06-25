"use server"

import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob"
import { redirect } from "next/navigation"

export const createBox = async (
  items: { name: string; amount: string }[],
  fd: FormData,
) => {
  const id = await prisma.$transaction(
    async (prisma) => {
      const box = await prisma.box.create({
        data: {
          tags: (fd.get("tags") as string)
            .split(",")
            .map((tag) => tag.trim().toLowerCase()),
        },
      })

      for (const item of items.filter((item) => item.name && item.amount)) {
        await prisma.item.create({
          data: {
            name: item.name,
            amount: parseInt(item.amount),
            boxId: box.id,
          },
        })
      }

      return box.id
    },
    { timeout: 15000 },
  )

  const file = fd.get("file") as File

  if (file.size) {
    await put(id + "", file, {
      access: "public",
      addRandomSuffix: false,
    })
  }

  redirect("/" + id)
}
