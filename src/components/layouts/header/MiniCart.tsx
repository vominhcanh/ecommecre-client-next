'use client';

import { Button, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function MiniCart() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // TODO: Replace with real cart data from useCart hook
    const cartItems = [
        {
            id: 1,
            name: 'Wireless Noise Cancelling Headphones',
            price: 299.0,
            quantity: 1,
            image:
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: 2,
            name: 'Smart Watch Series 7',
            price: 399.0,
            quantity: 1,
            image:
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
        },
    ];

    return (
        <div className='relative' onMouseEnter={handleCartMouseEnter} onMouseLeave={handleCartMouseLeave}>
            <Badge content={cartItems.length} color='danger' shape='circle' className="border-2 border-white shadow-sm">
                <Button isIconOnly variant='light' radius="full" className="h-10 w-10 hover:bg-gray-50">
                    <Icon icon='solar:cart-large-2-linear' className='text-2xl text-gray-700' />
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
                                Shopping Cart ({cartItems.length})
                            </h3>
                            <div className='flex max-h-[300px] flex-col gap-4 overflow-y-auto px-1'>
                                {cartItems.map(item => (
                                    <div key={item.id} className='group flex items-start gap-3'>
                                        <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-1'>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className='h-full w-full rounded-lg object-cover'
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1 min-w-0'>
                                            <Link
                                                href='#'
                                                className='line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-primary dark:text-gray-100'
                                            >
                                                {item.name}
                                            </Link>
                                            <div className='mt-1 flex items-center justify-between'>
                                                <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300'>
                                                    Qty: {item.quantity}
                                                </span>
                                                <span className='font-bold text-primary'>${item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-4 border-t border-gray-100 pt-4 dark:border-gray-700'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span className='text-sm font-medium text-gray-700 dark:text-gray-200'>
                                        Subtotal:
                                    </span>
                                    <span className='text-lg font-bold text-primary'>
                                        ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                    </span>
                                </div>
                                <Button color='primary' className='w-full font-medium' size='md'>
                                    Checkout
                                </Button>
                                <Button variant='light' className='mt-2 w-full text-xs text-gray-500' size='sm'>
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
