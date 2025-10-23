"use client"

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
    description:
      "Просто загрузите фото вещи на сайт — мы оценим степень загрязнения и подскажем стоимость чистки за несколько минут.",
  },
  {
    id: 2,
    image: service2,
    title: "Забор и доставка вещей курьером",
    description:
      "Вам не нужно тратить время на дорогу — курьер приедет в удобное время, заберёт вещи и вернёт их после чистки.",
  },
  {
    id: 3,
    image: service3,
    title: "Безопасный и сертифицированный",
    description:
      "Мы используем только профессиональные составы, которые бережно очищают кожу, текстиль и деликатные материалы без вреда для них.",
  },
  {
    id: 4,
    image: service4,
    title: "Индивидуальный подход к каждому заказу",
    description:
      "Каждая вещь проходит диагностику, и мы подбираем оптимальную технологию чистки именно для неё, чтобы сохранить форму и качество.",
  },
]

export default function ServicesSlider() {
  return (
    <div className="relative pb-2">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white p-3 duration-300 hover:shadow-md"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-40"
            />
            <h3 className="sm:text-lg font-medium mt-4">{slide.title}</h3>
            <p className="text-sm font-light mt-2">{slide.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
