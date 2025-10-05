import React from 'react'
import IconWhy1 from '../Icons/IconWhy1'
import IconWhy2 from '../Icons/IconWhy2'
import IconWhy3 from '../Icons/IconWhy3'
import IconWhy4 from '../Icons/IconWhy4'

function WhyUs() {
  return (
    <div className="bg-[#f5f4f4] py-20 mt-16 px-6 lg:px-12">
      <div className='custom_container'>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#ffffff]  p-6 shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center bg-[#ab4a1f] rounded mb-4" >
                <IconWhy1 />
              </div>
              <h3 className="text-[#000000] text-xl  mb-3">ОПЫТ</h3>
              <p className="text-[#52425c] text-sm leading-relaxed">
                Мы уже много лет восстанавливаем обувь, сумки и одежду — знаем, как справиться даже с самыми сложными
                загрязнениями.
              </p>
            </div>
            <div className="bg-[#ffffff]  p-6 shadow-sm">
              <div className="w-16 h-16 bg-[#ab4a1f] rounded mb-4 flex items-center justify-center">
                <IconWhy2 />
              </div>
              <h3 className="text-[#000000] text-xl  mb-3">ЦЕНА</h3>
              <p className="text-[#52425c] text-sm leading-relaxed">
                Прозрачная стоимость без скрытых платежей. Вы заранее знаете, сколько будет стоить услуга.
              </p>
            </div>
            <div className="bg-[#ffffff]  p-6 shadow-sm">
              <div className="w-16 h-16 bg-[#ab4a1f] rounded mb-4 flex items-center justify-center">
                <IconWhy3 />
              </div>
              <h3 className="text-[#000000] text-xl  mb-3">СКОРОСТЬ</h3>
              <p className="text-[#52425c] text-sm leading-relaxed">
                Выполняем заказы за 3–14 дней в зависимости от сложности чистки.
              </p>
            </div>
            <div className="bg-[#ffffff]  p-6 shadow-sm">
              <div className="w-16 h-16 bg-[#ab4a1f] rounded mb-4 flex items-center justify-center">
                <IconWhy4 />
              </div>
              <h3 className="text-[#000000] text-xl  mb-3">УДОБСТВО</h3>
              <p className="text-[#52425c] text-sm leading-relaxed">
                Забор и доставка вещей курьером — вам не нужно тратить время на дорогу.
              </p>
            </div>
          </div>
          <div className="lg:pt-8 sm:pl-10">
            <h2 className="text-[#000000] text-4xl lg:text-3xl  mb-8 tracking-wider">
              ПОЧЕМУ
              <br />
              ВЫБИРАЮТ НАС
            </h2>
            <div className="space-y-6 text-[#000000] text-base leading-relaxed">
              <p>Нам доверяют сотни клиентов, потому что мы объединяем качество, удобство и заботу о каждой вещи.</p>
              <p>
                Мы используем только безопасные и сертифицированные средства, подбираем индивидуальный метод чистки и
                гарантируем результат.
              </p>
              <p>
                С нами вы экономите время, ведь вещи заберёт и вернёт курьер, а результат приятно удивит даже самых
                требовательных клиентов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyUs