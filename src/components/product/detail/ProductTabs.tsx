'use client';

import { Tabs, Tab, cn } from '@heroui/react';
import { ProductData } from '@/types/product.type';
import { Icon } from '@iconify/react';

interface ProductTabsProps {
    product: ProductData;
    className?: string;
}

export function ProductTabs({ product, className }: ProductTabsProps) {
    return (
        <div className={cn('flex w-full flex-col', className)}>
            <Tabs
                aria-label="Product Options"
                variant="underlined"
                color="primary"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-gray-200",
                    cursor: "w-full bg-primary h-0.5",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-primary font-semibold text-gray-500"
                }}
            >
                <Tab
                    key="description"
                    title={
                        <div className="flex items-center space-x-2">
                            <Icon icon="solar:document-text-linear" className="text-lg" />
                            <span>Description</span>
                        </div>
                    }
                >
                    <div className="py-6">
                        <div
                            className="prose prose-sm max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />

                        {!product.description && (
                            <div className="text-gray-400 italic">No description available.</div>
                        )}
                    </div>
                </Tab>
                <Tab
                    key="specifications"
                    title={
                        <div className="flex items-center space-x-2">
                            <Icon icon="solar:list-check-linear" className="text-lg" />
                            <span>Specifications</span>
                        </div>
                    }
                >
                    <div className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl">
                            {product.brand && (
                                <div className="flex border-b border-gray-100 pb-2">
                                    <span className="w-1/3 text-gray-500 text-sm">Brand</span>
                                    <span className="w-2/3 font-medium text-gray-900 text-sm">{product.brand.name}</span>
                                </div>
                            )}
                            {product.sku && (
                                <div className="flex border-b border-gray-100 pb-2">
                                    <span className="w-1/3 text-gray-500 text-sm">SKU</span>
                                    <span className="w-2/3 font-medium text-gray-900 text-sm">{product.sku}</span>
                                </div>
                            )}
                            <div className="flex border-b border-gray-100 pb-2">
                                <span className="w-1/3 text-gray-500 text-sm">Weight</span>
                                <span className="w-2/3 font-medium text-gray-900 text-sm">{product.weight} {product.weight_class}</span>
                            </div>
                            <div className="flex border-b border-gray-100 pb-2">
                                <span className="w-1/3 text-gray-500 text-sm">Dimensions</span>
                                <span className="w-2/3 font-medium text-gray-900 text-sm">{product.length} x {product.width} x {product.height} {product.length_class}</span>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab
                    key="reviews"
                    title={
                        <div className="flex items-center space-x-2">
                            <Icon icon="solar:star-linear" className="text-lg" />
                            <span>Reviews</span>
                        </div>
                    }
                >
                    <div className="py-6">
                        {/* Mock Reviews content for now */}
                        <div className="text-center py-10">
                            <Icon icon="solar:chat-square-like-linear" className="text-4xl text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">No reviews yet.</p>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}
