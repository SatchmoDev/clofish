import { prisma } from "@/lib/prisma"
import { imager } from "@/utils"
import Image from "next/image"

interface Props {
  params: {
    id: string
  }
}

export default async function Box({ params }: Props) {
  const box = await prisma.box.findUnique({
    where: { id: parseInt(params.id) },
    include: { items: true },
  })

  if (!box) throw Error("Box not found")

  return (
    <>
      {box.items.map((item, i) => {
        return (
          <p key={i} className="text-lg">
            {item.name}: {item.amount}
          </p>
        )
      })}

      <Image src={imager(params.id)} alt="Box Image" width={200} height={200} />
    </>
  )
}
