'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, CardBody, CardFooter, cn } from '@heroui/react';
import { Icon } from '@iconify/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductData } from '@/types/product.type';
import { useClientTranslation } from '@/lib/i18n/client';
import { useCart } from '@/hooks/useCart';


interface ProductsCarouselProps {
  title?: string;
  subtitle?: string;
  products: ProductData[];
  slidesPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    largeDesktop?: number;
  };
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  lang?: string;
}

export default function ProductsCarousel({
  title,
  subtitle,
  products,
  slidesPerView = { mobile: 2, tablet: 2, desktop: 4, largeDesktop: 5 },
  autoplay = false,
  showNavigation = true,
  showPagination = false,
  className = '',
  lang = 'vi',
}: ProductsCarouselProps) {
  const { t } = useClientTranslation();
  const { addToCart } = useCart();

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full py-6', className)}>

      <div className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='flex items-center gap-3'>
          {title && (
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-7 bg-primary rounded-full shadow-sm"></div>
              <h2 className="text-xl font-bold font-gilroy text-primary uppercase tracking-wide">
                {title}
              </h2>
            </div>
          )}
          {subtitle && (
            <span className='text-sm text-gray-500 hidden md:inline'>{subtitle}</span>
          )}
        </div>

        <Link
          href={`${lang}/products`}
          className='flex items-center gap-2 text-primary font-medium hover:text-primary-600 transition-colors group'
        >
          <div className='p-2 rounded-lg bg-gray-100 group-hover:bg-primary/10 transition-colors'>
            <Icon icon='solar:sort-from-bottom-to-top-linear' className='text-lg' />
          </div>
          <span>Xem tất cả</span>
          <Icon icon='heroicons:arrow-right' className='text-lg group-hover:translate-x-1 transition-transform' />
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={slidesPerView.mobile}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
        breakpoints={{
          480: {
            slidesPerView: slidesPerView.mobile || 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: slidesPerView.tablet || 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: slidesPerView.desktop || 5,
            spaceBetween: 20,
          },
        }}
        className='products-carousel !pb-2'
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <div
              className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white'
              onMouseEnter={() => setHoveredProduct(Number(product.id))}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className='relative aspect-square overflow-hidden bg-gray-50'>
                <Link href={`${lang}/product/${product.slug}`} className='block h-full w-full'>
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    sizes='(max-width: 480px) 50vw, (max-width: 768px) 33vw, 20vw'
                    className='object-contain p-4 transition-transform duration-500 group-hover:scale-105'
                  />
                </Link>
                <div
                  className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${hoveredProduct === product.id
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-4 opacity-0'
                    }`}
                >
                  <button
                    className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-primary hover:text-white'
                    onClick={e => {
                      e.preventDefault();
                    }}
                    aria-label='Xem nhanh'
                  >
                    <Icon icon='solar:eye-linear' className='text-lg' />
                  </button>
                </div>
              </div>
              <div className='flex flex-1 flex-col p-4'>
                <h3 className='line-clamp-2 min-h-[40px] text-lg font-semibold text-gray-700'>
                  {product.name}
                </h3>
                <p className='line-clamp-2 min-h-[40px] text-sm font-medium text-gray-700'>
                  {product.short_description}
                </p>
                <div className='mt-2 text-xl font-bold text-primary'>
                  {product.price_formatted}
                </div>
                <div className='mt-auto pt-3'>
                  <Button
                    color='primary'
                    variant='solid'
                    size='md'
                    fullWidth
                    radius='md'
                    startContent={<Icon icon='solar:cart-plus-linear' className='text-xl' />}
                    onPress={() => {
                      addToCart({
                        product_id: Number(product.id),
                        price: Number(product.price),
                        quantity: 1,
                      })
                    }}
                    className='font-medium'
                  >
                    Thêm vào giỏ
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
