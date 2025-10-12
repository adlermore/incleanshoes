'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import contactBanner from '@/public/images/contactBanner.png'
import ContactMap from '@/components/home/ContactMap'
import { JsonContext } from '@/context/JsonContext';
import IconLocation from '@/components/Icons/IconLocation'
import IconEmail from '@/components/Icons/IconEmail'
import IconPhone from '@/components/Icons/IconPhone'
import IconGlobal from '@/components/Icons/IconGlobal'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

function ContactUs() {
  const { contacts } = useContext(JsonContext);

  return (
    <div className='relative'>
      <div className="xl:py-30 md:py-20 py-10 w-full relative">
        {/* Background video */}
        <Image
          src={contactBanner}
          fill
          alt='Contact Banner'
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#ffffffa8] shadow-xl md:max-w-1/2 z-0"></div>

        {/* Content */}
        <div className="custom_container h-full flex items-center z-10 relative">
          <div className="md:max-w-[550px] md:pr-20">
            <h1 className="text-xl xl:text-3xl mb-3 leading-tight">
              Связаться с нами
            </h1>
            <div className="w-full h-[2px] bg-[#ab4a1f]" />
            <p className="text-lg font-light mt-6 mb-6 leading-relaxed">
              Мы всегда открыты для общения и готовы помочь вам.
            </p>
            <p className="text-lg mb-12 font-light leading-relaxed">
              Свяжитесь с нами удобным для вас способом, и мы оперативно предоставим всю необходимую информацию.
            </p>
          </div>
        </div>
      </div>
      <div className='custom_container'>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 py-20 gap-6'>
          <div className='border border-[#D9D9D9] px-6 py-5 '>
            <IconLocation />
            <h2 className='font-semibold mt-5 uppercase my-2'>In Clean Shoes</h2>
            <p>Адрес: {contacts?.address}</p>
          </div>
          <div className='border border-[#D9D9D9] px-6 py-5 '>
            <IconEmail />
            <h2 className='font-semibold mt-5 my-2 uppercase'>e-mail</h2>
            <p>Email: {contacts?.email}</p>
          </div>
          <div className='border border-[#D9D9D9] px-6 py-5 '>
            <IconPhone />
            <h2 className='font-semibold mt-5 my-2 uppercase'>Phone</h2>
            <p>Телефон: {contacts?.phone}</p>
          </div>
          <div className='border border-[#D9D9D9] px-6 py-5 '>
            <IconGlobal />
            <h2 className='font-semibold mt-5 my-2 uppercase'>social media</h2>
            <div className='flex gap-4 mt-6 items-center'>
              <Link
                href={contacts?.facebook || "#"}
                aria-label="Facebook"
                className="w-10 h-10 transition-colors"
              >
                <Facebook />
              </Link>
              <Link
                href={contacts?.instagram || "#"}
                className="w-10 h-10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram />
              </Link>
              <Link
                href={contacts?.youtube || "#"}
                className="w-10 h-10 transition-colors"
                aria-label="YouTube"
              >
                <Youtube />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ContactMap isInnerPage={true} />
    </div>
  )
}

export default ContactUs