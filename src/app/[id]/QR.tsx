"use client"

import { domain } from "@/utils"
import { QRCodeCanvas } from "qrcode.react"

interface Props {
  id: number
}

export default function QR({ id }: Props) {
  return (
    <div className="rounded border-4 border-solid border-gray-700 p-2 text-center">
      <QRCodeCanvas value={domain() + id} className="mb-2" />
      <p className="text-lg">{id.toString().padStart(5, "0")}</p>
    </div>
  )
}
