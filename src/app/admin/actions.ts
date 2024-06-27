"use server"

import { prisma } from "@/lib/prisma"

export const search = async (state: any[], fd: FormData) => {
  const { filter, query } = Object.fromEntries(fd)

  let results

  if (filter === "item") {
    results = await prisma.item.findMany({
      where: { name: { equals: query as string, mode: "insensitive" } },
    })
  } else {
    results = await prisma.box.findMany({
      where: { tags: { has: (query as string).toLowerCase() } },
    })
  }

  return results
}

export const addUser = async (
  state: { message: string; error: string },
  fd: FormData,
) => {
  try {
    await prisma.user.create({ data: { email: fd.get("email") as string } })
    return { message: "Success", error: "" }
  } catch (e) {
    return { message: "", error: "Fail" }
  }
}
