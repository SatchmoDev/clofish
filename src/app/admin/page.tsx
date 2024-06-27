import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Admin from "./Admin"

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect("/")

  return <Admin />
}
