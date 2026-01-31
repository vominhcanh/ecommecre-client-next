'use client';

import { useClientTranslation } from '@/lib/i18n/client';
import { DropDownItem } from '@/types/menu.type';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    menuItems: DropDownItem[];
}

export default function MegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave, menuItems }: MegaMenuProps) {
    const { t } = useClientTranslation();
    const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);

    // Icon mapping for menu items
    const iconMap: Record<string, string> = {
        default: 'solar:box-linear',
        products: 'solar:shop-linear',
        electronics: 'solar:laptop-linear',
        fashion: 'solar:t-shirt-linear',
        womens: 'solar:women-linear',
        kids: 'solar:baby-linear',
        health: 'solar:heart-pulse-linear',
        pharmacy: 'solar:pill-linear',
        groceries: 'solar:cart-large-2-linear',
        luxury: 'solar:star-linear',
        services: 'solar:settings-linear',
        support: 'solar:shield-check-linear',
        warranty: 'solar:verified-check-linear',
        shipping: 'solar:delivery-linear',
        installation: 'solar:settings-minimalistic-linear',
    };

    const getMenuIcon = (key: string) => {
        return iconMap[key.toLowerCase()] || iconMap.default;
    };

    // Set initial active category when menu opens
    useEffect(() => {
        if (isOpen && menuItems.length > 0 && !activeCategoryKey) {
            setActiveCategoryKey(String(menuItems[0].key));
        }
    }, [isOpen, menuItems, activeCategoryKey]);

    const activeCategory = menuItems.find(item => String(item.key) === activeCategoryKey);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='absolute left-0 top-full z-50 mt-2 w-full rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-sm shadow-2xl dark:border-gray-800 dark:bg-gray-900/95'
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <div className='flex h-[450px] overflow-hidden rounded-2xl'>
                        {/* Sidebar - Main Categories */}
                        <div className='w-[280px] shrink-0 overflow-y-auto border-r border-gray-100 bg-white py-4 dark:border-gray-800 dark:bg-gray-900'>
                            <ul className='space-y-1 px-4'>
                                {menuItems.map(item => (
                                    <li key={item.key}>
                                        <button
                                            type='button'
                                            className={cn(
                                                'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 group',
                                                activeCategoryKey === String(item.key)
                                                    ? 'bg-primary/5 text-primary font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
                                            )}
                                            onMouseEnter={() => setActiveCategoryKey(String(item.key))}
                                            onClick={() => setActiveCategoryKey(String(item.key))}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <Icon
                                                    icon={getMenuIcon(String(item.key))}
                                                    className={cn(
                                                        'text-xl transition-colors',
                                                        activeCategoryKey === String(item.key) ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300',
                                                    )}
                                                />
                                                <span
                                                    className={cn(
                                                        'text-sm',
                                                        activeCategoryKey === String(item.key) ? 'font-semibold' : 'font-medium',
                                                    )}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                            <Icon icon='heroicons:chevron-right' className='h-4 w-4 opacity-50' />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Content Area - Subcategories */}
                        <div className='flex-1 overflow-y-auto bg-gray-50/50 p-8 dark:bg-gray-900/50'>
                            {activeCategory ? (
                                <div className="h-full flex flex-col">
                                    <div className='mb-8 flex items-center justify-between'>
                                        <h3 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                                            {activeCategory.label}
                                        </h3>
                                        <Link
                                            href={activeCategory.type === 'link' ? activeCategory.href || '#' : '#'}
                                            className='group flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-80'
                                        >
                                            {t('View All')}
                                            <Icon icon="heroicons:arrow-long-right" className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>

                                    {activeCategory.type === 'item' && activeCategory.children ? (
                                        <div className='grid grid-cols-3 gap-6 auto-rows-min'>
                                            {activeCategory.children.map(child => (
                                                <Link
                                                    key={child.key}
                                                    href={child.type === 'link' ? child.href || '#' : '#'}
                                                    className='group relative flex items-start gap-4 rounded-2xl bg-white p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800'
                                                >
                                                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:text-primary dark:bg-gray-700/50'>
                                                        <Icon
                                                            icon={getMenuIcon(String(child.key))}
                                                            className='text-2xl'
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className='font-bold text-gray-900 transition-colors group-hover:text-primary dark:text-white'>
                                                            {child.label}
                                                        </h4>
                                                        <p className='mt-1 text-xs font-medium text-gray-500 line-clamp-2 dark:text-gray-400'>
                                                            Explore {child.label} products
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='flex h-full items-center justify-center text-gray-400'>
                                            <div className='text-center'>
                                                <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                                    <Icon
                                                        icon='solar:box-minimalistic-linear'
                                                        className='text-3xl opacity-50'
                                                    />
                                                </div>
                                                <p className="font-medium">No subcategories available</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className='flex h-full items-center justify-center text-gray-400'>
                                    <p>Hover over a category to see details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
