'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, CardBody, CardFooter } from '@heroui/react';
import { Icon } from '@iconify/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//   import { useClientTranslation } from '@/lib/i18n/client';

// Define product type based on your application's data structure
type Product = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  discountPrice?: number;
  category?: string;
  isNew?: boolean;
  rating?: number;
  inStock?: boolean;
};

interface ProductsCarouselProps {
  title?: string;
  subtitle?: string;
  products: Product[];
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
  flashSaleEndTime?: string | Date; // New prop for Flash Sale
}

export default function ProductsCarousel({
  title,
  subtitle,
  products,
  slidesPerView = { mobile: 2, tablet: 2, desktop: 4, largeDesktop: 5 }, // Default adjusted for flash sale
  autoplay = false,
  showNavigation = true,
  showPagination = false,
  className = '',
  onAddToCart,
  onQuickView,
  flashSaleEndTime,
}: ProductsCarouselProps) {
  // const { t } = useClientTranslation();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time remaining
  useEffect(() => {
    if (!flashSaleEndTime) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(flashSaleEndTime) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Timer expired
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [flashSaleEndTime]);

  if (!products || products.length === 0) {
    return null;
  }

  // Generate star rating display
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon key={i} icon='solar:star-bold' className='text-yellow-400 text-sm' />,
        );
      } else {
        stars.push(
          <Icon key={i} icon='solar:star-linear' className='text-gray-300 text-sm' />,
        );
      }
    }

    return <div className='flex items-center gap-0.5'>{stars}</div>;
  };

  // Format price with locale
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className={`w-full py-6 ${className}`}>
      {/* Header */}
      {/* Header */}
      {flashSaleEndTime ? (
        // Flash Sale Header
        <div className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-red-100 pb-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='text-3xl text-red-500 animate-pulse'>
                <Icon icon='solar:flame-bold' />
              </div>
              <h2 className='text-2xl md:text-3xl font-black text-red-600 uppercase italic tracking-wider'>
                Flash Sale
              </h2>
            </div>

            {/* Countdown Timer */}
            <div className='flex items-center gap-2 ml-2 md:ml-4'>
              <div className='flex gap-1 items-center'>
                <div className='bg-gray-900 text-white rounded px-2 py-1 font-mono font-bold text-lg min-w-[36px] text-center'>
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className='font-bold text-gray-900'>:</span>
                <div className='bg-gray-900 text-white rounded px-2 py-1 font-mono font-bold text-lg min-w-[36px] text-center'>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className='font-bold text-gray-900'>:</span>
                <div className='bg-red-600 text-white rounded px-2 py-1 font-mono font-bold text-lg min-w-[36px] text-center animate-[pulse_1s_ease-in-out_infinite]'>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
              <span className='text-xs font-medium text-gray-500 uppercase ml-2 hidden sm:inline-block'>Ending in</span>
            </div>
          </div>

          <Link
            href='/flash-sale'
            className='flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors group px-4 py-2 bg-red-50 rounded-full hover:bg-red-100'
          >
            <span>Xem tất cả</span>
            <Icon icon='heroicons:arrow-right' className='text-lg group-hover:translate-x-1 transition-transform' />
          </Link>
        </div>
      ) : (
        // Standard Header
        <div className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='flex items-center gap-3'>
            {title && (
              <h2 className='text-xl md:text-2xl font-bold text-gray-800'>{title}</h2>
            )}
            {subtitle && (
              <span className='text-sm text-gray-500 hidden md:inline'>{subtitle}</span>
            )}
          </div>

          <Link
            href='/products'
            className='flex items-center gap-2 text-primary font-medium hover:text-primary-600 transition-colors group'
          >
            <div className='p-2 rounded-lg bg-gray-100 group-hover:bg-primary/10 transition-colors'>
              <Icon icon='solar:sort-from-bottom-to-top-linear' className='text-lg' />
            </div>
            <span>Xem tất cả</span>
            <Icon icon='heroicons:arrow-right' className='text-lg group-hover:translate-x-1 transition-transform' />
          </Link>
        </div>
      )}

      {/* Products Carousel */}
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
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className='relative aspect-square overflow-hidden bg-gray-50'>
                <Link href={`/products/${product.slug}`} className='block h-full w-full'>
                  <Image
                    src={product.images[0]}
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
                      onQuickView?.(product.id);
                    }}
                    aria-label='Xem nhanh'
                  >
                    <Icon icon='solar:eye-linear' className='text-lg' />
                  </button>
                </div>
              </div>
              <div className='flex flex-1 flex-col p-4'>
                <h3 className='line-clamp-2 min-h-[40px] text-sm font-medium text-gray-700'>
                  {product.name}
                </h3>
                <div className='mt-2 flex items-center'>
                  {product.rating ? renderRating(product.rating) : <div className='h-4'></div>}
                </div>

                {/* Price */}
                <div className='mt-2'>
                  {product.discountPrice ? (
                    <div className='flex flex-wrap items-end gap-2'>
                      <span suppressHydrationWarning className='text-base font-bold text-red-600'>
                        {formatPrice(product.discountPrice)}
                      </span>
                      <span suppressHydrationWarning className='text-xs text-gray-400 line-through'>
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span suppressHydrationWarning className='text-base font-bold text-primary'>
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Add to cart button */}
                <div className='mt-auto pt-3'>
                  <Button
                    color='primary'
                    variant='solid'
                    size='md'
                    fullWidth
                    radius='md'
                    startContent={<Icon icon='solar:cart-plus-linear' className='text-xl' />}
                    onPress={() => onAddToCart?.(product.id)}
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
