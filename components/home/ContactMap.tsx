'use client'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import api from '@/utils/api'
import { JsonContext } from '@/context/JsonContext'

const schema = yup.object().shape({
  name: yup.string().required('Введите ваше имя'),
  email: yup.string().email('Введите корректный email').required('Введите email'),
  phone: yup
    .string()
    .required('Введите телефон')
    .matches(/^\+?[0-9()\- ]{7,}$/, 'Введите корректный телефон'),
})

type FormValues = yup.InferType<typeof schema>

function ContactMap({ isInnerPage = false }: { isInnerPage?: boolean }) {
  const [loading, setLoading] = useState(false)
  const { contacts } = useContext(JsonContext)

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
    setLoading(true)
    try {
      const response = (await api.post('/sendContact', {
        name: watch('name'),
        phone: watch('phone'),
        email: watch('email'),
      })) as { status: number } & { isSuccess: boolean }

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

  const lat = contacts?.lat ?? 40.76376
  const lng = contacts?.lng ?? -73.97487

  return (
    <div className={`w-full py-10 md:py-20 xl:py-20 !pb-0 ${isInnerPage ? '!pt-0' : ''} relative overflow-hidden bg-gray-50 `}>
      <div className={` mx-auto flex flex-col-reverse lg:flex-row items-stretch  relative z-10 ${isInnerPage ? 'lg:flex-row-reverse' : ''}`}>
        <div className={`w-full lg:w-1/2 ${isInnerPage ? 'bg-[#8D8D8]' : 'bg-white'} items-center bg-opacity-90 p-6 md:p-8 -xl shadow-[6px_0px_6.8px_-4px_rgba(0,0,0,0.25)] flex flex-col justify-center`}>
          <div className='max-w-[600px] w-full'>
            <h2 className="text-xl uppercase xl:text-3xl mb-3 leading-tight">
              {isInnerPage ? 'Оставьте заявку' : 'Расположение'}
            </h2>
            {!isInnerPage ?
              <p className="text-[15px] max-w-[500px]  w-fill font-light mt-6 mb-6 leading-relaxed">
                {contacts?.address}
                <br />
                Tel: {contacts?.phone} <br /> Email: {contacts?.email}
              </p>
              : <p>Заполните поля формы, и мы свяжемся с вами</p>
            }
            {!isInnerPage &&
              <h2 className="text-xl uppercase xl:text-3xl mb-3 leading-tight">
                Вы можете связаться с нами
              </h2>
            }
            <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
              <div className="flex-1 mb-4 relative">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  {...register('name')}
                  className="w-full border-b border-[#8D8D8D] text-[#8D8D8D] h-[48px] px-4 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex-1 mb-4 relative">
                <input
                  type="text"
                  placeholder="Email"
                  {...register('email')}
                  className="w-full border-b border-[#8D8D8D] text-[#8D8D8D] h-[48px] px-4 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex-1 mb-4 relative">
                <input
                  type="text"
                  placeholder="Телефон"
                  {...register('phone')}
                  className="w-full border-b border-[#8D8D8D] text-[#8D8D8D] h-[48px] px-4 focus:outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#AB4A1F] site_hover cursor-pointer uppercase text-white flex justify-center items-center h-[48px] mt-7 hover:opacity-80 transition disabled:opacity-50  ${loading ? 'pointer-events-none' : ''}`}
              >
                {loading ?
                  <span className="loader"></span>
                  : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 min-h-[300px] h-[350px] md:h-[500px] xl:h-[700px] relative -xl overflow-hidden shadow-[6px_0px_6.8px_-4px_rgba(0,0,0,0.25)]">
          {contacts &&
            <YMaps>
              <Map
                defaultState={{
                  center: [lat, lng],
                  zoom: 15,
                  type: 'yandex#map',
                }}
                width="100%"
                height="100%"
              >
                <Placemark geometry={[lat, lng]} />
              </Map>
            </YMaps>
          }
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: 'rgba(30, 30, 40, 0.15)',
              mixBlendMode: 'multiply',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactMap
