"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { StaticImageData } from "next/image"

interface BeforeAfterSliderProps {
  beforeImage: string | StaticImageData
  afterImage: string | StaticImageData
  title: string
}


export function BeforeAfterSlider({ beforeImage, afterImage, title }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <div className="relative w-full aspect-[4/2] overflow-hidden group">
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image src={afterImage || "/placeholder.svg"} alt={`${title} - После`} fill className="object-cover" priority />
        <div className="absolute top-4 right-4 bg-accent bg-white rounded-xl shadow-xl text-accent-foreground px-3 py-1 text-sm font-medium">
          После
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <Image src={beforeImage || "/placeholder.svg"} alt={`${title} - До`} fill className="object-cover" priority />
        <div className="absolute top-4 left-4  bg-white rounded-xl shadow-xl  bg-foreground text-background px-3 py-1 text-sm font-medium">До</div>
      </div>

      {/* Slider Line */}
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 rounded-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl flex items-center justify-center">
          <div className="flex gap-1 items-center justify-center">
            <span className="flex flex-col items-center justify-center">
              <ChevronLeft className="h-4 w-4 " />
            </span>
            <span className="flex flex-col items-center justify-center">
              <ChevronRight className="h-4 w-4 -" />
            </span>
          </div>
        </div>
      </div>

      {/* Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        aria-label={`Сравнить до и после для ${title}`}
      />
    </div>
  )
}
