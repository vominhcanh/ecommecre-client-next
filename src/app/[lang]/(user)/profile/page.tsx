'use client';

import { useSetAtom, useAtomValue } from 'jotai';
import { userState } from '@/store/atoms';
import { Button, Card, CardBody, Input, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const user = useAtomValue(userState);
    const setUser = useSetAtom(userState);
    const router = useRouter();

    const handleLogout = () => {
        setUser({ isLoggedIn: false });
        router.push('/');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-sm border border-gray-100">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Icon icon="solar:bag-3-bold" className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <h4 className="text-xl font-bold">12</h4>
                        </div>
                    </CardBody>
                </Card>
                <Card className="shadow-sm border border-gray-100">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 rounded-full bg-warning/10 text-warning">
                            <Icon icon="solar:ticket-star-bold" className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Vouchers</p>
                            <h4 className="text-xl font-bold">5</h4>
                        </div>
                    </CardBody>
                </Card>
                <Card className="shadow-sm border border-gray-100">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 rounded-full bg-danger/10 text-danger">
                            <Icon icon="solar:heart-bold" className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Wishlist</p>
                            <h4 className="text-xl font-bold">8</h4>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Profile Details */}
            <Card className="shadow-sm border border-gray-100">
                <CardBody className="p-6 space-y-6">
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                        <Avatar
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            className="w-20 h-20 text-large"
                        />
                        <div>
                            <Button size="sm" variant="flat" color="primary">Change Avatar</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            variant="bordered"
                            defaultValue={user.full_name || "Demo User"}
                            startContent={<Icon icon="solar:user-linear" />}
                        />
                        <Input
                            label="Email Address"
                            variant="bordered"
                            defaultValue={user.email || "demo@example.com"}
                            isReadOnly
                            startContent={<Icon icon="solar:letter-linear" />}
                        />
                        <Input
                            label="Phone Number"
                            variant="bordered"
                            placeholder="Add phone number"
                            startContent={<Icon icon="solar:phone-linear" />}
                        />
                        <Input
                            label="Date of Birth"
                            variant="bordered"
                            type="date"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button color="danger" variant="light" onPress={handleLogout}>
                            Log Out
                        </Button>
                        <Button color="primary">
                            Save Changes
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
