import { auth, signIn, signOut } from "@/lib/auth"
import Link from "next/link"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex h-20 items-center gap-4 bg-gray-800 px-4 text-2xl">
      <Link href="/">CloFish</Link>
      <Link href="/new">New</Link>

      <form
        action={async () => {
          "use server"
          session ? await signOut() : await signIn()
        }}
        className="ml-auto"
      >
        <button className="rounded-full bg-gray-700 p-2 px-3 text-xl">
          Sign {session ? "Out" : "In"}
        </button>
      </form>
    </nav>
  )
}
