'use client'
import { Swiper } from 'swiper/react'
import { SwiperSlide } from 'swiper/react'


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css'
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={`${className}`}>
    
      <Swiper
        style={{
          width:'100vw', height:'500px',
          '--swiper-navigation-color': '#713F12',
          '--swiper-pagination-color': '#713F12',
        } as React.CSSProperties}
        pagination
        autoplay={{delay: 2500}}
        modules={[FreeMode, Thumbs, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map( image => (
            <SwiperSlide key={image}>
                <Image width={600} height={500} src={`/products/${image}`} alt={title} className=' object-fill'/>
            </SwiperSlide>
        ))}
       
      </Swiper>
 
    </div>
  )
}
