import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, A11y, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import slide1 from "@/assets/images/1.jpg";
import slide2 from "@/assets/images/2.jpg";
import slide3 from "@/assets/images/3.webp";
import slide4 from "@/assets/images/4.jpg";
import slide5 from "@/assets/images/5.jpg";

const Banner = () => {
  return (
    <div>
      <Swiper
        modules={[Pagination, A11y, Autoplay, EffectFade]}
        effect='fade'
        spaceBetween={0}
        slidesPerView={1}
        pagination
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <div className='relative h-[80vh] flex items-center justify-center'>
            <img
              src={slide1}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='relative container mx-2.5 px- text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl font-semibold mb-4 md:mb-6 uppercase'>
                Transforming Lives, One Camp at a Time!
              </h1>
              <p className='text-base md:text-lg px-10'>
                Over 5,000 lives impacted through free medical care and health
                education in underserved communities.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[80vh] flex items-center justify-center'>
            <img
              src={slide2}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='relative container mx-2.5 px- text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl font-semibold mb-4 md:mb-6 uppercase'>
                Health Camps That Heal and Inspire!
              </h1>
              <p className='text-base md:text-lg px-10'>
                Bringing essential healthcare services to remote regions—because
                everyone deserves a healthy life.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[80vh] flex items-center justify-center'>
            <img
              src={slide3}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='relative container mx-2.5 px- text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl font-semibold mb-4 md:mb-6 uppercase'>
                Hope Delivered Across Miles!
              </h1>
              <p className='text-base md:text-lg px-10'>
                Stories of recovery, resilience, and renewed hope from our
                successful medical camps.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[80vh] flex items-center justify-center'>
            <img
              src={slide4}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='relative container mx-2.5 px- text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl font-semibold mb-4 md:mb-6 uppercase'>
                Together for Better Health!
              </h1>
              <p className='text-base md:text-lg px-10'>
                Empowering communities through accessible healthcare—making a
                meaningful difference every day.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[80vh] flex items-center justify-center'>
            <img
              src={slide5}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='relative container mx-2.5 px- text-center flex flex-col items-center justify-center text-white h-full w-full'>
              <h1 className='text-3xl md:text-5xl font-semibold mb-4 md:mb-6 uppercase'>
                Your Support, Their Smile!
              </h1>
              <p className='text-base md:text-lg px-10'>
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
