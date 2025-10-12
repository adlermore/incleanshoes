import React from 'react'

function PrivacyPolicy() {
  return (
    <div className='relative'>
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          Политика конфиденциальности
        </div>
        <div className='mt-10 mb-20 pb-20 text-base sm:text-lg leading-8 text-gray-700'>
          <div className='text-xl font-semibold'>Ваша конфиденциальность — наша ответственность</div>
          <p className="mt-4 leading-normal pb-10 border-b border-gray-300">
            В Clean Shoes Service мы уделяем особое внимание защите вашей личной информации и прозрачности в том, как мы собираем, используем и храним данные.  
            Ваше доверие начинается с понимания того, что происходит «за кулисами», когда вы посещаете наш сайт или пользуетесь нашими услугами по премиум-химчистке обуви, сумок и одежды.
          </p>

          <h3 className="mt-7 ml-2 text-xl font-semibold leading-tight">
            Какие данные мы собираем
          </h3>
          <p className="mt-4 leading-normal">
            Мы можем собирать основную личную информацию, когда вы:
            <br />
            • Заполняете контактные формы  
            <br />
            • Оставляете заявку на услугу или консультацию  
            <br />
            • Подписываетесь на обновления или акции
          </p>
          <p className="mt-4 leading-normal">
            Это может включать:
            <br />
            • Ваше имя и контактные данные (телефон, email)  
            <br />
            • Загруженные изображения (например, фото обуви, сумок или одежды для оценки)  
            <br />
            • Дополнительную информацию, предоставленную по вашему желанию
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            Как мы используем ваши данные
          </h3>
          <p className="mt-4 leading-normal tracking-wider">
            Вся собранная информация используется исключительно для:
            <br />
            • Ответов на ваши запросы и предоставления поддержки  
            <br />
            • Связи с вами по поводу статуса заказа или услуги  
            <br />
            • Информирования о новых предложениях и акциях  
            <br />
            • Улучшения качества обслуживания клиентов  
            <br />
            • Размещения фотографий результатов чистки (только с вашего согласия)
          </p>
          <p className="mt-8 leading-normal">
            Мы не передаём и не продаём ваши данные третьим лицам.  
            Вся информация хранится безопасно и используется исключительно в рамках Clean Shoes Service.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            Защита данных
          </h3>
          <p className="mt-4 leading-normal">
            Все данные хранятся в защищённой среде с ограниченным доступом и, при необходимости, шифруются.  
            Мы используем современные технологии для предотвращения несанкционированного доступа, изменения или утечки информации.
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            Ваши права
          </h3>
          <p className="mt-3.5 leading-normal">
            Вы имеете право:
            <br />
            • Запросить доступ к вашим данным  
            <br />
            • Внести изменения или удалить их  
            <br />
            • Отозвать согласие на обработку данных  
            <br />
            • Отказаться от получения рассылок и уведомлений
          </p>
          <p className="mt-8 leading-normal">
            Чтобы воспользоваться этими правами, свяжитесь с нашим ответственным за обработку данных по адресу:  
            <span className='font-medium'>privacy@cleanshoes.am</span>
          </p>

          <h3 className="mt-7 ml-1.5 text-xl font-semibold leading-tight">
            Обновления политики
          </h3>
          <p className="mt-3.5 leading-normal">
            Мы можем периодически обновлять настоящую Политику конфиденциальности.  
            Все изменения будут опубликованы на этой странице.  
            Продолжая использовать наш сайт и услуги, вы подтверждаете своё согласие с обновлёнными условиями.
          </p>

          <p className="mt-14 text-xs italic font-thin leading-loose">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
