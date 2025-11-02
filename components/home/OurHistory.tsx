import Image from 'next/image'
import React from 'react'
import history from '@/public/images/history.png'
import Link from 'next/link'

function OurHistory() {
  return (
    <div className="min-h-screen sm:mt-20 mt-10 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-screen">
        <Image
          src={history}
          alt="Craftsperson working on leather"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="w-full lg:w-1/2 bg-[#f5f4f4] flex flex-col justify-between p-4 lg:p-16 xl:p-24">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[#000000] text-xl lg:text-2xl xl:text-3xl  tracking-wide mb-4 lg:mb-12">
            НАША ИСТОРИЯ
          </h1>

          <div className="space-y-6 text-[#000000] text-base lg:text-lg leading-relaxed">
            <p>
              Всем привет! Меня зовут Армен Хачатрян — я реставратор изделий из кожи.
              <br />
              <br />
              Моя история с кожей началась ещё в детстве.
              Тогда я впервые почувствовал, как этот материал «дышит», как в нём живёт память — о руках, что его носили, о моментах, что в нём пережили.
              С 16 лет я начал изучать ремесло всерьёз: учился у разных мастеров, разбирал старинные сумки, восстанавливал потрёпанные чемоданы, шил, клеил, полировал — снова и снова.
              <br />
              <br />
              Сегодня я умею работать со всеми типами кожаных изделий: от винтажных кошельков и семейных альбомов до дизайнерских сумок и эксклюзивной обуви.
              Но для меня никогда не была важна стоимость вещи.
              Главное — её душа. Её история. И глаза человека, который приносит мне то, что дорого его сердцу.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-12 lg:mt-16">
          <Link href="/about" className="border-2 border-[#000000] bg-transparent sm:px-8 px-4 sm:py-4 py-3 cursor-pointer hover:text-sitecolor hover:bg-white text-[#000000] text-sm tracking-widest  transition-colors duration-300">
            ПОСМОТРЕТЬ БОЛЬШЕ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OurHistory