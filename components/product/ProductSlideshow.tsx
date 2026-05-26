'use client'

import { useState } from "react";
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css'
import './slideshow.css';
import Image from "next/image";

interface Props {
  images: string[]
  title: string
  className?: string
}

const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties }
        // loop={true}
        autoplay={{delay: 2500}}
        pagination={{clickable: true}}
        centeredSlides={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Autoplay, Pagination, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {
          images.map( image => (
            <SwiperSlide key={image}>
              <Image 
                src={`/products/${image}`}
                alt={title}
                width={1024}
                height={800}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        // loop={true}
        autoplay={{delay: 2500}}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Autoplay, Pagination, FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map( image => (
            <SwiperSlide key={image}>
              <Image 
                src={`/products/${image}`}
                alt={title}
                width={300}
                height={300}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

    </div>
  )
}

export default ProductSlideshow