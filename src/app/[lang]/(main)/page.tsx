import { Suspense } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import { getBannerByCode } from '@/services/banner.services';
import { ApiKey } from '@/utils/enums.utils';
import { RouteProps } from '@/types/api.type';



async function BannerSection({ lang }: { lang: string }) {
  const dataBanner = await getBannerByCode(ApiKey.achievement, {
    lang: lang,
  });

  return (
    <HeroBanner
      slides={dataBanner.data?.details ?? []}
      autoplay={true}
      showNavigation={true}
      showPagination={true}
      effect='slide'
      height='h-[65vh]'
    />
  );
}

export default function HomePage({ params }: RouteProps<{ lang: string }>) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <BannerSection lang={params.lang} />
      </Suspense>
    </main>
  );
}
