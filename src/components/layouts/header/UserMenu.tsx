'use client';

import { userState } from '@/store/atoms';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAtom, useSetAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
    const [user, setUser] = useAtom(userState);
    const router = useRouter();

    if (user.isLoggedIn) {
        return (
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 pl-2 rounded-full border border-transparent hover:border-gray-100 transition-all duration-200">
                        <div className="hidden 2xl:flex flex-col items-end">
                            <span className="text-xs font-semibold text-gray-700 max-w-[80px] truncate">{user.name}</span>
                            <span className="text-[10px] text-gray-400">My Account</span>
                        </div>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform ring-2 ring-gray-50"
                            color="primary"
                            name={user.name?.charAt(0).toUpperCase()}
                            size="sm"
                            src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
                        />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" className="p-2">
                    <DropdownItem key="profile" className="h-14 gap-2" textValue="Profile">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold text-primary">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="dashboard" href="/profile" startContent={<Icon icon="solar:user-linear" className="text-lg" />} textValue="My Profile">
                        My Profile
                    </DropdownItem>
                    <DropdownItem key="orders" href="/orders" startContent={<Icon icon="solar:box-linear" className="text-lg" />} textValue="My Orders">
                        My Orders
                    </DropdownItem>
                    <DropdownItem key="settings" href="/settings" startContent={<Icon icon="solar:settings-linear" className="text-lg" />} textValue="Settings">
                        Settings
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" className="text-danger" startContent={<Icon icon="solar:logout-linear" className="text-lg" />} onPress={() => {
                        setUser({ isLoggedIn: false });
                        router.push('/');
                    }} textValue="Log Out">
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    return (
        <Button
            as={Link}
            href="/login"
            variant='light'
            className="font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl"
            startContent={<Icon icon='solar:user-circle-linear' className='text-xl' />}
        >
            Sign In
        </Button>
    );
}
