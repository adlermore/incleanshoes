'use client'
import { Facebook, Send, Instagram, MessageCircle } from "lucide-react"
import Image from "next/image"
import footerLogo from "@/public/images/footerLogo.png"
import { JsonContext } from "@/context/JsonContext";
import { useContext } from "react";
import Link from "next/link";

export default function Footer() {
  const { contacts } = useContext(JsonContext);
  return (
    <footer className="bg-[#281822]  text-white px-8 py-16 p-15">
      <div className="custom_container">
        {/* Logo Section */}
        <div className="mb-16">
          <Image
            src={footerLogo}
            alt="Logo"
            width={200}
            height={50}
            priority
          />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 xl:gap-12 mb-16">
          {/* О НАС Column */}
          <div>
            <h3 className="text-lg font-medium mb-6">О НАС</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  О компании
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Кейсы
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Отзывы
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* УСЛУГИ Column */}
          <div>
            <h3 className="text-lg font-medium mb-6">УСЛУГИ</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Цены
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Фотогалерея
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Работы
                </a>
              </li>
            </ul>
          </div>

          {/* Middle Column */}
          <div>
            <ul className="space-y-3 mt-12">
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Конфиденциальность
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  Доставка
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a2a2a2] hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <div className="space-y-6">
              <a href="tel:+70000000000" className="block text-lg hover:text-[#ab4a1f] transition-colors">
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
                <Link
                  href={contacts?.facebook || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center hover:bg-[#8a3a19] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href={'https://t.me/' + contacts?.telegram || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center hover:bg-[#8a3a19] transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5" />
                </Link>
                <Link
                  href={contacts?.instagram || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center hover:bg-[#8a3a19] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href={'https://wa.me/' + contacts?.whatsapp || "#"}
                  className="w-10 h-10 bg-[#ab4a1f] flex items-center justify-center hover:bg-[#8a3a19] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
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
            <a href="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <span className="hidden sm:inline text-[#ab4a1f]">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
