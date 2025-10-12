"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import IconUser from "../Icons/IconUser"
import { APIURL } from "@/utils/constants"

type Review = {
  id: number
  name: string
  email: string
  comment: string
  rate: number
  status: number
  created_at: string
  updated_at: string
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
      "(min-width: 1280px)": { slidesToScroll: 4 },
    },
  })

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${APIURL}/getReviews`)
        if (!res.ok) throw new Error("Failed to fetch reviews")
        const data = await res.json()
        setReviews(data)
      } catch (error) {
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        className="absolute w-[50px] h-[50px] bg-[#FAFAFA] flex items-center justify-center rounded-full 2xl:left-[-60px] left-[-30px] top-1/2 -translate-y-1/2 z-20 hover:bg-accent hover:text-accent-foreground hover:border-accent"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute w-[50px] h-[50px] bg-[#FAFAFA] flex items-center justify-center rounded-full 2xl:right-[-60px] right-[-30px] top-1/2 -translate-y-1/2 z-20 hover:bg-accent hover:text-accent-foreground"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-5">
          {loading ? (
            <div className="w-full flex justify-center items-center p-10">
              <span>Загрузка отзывов...</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="w-full flex justify-center items-center p-10">
              <span>Нет отзывов</span>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="
              flex-[0_0_90%]    /* Mobile: 1 item */
              sm:flex-[0_0_48%] /* Small screens: 2 items */
              md:flex-[0_0_32%] /* Medium screens: 3 items */
              lg:flex-[0_0_24%] /* Large screens: 4 items */
              min-w-0
            "
              >
                <div className="p-5 rounded-lg shadow-sm bg-[#f5f4f47b] duration-300 hover:shadow-lg h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full w-[32px] h-[32px] border border-black">
                      <IconUser />
                    </div>
                    <h3 className="text-lg font-medium">{review.name}</h3>
                  </div>
                  <p className="text-lg mt-5 text-yellow-500">
                    {"★".repeat(review.rate)}{"☆".repeat(5 - review.rate)}
                  </p>
                  {/* No title in API, use comment as main text */}
                  <h4 className="text-lg font-semibold mt-2">{review.comment.slice(0, 20) + (review.comment.length > 20 ? "..." : "")}</h4>
                  <p className="text-base mt-3 font-light">{review.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}