"use client"

import NextImage from "next/image"
import { useEffect, useState } from "react"

interface Props {
  url: string
}

export default function ImageOrFail({ url }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const img = new Image()
    img.src = url

    img.onload = () => {
      setDimensions({ width: img.width, height: img.height })
    }
  }, [url])

  if (dimensions.width === 0 || dimensions.height === 0) {
    return
  }

  return (
    <div className="relative w-5/6 sm:w-1/2">
      <NextImage
        src={url}
        alt="Box Image"
        layout="responsive"
        width={dimensions.width}
        height={dimensions.height}
        objectFit="contain"
      />
    </div>
  )
}
