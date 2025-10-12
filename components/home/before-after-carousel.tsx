"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BeforeAfterSlider } from "./before-after-slider"
import api from '@/utils/api'
import { APIURLIMG } from "@/utils/constants"

export function BeforeAfterCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  })

  const [slides, setSlides] = useState<
    Array<{ id: number; title: string; image_path_left: string; image_path_right: string }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getWorks() {
      try {
        const data = await api.get("/getOurWorks")
        setSlides(data as Array<{ id: number; title: string; image_path_left: string; image_path_right: string }>)
      } catch (error) {
        console.error("Failed to fetch works", error)
      } finally {
        setLoading(false)
      }
    }
    getWorks()
  }, [])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Skeleton loader for slides
  const SkeletonCard = () => (
    <div className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] min-w-0">
      <div className="bg-card overflow-hidden shadow-lg animate-pulse h-[400px] rounded" />
    </div>
  )

  
  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        className="absolute w-[50px] h-[50px] bg-[#FAFAFA] flex items-center justify-center rounded-full 2xl:left-[-60px] left-[-30px] top-1/2 -translate-y-1/2 z-20  hover:bg-accent hover:text-accent-foreground hover:border-accent"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute w-[50px] h-[50px] bg-[#FAFAFA] flex items-center justify-center rounded-full 2xl:right-[-60px] right-[-30px] top-1/2 -translate-y-1/2 z-20 hover:bg-accent hover:text-accent-foreground "
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
            : slides.map((slide , i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] min-w-0">
                  <div className="bg-card overflow-hidden shadow-lg">
                    <BeforeAfterSlider
                      beforeImage={APIURLIMG + slide.image_path_left}
                      afterImage={APIURLIMG + slide.image_path_right}
                      title={slide.title}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}