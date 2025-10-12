import Image from 'next/image'
import React from 'react'
import history from '@/public/images/history.png'
import Link from 'next/link'

function OurHistory() {
  return (
    <div className="min-h-screen mt-20 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-screen">
        <Image
          src={history}
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

        <div className="flex justify-end mt-12 lg:mt-16">
          <Link href="/about" className="border-2 border-[#000000] bg-transparent sm:px-8 px-4 sm:py-4 py-3 cursor-pointer hover:text-sitecolor hover:bg-white text-[#000000] text-sm tracking-widest  transition-colors duration-300">
            ПОСМОТРЕТЬ БОЛЬШЕ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OurHistory