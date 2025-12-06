import Image from 'next/image'
import React from 'react'
import about2 from '@/public/images/about2.png'
import aboutBanner from '@/public/images/aboutBanner.png'
import history from '@/public/images/history.jpg'

function AboutUs() {
  return (
    <div className='relative pb-20'>
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <Image
          src={aboutBanner}
          fill
          alt="Service Banner"
          className="object-cover"
        />
      </div>
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          О нас
        </div>
        <div className="mt-6 mb-12 pb-5 text-base sm:text-lg leading-8 text-gray-700">
          Мы заботимся о вашей одежде, обуви и аксессуарах так же, как о своих.
          <br />
          Наша цель — вернуть вещам свежий вид и продлить их жизнь.
        </div>
      </div>
      <div className='custom_container'>
        <div className=" mt- flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 relative min-h-[300px]">
            <Image
              src={history}
              alt="Craftsperson working on leather"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="w-full lg:w-1/2 bg-[#f5f4f4] flex flex-col justify-between p-4 lg:p-10 xl:p-15">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-[#000000] text-xl lg:text-2xl xl:text-3xl  tracking-wide mb-8 lg:mb-12">
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
                  <br />
                  <br />
                  <span className='font-medium'>Главное — её душа. Её история. И глаза человека, который приносит мне то, что дорого его сердцу.</span>
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-15 flex flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-1/2 relative min-h-[300px]">
            <Image
              src={about2}
              alt="Craftsperson working on leather"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          <div className="w-full lg:w-1/2 bg-[#f5f4f4] flex flex-col justify-between p-4 lg:p-10 xl:p-15">
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-6 text-[#000000] text-base lg:text-lg leading-relaxed">
                <p>
                  Моя величайшая награда — момент, когда клиент получает свою вещь обратно.
                  Когда видит, как она снова «оживает».
                  Когда в его глазах появляется блеск — от радости, благодарности, даже слёз.
                  <br />
                  <br />
                  Я много лет учился, работал в разных мастерских и компаниях, набирался опыта и терпения.
                  А сегодня я наконец решил заявить о себе — не ради славы, а чтобы у меня была своя платформа.
                  Место, куда люди могут прийти с тем, что им дорого…
                  И уйти с улыбкой, держа в руках не просто отреставрированную вещь — а восстановленную память.
                  <br />
                  <br />
                  Я не просто чиню кожу. Я возвращаю эмоции.
                  <br />
                  <br />
                  С теплом и уважением,<br />
                  Армен Хачатрян
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs