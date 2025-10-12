import Image from 'next/image'
import React from 'react'
import mainBanner from '@/public/images/secondHalf.png'
import Link from 'next/link'

function SeondHalf() {
  return (
    <div className="xl:py-30 md:py-20 py-10 w-full relative">
      <Image
        src={mainBanner}
        alt="Premium shoe cleaning service - leather shoe with cleaning brush"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[#ffffffa8] shadow-xl  md:max-w-1/2 z-0"></div>
      <div className="custom_container h-full flex items-center z-10 relative">
        <div className="md:max-w-1/2 md:pr-20">
          <h2 className="text-xl xl:text-3xl  mb-3 leading-tight">
            Современное оборудование для химчистки
          </h2>
          <p className="text-lg font-light mt-6 mb-6 leading-relaxed">
            Мы используем только профессиональные инструменты и технику для идеальной чистоты.
          </p>
          <p className="text-lg mb-12 font-light leading-relaxed">
            Это позволяет нам достигать безупречных результатов и обеспечивать долговечность вашей одежды.
          </p>
          <Link href="/services"  className="bg-[#52425c] second_hover cursor-pointer hover:bg-[#52425c]/90 text-white  xl:px-12 py-3 px-6  xl:text-lg font-light text-sm uppercase tracking-wide">
            Посмотреть
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SeondHalf