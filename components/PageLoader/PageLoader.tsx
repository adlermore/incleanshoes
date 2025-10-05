import Image from 'next/image'
import React from 'react'
import headerLogo from '@/public/images/header_logo.png'

function PageLoader() {
  return (
    <div className='page_loader'>
      <span className="loader">
          <Image
                width={400}
                height={105}
                src={headerLogo}
                alt="Ricardo portrait"
                priority={true}
                unoptimized
              />
      </span>
    </div>
  )
}

export default PageLoader