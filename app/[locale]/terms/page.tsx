import React from 'react'

function TermsOfService() {
  return (
    <div className='relative'>
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          Пользовательское соглашение
        </div>
        <div className='mt-10 mb-20 pb-20 text-base sm:text-lg leading-8 text-gray-700'>
          <div className='text-xl font-semibold'>
            Добро пожаловать в Clean Shoes Service
          </div>
          <p className="mt-4 leading-normal pb-10 border-b border-gray-300">
            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между клиентом (далее — «Пользователь») и сервисом <span className='font-medium'>Clean Shoes Service</span>, оказывающим услуги по премиум-химчистке обуви, сумок и одежды.
            Используя наш сайт и заказывая услуги, вы подтверждаете, что ознакомились с условиями данного Соглашения и согласны с ними.
          </p>

          <h3 className="mt-7 ml-2 text-xl font-semibold leading-tight">
            1. Общие положения
          </h3>
          <p className="mt-4 leading-normal">
            1.1. Clean Shoes Service предоставляет услуги по профессиональной чистке и уходу за обувью, одеждой и аксессуарами.  
            <br />
            1.2. Пользователь обязан предоставлять достоверную информацию при оформлении заказа, включая контактные данные и описание изделия.  
            <br />
            1.3. Заказывая услугу, Пользователь подтверждает, что является владельцем передаваемого изделия или имеет на это законное право.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            2. Условия предоставления услуг
          </h3>
          <p className="mt-4 leading-normal">
            2.1. Срок выполнения услуг составляет от 3 до 14 дней, в зависимости от степени загрязнения и сложности работы.  
            <br />
            2.2. Сервис не несёт ответственности за скрытые дефекты изделия (износ, потерю цвета, слабые швы и т.п.), которые могут проявиться в процессе чистки.  
            <br />
            2.3. Все работы выполняются с максимальной осторожностью и с использованием профессиональных средств, соответствующих типу материала.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            3. Оплата и возвраты
          </h3>
          <p className="mt-4 leading-normal">
            3.1. Стоимость услуг указывается на сайте или уточняется индивидуально при оформлении заказа.  
            <br />
            3.2. Оплата может производиться наличным или безналичным способом.  
            <br />
            3.3. Возврат средств осуществляется только в случае ненадлежащего оказания услуги, подтверждённого проверкой качества Clean Shoes Service.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            4. Ответственность сторон
          </h3>
          <p className="mt-4 leading-normal">
            4.1. Clean Shoes Service не несёт ответственности за:
            <br />
            • Изменение цвета или структуры материала при сильном износе;  
            <br />
            • Повреждения, вызванные естественным старением изделия;  
            <br />
            • Потерю элементов декора, пуговиц или фурнитуры, закреплённых ненадёжно.  
            <br />
            4.2. Пользователь обязуется использовать сайт и услуги добросовестно, не нарушая действующее законодательство.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            5. Конфиденциальность
          </h3>
          <p className="mt-4 leading-normal">
            5.1. Все персональные данные Пользователя обрабатываются в соответствии с <span className='font-medium'>Политикой конфиденциальности</span> Clean Shoes Service.  
            <br />
            5.2. Информация не передаётся третьим лицам без согласия Пользователя, за исключением случаев, предусмотренных законом.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            6. Изменения в условиях
          </h3>
          <p className="mt-4 leading-normal">
            6.1. Clean Shoes Service оставляет за собой право вносить изменения в настоящее Соглашение без предварительного уведомления.  
            <br />
            6.2. Обновлённая версия Соглашения публикуется на сайте и вступает в силу с момента размещения.  
            <br />
            6.3. Продолжение использования сайта означает согласие с изменёнными условиями.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            7. Контактная информация
          </h3>
          <p className="mt-4 leading-normal">
            По всем вопросам, связанным с работой сайта и услугами, вы можете связаться с нами по адресу:  
            <span className='font-medium'>info@cleanshoes.am</span>
          </p>

          <p className="mt-14 text-xs italic font-thin leading-loose">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
