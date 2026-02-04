'use client';
import { useState } from 'react';
import { Button, Input, Chip, Divider, cn, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { ProductData } from '@/types/product.type';
import { useCart } from '@/hooks/useCart';
import { useClientTranslation } from '@/lib/i18n/client';

interface ProductInfoProps {
    product: ProductData;
    className?: string;
}

export function ProductInfo({ product, className }: ProductInfoProps) {
    const { t } = useClientTranslation();
    const { addToCart, isLoading } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (val: number) => {
        if (val < 1) return;
        setQuantity(val);
    };
    // Render Stars
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Icon
                    key={i}
                    icon={i < Math.floor(rating) ? 'solar:star-bold' : 'solar:star-linear'}
                    className={cn("text-lg", i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300")}
                />
            );
        }
        return stars;
    };

    const ratingValue = product.star?.avg_star?.avg || 5;
    const ratingCount = product.star?.avg_star?.total || 0;

    return (
        <div className={cn('flex flex-col gap-6', className)}>
            {/* Title & Brand */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    {product.name}
                </h1>
                <div className="mt-3 flex flex-col gap-4 text-sm text-gray-500">
                    {product.brand && (
                        <div className="flex items-center gap-1">
                            <span>Brand:</span>
                            <span className="font-medium text-primary cursor-pointer hover:underline">{product.brand.name}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <div className="flex items-center gap-0.5">
                            {renderStars(ratingValue)}
                        </div>
                        <span className="text-gray-400">({ratingCount} Reviews)</span>
                    </div>
                    {product.sku && (
                        <div className="border-gray-200">
                            SKU: {product.sku}
                        </div>
                    )}

                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                    <div className="flex gap-2">
                        <span className="text-gray-500">Category:</span>
                        <span className="text-gray-500 font-medium">
                            {product.category?.name || product.categories?.map(c => c.name).join(', ')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Price */}
            <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                <span className="text-3xl font-bold text-red-600">
                    {product.price_formatted}
                </span>
                {product.original_price > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                        {product.original_price_formatted}
                    </span>
                )}
            </div>

            {/* Description Short */}
            {product.short_description && (
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    {product.short_description}
                </p>
            )}
            <Divider />
            <div className="flex flex-col gap-5 mt-2">
                {/* Quantity */}
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-3">Quantity</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleQuantityChange(quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                <Icon icon="ic:sharp-minus" width="20" height="20" />
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                className="w-10 text-center text-lg font-bold text-gray-900 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent"
                            />
                            <button
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0f5b5d] text-white hover:bg-[#0a4648] transition-colors shadow-sm"
                                aria-label="Increase quantity"
                            >
                                <Icon icon="material-symbols:add" width="20" height="20" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <Button
                        size="lg"
                        className="flex-1 text-white bg-primary hover:bg-primary/80"
                        radius="lg"
                        isLoading={isLoading}
                        startContent={<Icon icon="solar:cart-plus-bold" className="text-xl" />}
                        onPress={() => addToCart({
                            product_id: Number(product.id),
                            price: product.price,
                            quantity: quantity,
                        })}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        size="lg"
                        isLoading={isLoading}
                        className="flex-1 text-white bg-orange hover:bg-orange/80"
                        radius="lg"
                    >
                        Buy Now
                    </Button>
                </div>

                {/* Actions social */}
                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-dashed border-gray-200">
                    <Button
                        variant="flat"
                        radius="lg"
                        className="bg-gray-50 text-gray-600 font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                        startContent={<Icon icon="solar:heart-linear" className="text-xl" />}
                        onPress={() => addToast({ title: 'Added to Wishlist', color: 'success' })}
                    >
                        Add to Wishlist
                    </Button>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">Share:</span>
                        <div className="flex items-center gap-1">
                            <Button isIconOnly variant="light" size="sm" radius="full" className="hover:bg-blue-50">
                                <Icon icon="logos:facebook" className="text-xl" />
                            </Button>
                            <Button isIconOnly variant="light" size="sm" radius="full" className="hover:bg-pink-50">
                                <Icon icon="skill-icons:instagram" className="text-xl" />
                            </Button>
                            <Button isIconOnly variant="light" size="sm" radius="full" className="hover:bg-gray-100">
                                <Icon icon="logos:twitter" className="text-xl" />
                            </Button>
                            <Button isIconOnly variant="light" size="sm" radius="full" className="text-gray-500 hover:text-primary hover:bg-primary/10">
                                <Icon icon="solar:copy-bold" className="text-xl" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
