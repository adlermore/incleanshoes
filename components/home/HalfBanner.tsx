import Link from "next/link";
import React from "react";

function HalfBanner() {
  return (
    <div className="xl:py-30 md:py-20 py-10 w-full relative">
      {/* Background video */}
      <video
        src='https://cleanshoes.proxiesseller.cc/storage/video/mainVideo.mp4'
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#ffffffa8] shadow-[6px_0px_6.8px_-4px_rgba(0,0,0,0.25)] md:max-w-1/2 z-0"></div>

      {/* Content */}
      <div className="custom_container h-full flex items-center z-10 relative">
        <div className="md:max-w-1/2 md:pr-20">
          <h1 className="text-xl xl:text-3xl mb-3 leading-tight">
            ПРЕМИУМ ХИМЧИСТКА
            <br />
            ОБУВИ, СУМОК И ОДЕЖДЫ
          </h1>
          <div className="w-full h-[2px] bg-[#ab4a1f]" />
          <p className="text-lg font-light mt-6 mb-6 leading-relaxed">
            Вернём свежесть и аккуратный вид любимым вещам за 3–14 дней.
          </p>
          <p className="text-lg mb-12 font-light leading-relaxed">
            Работаем с любыми типами загрязнений — от простых пятен до сложных повреждений ткани и кожи.
          </p>
          <Link href='/services' className="bg-[#52425c] cursor-pointer duration-300 border-2 border-transparent hover:border-sitecolor hover:bg-white text-white hover:text-sitecolor xl:px-12 py-3 px-6 xl:text-lg font-light text-sm uppercase tracking-wide">
            УЗНАТЬ БОЛЬШЕ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HalfBanner;
