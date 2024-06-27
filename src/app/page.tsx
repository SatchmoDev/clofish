import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Home() {
  const recent = await prisma.box.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { items: true },
  })

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2">Recent Boxes</p>
      <div className="flex gap-2 text-center">
        {recent.map((box) => {
          return (
            <Link
              href={"/" + box.id}
              key={box.id}
              className="w-40 rounded border-2 border-gray-500 p-2"
            >
              <p className="mb-2">{box.id.toString().padStart(5, "0")}</p>

              <p>
                {box.items[0].name}: {box.items[0].amount}
              </p>

              {box.items[1] && (
                <p>
                  {box.items[1].name}: {box.items[1].amount}
                </p>
              )}

              <p>...</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
