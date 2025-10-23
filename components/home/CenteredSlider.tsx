"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import api from "@/utils/api"
import { APIURLIMG } from "@/utils/constants"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

function SkeletonSlide() {
  return (
    <div className="flex-[0_0_60%] sm:flex-[0_0_33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 pl-2 sm:pl-4 py-6 sm:py-8 animate-pulse">
      <div className="relative aspect-[1/1.2] bg-gray-200 rounded-lg" />
    </div>
  )
}

export function CenteredSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const images: { src: string; alt: string }[] = []
  slides.forEach((slide, i) => {
    if (slide.image_path_left)
      images.push({
        src: slide.image_path_left,
        alt: `Before ${i + 1}`,
      })
    if (slide.image_path_right)
      images.push({
        src: slide.image_path_right,
        alt: `After ${i + 1}`,
      })
  })

  useEffect(() => {
    async function getWorks() {
      try {
        setLoading(true)
        const data = await api.get("/getWorkPhotos")
        setSlides(data as any[])
      } catch (error) {
        console.error("Failed to fetch works", error)
      } finally {
        setLoading(false)
      }
    }
    getWorks()
  }, [])

  useEffect(() => {
    const fancyOptions: any = {
      Thumbs: false,
      Toolbar: {
        display: ['close'],
      },
    }

    Fancybox.bind('[data-fancybox="gallery"]', fancyOptions)

    return () => {
      Fancybox.destroy()
    }
  }, []) // Re-bind when images change

  return (
    <div className="w-full mx-auto px-2 sm:px-4 pb-20 sm:pb-30">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex items-center -ml-2 sm:-ml-4">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => <SkeletonSlide key={idx} />)
            : images.map((image, index) => {
                const offset = Math.abs(index - selectedIndex)
                const isCenter = offset === 0

                return (
                  <div
                    key={index}
                    className={`flex-[0_0_60%] sm:flex-[0_0_33%] md:flex-[0_0_25%] min-w-0 pl-2 sm:pl-4 py-6 sm:py-8 ${
                      isCenter ? "z-20" : "z-0"
                    }`}
                  >
                    <a
                      href={APIURLIMG + image.src}
                      data-fancybox="gallery"
                      data-caption={image.alt}
                      className={`relative aspect-[1/0.7] overflow-hidden transition-all duration-500 ease-out block ${
                        isCenter
                          ? "scale-120 opacity-100 z-999 bg-white"
                          : "scale-100 z-0 brightness-75"
                      }`}
                    >
                      <Image
                        src={APIURLIMG + image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 40vw, 33vw"
                        priority={index < 5}
                        unoptimized
                      />
                    </a>
                  </div>
                )
              })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {(loading ? Array.from({ length: 6 }) : images).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full bg-[#214951] transition-all duration-300 ${
              selectedIndex === index
                ? "bg-foreground w-8"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={loading}
          />
        ))}
      </div>
    </div>
  )
}
