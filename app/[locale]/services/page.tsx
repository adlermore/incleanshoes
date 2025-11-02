'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import api from '@/utils/api'
import { APIURLIMG } from '@/utils/constants'
import serviceBanner from '@/public/images/serviceVanner.png'
import PageLoader from '@/components/PageLoader/PageLoader'

type Service = {
  id: number
  name: string
  image_path: string
  description: string
}

export default function Page() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8)

  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service') // e.g., "service_8"

  // Fetch services
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.get('/getCategories')
        if (Array.isArray(response)) {
          setServices(response as Service[])
        } else {
          setServices([])
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }
    fetchServices()
  }, [])

  // Scroll to service if param is present
  useEffect(() => {
    if (!loading && serviceParam) {
      const el = document.getElementById(serviceParam)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [loading, serviceParam, services])

  const handleShowMore = () => setVisibleCount(prev => prev + 2)

  if (loading) return <PageLoader />

  return (
    <div className="relative pb-20">
      {/* Banner */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <Image src={serviceBanner} fill alt="Service Banner" className="object-cover" />
      </div>

      {/* Intro */}
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          Познакомьтесь с нашими услугами
        </div>
        <div className="mt-6 mb-12 sm:pb-20 pb-3 text-base sm:text-lg leading-8 text-gray-700">
          Мы предлагаем профессиональную химчистку и комплексный уход за вашими вещами.
          <br />
          Наши специалисты заботятся о качестве и сохраняют безупречный вид каждой детали.
        </div>
      </div>

      {/* Services */}
      {services.length > 0 ? (
        <>
          <div className="space-y-16 sm:space-y-20">
            {services.slice(0, visibleCount).map((service, index) => (
              <div
                key={service.id}
                id={`service_${service.id}`}
                className={`flex flex-col md:flex-row ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                } items-stretch w-full`}
              >
                {/* Image */}
                <div className="relative w-full md:max-w-[45%] min-h-[300px] h-[300px] sm:h-[400px]">
                  <Image
                    src={APIURLIMG + service.image_path}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center w-full bg-[#F5F4F4] px-6 sm:px-20 py-10 sm:py-16">
                  <h3 className="text-xl sm:text-2xl pb-5 font-medium uppercase sm:text-center md:text-left">
                    {service.name}
                  </h3>
                  <div
                    className="sm:mt-6 text-base sm:text-lg leading-7 text-gray-700"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <div
                    className={`${
                      index % 2 !== 0 ? 'md:justify-start' : ''
                    } flex mt-10 justify-center md:justify-end`}
                  >
                    <Link
                      href={`/works?category_id=${service.id}`}
                      className="text-black border border-black uppercase duration-300 hover:bg-white px-6 py-3 w-full sm:w-auto text-center"
                    >
                      Посмотреть работы
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {visibleCount < services.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={handleShowMore}
                className="bg-black text-white uppercase px-8 py-4 hover:bg-[#AB4A1F] transition"
              >
                Посмотреть больше
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 mt-10">Нет доступных услуг.</p>
      )}
    </div>
  )
}