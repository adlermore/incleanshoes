"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import IconUser from "../Icons/IconUser"

const testimonials = [
  {
    id: 1,
    name: "Иван Иванов",
    rating: 5,
    title: "Отличная чистка обуви",
    description: "Очень доволен сервисом. Быстро и качественно очистили мои кожаные ботинки.",
  },
  {
    id: 2,
    name: "Мария Петрова",
    rating: 4,
    title: "Хороший сервис",
    description: "Все понравилось, особенно удобная доставка вещей курьером.",
  },
  {
    id: 3,
    name: "Алексей Смирнов",
    rating: 5,
    title: "Рекомендую",
    description: "Качественные чистящие средства, вещи вернулись как новые.",
  },
  {
    id: 4,
    name: "Елена Кузнецова",
    rating: 4,
    title: "Профессионально",
    description: "Очень аккуратно обрабатывают деликатные материалы, осталась довольна.",
  },
]

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
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="
            flex-[0_0_90%]    /* Mobile: 1 item */
            sm:flex-[0_0_48%] /* Small screens: 2 items */
            md:flex-[0_0_32%] /* Medium screens: 3 items */
            lg:flex-[0_0_24%] /* Large screens: 4 items */
            min-w-0
          "
        >
          <div className="p-5 rounded-lg shadow-sm bg-[#F5F4F4] h-full flex flex-col">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full w-[32px] h-[32px] border border-black">
                <IconUser />
              </div>
              <h3 className="text-lg font-medium">{testimonial.name}</h3>
            </div>
            <p className="text-lg mt-5 text-yellow-500">
              {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
            </p>
            <h4 className="text-lg font-semibold mt-2">{testimonial.title}</h4>
            <p className="text-base mt-3 font-light">{testimonial.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}
