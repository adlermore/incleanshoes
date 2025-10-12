'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import reviewsSection from '@/public/images/reviewsSection.png'
import IconUser from '@/components/Icons/IconUser'
import PageLoader from '@/components/PageLoader/PageLoader'
import { APIURL } from '@/utils/constants'
import reviewSection from '@/public/images/reviewSection.png'
import * as yup from 'yup'
import api from '@/utils/api'
import toast from 'react-hot-toast'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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

const schema = yup.object().shape({
  name: yup.string().max(255, 'Максимум 255 символов').required('Введите ваше имя'),
  email: yup.string().email('Введите корректный email').required('Введите email'),
  comment: yup.string().max(5000, 'Максимум 5000 символов').required('Введите комментарий'),
  rate: yup
    .number()
    .required('Выберите оценку')
    .min(1, 'Минимальная оценка — 1')
    .max(5, 'Максимальная оценка — 5'),
})

type FormValues = yup.InferType<typeof schema>

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(4)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    async function getReviews() {
      try {
        const res = await fetch(`${APIURL}/getReviews`)
        if (!res.ok) throw new Error('Failed to fetch reviews')
        const data = await res.json()
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setPageLoading(false)
        setLoading(false)
      }
    }
    getReviews()
  }, [])

  if (pageLoading) return <PageLoader />

  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const onSubmit = async (formData: FormValues) => {
    setLoading(true)
    try {
      const response = await api.post('/createReview', formData)
      const typedResponse = response as { isSuccess: boolean }
      if (typedResponse.isSuccess) {
        toast.success('Ваш отзыв успешно отправлен!')
        const newReview: Review = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          comment: formData.comment,
          rate: formData.rate,
          status: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        setReviews((prev) => [newReview, ...prev])
        reset()
      } else {
        toast.error('Ошибка при отправке. Попробуйте снова!')
      }
    } catch (error: any) {
      // Handle server validation errors
      if (error.response?.data) {
        const errorsData = error.response.data
        const firstError = Object.values(errorsData)?.[0] as string[]
        toast.error(firstError?.[0] || 'Ошибка при отправке.')
      } else {
        toast.error('Ошибка при отправке. Попробуйте снова!')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative'>
      {/* Banner */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[370px]">
        <Image
          src={reviewsSection}
          fill
          alt="Reviews Banner"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          Отзывы
        </div>

        <div className="mt-6 mb-12 max-w-[1100px] text-base sm:text-lg leading-8 text-gray-700">
          Ваше доверие и впечатления помогают нам становиться лучше. Делимся реальными историями наших клиентов о чистке и ремонте вещей.
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleReviews.length > 0 ? (
            visibleReviews.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-lg shadow-sm bg-[#f5f4f47b] duration-300 hover:shadow-lg h-full flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full w-[32px] h-[32px] border border-black">
                    <IconUser />
                  </div>
                  <h3 className="text-lg font-medium">{review.name}</h3>
                </div>

                <p className="text-lg mt-4 text-yellow-500">
                  {'★'.repeat(review.rate)}{'☆'.repeat(5 - review.rate)}
                </p>

                <p className="text-base mt-3 font-light">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">Пока отзывов нет.</p>
          )}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <div className="flex justify-center mb-16">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 bg-[#AB4A1F] text-white rounded-lg text-lg hover:bg-[#913e19] transition"
            >
              Показать ещё
            </button>
          </div>
        )}
      </div>

      {/* Leave Review Form */}
      <div className="xl:py-30 md:py-20 py-10 w-full relative">
        <Image
          src={reviewSection}
          alt="Premium shoe cleaning service - leather shoe with cleaning brush"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-0 right-0 sm:max-w-1/2 w-full h-full bg-[#ffffffa8] z-0"></div>
        <div className="custom_container h-full flex items-center z-10 relative">
          <div className="ml-auto md:max-w-1/2 sm:pl-20 md:pr-20 w-full">

            <h2 className="text-xl uppercase xl:text-3xl mb-3 leading-tight">
              Оставьте отзыв
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
              {/* Name */}
              <div className="flex-1 mb-4 relative">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  {...register('name')}
                  className="w-full border-b border-[#8D8D8D] text-[#333] h-[48px] px-4 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 absolute">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex-1 mb-4 relative">
                <input
                  type="text"
                  placeholder="Email"
                  {...register('email')}
                  className="w-full border-b border-[#8D8D8D] text-[#333] h-[48px] px-4 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 absolute">{errors.email.message}</p>
                )}
              </div>

              {/* Comment */}
              <div className="flex-1 mb-4 relative">
                <textarea
                  placeholder="Комментарий"
                  {...register('comment')}
                  className="w-full border-b border-[#8D8D8D] text-[#333] h-[100px] px-4 py-2 resize-none focus:outline-none"
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1 absolute">{errors.comment.message}</p>
                )}
              </div>

              {/* Rate */}
              <div className="flex items-center gap-2 mt-3 mb-4">
                <span className="text-gray-600">Оценка:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="cursor-pointer text-2xl text-yellow-500">
                    <input
                      type="radio"
                      value={star}
                      {...register('rate')}
                      className="hidden"
                    />
                    <span>{star <= watch('rate') ? '★' : '☆'}</span>
                  </label>
                ))}
                {errors.rate && (
                  <p className="text-red-500 text-sm mt-1 absolute">{errors.rate.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#AB4A1F] site_hover cursor-pointer uppercase text-white flex justify-center items-center h-[48px] mt-7 hover:opacity-80 transition disabled:opacity-50 rounded"
              >
                {loading ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
