'use client'

import api from '@/utils/api'
import React, { useEffect, useState } from 'react'
import workSection from '@/public/images/workSection.png'
import Image from 'next/image'
import { APIURLIMG } from '@/utils/constants'
import PageLoader from '@/components/PageLoader/PageLoader'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'

type WorkPhoto = {
  id: number
  category_id: number
  image_path_left: string
  image_path_right: string
}

type WorkCategory = {
  id: number
  name: string
  image_path: string
  description: string | null
  work_photos: WorkPhoto[]
}

export default function Works() {
  const [works, setWorks] = useState<WorkCategory[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<WorkPhoto[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(3)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const categoryIdParam = searchParams.get('category_id')

  useEffect(() => {
    async function getWorks() {
      try {
        const response = await api.get("/getWorkPhotosByCategories")

        if (Array.isArray(response)) {
          setWorks(response)

          // Default category logic
          if (response.length > 0) {
            let defaultCategoryId: number

            if (categoryIdParam && !isNaN(Number(categoryIdParam))) {
              defaultCategoryId = Number(categoryIdParam)
            } else {
              defaultCategoryId = response[0].id
            }

            const selected = response.find(w => w.id === defaultCategoryId)
            setSelectedCategory(defaultCategoryId)
            setFilteredPhotos(selected?.work_photos || [])
          }
        } else {
          setWorks([])
        }
      } catch (error) {
        console.error("Failed to fetch works:", error)
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }

    getWorks()
  }, [categoryIdParam]) // Re-run if URL param changes

  const handleFilter = (categoryId: number) => {
    setSelectedCategory(categoryId)
    const selected = works.find(w => w.id === categoryId)
    setFilteredPhotos(selected?.work_photos || [])
    setVisibleCount(3)
  }

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  if (loading) return <PageLoader />

  console.log('filteredPhotos', filteredPhotos);

  return (
    <div className="relative pb-20">
      {/* Banner */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <Image src={workSection} fill alt="Work Banner" className="object-cover" />
      </div>

      {/* Intro */}
      <div className="custom_container">
        <div className='ml-auto max-w-4xl '>
          <div className="mt-12 ml-auto text-right text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
            Познакомьтесь с нашей работой
          </div>
          <div className="mt-6 text-right mb-12 text-base sm:text-lg leading-8 text-gray-700">
            Обувь требует особого ухода, чтобы надолго сохранить опрятный внешний вид и форму.
            Мы аккуратно очищаем, восстанавливаем и придаём свежесть вашей паре.
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="lg:w-1/4 flex lg:flex-col gap-4 flex-wrap justify-center lg:justify-start">
            {works.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilter(category.id)}
                className={clsx(
                  'px-4 py-3 border-1 border-[#AB4A1F] transition-all duration-300',
                  selectedCategory === category.id
                    ? 'bg-[#AB4A1F] text-white border-[#AB4A1F]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="lg:w-3/4">
            {filteredPhotos.length === 0 ? (
              <div className="text-gray-500 text-center py-10">
                Нет фотографий для этой категории.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredPhotos.slice(0, visibleCount).map(photo => (
                    <div key={photo.id} className="group overflow-hidden relative">
                      {/* Left Image */}
                      <div className="relative w-full h-[250px] sm:h-[300px]">
                        <Image
                          src={APIURLIMG + photo.image_path_left}
                          alt="Before"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {/* Right Image */}
                      {/* <div className="relative w-full h-[250px] sm:h-[300px] mt-3">
                        <Image
                          src={APIURLIMG + photo.image_path_right}
                          alt="After"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div> */}
                    </div>
                  ))}
                </div>

                {/* Show More Button */}
                {visibleCount < filteredPhotos.length && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={handleShowMore}
                      className="px-10 py-3 bg-[#AB4A1F] site_hover text-white hover:bg-[#933d19] transition-all duration-300"
                    >
                      Показать ещё
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
