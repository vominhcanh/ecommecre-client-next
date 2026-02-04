'use client';

import { Button, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { funcUtils } from '@/utils/func.utils';

export default function MiniCart({ lang }: { lang: string }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { cart, itemsCount, total, isLoading } = useCart();

    const handleCartMouseEnter = () => {
        if (cartLeaveTimeoutRef.current) {
            clearTimeout(cartLeaveTimeoutRef.current);
            cartLeaveTimeoutRef.current = null;
        }
        setIsCartOpen(true);
    };

    const handleCartMouseLeave = () => {
        cartLeaveTimeoutRef.current = setTimeout(() => {
            setIsCartOpen(false);
        }, 200);
    };

    return (
        <div className='relative' onMouseEnter={handleCartMouseEnter} onMouseLeave={handleCartMouseLeave}>
            <Badge content={itemsCount} color='danger' size='md' shape='circle' className="border-2 border-white shadow-sm text-sm" isInvisible={itemsCount === 0}>
                <Button isIconOnly variant='light' radius="full" className="h-10 w-10 hover:bg-gray-50">
                    <Icon icon='solar:cart-large-2-linear' className='text-lg text-gray-700' />
                </Button>
            </Badge>

            <AnimatePresence>
                {isCartOpen && (
                    <motion.div
                        className='absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-gray-100 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={handleCartMouseEnter}
                        onMouseLeave={handleCartMouseLeave}
                    >
                        <div>
                            <h3 className='mb-4 text-sm font-semibold text-gray-900 dark:text-white'>
                                Giỏ hàng ({itemsCount})
                            </h3>

                            {itemsCount > 0 ? (
                                <div className='flex max-h-[300px] flex-col gap-4 overflow-y-auto px-1'>
                                    {cart.map((item) => (
                                        <div key={item.id} className='group flex items-start gap-3'>
                                            <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-1'>
                                                <Image
                                                    src={item.product_thumb?.file || ''}
                                                    alt={item.product_name || 'Product Image'}
                                                    width={64}
                                                    height={64}
                                                    className='h-full w-full rounded-lg object-cover'
                                                />
                                            </div>
                                            <div className='flex flex-1 flex-col gap-1 min-w-0'>
                                                <Link
                                                    href={`/product/${item.slug || funcUtils.slugify(item.product_name) || '#'}`}
                                                    className='line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-primary dark:text-gray-100'
                                                >
                                                    {item.product_name}
                                                </Link>
                                                <div className='mt-1 flex items-center justify-between'>
                                                    <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300'>
                                                        Số lượng: {item.quantity}
                                                    </span>
                                                    <span className='font-bold text-primary'>
                                                        {item.price_formatted}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 opacity-60">
                                    <Icon icon="solar:cart-large-2-linear" className="text-4xl mb-2" />
                                    <p className="text-sm">Your cart is empty</p>
                                </div>
                            )}

                            <div className='mt-4 border-t border-gray-100 pt-4 dark:border-gray-700'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span className='text-sm font-medium text-gray-700 dark:text-gray-200'>
                                        Tổng tiền:
                                    </span>
                                    <span className='text-lg font-bold text-primary'>
                                        {total}
                                    </span>
                                </div>
                                <Button color='primary' className='w-full font-medium' size='md' as={Link} href={`/${lang}/checkout`}>
                                    Checkout
                                </Button>
                                <Button variant="flat" className='mt-2 w-full text-sm text-gray-900' size='sm' as={Link} href={`/${lang}/cart`}>
                                    View Cart
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
