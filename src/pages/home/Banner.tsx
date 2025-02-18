// Import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";

import slide1 from "@/assets/images/1.jpg";
import slide2 from "@/assets/images/2.jpg";
import slide3 from "@/assets/images/3.webp";
import slide4 from "@/assets/images/4.jpg";
import slide5 from "@/assets/images/5.jpg";

const Banner = () => {
  return (
    <div className="relative -z-10">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide1}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-20'></div>
            <div className='relative container mx-2.5 text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold mb-4 md:mb-6 uppercase'>
                Transforming Lives, One Camp at a Time!
              </h1>
              <p className='text-base md:text-2xl font-semibold'>
                Over 5,000 lives impacted through free medical care and health
                education in underserved communities.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide2}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='relative container mx-2.5 text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold mb-4 md:mb-6 uppercase'>
                Health Camps That Heal and Inspire!
              </h1>
              <p className='text-base md:text-2xl font-semibold'>
                Bringing essential healthcare services to remote regions—because
                everyone deserves a healthy life.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide3}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='relative container mx-2.5 text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold mb-4 md:mb-6 uppercase'>
                Hope Delivered Across Miles!
              </h1>
              <p className='text-base md:text-2xl font-semibold'>
                Stories of recovery, resilience, and renewed hope from our
                successful medical camps.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide4}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='relative container mx-2.5 text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold mb-4 md:mb-6 uppercase'>
                Together for Better Health!
              </h1>
              <p className='text-base md:text-2xl font-semibold'>
                Empowering communities through accessible healthcare—making a
                meaningful difference every day.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide5}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='relative container mx-2.5 text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold mb-4 md:mb-6 uppercase'>
                Your Support, Their Smile!
              </h1>
              <p className='text-base md:text-2xl font-semibold'>
                Every camp we host brings us closer to a healthier, happier
                world. Join us in making it possible!
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
