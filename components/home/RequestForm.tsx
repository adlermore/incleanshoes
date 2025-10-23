'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import requestForm from '@/public/images/requestForm.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Paperclip } from 'lucide-react'
import api from '@/utils/api'

// Remove "file" from schema
const schema = yup.object().shape({
  name: yup.string().required('Введите ваше имя'),
  message: yup.string().required('Введите сообщение'),
  phone: yup
    .string()
    .required('Введите телефон')
    .matches(/^[0-9+() -]+$/, 'Введите корректный телефон'),
})

type FormValues = yup.InferType<typeof schema>

function RequestForm() {
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null) // Custom file state

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    // Custom file validation
    if (!file) {
      toast.error('Прикрепите файл')
      return
    }

    setLoading(true)
    try {
      // Prepare FormData for file upload
      const formData = new FormData()
      formData.append('name', watch('name'))
      formData.append('phone', watch('phone'))
      formData.append('comment', watch('message'))
      formData.append('photo', file)

      const response = await api.post('/sendContact', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }) as { status: number } & { isSuccess: boolean };

      if (response.isSuccess) {
        toast.success('Сообщение успешно отправлено!')
        reset()
        setFileName(null)
        setFile(null)
      }
    } catch (error) {
      toast.error('Ошибка при отправке. Попробуйте снова!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-[60px] xl:py-20 md:py-20 py-10 w-full relative">
      <div className=" w-full h-full max-w-1/2 absolute top-0 right-0">
        <Image
          src={requestForm}
          alt="Premium shoe cleaning service - leather shoe with cleaning brush"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-[#214951] shadow-[6px_0px_6.8px_-4px_rgba(0,0,0,0.25)] md:max-w-1/2 z-0"></div>
      <div className="custom_container h-full text-white flex items-center z-10 relative">
        <div className="md:max-w-1/2 md:pr-20">
          <h2 className="text-xl uppercase xl:text-3xl  mb-3 leading-tight">
            Оставьте заявку
          </h2>
          <p className="text-[15px] max-w-[500px] font-light mt-6 mb-6 leading-relaxed">
            Наш менеджер проконсультирует Вас о наших услугах и даст оценку стоимости по предоставленному фото.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name + Phone */}
            <div className="flex gap-10">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  {...register('name')}
                  className="w-full border-b border-[#E1E1E1] text-[#E1E1E1] h-[59px] px-4"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 absolute">{errors.name.message}</p>}
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Телефон"
                  {...register('phone')}
                  className="w-full border-b border-[#E1E1E1] text-[#E1E1E1] h-[59px] px-4"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 absolute">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Message */}
            <input
              type="text"
              placeholder="Сообщение"
              {...register('message')}
              className="w-full border-b border-[#E1E1E1] text-[#E1E1E1] h-[59px] px-4 mt-6"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1 absolute">{errors.message.message}</p>}

            {/* Custom File Input */}
            <div className="relative mt-10">
              <label className="w-full flex items-center justify-between bg-white duration-300 hover:opacity-50 text-[#214951] cursor-pointer sm:h-[59px] h-[45px] px-4">
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#AB4A1F] site_hover cursor-pointer uppercase text-white flex justify-center items-center sm:h-[59px] h-[45px] mt-7 hover:opacity-75 transition disabled:opacity-50 ${loading ? 'pointer-events-none' : ''}`}
            >
              {loading ? <span className="loader"></span> : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RequestForm