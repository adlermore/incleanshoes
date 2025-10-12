'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import IconChecked from '../Icons/IconChecked'
import api from '@/utils/api'

const schema = yup.object().shape({
  name: yup.string().required('Введите ваше имя'),
  phone: yup
    .string()
    .required('Введите телефон')
    .matches(/^[0-9+() -]+$/, 'Введите корректный телефон'),
})

function SmallContactForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {
    setLoading(true)
    try {
      const response = await api.post('/sendContact', {
        name: watch('name'),
        phone: watch('phone'),
      }) as { status: number } & { isSuccess: boolean };

      if (response.isSuccess) {
        toast.success('Сообщение успешно отправлено!')
        reset()
      } else {
        toast.error('Ошибка при отправке. Попробуйте снова!')
      }
    } catch (error) {
      toast.error('Ошибка при отправке. Попробуйте снова!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='custom_container md:!mt-[-32px] !mt-[30px] z-99'>
      <div className='max-w-[989px] w-full mx-auto shadow-xl md:px-[65px] md:py-[35px] px-5 py-5 bg-white'>
        <div className='sm:text-2xl text-xl mb-6 uppercase'>
          Вы можете связаться с нами
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 md:flex gap-5'>
          {/* Name */}
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Ваше имя'
              {...register('name')}
              className='w-full border border-[#8D8D8D] h-[59px] px-4'
            />
            <div
              className={`transition-opacity duration-300 text-red-500 absolute text-sm mt-1 ${errors.name ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {errors.name?.message}
            </div>
          </div>

          <div className='flex-1'>
            <input
              type='text'
              placeholder='Телефон'
              {...register('phone')}
              className='w-full border border-[#8D8D8D] h-[59px] px-4'
            />
            <div
              className={`transition-opacity duration-300 text-red-500 absolute text-sm mt-1 ${errors.phone ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {errors.phone?.message}
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='w-full site_hover max-w-[210px] bg-[#AB4A1F] cursor-pointer uppercase text-white flex justify-center items-center h-[59px] hover:opacity-75 transition disabled:opacity-50'
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
        <div className='relative'>
          <label className='flex custom_checkbox cursor-pointer items-center mt-4'>
            <input type='checkbox' className='hidden' />
            <div className='min-w-6 h-6 border border-black mr-3 flex items-center justify-center'>
              <span className='duration-300 opacity-0 checked:opacity-100 text-white'>
                <IconChecked />
              </span>
            </div>
            <span className='text-sm'>
              Отправляя заявку, вы даете свое согласие на обработку персональных данных
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default SmallContactForm
