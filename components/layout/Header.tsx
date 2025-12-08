'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Twirl as Hamburger } from 'hamburger-react'
import "@/styles/header.scss"
import Image from 'next/image';
// import headerLogo from '@/public/images/header_logo.png'
import headerLogo from '@/public/images/header_logo.svg'
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import IconHeaderTelegram from '../Icons/IconHeaderTelegram';
import IconHeaderWhatsapp from '../Icons/IconHeaderWhatsapp';
import IconArrowDown from '../Icons/IconArrowDown';
import api from '@/utils/api';
import { JsonContext } from '@/context/JsonContext';

function Header() {
  const [isOpen, setOpen] = useState(false);
  const { contacts, setContacts } = useContext(JsonContext);

  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1];

  const switchLocale = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/') || '/';
    router.replace(newPath);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('menu_opened');
    } else {
      document.body.classList.remove('menu_opened');
      document.body.style.overflow = "visible";
    }
  }, [isOpen, pathname]);


  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    async function getContacts() {
      try {
        const data = await api.get("/getContacts");
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }
    if (!contacts) getContacts();
  }, []);
  
  return (
    <header className='header'>
      <div className='custom_container'>
        <div className='header_inner'>
          <div className='menu_block desktop_menu flex-1'>
            <div className='flex gap-5 items-center pb-[10px] border-b border-[#352B33]'>
              <Link href={`https://t.me/${contacts?.telegram}`} target='_blank' className='duration-300 hover:opacity-70'><IconHeaderTelegram /></Link>
              <Link href={`https://wa.me/${contacts?.whatsapp}`} target='_blank' className='duration-300 hover:opacity-70'><IconHeaderWhatsapp /></Link>
            </div>
            <div className='flex items-center half_menu justify-around pt-3 font-medium text-[15px] uppercase ml-4'>
              <Link href='/services'>Услуги</Link>
              <Link href='/works'>Работы</Link>
              <Link href='/contacts'>Контакты</Link>
            </div>
          </div>
          <div className='mobile_sociels'>
            <div className='flex gap-5 items-center pl-3'>
              <Link href={`https://t.me/${contacts?.telegram}`} target='_blank' className='duration-300 hover:opacity-70'><IconHeaderTelegram /></Link>
              <Link href={`https://wa.me/${contacts?.whatsapp}`} target='_blank' className='duration-300 hover:opacity-70'><IconHeaderWhatsapp /></Link>
            </div>
          </div>
          {/* Logo */}
          <div className='header_logo'>
            <Link href='/' className='z-20 mobile:mx-auto'>
              <Image
                width={265}
                height={90}
                src={headerLogo}
                alt="Logo"
                priority={true}
                unoptimized
              />
            </Link>
          </div>

          {/* Right menu (hidden on mobile) */}
          <div className='menu_block desktop_menu flex-1'>
            <div className='flex gap-5 justify-end items-center pb-[10px] border-b border-[#352B33]'>
              <div className='lg_block cursor-not-allowed'>
                <button
                  onClick={() => switchLocale('ru')}
                  className={currentLocale === 'ru' ? 'active' : ''}
                >
                  Russian
                </button>
                <span>
                  <IconArrowDown />
                </span>
              </div>
            </div>
            <div className='flex items-center half_menu justify-around pt-3 font-medium text-[15px] uppercase ml-4'>
              <Link href='/about'>О нас</Link>
              <Link href='/prices'>Прайс</Link>
              <Link href='/faq'>FAQ</Link>
            </div>
          </div>

          {/* Hamburger (mobile only) */}
          <div className="hamburger_block">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              size={22}
              direction='right'
              color="#000"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div className={`mobile_menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile_links">
          <Link href='/services'>Услуги</Link>
          <Link href='/works'>Работы</Link>
          <Link href='/contacts'>Контакты</Link>
          <Link href='/about'>О нас</Link>
          <Link href='/prices'>Прайс</Link>
          <Link href='/faq'>FAQ</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
