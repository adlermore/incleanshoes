'use client'
import Image from 'next/image'
import reviewsSection from '@/public/images/reviewsSection.png'
import IconUser from '@/components/Icons/IconUser'

function ContactUs() {

  return (
    <div className='relative'>
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[370px]">
        <Image
          src={reviewsSection}
          fill
          alt="FAQ Banner"
          className="object-cover"
        />
      </div>
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          Отзывы
        </div>
        <div className="mt-6 mb-12 max-w-[1100px] text-base sm:text-lg leading-8 text-gray-700">
          Ваше доверие и впечатления помогают нам становиться лучше. Делимся реальными историями наших клиентов о чистке и ремонте вещей.
        </div>

        <div className='gird grid-cols-2'>

          <div className="p-5 rounded-lg shadow-sm bg-[#f5f4f47b] duration-300 hover:shadow-lg h-full flex flex-col">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full w-[32px] h-[32px] border border-black">
                <IconUser />
              </div>
              <h3 className="text-lg font-medium">test</h3>
            </div>
            <p className="text-lg mt-5 text-yellow-500">
              {"★".repeat(5)}{"☆".repeat(5 - 5)}
            </p>
            {/* No title in API, use comment as main text */}
            <h4 className="text-lg font-semibold mt-2">test</h4>
            <p className="text-base mt-3 font-light">test</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUs