'use client'
import Image from "next/image"
// import footerLogo from "@/public/images/footerLogo.png"
import footerLogo from "@/public/images/footerLogo.svg"
import { JsonContext } from "@/context/JsonContext";
import { useContext } from "react";
import Link from "next/link";
import IconFb from "../Icons/IconFb";
import IconTelegram from "../Icons/IconTelegram";
import IconInsta from "../Icons/IconInsta";
import IconWhatsap from "../Icons/IconWhatsap";

export default function Footer() {
  const { contacts } = useContext(JsonContext);
  return (
    <footer className="bg-[#281822]  text-white sm:px-8 px-5 sm:py-16 py-8 ">
      <div className="custom_container">
        {/* Logo Section */}
        <div className="md:mb-16 mb-10">
          <Image
            src={footerLogo}
            alt="Logo"
            width={250}
            height={80}
            priority
          />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 xl:gap-12 mb-16">
          {/* О НАС Column */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-medium mb-6">О НАС</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-[#a2a2a2] hover:text-white transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="/works" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Кейсы
                </a>
              </li>
              <li>
                <a href="/testimonials" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Отзывы
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* УСЛУГИ Column */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-medium mb-6">УСЛУГИ</h3>
            <ul className="space-y-3">
              <li>
                <a href="/prices" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Стоимость услуг
                </a>
              </li>
              <li>
                <a href="/works" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Работы
                </a>
              </li>
            </ul>
          </div>

          {/* Middle Column */}
          <div className="mb-8 md:mb-0">
            <ul className="space-y-3 md:mt-12">
              <li>
                <a href="/privacy-policy" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Конфиденциальность
                </a>
              </li>
              <li>
                <a href="/faq" className="text-[#a2a2a2] hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="mb-8 md:mb-0">
            <div className="space-y-6">
              <a href={`tel:${contacts?.phone}`} className="block text-lg hover:text-[#ab4a1f] transition-colors">
                {contacts?.phone}
              </a>
              <a
                href={`mailto:${contacts?.email}`}
                className="block text-[#a2a2a2] hover:text-white transition-colors"
              >
                {contacts?.email}
              </a>
              <p className="text-[#a2a2a2]">{contacts?.address || 'Адрес не указан'}</p>
              <p className="text-[#a2a2a2]">Время работы: ежедневно с. 9:00 до 21:00</p>

              {/* Social Icons */}
              <div className="flex gap-4 pt-4">
                {/* <Link
                  href={contacts?.facebook || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center rounded-sm hover:bg-[#8a3a19] transition-colors"
                  aria-label="Facebook"
                >
                  <IconFb className="w5" />
                </Link> */}
                <Link
                  href={'https://t.me/' + contacts?.telegram || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center rounded-sm hover:bg-[#8a3a19] transition-colors"
                  aria-label="Telegram"
                >
                  <IconTelegram className="w-5 h-5" />
                </Link>
                {/* <Link
                  href={contacts?.instagram || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center rounded-sm hover:bg-[#8a3a19] transition-colors"
                  aria-label="Instagram"
                >
                  <IconInsta className="w-5 h-5" />
                </Link> */}
                <Link
                  href={'https://wa.me/' + contacts?.whatsapp || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center rounded-sm hover:bg-[#8a3a19] transition-colors"
                  aria-label="WhatsApp"
                >
                  <IconWhatsap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#ab4a1f] mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a2a2a2]">
          <p>© {new Date().getFullYear()} Light Design Studio</p>
          <div className="sm:flex items-center text-center gap-4">
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <span className="hidden sm:inline text-[#ab4a1f]">|</span>
            <a href="/terms" className="hover:text-white transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
