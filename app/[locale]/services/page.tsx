'use client'

import api from '@/utils/api'
import React, { useEffect, useState } from 'react'
import serviceBanner from '@/public/images/serviceBanner.png'
import Image from 'next/image'
import { APIURLIMG } from '@/utils/constants'
import Link from 'next/link'
import PageLoader from '@/components/PageLoader/PageLoader'

type Service = {
  name: string
  image_path: string
  description: string
  id: number
}

export default function Page() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(2)

  useEffect(() => {
    async function getServices() {
      try {
        const response = await api.get("/getCategories")
        if (Array.isArray(response)) {
          setServices(response as Service[])
        } else {
          setServices([])
        }
      } catch (error) {
        console.error("Failed to fetch services:", error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500);
      }
    }

    getServices()
  }, [])

  if (loading) return <PageLoader />

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 2)
  }

  return (
    <div className="relative pb-20">
      {/* Banner */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <Image
          src={serviceBanner}
          fill
          alt="Service Banner"
          className="object-cover"
        />
      </div>

      {/* Intro */}
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          Познакомьтесь с нашими услугами
        </div>
        <div className="mt-6 mb-12 pb-20 text-base sm:text-lg leading-8 text-gray-700">
          Мы предлагаем профессиональную химчистку и комплексный уход за вашими вещами.
          <br />
          Наши специалисты заботятся о качестве и сохраняют безупречный вид каждой детали.
        </div>
      </div>

      {/* Service List */}
      {services.length > 0 ? (
        <>
          <div className="space-y-16  sm:space-y-30">
            {services.slice(0, visibleCount).map((service, index) => (
              <div
                key={index}
                id={`service_${service.id}`}
                className={`flex flex-col md:flex-row ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                } items-stretch w-full`}
              >
                {/* Image Section */}
                <div className="relative w-full md:max-w-[45%] ">
                  <Image
                    src={APIURLIMG + service.image_path}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center w-full  bg-[#F5F4F4] px-6 sm:px-20 py-20 sm:py-16">
                  <h3 className="text-xl sm:text-2xl pb-5 font-medium uppercase text-center md:text-left">
                    {service.name}
                  </h3>
                  <div
                    className="mt-6 text-base sm:text-lg leading-7 text-gray-700"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <div className={`${index % 2 !== 0 ? 'md:justify-start' : ''} flex mt-10 justify-center md:justify-end`}>
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
                className="bg-black text-white uppercase px-8 py-4 cursor-pointer  hover:bg-[#AB4A1F] transition"
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
