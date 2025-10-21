import Image from 'next/image'
import React from 'react'
import headerLogo from '@/public/images/footerLogo.png'

function PageLoader() {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-[#214951] flex items-center justify-center z-[99999]'>
      <div className='flex flex-col items-center gap-20'>
        <span className="loade">
          <Image
            width={400}
            height={105}
            src={headerLogo}
            alt="Footer logo"
            priority={true}
            unoptimized
          />
        </span>
        <span className='page_loader'></span>
      </div>

    </div>
  )
}

export default PageLoader