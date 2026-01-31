'use client';
import { BannerDetail, BannerProps } from '@/types/banners.type';
import { SCALE_2K } from '@/utils/constants.utils';
import { ScreenSize } from '@/utils/enums.utils';
import { cn } from '@heroui/react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const ImagesItem = ({ data, type, className }: BannerProps<BannerDetail>) => {
  const isMd = useMediaQuery({
    query: `(min-width: ${ScreenSize.tablet})`,
  });

  return (
    <Image
      className={cn(
        'pointer-events-none block h-full w-full flex-col object-cover md:flex-row',
        {
          'h-[100vw] md:h-[56.25vw]': type == 'SLIDER',
          'h-[220px] md:h-[500px]': type == 'SLIDER-DETAIL-PAGE',
        },
        className,
      )}
      alt={`${isMd
        ? (data?.image_alt ?? 'Hình Banner')
        : (data?.image_alt_mobile ?? data?.image_alt ?? 'Hình Banner')
        }`}
      src={`${isMd ? data?.image_url : (data?.image_url_mobile ?? data?.image_url)}`}
      width={1920}
      height={1080}
    />
  );
};

export default ImagesItem;
