import ImageOrFail from "@/components/ImageOrFail"
import { prisma } from "@/lib/prisma"
import { imager } from "@/utils"
import QR from "./QR"

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
    <div className="flex flex-col items-center">
      {box.items.map((item, i) => {
        return (
          <p key={i} className="text-lg">
            {item.name}: {item.amount}
          </p>
        )
      })}

      <ImageOrFail url={imager(params.id)} />
      <QR id={box.id} />
    </div>
  )
}
