'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import faqSection from '@/public/images/faqSection.png'

const faqData = [
  {
    question: 'Можно почистить обувь после сильного загрязнения?',
    answer:
      'Да, мы используем профессиональные средства, которые эффективно удаляют даже сложные загрязнения, не повреждая материал. После чистки обувь дополнительно обрабатывается защитным составом.',
  },
  {
    question: 'Сколько времени занимает чистка обуви?',
    answer:
      'В среднем чистка занимает от 1 до 3 дней, в зависимости от степени загрязнения и типа материала. Для премиум-ухода или редких материалов срок может быть увеличен до 5 дней.',
  },
  {
    question: 'Можно ли почистить обувь из замши или нубука?',
    answer:
      'Да, мы используем только деликатные профессиональные средства, подходящие для замши, нубука и других чувствительных материалов.',
  },
  {
    question: 'Вы чистите сумки и одежду?',
    answer:
      'Да, Clean Shoes Service предлагает премиум-химчистку не только обуви, но и сумок, курток, пуховиков, пальто и других изделий.',
  },
  {
    question: 'Предоставляете ли вы услугу доставки?',
    answer:
      'Да, мы предоставляем бесплатный concierge-service 24/7. Мы заберем и вернем ваши вещи в удобное для вас время и с удобного вам адреса, где бы Вы не находились.',
  },
  {
    question: 'Как я могу оформить заказ?',
    answer:
      'Вы можете оформить заказ онлайн на нашем сайте или по телефону. После оформления мы свяжемся с вами для подтверждения деталей.',
  },
  {
    question: 'Можно ли оплатить услуги онлайн?',
    answer:
      'Да, оплата доступна онлайн.',
  },
  {
    question: 'Что делать, если я не доволен результатом?',
    answer:
      'Мы гарантируем качество наших услуг. Если вы недовольны результатом, мы бесплатно проведём повторную чистку или исправим недостатки.',
  },
  {
    question: 'Обрабатывается ли обувь защитными средствами после чистки?',
    answer:
      'Да, каждая пара после чистки проходит обработку специальными защитными средствами, которые предотвращают повторное загрязнение и воздействие влаги.',
  },
  {
    question: 'Можно ли почистить детскую обувь?',
    answer:
      'Да, мы бережно чистим детскую обувь, используя только безопасные и гипоаллергенные средства.',
  },
  {
    question: 'Как хранить обувь после химчистки?',
    answer:
      'Рекомендуем хранить обувь в сухом месте, в фирменном мешке или коробке, вдали от прямых солнечных лучей. Мы можем предоставить специальные мешки для хранения.',
  },
  {
    question: 'Работаете ли вы с корпоративными клиентами?',
    answer:
      'Да, мы предлагаем специальные условия и скидки для корпоративных клиентов, отелей, спортивных клубов и бутиков.',
  },
]

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="relative pb-20">
      {/* Header Banner */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[370px]">
        <Image
          src={faqSection}
          fill
          alt="FAQ Banner"
          className="object-cover"
        />
      </div>

      {/* FAQ Section */}
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit mb-8">
          Часто задаваемые вопросы
        </div>

        <div className="grid sm:mt-20 py-10 pt-4 md:grid-cols-2 gap-8">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <div className={`font-medium duration-300 text-lg ${activeIndex === index ? 'text-[#AB4A1F]' : ''}`}>
                  {item.question}
                </div>
                <button
                  className="ml-4 flex-shrink-0 text-[#AB4A1F]"
                  aria-label={activeIndex === index ? 'Collapse' : 'Expand'}
                >
                  {activeIndex === index ? <Minus size={22} /> : <Plus size={22} />}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden mt-3"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
