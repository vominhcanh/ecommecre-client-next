'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@heroui/react';

const menuItems = [
    { key: 'profile', label: 'My Profile', icon: 'solar:user-circle-linear', href: '/profile' },
    { key: 'orders', label: 'My Orders', icon: 'solar:bag-3-linear', href: '/orders' },
    { key: 'address', label: 'Manage Address', icon: 'solar:map-point-linear', href: '/address' },
    { key: 'wishlist', label: 'Wishlist', icon: 'solar:heart-linear', href: '/wishlist' },
    { key: 'notifications', label: 'Notifications', icon: 'solar:bell-linear', href: '/notifications' },
    { key: 'settings', label: 'Settings', icon: 'solar:settings-linear', href: '/settings' },
];

export default function UserSidebar() {
    const pathname = usePathname();

    return (
        <aside className='w-full lg:w-72 shrink-0 space-y-8'>
            {/* User Brief */}
            <div className='flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <Icon icon='solar:user-bold' className='text-2xl' />
                </div>
                <div>
                    <h4 className='font-bold text-gray-900'>Demo User</h4>
                    <p className='text-xs text-gray-500'>demo@example.com</p>
                </div>
            </div>

            {/* Navigation */}
            <div className='rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
                <nav className='flex flex-col space-y-1'>
                    {menuItems.map((item) => {
                        // Check if active (simple check)
                        const isActive = pathname.includes(item.href);
                        return (
                            <Link
                                key={item.key}
                                href={item.href} // In real app, prepend lang
                                className={cn(
                                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                )}
                            >
                                <Icon icon={item.icon} className='text-xl' />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
