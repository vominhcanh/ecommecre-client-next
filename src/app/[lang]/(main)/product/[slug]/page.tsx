import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getProductBySlug } from '@/services/products.services';
import { RouteProps } from '@/types/api.type';
import { ProductGallery } from '@/components/product/detail/ProductGallery';
import { ProductInfo } from '@/components/product/detail/ProductInfo';
import { ProductSeller } from '@/components/product/detail/ProductSeller';
import { ProductTabs } from '@/components/product/detail/ProductTabs';
import CustomBreadcrumbs from '@/components/ui/CustomBreadcrumbs';

export async function generateMetadata({ params }: RouteProps<{ lang: string; slug: string }>) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.name,
        description: product.short_description || product.description?.slice(0, 160),
        openGraph: {
            images: [product.thumbnail],
        },
    };
}

export default async function ProductDetailPage({ params }: RouteProps<{ lang: string; slug: string }>) {
    const { lang, slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-20">
            <div className="container mx-auto px-4 py-4">
                {/* Breadcrumbs */}
                <CustomBreadcrumbs
                    items={[
                        { label: 'Home', href: `/${lang}` },
                        ...(product.category ? [{ label: product.category.name, href: `/${lang}/category/${product.category.code}` }] : []),
                        { label: product.name, isCurrent: true }
                    ]}
                    containerClasses="mb-6"
                />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="lg:col-span-4">
                        <ProductGallery product={product} />
                    </div>
                    <div className="lg:col-span-5">
                        <ProductInfo product={product} />
                    </div>
                    <div className="lg:col-span-3">
                        <ProductSeller product={product} />
                    </div>
                </div>
                <div className="mt-8 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Product Details</h2>
                    <ProductTabs product={product} />
                </div>

            </div>
        </div>
    );
}
