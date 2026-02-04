import { Suspense } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import { getBannerByCode } from '@/services/banner.services';
import { ApiKey } from '@/utils/enums.utils';
import { RouteProps } from '@/types/api.type';
import { getProducts } from '@/services/products.services';
import ProductsCarousel from '@/components/product/ProductsCarousel';


export default async function HomePage({ params }: RouteProps<{ lang: string }>) {
  const { lang } = await params;

  const dataBanner = await getBannerByCode(ApiKey.achievement, {
    lang: lang,
  });

  const products = await getProducts({
    lang: lang,
    is_root: '1',
  });

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroBanner
          slides={dataBanner.data?.details ?? []}
          autoplay={true}
          showNavigation={true}
          showPagination={true}
          effect='slide'
          height='h-[65vh]'
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsCarousel title='Sản phẩm mới' products={products ?? []} className='container my-4' lang={lang} />
      </Suspense>
    </main>
  );
}
