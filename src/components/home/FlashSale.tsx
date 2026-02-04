'use client';

import { useClientTranslation } from '@/lib/i18n/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductData } from '@/types/product.type';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface FlashSaleProps {
  products: ProductData[];
  lang: string;
  endTime?: Date; // Optional prop to override timer
}

export default function FlashSale({ products, lang, endTime }: FlashSaleProps) {
  const { t } = useClientTranslation();
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set end time logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = endTime ? new Date(endTime) : new Date();
      if (!endTime) {
        // Default to end of day if no endTime provided
        targetTime.setHours(23, 59, 59, 999);
      }

      const difference = targetTime.getTime() - now.getTime();

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
  }, [endTime]);

  // Format time with leading zeros
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  if (!products || products.length === 0) return null;

  return (
    <section className='py-6'>
      <div className='container mx-auto px-4'>
        {/* Flash Sale Header */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <h2 className='mr-4 text-2xl font-bold text-gray-900 uppercase italic'>{t('flashSale')}</h2>
            <div className='flex items-center space-x-1'>
              <div className='rounded bg-black px-2 py-1 font-bold text-white'>
                {formatTime(timeLeft.hours)}
              </div>
              <span className='font-bold text-gray-900'>:</span>
              <div className='rounded bg-black px-2 py-1 font-bold text-white'>
                {formatTime(timeLeft.minutes)}
              </div>
              <span className='font-bold text-gray-900'>:</span>
              <div className='rounded bg-black px-2 py-1 font-bold text-white'>
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
          <Link href={`/${lang}/flash-sale`} className='flex items-center text-primary hover:underline font-medium'>
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
            className='flash-sale-swiper !pb-2'
          >
            {products.map(product => {
              const totalQty = (product.sold_count || 0) + (product.qty_selling || 0);
              const soldPercent = totalQty > 0 ? (product.sold_count / totalQty) * 100 : 0;

              return (
                <SwiperSlide key={product.id}>
                  <Link href={`/${lang}/product/${product.slug}`} className='block h-full'>
                    <div className='flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white hover:shadow-md transition-shadow'>
                      {/* Product Image */}
                      <div className='relative pt-[100%]'>
                        <Image src={product.thumbnail || '/images/placeholder.png'} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className='object-contain p-2' />
                        {product.percentage_price_old && product.percentage_price_old !== '0%' && (
                          <div className='absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                            -{product.percentage_price_old}
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className='flex flex-grow flex-col p-3'>
                        <h3 className='mb-2 line-clamp-2 min-h-[40px] text-sm font-medium text-gray-700'>
                          {product.name}
                        </h3>
                        <div className='mt-auto'>
                          <div className='flex items-center justify-between flex-wrap gap-1'>
                            <div>
                              <p className='font-bold text-primary'>{product.price_formatted}</p>
                              {product.original_price > product.price && (
                                <p className='text-xs text-gray-400 line-through'>
                                  {product.original_price_formatted}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className='mt-2'>
                            <div className='flex items-center justify-between text-[10px] text-gray-500 mb-1'>
                              <span>{t('sold') || 'Sold'}: {product.sold_count}</span>
                            </div>
                            <div className='h-3 w-full rounded-full bg-gray-200 relative overflow-hidden'>
                              <div
                                className='h-full rounded-full bg-primary'
                                style={{
                                  width: `${soldPercent}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
