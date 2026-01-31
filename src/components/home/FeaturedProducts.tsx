'use client';

import ProductsCarousel from '@/components/product/ProductsCarousel';
import { useClientTranslation } from '@/lib/i18n/client';
// import { useProducts } from '@/services/api'; // Assuming you have this hook

export default function FeaturedProducts() {
  const { t } = useClientTranslation();

  // This is a placeholder. In a real application, you would fetch featured products
  // from your API using TanStack Query as mentioned in your README
  const featuredProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      images: ['/images/products/headphones.jpg', '/images/products/headphones-alt.jpg'],
      price: 1199.99,
      category: 'Smartphones',
      rating: 4.9,
      isNew: true,
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      images: ['/images/products/chair.jpg', '/images/products/chair-alt.jpg'],
      price: 1299.99,
      discountPrice: 1199.99,
      category: 'Smartphones',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Google Pixel 8 Pro',
      slug: 'google-pixel-8-pro',
      images: ['/images/products/watch.jpg', '/images/products/watch-alt.jpg'],
      price: 999.99,
      category: 'Smartphones',
      rating: 4.7,
      isNew: true,
    },
    {
      id: '4',
      name: 'OnePlus 12',
      slug: 'oneplus-12',
      images: ['/images/products/tshirt.jpg', '/images/products/tshirt-alt.jpg'],
      price: 899.99,
      category: 'Smartphones',
      rating: 4.6,
    },
    {
      id: '5',
      name: 'Xiaomi 14 Ultra',
      slug: 'xiaomi-14-ultra',
      images: ['/images/products/camera.jpg', '/images/products/camera-alt.jpg'],
      price: 1099.99,
      discountPrice: 999.99,
      category: 'Smartphones',
      rating: 4.5,
    },
    {
      id: '6',
      name: 'Nothing Phone (2)',
      slug: 'nothing-phone-2',
      images: ['/images/products/bottle.jpg', '/images/products/bottle-alt.jpg'],
      price: 699.99,
      category: 'Smartphones',
      rating: 4.4,
    },
  ];

  // Uncomment and use this when you have the API service set up
  // const { data, isLoading, error } = useProducts({ featured: true, limit: 10 });
  //
  // if (isLoading) return <div className="w-full py-20 flex justify-center"><LoadingSpinner /></div>;
  // if (error) return <div className="text-red-500">Failed to load featured products</div>;
  // const featuredProducts = data.products;

  return (
    <section className='container mx-auto px-4 py-12'>
      <ProductsCarousel
        title={t('featuredProducts')}
        subtitle={t('featuredProductsSubtitle')}
        products={featuredProducts}
        slidesPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
        autoplay={true}
        showNavigation={true}
        showPagination={true}
        className='featured-products'
      />
    </section>
  );
}
