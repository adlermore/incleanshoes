import Image from 'next/image'
import React from 'react'
import about1 from '@/public/images/about1.png'
import about2 from '@/public/images/about2.png'
import aboutBanner from '@/public/images/aboutBanner.png'
import history from '@/public/images/history.png'

function AboutUs() {
  return (
    <div className='relative pb-20'>
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <Image
          src={aboutBanner}
          fill
          alt="Service Banner"
          className="object-cover"
        />
      </div>
      <div className="custom_container">
        <div className="mt-12 text-2xl sm:text-3xl uppercase pb-4 border-b border-[#AB4A1F] max-w-fit">
          О нас
        </div>
        <div className="mt-6 mb-12 pb-20 text-base sm:text-lg leading-8 text-gray-700">
          Мы заботимся о вашей одежде, обуви и аксессуарах так же, как о своих.
          <br />
          Наша цель — вернуть вещам свежий вид и продлить их жизнь.
        </div>
      </div>
      <div className='custom_container'>
        <div className=" mt- flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-screen">
            <Image
              src={history}
              alt="Craftsperson working on leather"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="w-full lg:w-1/2 bg-[#f5f4f4] flex flex-col justify-between p-4 lg:p-16 xl:p-24">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-[#000000] text-xl lg:text-2xl xl:text-3xl  tracking-wide mb-8 lg:mb-12">
                НАША ИСТОРИЯ
              </h1>

              <div className="space-y-6 text-[#000000] text-base lg:text-lg leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </p>

                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore
                  eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
                  zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-15 flex flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-screen">
            <Image
              src={about2}
              alt="Craftsperson working on leather"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="w-full lg:w-1/2 bg-[#f5f4f4] flex flex-col justify-between p-4 lg:p-16 xl:p-24">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-[#000000] text-xl lg:text-2xl xl:text-3xl  tracking-wide mb-8 lg:mb-12">
                НАША ИСТОРИЯ
              </h1>

              <div className="space-y-6 text-[#000000] text-base lg:text-lg leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </p>

                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore
                  eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
                  zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs