'use client';

import ProductsCarousel from '@/components/product/ProductsCarousel';
import { useClientTranslation } from '@/lib/i18n/client';
// import { useProducts } from '@/services/api'; // Assuming you have this hook

export default function NewArrivals() {
  const { t } = useClientTranslation();

  // This is a placeholder. In a real application, you would fetch new arrivals
  // from your API using TanStack Query as mentioned in your README
  const newArrivals = [
    {
      id: '7',
      name: 'Apple AirPods Pro 2',
      slug: 'apple-airpods-pro-2',
      images: ['/images/products/earbuds.jpg', '/images/products/earbuds-alt.jpg'],
      price: 249.99,
      category: 'Accessories',
      rating: 4.8,
      isNew: true,
    },
    {
      id: '8',
      name: 'Samsung Galaxy Buds 3 Pro',
      slug: 'samsung-galaxy-buds-3-pro',
      images: ['/images/products/wallet.jpg', '/images/products/wallet-alt.jpg'],
      price: 199.99,
      discountPrice: 179.99,
      category: 'Accessories',
      rating: 4.6,
      isNew: true,
    },
    {
      id: '9',
      name: 'MagSafe Wireless Charger',
      slug: 'magsafe-wireless-charger',
      images: ['/images/products/security-camera.jpg', '/images/products/security-camera-alt.jpg'],
      price: 39.99,
      category: 'Accessories',
      rating: 4.5,
      isNew: true,
    },
    {
      id: '10',
      name: 'iPhone 15 Clear Case',
      slug: 'iphone-15-clear-case',
      images: ['/images/products/speaker.jpg', '/images/products/speaker-alt.jpg'],
      price: 49.99,
      category: 'Cases',
      rating: 4.3,
      isNew: true,
    },
    {
      id: '11',
      name: 'Samsung Galaxy Tab S9 Ultra',
      slug: 'samsung-galaxy-tab-s9-ultra',
      images: ['/images/products/coffee-maker.jpg', '/images/products/coffee-maker-alt.jpg'],
      price: 1199.99,
      category: 'Tablets',
      rating: 4.9,
      isNew: true,
    },
    {
      id: '12',
      name: 'Apple Watch Series 9',
      slug: 'apple-watch-series-9',
      images: ['/images/products/cutting-board.jpg', '/images/products/cutting-board-alt.jpg'],
      price: 399.99,
      category: 'Smartwatches',
      rating: 4.7,
      isNew: true,
    },
  ];

  // Uncomment and use this when you have the API service set up
  // const { data, isLoading, error } = useProducts({ newArrivals: true, limit: 10 });
  //
  // if (isLoading) return <div className="w-full py-20 flex justify-center"><LoadingSpinner /></div>;
  // if (error) return <div className="text-red-500">Failed to load new arrivals</div>;
  // const newArrivals = data.products;

  return (
    <section className='container mx-auto bg-gray-50 px-4 py-12'>
      <ProductsCarousel
        title={t('newArrivals')}
        subtitle={t('newArrivalsSubtitle')}
        products={newArrivals}
        slidesPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
        autoplay={true}
        showNavigation={true}
        showPagination={true}
        className='new-arrivals'
      />
    </section>
  );
}
