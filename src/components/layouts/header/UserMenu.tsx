'use client';

import { userState } from '@/store/atoms';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function UserMenu({ lang }: { lang: string }) {
    const [user] = useAtom(userState);
    const { logout } = useAuth();

    const displayName = user?.full_name ?? 'User';
    const displayEmail = user?.email ?? '';
    const avatarSrc = user?.avatar ?? '';

    if (user.isLoggedIn) {
        return (
            <Dropdown placement="bottom-end" className="min-w-[200px] shadow-xl rounded-xl border border-gray-100">
                <DropdownTrigger>
                    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer px-2 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 group">
                        <div className="hidden 2xl:flex flex-col items-end mr-1">
                            <span className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors max-w-[120px] truncate leading-tight">
                                {displayName}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">My Account</span>
                        </div>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform group-hover:scale-105"
                            color="primary"
                            name={displayName.charAt(0).toUpperCase()}
                            size="sm"
                            src={avatarSrc}
                        />
                        <Icon icon="solar:alt-arrow-down-linear" className="text-gray-400 group-hover:text-primary transition-colors text-sm" />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" className="p-2">
                    <DropdownItem key="profile" className="h-[70px] bg-white opacity-100 data-[hover=true]:bg-white mb-1" isReadOnly textValue="Profile">
                        <div className="flex gap-3 items-center">
                            <Avatar src={avatarSrc} size="md" isBordered color="primary" />
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{displayName}</p>
                                <p className="font-medium text-xs text-gray-500 truncate max-w-[150px]">{displayEmail}</p>
                            </div>
                        </div>
                    </DropdownItem>

                    <DropdownItem
                        key="dashboard"
                        href={`/${lang}/profile`}
                        startContent={<Icon icon="solar:user-bold-duotone" className="text-lg opacity-80" />}
                        textValue="My Profile"
                        showDivider
                    >
                        My Profile
                    </DropdownItem>
                    <DropdownItem
                        key="orders"
                        href={`/${lang}/orders`}
                        startContent={<Icon icon="solar:box-bold-duotone" className="text-xl opacity-80" />}
                        textValue="My Orders"
                    >
                        My Orders
                    </DropdownItem>
                    <DropdownItem
                        key="settings"
                        href={`/${lang}/settings`}
                        startContent={<Icon icon="solar:settings-bold-duotone" className="text-xl opacity-80" />}
                        textValue="Settings"
                        showDivider
                    >
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        color="danger"
                        className="text-danger data-[hover=true]:bg-danger-50 data-[hover=true]:text-danger pt-2"
                        startContent={<Icon icon="solar:logout-2-bold-duotone" className="text-xl" />}
                        onPress={logout}
                        textValue="Log Out"
                    >
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    return (
        <Button
            as={Link}
            href={`/${lang}/login`}
            variant='light'
            radius="full"
            className="font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors"
            startContent={<Icon icon='solar:user-circle-linear' className='text-2xl' />}
        >
            Sign In
        </Button>
    );
}
