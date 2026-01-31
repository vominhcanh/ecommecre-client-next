'use client';

import { useClientTranslation } from '@/lib/i18n/client';
import { userState } from '@/store/atoms';
import { DropDownItem } from '@/types/menu.type';
import { Language } from '@/types/language.type';
import { Avatar, Button, cn, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LocaleSwitcher from '@/components/common/LocaleSwitcher';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: DropDownItem[];
    locales: Language[];
}

export default function MobileMenu({ isOpen, onClose, menuItems, locales }: MobileMenuProps) {
    const [user, setUser] = useAtom(userState);
    const router = useRouter();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.nav
                    className='lg:hidden fixed inset-0 z-[9998] bg-white pb-4 overflow-y-auto'
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    <div className='container mx-auto px-4 pt-4'>
                        {/* Close Button Header */}
                        <div className="flex justify-end p-2 mb-2">
                            <Button
                                isIconOnly
                                radius="full"
                                variant="light"
                                onPress={onClose}
                                className="text-gray-500 hover:bg-gray-100"
                            >
                                <Icon icon="heroicons:x-mark" className="text-2xl" />
                            </Button>
                        </div>

                        {/* User Info Section */}
                        <div className='bg-gray-50/50 p-4 rounded-xl mb-6'>
                            {user.isLoggedIn ? (
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        isBordered
                                        className="ring-2 ring-white"
                                        color="primary"
                                        name={user.name?.charAt(0).toUpperCase()}
                                        size="md"
                                        src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
                                    />
                                    <div>
                                        <h4 className='font-bold text-gray-900 text-sm'>
                                            {user.name}
                                        </h4>
                                        <p className='text-xs text-gray-500 mb-1'>{user.email}</p>
                                        <div className="flex gap-3 text-xs font-medium">
                                            <Link href='/profile' className='text-primary hover:underline' onClick={onClose}>
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setUser({ isLoggedIn: false });
                                                    onClose();
                                                    router.push('/');
                                                }}
                                                className='text-red-500 hover:underline'
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                                        <Icon icon='solar:user-circle-linear' className='text-2xl' />
                                    </div>
                                    <div>
                                        <h4 className='font-bold text-gray-900 text-sm'>Welcome!</h4>
                                        <Link href='/login' className='text-xs text-primary font-bold hover:underline' onClick={onClose}>
                                            Sign In / Register
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Main Menu Links */}
                        <div className='mb-6'>
                            <h5 className='mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-1'>
                                Menu
                            </h5>
                            <div className='divide-y divide-gray-100 border-t border-b border-gray-100'>
                                {menuItems.map(item => (
                                    <MobileMenuItem
                                        key={item.key}
                                        item={item}
                                        onClose={onClose}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Settings Section */}
                        <div>
                            <h5 className='mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-1'>Settings</h5>
                            <div className='divide-y divide-gray-50 border-t border-gray-50'>
                                <div className='flex justify-between items-center py-3 px-1'>
                                    <span className='text-sm font-medium text-gray-600 flex items-center gap-2'>
                                        Language
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <LocaleSwitcher locales={locales} />
                                    </div>
                                </div>
                                <div className='flex justify-between items-center py-3 px-1'>
                                    <span className='text-sm font-medium text-gray-600 flex items-center gap-2'>
                                        Location
                                    </span>
                                    <span className='text-sm text-gray-500'>Dubai</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}

function MobileMenuItem({
    item,
    onClose,
    depth = 0,
}: {
    item: DropDownItem;
    onClose: () => void;
    depth?: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.type === 'item' && item.children && item.children.length > 0;
    const pathname = usePathname();

    // Check active state
    const isActive = item.type === 'link'
        ? item.href === pathname
        : false;

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

    const getIcon = (key: string) => iconMap[key.toLowerCase()] || iconMap.default;

    return (
        <div className='select-none'>
            <div
                className={cn(
                    'flex cursor-pointer items-center justify-between py-3 pr-2 transition-all duration-200 rounded-lg m-1',
                    depth > 0 ? 'pl-8' : 'pl-0',
                    isActive
                        ? 'text-primary font-extrabold'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                )}
                onClick={() => hasChildren ? setIsOpen(!isOpen) : onClose()}
            >
                <Link
                    href={item.type === 'link' ? item.href || '#' : '#'}
                    className='flex items-center gap-3 w-full'
                    onClick={(e) => {
                        if (hasChildren) {
                            e.preventDefault();
                        }
                    }}
                >
                    {depth === 0 && (
                        <Icon
                            icon={getIcon(String(item.key))}
                            className={cn(
                                'text-xl transition-colors',
                                isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                            )}
                        />
                    )}
                    <span className={cn('text-sm', depth === 0 ? 'font-medium' : 'font-normal')}>
                        {item.label}
                    </span>
                </Link>

                {hasChildren && (
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon icon='heroicons:chevron-down' className={cn('text-sm', isActive ? 'text-primary' : 'text-gray-300')} />
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isOpen && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-hidden'
                    >
                        <div className="border-l border-gray-100 ml-5">
                            {item.children?.map(child => (
                                <MobileMenuItem
                                    key={child.key}
                                    item={child}
                                    onClose={onClose}
                                    depth={depth + 1}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
