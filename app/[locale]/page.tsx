import { BeforeAfterCarousel } from "@/components/home/before-after-carousel";
import { CenteredSlider } from "@/components/home/CenteredSlider";
import ContactMap from "@/components/home/ContactMap";
import HalfBanner from "@/components/home/HalfBanner";
import OurHistory from "@/components/home/OurHistory";
import RequestForm from "@/components/home/RequestForm";
import SeondHalf from "@/components/home/SeondHalf";
import ServiceCalculate from "@/components/home/ServiceCalculate";
import Services from "@/components/home/Services";
import { ServicesSlider } from "@/components/home/ServicesSlider";
import SmallContactForm from "@/components/home/SmallContactForm";
import { Testimonials } from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import Link from "next/link";


export default async function Home() {
  return (
    <div>
      <HalfBanner />
       <SmallContactForm />
      <div className="custom_container">
        <div className="section_title">
          Наши услуги
        </div>
        <Services />
        <div className="section_title">
          Наши работы
        </div>
        <BeforeAfterCarousel />
        <Link href="/gallery" className="mx-auto site_hover mt-18 mb-16 bg-[#AB4A1F] cursor-pointer duration-300 hover:opacity-70 text-white  xl:px-12 py-3 px-6  xl:text-lg font-light text-sm uppercase tracking-wide block w-max">
          Посмотреть больше
        </Link>
      </div>
      <SeondHalf />
      <div className="custom_container">
        <div className="section_title">
          Мы предлагаем
        </div>
        <ServicesSlider />
      </div>
      <RequestForm />
      <WhyUs />
      <div className="custom_container">
        <div className="section_title">
          Наши работы
        </div>
      </div>
      <CenteredSlider />
      <ServiceCalculate />
      <div className="custom_container">
        <div className="section_title">
          Отзывы
        </div>
        <Testimonials />
      </div>
      <div className="custom_container">
        <OurHistory />
      </div>
     <ContactMap />
    </div>
  );
}
