'use client';

import { BannerDetail, UrlVideo } from '@/types/banners.type';
import { ScreenSize } from '@/utils/enums.utils';
import { cn } from '@heroui/react';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';

const VideoItem = ({
  linkVideo,
  className,
  type,
}: {
  linkVideo: UrlVideo;
  className?: string;
  type?: BannerDetail['type'];
}) => {
  const { url, url_mobile } = linkVideo;

  const isMd = useMediaQuery({
    query: `(min-width: ${ScreenSize.tablet})`,
  });

  return (
    <div
      className={cn(
        'h-[100vw] md:h-[56vw]',
        {
          'h-[220px] md:h-[500px]': type == 'SLIDER-DETAIL-PAGE',
        },
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute left-0 top-0 -z-50 h-full w-full object-cover duration-300',
        )}
      >
        <ReactPlayer
          width='100%'
          height='100%'
          className='react-player'
          url={`${isMd ? url : (url_mobile ?? url)}`}
          playing={true}
          controls={false}
          muted={true}
          pip={false}
          loop={true}
        />
      </div>
    </div>
  );
};

export default VideoItem;
