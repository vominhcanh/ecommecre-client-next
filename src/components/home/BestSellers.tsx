'use client';

import { useClientTranslation } from '@/lib/i18n/client';
import ProductsCarousel from '@/components/product/ProductsCarousel';
// import { useProducts } from '@/services/api'; // Assuming you have this hook

export default function BestSellers() {
  const { t } = useClientTranslation();

  // This is a placeholder. In a real application, you would fetch best sellers
  // from your API using TanStack Query as mentioned in your README
  const bestSellers = [
    {
      id: '13',
      name: 'iPhone 14 Pro',
      slug: 'iphone-14-pro',
      images: ['/images/products/tv.jpg', '/images/products/tv-alt.jpg'],
      price: 999.99,
      discountPrice: 899.99,
      category: 'Smartphones',
      rating: 4.9,
    },
    {
      id: '14',
      name: 'Samsung Galaxy S23',
      slug: 'samsung-galaxy-s23',
      images: ['/images/products/gaming-chair.jpg', '/images/products/gaming-chair-alt.jpg'],
      price: 799.99,
      category: 'Smartphones',
      rating: 4.7,
    },
    {
      id: '15',
      name: 'Tempered Glass Screen Protector',
      slug: 'tempered-glass-screen-protector',
      images: ['/images/products/blender.jpg', '/images/products/blender-alt.jpg'],
      price: 14.99,
      discountPrice: 9.99,
      category: 'Screen Protectors',
      rating: 4.8,
    },
    {
      id: '16',
      name: 'Fast Charging Adapter',
      slug: 'fast-charging-adapter',
      images: ['/images/products/charging-pad.jpg', '/images/products/charging-pad-alt.jpg'],
      price: 29.99,
      category: 'Chargers',
      rating: 4.6,
    },
    {
      id: '17',
      name: 'Apple iPad Air',
      slug: 'apple-ipad-air',
      images: ['/images/products/mattress.jpg', '/images/products/mattress-alt.jpg'],
      price: 599.99,
      discountPrice: 549.99,
      category: 'Tablets',
      rating: 4.8,
    },
    {
      id: '18',
      name: 'Bluetooth Earbuds',
      slug: 'bluetooth-earbuds',
      images: ['/images/products/vacuum.jpg', '/images/products/vacuum-alt.jpg'],
      price: 79.99,
      category: 'Headphones',
      rating: 4.5,
    },
  ];

  // Uncomment and use this when you have the API service set up
  // const { data, isLoading, error } = useProducts({ bestSellers: true, limit: 10 });
  //
  // if (isLoading) return <div className="w-full py-20 flex justify-center"><LoadingSpinner /></div>;
  // if (error) return <div className="text-red-500">Failed to load best sellers</div>;
  // const bestSellers = data.products;

  return (
    <section className='container mx-auto px-4 py-12'>
      <ProductsCarousel
        title={t('bestSellers')}
        subtitle={t('bestSellersSubtitle')}
        products={bestSellers}
        slidesPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
        autoplay={true}
        showNavigation={true}
        showPagination={true}
        className='best-sellers'
      />
    </section>
  );
}
