'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import reviewsSection from '@/public/images/reviewsSection.png'
import reviewSection from '@/public/images/reviewSection.png'
import IconUser from '@/components/Icons/IconUser'
import PageLoader from '@/components/PageLoader/PageLoader'
import { APIURL, APIURLIMG } from '@/utils/constants'
import * as yup from 'yup'
import api from '@/utils/api'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Paperclip, X } from 'lucide-react'

type Review = {
  id: number
  name: string
  title: string
  comment: string
  rate: number
  status: number
  created_at: string
  updated_at: string
  photo_path?: string
}

const schema = yup.object().shape({
  name: yup.string().max(255, 'Максимум 255 символов').required('Введите ваше имя'),
  title: yup.string().max(255, 'Максимум 255 символов').required('Введите название сообщения'),
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
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  // --- Hooks related to modal/outside click and keyboard must be declared
  //     before any conditional returns so hook order stays stable across renders.
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedReview(null)
      }
    }

    if (selectedReview) {
      document.addEventListener('keydown', onKeyDown)
      // prevent body scroll when modal open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedReview])

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
  }, [reset])

  if (pageLoading) return <PageLoader />

  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const onSubmit = async (formData: FormValues) => {
    setLoading(true)
    try {
      const form = new FormData()
      form.append('name', formData.name)
      form.append('email', 'test@test.com')
      form.append('title', formData.title)
      form.append('comment', formData.comment)
      form.append('rate', formData.rate.toString())
      if (file) form.append('photo', file)
      const response = (await api.post('/createReview', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })) as { status: number } & { isSuccess: boolean }

      const typedResponse = response as { isSuccess: boolean }
      if (typedResponse.isSuccess) {
        toast.success('Ваш отзыв успешно отправлен!')
        const newReview: Review = {
          id: Date.now(),
          name: formData.name,
          title: formData.title,
          comment: formData.comment,
          rate: formData.rate,
          status: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          photo_path: fileName || '',
        }
        setReviews((prev) => [newReview, ...prev])
        reset()
        setFile(null)
        setFileName(null)
      } else {
        toast.error('Ошибка при отправке. Попробуйте снова!')
      }
    } catch (error: any) {
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
    <div className="relative">
      {/* Banner */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[370px]">
        <Image src={reviewsSection} fill alt="Reviews Banner" className="object-cover" />
      </div>

      {/* Content */}
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          Отзывы
        </div>

        <div className="mt-6 mb-12 max-w-[1100px] text-base sm:text-lg leading-8 text-gray-700">
          Ваше доверие и впечатления помогают нам становиться лучше. Делимся реальными историями наших клиентов.
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleReviews.length > 0 ? (
            visibleReviews.map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className="p-5 rounded-lg shadow-sm bg-[#f5f4f47b] hover:shadow-lg duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full w-[32px] h-[32px] border border-black">
                    <IconUser />
                  </div>
                  <h3 className="text-lg font-medium">{review.name}</h3>
                </div>

                <p className="text-yellow-500 text-lg mt-3">
                  {'★'.repeat(review.rate)}{'☆'.repeat(5 - review.rate)}
                </p>

                <p className="font-semibold mt-2">{review.title}</p>
                <p className="text-base mt-2 font-light line-clamp-4">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">Пока отзывов нет.</p>
          )}
        </div>

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
        <Image src={reviewSection} alt="Review background" fill className="object-cover" />
        <div className="absolute top-0 right-0 sm:max-w-1/2 w-full shadow-xl h-full bg-[#ffffffa8] z-0"></div>
        <div className="custom_container h-full flex items-center z-10 relative">
          <div className="ml-auto md:max-w-1/2 sm:pl-20 md:pr-20 w-full">
            <h2 className="text-xl uppercase xl:text-3xl mb-3 leading-tight">Оставьте отзыв</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              {/* Name */}
              <div className="flex-1 mb-4 relative">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  {...register('name')}
                  className="w-full border-b border-[#8D8D8D] h-[48px] px-4 focus:outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 absolute">{errors.name.message}</p>}
              </div>

              {/* Title */}
              <div className="flex-1 mb-4 relative">
                <input
                  type="text"
                  placeholder="Название сообщения"
                  {...register('title')}
                  className="w-full border-b border-[#8D8D8D] h-[48px] px-4 focus:outline-none"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1 absolute">{errors.title.message}</p>}
              </div>

              {/* Comment */}
              <div className="flex-1 mb-4 relative">
                <textarea
                  placeholder="Комментарий"
                  {...register('comment')}
                  className="w-full border-b border-[#8D8D8D] h-[100px] px-4 py-2 resize-none focus:outline-none"
                />
                {errors.comment && <p className="text-red-500 text-sm mt-1 absolute">{errors.comment.message}</p>}
              </div>

              <div className="flex items-center relative gap-2 mt-3 mb-4">
                <span className="text-gray-600">Оценка:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="cursor-pointer text-2xl text-yellow-500">
                    <input type="radio" value={star} {...register('rate')} className="hidden" />
                    <span>{star <= watch('rate') ? '★' : '☆'}</span>
                  </label>
                ))}
                {errors.rate && <p className="text-red-500 text-sm mt-10 absolute">{errors.rate.message}</p>}
              </div>

              <label className="w-full flex items-center mt-7 justify-between bg-white duration-300 hover:opacity-50 text-[#214951] cursor-pointer sm:h-[59px] h-[45px] px-4 border border-gray-300 rounded-md">
                <div className="flex items-center w-full justify-center gap-2">
                  <Paperclip size={18} />
                  <span>{fileName || 'Прикрепить фото'}</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if (!selectedFile) {
                      toast.error('Прикрепите файл')
                      setFileName(null)
                      setFile(null)
                      return
                    }
                    setFile(selectedFile)
                    setFileName(selectedFile.name)
                  }}
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#AB4A1F] text-white h-[48px] mt-7 rounded uppercase hover:opacity-80 transition disabled:opacity-50`}
              >
                {loading ? <span className="loader"></span> : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Popup Modal - modern style with outside click & ESC close */}
      {selectedReview && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Отзыв от ${selectedReview.name}`}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6"
          onMouseDown={(e) => {
            // close only if clicking directly on overlay (outside content)
            if (e.target === e.currentTarget) {
              setSelectedReview(null)
            }
          }}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 scale-100"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-6 border-b">
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

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-medium">{selectedReview.title}</h4>
                <p className="text-gray-700 whitespace-pre-line">{selectedReview.comment}</p>
                <div className="text-sm text-gray-400 mt-2">Опубликовано: {new Date(selectedReview.created_at).toLocaleDateString()}</div>
              </div>

              {selectedReview.photo_path ? (
                <div className="w-full">
                  {/* Set explicit image size for consistent layout; responsive via CSS */}
                  <Image
                    src={`${APIURLIMG}/${selectedReview.photo_path}`}
                    alt={`Фото от ${selectedReview.name}`}
                    width={900}
                    height={600}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-50 rounded-lg h-64 sm:h-80 md:h-96">
                  <span className="text-gray-400">Нет фото</span>
                </div>
              )}
            </div>

            <div className="p-4 flex justify-end">
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