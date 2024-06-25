import "@/styles/globals.css"
import Navbar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto my-8 w-5/6 sm:w-3/5">{children}</main>
      </body>
    </html>
  )
}
