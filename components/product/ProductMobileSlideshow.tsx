'use client'

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css'
import './slideshow.css';
import Image from "next/image";

interface Props {
  images: string[]
  title: string
  className?: string
}

const ProductMobileSlideshow = ({ images, title, className }: Props) => {

  return (
    <div className={className}>
      
      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        autoplay={{delay: 2500}}
        pagination
        centeredSlides={true}
        modules={[Autoplay, Pagination, FreeMode]}
        className="mySwiper2"
      >
        {
          images.map( image => (
            <SwiperSlide key={image}>
              <Image 
                src={`/products/${image}`}
                alt={title}
                width={600}
                height={500}
                className="object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

    </div>
  )
}

export default ProductMobileSlideshow