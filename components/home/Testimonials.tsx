'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import IconUser from '../Icons/IconUser'
import { APIURL, APIURLIMG } from '@/utils/constants'

type Review = {
  id: number
  name: string
  email?: string
  comment: string
  rate: number
  status: number
  created_at: string
  title?: string
  updated_at: string
  photo_path?: string
}

export function Testimonials() {
  // Embla carousel hook - keep first to preserve hook order
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1280px)': { slidesToScroll: 4 },
    },
  })

  // Modal-related refs and state declared early (stable hook order)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)


  // Carousel data + loading state
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${APIURL}/getReviews`)
        if (!res.ok) throw new Error('Failed to fetch reviews')
        const data = await res.json()
        setReviews(data)
      } catch (error) {
        setReviews([])
        console.error('Failed to load reviews', error)
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
                <div
                  onClick={() => setSelectedReview(review)}
                  className="p-5 rounded-lg shadow-sm bg-[#f5f4f47b] duration-300 hover:shadow-lg h-full flex flex-col cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full w-[32px] h-[32px] border border-black">
                      <IconUser />
                    </div>
                    <h3 className="text-lg font-medium">{review.name}</h3>
                  </div>

                  <p className="text-lg mt-5 text-yellow-500">
                    {'★'.repeat(review.rate)}{'☆'.repeat(5 - review.rate)}
                  </p>

                  {/* Use a short preview as title */}
                  <h4 className="text-lg font-semibold line-clamp-2 mt-2">
                    {review.title}
                  </h4>

                  <p className="text-base mt-3 font-light line-clamp-4">{review.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal: modern, outside-click to close, ESC closes, inner scroll, only show image if present */}
      {selectedReview && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Отзыв от ${selectedReview.name}`}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6"
          onMouseDown={(e) => {
            // close only if clicking on overlay itself (outside modal content)
            if (e.target === e.currentTarget) setSelectedReview(null)
          }}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 max-h-[90vh]"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-6 border-[#ccc] border-b">
              <div>
                <h3 className="text-2xl font-semibold leading-tight">{selectedReview.name}</h3>
                <div className="text-yellow-500 mt-2">
                  {'★'.repeat(selectedReview.rate)}{'☆'.repeat(5 - selectedReview.rate)}
                </div>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                aria-label="Закрыть"
                className="rounded-full p-2 hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content area */}
            <div className="p-6 overflow-y-auto max-h-[58vh]">
              {selectedReview.photo_path ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium">{/* no separate title in API */}</h4>
                    <p className="text-gray-700 whitespace-pre-wrap break-words">{selectedReview.comment}</p>
                  </div>

                  <div className="w-full flex items-center justify-center">
                    <Image
                      src={`${APIURLIMG}/${selectedReview.photo_path}`}
                      alt={`Фото от ${selectedReview.name}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto max-h-[60vh] object-cover rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-700 whitespace-pre-wrap break-words">{selectedReview.comment}</p>
  
                </div>
              )}
            </div>

            <div className="p-4 flex justify-end border-t border-[#ccc]">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-[#AB4A1F] text-white rounded-md hover:opacity-90 transition"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}