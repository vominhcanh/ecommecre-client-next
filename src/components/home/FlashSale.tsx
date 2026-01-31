'use client';

import { useClientTranslation } from '@/lib/i18n/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

type FlashSaleProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  remainingQuantity: number;
  totalQuantity: number;
};

export default function FlashSale() {
  const { t } = useClientTranslation();
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set end time to 23:59:59 of the current day
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const difference = endOfDay.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample flash sale products
  const flashSaleProducts: FlashSaleProduct[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      image: '/images/products/headphones.jpg',
      price: 1099.99,
      originalPrice: 1299.99,
      discountPercent: 15,
      remainingQuantity: 8,
      totalQuantity: 20,
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra 512GB',
      slug: 'samsung-galaxy-s24-ultra-512gb',
      image: '/images/products/chair.jpg',
      price: 1199.99,
      originalPrice: 1399.99,
      discountPercent: 14,
      remainingQuantity: 5,
      totalQuantity: 15,
    },
    {
      id: '3',
      name: 'Google Pixel 8 Pro 256GB',
      slug: 'google-pixel-8-pro-256gb',
      image: '/images/products/watch.jpg',
      price: 899.99,
      originalPrice: 999.99,
      discountPercent: 10,
      remainingQuantity: 12,
      totalQuantity: 25,
    },
    {
      id: '4',
      name: 'OnePlus 12 256GB',
      slug: 'oneplus-12-256gb',
      image: '/images/products/tshirt.jpg',
      price: 799.99,
      originalPrice: 899.99,
      discountPercent: 11,
      remainingQuantity: 7,
      totalQuantity: 18,
    },
    {
      id: '5',
      name: 'Xiaomi 14 Ultra 512GB',
      slug: 'xiaomi-14-ultra-512gb',
      image: '/images/products/camera.jpg',
      price: 899.99,
      originalPrice: 1099.99,
      discountPercent: 18,
      remainingQuantity: 3,
      totalQuantity: 10,
    },
    {
      id: '6',
      name: 'Apple AirPods Pro 2',
      slug: 'apple-airpods-pro-2',
      image: '/images/products/earbuds.jpg',
      price: 199.99,
      originalPrice: 249.99,
      discountPercent: 20,
      remainingQuantity: 15,
      totalQuantity: 30,
    },
  ];

  // Format time with leading zeros
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <section className='py-6'>
      <div className='container mx-auto px-4'>
        {/* Flash Sale Header */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <h2 className='mr-4 text-2xl font-bold text-white'>{t('flashSale')}</h2>
            <div className='flex items-center space-x-1'>
              <div className='rounded bg-white px-2 py-1 font-bold text-red-600'>
                {formatTime(timeLeft.hours)}
              </div>
              <span className='font-bold text-white'>:</span>
              <div className='rounded bg-white px-2 py-1 font-bold text-red-600'>
                {formatTime(timeLeft.minutes)}
              </div>
              <span className='font-bold text-white'>:</span>
              <div className='rounded bg-white px-2 py-1 font-bold text-red-600'>
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
          <Link href='/flash-sale' className='flex items-center text-white hover:underline'>
            {t('viewAll')}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ml-1 h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </div>

        {/* Flash Sale Products */}
        <div className='flash-sale-carousel'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className='flash-sale-swiper'
          >
            {flashSaleProducts.map(product => (
              <SwiperSlide key={product.id}>
                <Link href={`/products/${product.slug}`} className='block'>
                  <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white'>
                    {/* Product Image */}
                    <div className='relative pt-[100%]'>
                      <Image src={product.image} alt={product.name} fill className='object-cover' />
                      <div className='absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                        -{product.discountPercent}%
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className='flex flex-grow flex-col p-3'>
                      <h3 className='mb-2 line-clamp-1 text-sm font-medium text-gray-500'>
                        {product.name}
                      </h3>
                      <div className='mt-auto'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <p className='font-bold text-red-600'>${product.price.toFixed(2)}</p>
                            <p className='text-xs text-gray-500 line-through'>
                              ${product.originalPrice.toFixed(2)}
                            </p>
                          </div>
                          <div className='text-xs text-gray-500'>
                            Còn {product.remainingQuantity}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className='mt-2 h-2 w-full rounded-full bg-gray-200'>
                          <div
                            className='h-2 rounded-full bg-red-600'
                            style={{
                              width: `${
                                (product.remainingQuantity / product.totalQuantity) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
