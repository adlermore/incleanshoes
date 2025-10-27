'use client'

import api from '@/utils/api'
import React, { useEffect, useState } from 'react'
import pricesSection from '@/public/images/pricesSection.png'
import Image from 'next/image'
import PageLoader from '@/components/PageLoader/PageLoader'
import { APIURLIMG } from '@/utils/constants'
import clsx from 'clsx'

type Service = {
  name: string
  image_path: string
  description: string
  id: number
  services: Array<{
    id: number
    category_id: number
    name: string
    price: number
  }>
}

export default function Prices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  useEffect(() => {
    async function getServices() {
      try {
        const response = await api.get("/getServicesByCategories")
        if (Array.isArray(response)) {
          setServices(response as Service[])
          if (response.length > 0) setActiveCategory(response[0].id)
        } else {
          setServices([])
        }
      } catch (error) {
        console.error("Failed to fetch services:", error)
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }

    getServices()
  }, [])

  if (loading) return <PageLoader />

  const activeCategoryData = services.find(c => c.id === activeCategory)

  return (
    <div className="relative pb-20">
      {/* Banner */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <Image
          src={pricesSection}
          fill
          alt="Prices Banner"
          className="object-cover"
        />
      </div>

      {/* Title */}
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          узнайте наши цены
        </div>
        <div className="mt-6 mb-12 text-base sm:text-lg leading-8 text-gray-700">
          Вы можете отремонтировать свою вещь по доступным ценам
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Categories Sidebar */}
          <div className="md:w-1/3 w-full">
            <div className="flex flex-col flex-wrap gap-4">
              {services.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={clsx(
                    "px-4 py-3 text-left border transition-all duration-200",
                    activeCategory === category.id
                      ? "bg-[#AB4A1F] text-white border-[#AB4A1F]"
                      : "bg-white hover:bg-gray-100 border-gray-300 text-gray-800"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services List */}
          <div className="md:w-2/3 w-full">
            {activeCategoryData ? (
              <div className="bg-white  shadow-sm border border-gray-100 sm:p-6 p-3">
                <h3 className="text-xl font-semibold text-[#AB4A1F] mb-4">
                  {activeCategoryData.name}
                </h3>

                <div className="divide-y divide-gray-200">
                  {activeCategoryData.services.map(service => (
                    <div
                      key={service.id}
                      className="flex justify-between py-3 text-gray-700"
                    >
                      <span>{service.name}</span>
                      <span className="font-medium text-[#AB4A1F] min-w-[75px] whitespace-nowrap flex items-center justify-end">от {service.price} ₽ </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Выберите категорию, чтобы увидеть цены</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
