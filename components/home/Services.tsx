'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import api from '@/utils/api'
import { APIURLIMG } from '@/utils/constants'

function Services() {
  const [categories, setCategories] = React.useState<Array<{ id: number; name: string; image_path: string }>>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    async function getServices() {
      try {
        const data = await api.get("/getCategories");
        setCategories(data as Array<{ id: number; name: string; image_path: string }>);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false)
      }
    }

    getServices();
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="w-full relative h-[400px] overflow-hidden rounded animate-pulse bg-gray-200 flex flex-col justify-end">
      <div className="absolute inset-0 bg-gray-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="h-8 w-2/3 bg-gray-400 rounded" />
      </div>
    </div>
  )

  return (
    <div className='grid xl:grid-cols-4 md:grid-cols-3  grid-cols-2 gap-[25px]'>
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        : categories.map((category) => (
          <Link key={category.id} href="/#" className='w-full relative sm:h-[400px] h-[200px] overflow-hidden group'>
            <div className='w-full h-full relative'>
              <Image
                src={APIURLIMG + category.image_path}
                alt={category.name}
                className='object-cover'
                fill
              />
            </div>
            <div className='absolute font-medium uppercase bottom-0 left-0 right-0 p-6 sm:text-2xl text-lg text-center bg-gradient-to-t from-black to-transparent text-white'>
              {category.name}
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Services