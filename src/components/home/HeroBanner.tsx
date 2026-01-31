'use client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BannerDetail } from '@/types/banners.type';
import { funcUtils } from '@/utils/func.utils';
import Link from 'next/link';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImagesItem from '../ui/ImagesItem';
import VideoItem from '../ui/VideoItem';

interface HeroBannerProps {
  slides: BannerDetail[];
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  effect?: 'slide' | 'fade';
  height?: string;
}

export default function HeroBanner({
  slides,
  autoplay = true,
  showNavigation = true,
  effect = 'fade',
  height = 'h-[50vh]',
}: HeroBannerProps) {
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${height} relative overflow-hidden`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        navigation={showNavigation}
        autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
        effect={effect === 'fade' ? 'fade' : undefined}
        loop={true}
        className='hero-banner h-full'
      >
        {slides
          .filter(slide => slide.is_active)
          .map(slide => {
            const linkVideo = funcUtils.getLinkVideo(slide);

            return (
              <SwiperSlide key={slide.id} className='relative h-full'>
                <Link href={funcUtils.getBannerLink(slide) || ''} className='block h-full w-full'>
                  {/* TH1: Banner hình */}
                  {!linkVideo && <ImagesItem data={slide} type={'SLIDER'} />}

                  {/* TH2: Banner video */}
                  {linkVideo && <VideoItem linkVideo={linkVideo} type={'SLIDER'} />}
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
