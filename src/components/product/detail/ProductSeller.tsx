'use client';

import { Button, cn, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { ProductData } from '@/types/product.type';

interface ProductSellerProps {
    product: ProductData;
    className?: string;
}

export function ProductSeller({ product, className }: ProductSellerProps) {
    // Mock Promotions Data
    // In real app, this would come from product.promotions or a separate API
    const promotions = [
        {
            id: 1,
            code: 'WELCOME20',
            description: 'Giam 20k cho don tu 200k',
            type: 'discount',
            value: '20k'
        },
        {
            id: 2,
            code: 'FREESHIP',
            description: 'Mien phi van chuyen',
            type: 'shipping',
            value: 'Free Ship'
        },
        {
            id: 3,
            code: 'SALE5',
            description: 'Giam 5% toi da 50k',
            type: 'percentage',
            value: '5%'
        }
    ];

    return (
        <div className={cn('flex flex-col gap-6', className)}>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sticky top-4">
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <Icon icon="solar:ticket-sale-bold" className="text-primary text-xl" />
                    Vouchers & Promotions
                </h3>

                <div className="flex flex-col gap-3">
                    {promotions.map((promo) => (
                        <div key={promo.id} className="relative flex items-center bg-orange-50/50 border border-orange-100 rounded-lg p-3 overflow-hidden group hover:border-orange-200 transition-colors">
                            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-gray-100/50 z-10" />
                            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-gray-100/50 z-10" />

                            <div className="flex-1 pl-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-orange-600 text-base">{promo.value}</span>
                                    <Chip size="sm" color="warning" variant="flat" className="h-5 text-[10px] px-1">
                                        {promo.code}
                                    </Chip>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-1">{promo.description}</p>
                            </div>

                            <Button
                                size="sm"
                                className="bg-orange-500 text-white font-medium min-w-[60px] h-8 text-xs ml-2"
                                radius="full"
                            >
                                Collect
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-full bg-orange-100 text-orange-600">
                            <Icon icon="solar:shield-check-bold" className="text-lg" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-900">75-Day Buyer Protection</h4>
                            <p className="text-xs text-gray-500">Orders from All item.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-full bg-orange-100 text-orange-600">
                            <Icon icon="solar:refresh-circle-bold" className="text-lg" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-900">Free Return</h4>
                            <p className="text-xs text-gray-500">Pay with Multiple Cards</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
