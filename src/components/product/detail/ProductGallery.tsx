'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@heroui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ProductData } from '@/types/product.type';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface ProductGalleryProps {
    product: ProductData;
    className?: string;
}

export function ProductGallery({ product, className }: ProductGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const images = [
        { id: 'main', url: product.thumbnail, alt: product.name },
        ...(Array.isArray(product.gallery_images) ? product.gallery_images.map((img: any, index) => ({
            id: img.id || `gallery-${index}`,
            url: img.file || img.url || img, // Fallback
            alt: img.alt || `${product.name} - ${index + 1}`
        })) : [])
    ].filter(img => !!img.url);

    if (images.length === 0) {
        return (
            <div className={cn('aspect-square w-full rounded-xl bg-gray-100 flex items-center justify-center', className)}>
                <span className="text-gray-400">No Image</span>
            </div>
        );
    }

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    autoplay={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="h-full w-full product-detail-gallery"
                >
                    {images.map((img) => (
                        <SwiperSlide key={img.id}>
                            <div className="relative h-full w-full flex items-center justify-center bg-white">
                                <Image
                                    src={img.url}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-contain p-2"
                                    priority={true}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full thumbs-swiper"
                >
                    {images.map((img) => (
                        <SwiperSlide key={img.id} className="cursor-pointer group">
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-primary group-[.swiper-slide-thumb-active]:border-primary">
                                <Image
                                    src={img.url}
                                    alt={img.alt}
                                    fill
                                    sizes="100px"
                                    className="object-cover p-1"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
