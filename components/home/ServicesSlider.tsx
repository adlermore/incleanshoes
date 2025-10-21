"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import service1 from "@/public/images/services/service1.png"
import service2 from "@/public/images/services/service2.png"
import service3 from "@/public/images/services/service3.png"
import service4 from "@/public/images/services/service4.png"

const slides = [
  {
    id: 1,
    image: service1,
    title: "Бесплатная консультация и расчёт стоимости онлайн",
    description: "Просто загрузите фото вещи на сайт — мы оценим степень загрязнения и подскажем стоимость чистки за несколько минут.",
  },
  {
    id: 2,
    title: "Забор и доставка вещей курьером",
    description: "Вам не нужно тратить время на дорогу — курьер приедет в удобное время, заберёт вещи и вернёт их после чистки.",
    image: service2,
  },
  {
    id: 3,
    title: "Безопасный и сертифицированный",
    image: service3,
    description: "Мы используем только профессиональные составы, которые бережно очищают кожу, текстиль и деликатные материалы без вреда для них."
  },
  {
    id: 4,
    title: "Индивидуальный подход к каждому заказу",
    description: "Каждая вещь проходит диагностику, и мы подбираем оптимальную технологию чистки именно для неё, чтобы сохранить форму и качество.",
    image: service4,
  },
]

export function ServicesSlider() {
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
    <div className="relative overflow-hidden pb-2">
      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        className="absolute  hidden sm:flex w-[50px] h-[50px] bg-[#FAFAFA] items-center justify-center rounded-full 2xl:left-[-60px] left-[-30px] top-1/2 -translate-y-1/2 z-20 hover:bg-accent hover:text-accent-foreground hover:border-accent"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute w-[50px] h-[50px] bg-[#FAFAFA] hidden sm:flex  items-center justify-center rounded-full 2xl:right-[-60px] right-[-30px] top-1/2 -translate-y-1/2 z-20 hover:bg-accent hover:text-accent-foreground"
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div className="overflow w-full" ref={emblaRef}>
        <div className="flex gap-5 px-5 md:px-10">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-[0_0_80%] duration-300 hover:shadow-md sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] min-w-0"
            >
              <div className="p-3">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-40"
                />
                <h3 className="sm:text-lg font-medium mt-4">{slide.title}</h3>
                <p className="text-sm font-light mt-2">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
