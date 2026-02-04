'use client';

import { useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    RadioGroup,
    Radio,
    cn,
    Chip,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { addressServices } from '@/services/address.services';
import { ShareAddress } from '@/types/address.type';
import { QueryKey } from '@/utils/enums.utils';
import CreateAddressModal from './CreateAddressModal';

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (address: ShareAddress) => void;
    selectedAddressId?: string;
    phone?: string;
}

export default function AddressModal({
    isOpen,
    onClose,
    onSelect,
    selectedAddressId,
    phone,
}: AddressModalProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data: addresses = [], isLoading } = useQuery<ShareAddress[]>({
        queryKey: [QueryKey.ADDRESS, phone || 'all'],
        queryFn: async () => {
            const res = await addressServices.getAddresses(
                {
                    phone: phone || '',
                }
            );
            return res.data || [];
        },
        enabled: isOpen,

    });

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Địa chỉ nhận hàng</ModalHeader>
                            <ModalBody>
                                {isLoading ? (
                                    <div className="flex justify-center p-4">Loading...</div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {addresses.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                Bạn chưa có địa chỉ nào.
                                            </div>
                                        ) : (
                                            <RadioGroup
                                                value={selectedAddressId}
                                                onValueChange={(val) => {
                                                    const selected = addresses.find(a => a.id.toString() === val);
                                                    if (selected) {
                                                        onSelect(selected);
                                                        onClose();
                                                    }
                                                }}
                                            >
                                                {addresses.map((addr) => (
                                                    <Radio
                                                        key={addr.id}
                                                        value={addr.id.toString()}
                                                        classNames={{
                                                            base: cn(
                                                                "inline-flex m-0 bg-transparent hover:bg-gray-50 items-center justify-between",
                                                                "flex-row-reverse max-w-full cursor-pointer rounded-xl gap-3 p-3 border border-gray-200 transition-all group-data-[selected=true]:border-primary",
                                                                "data-[selected=true]:border-primary data-[selected=true]:bg-primary/5 data-[selected=true]:shadow-sm"
                                                            ),
                                                        }}
                                                    >
                                                        <div className="w-full">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-bold text-gray-900">{addr.full_name || addr.user_name}</span>
                                                                <div className="w-[1px] h-3 bg-gray-300"></div>
                                                                <span className="text-gray-500">{addr.phone}</span>
                                                                {addr.is_default === 1 && (
                                                                    <Chip size="sm" color="primary" variant="flat" className="ml-2 h-5 text-xs">Mặc định</Chip>
                                                                )}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                <p className="line-clamp-1">{addr.address}</p>
                                                            </div>
                                                        </div>
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        )}
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="solid"
                                    color="primary"
                                    size="lg"
                                    startContent={<Icon icon="solar:add-circle-linear" className="text-md" />}
                                    onPress={() => setIsCreateModalOpen(true)}
                                    fullWidth
                                >
                                    Thêm địa chỉ mới
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <CreateAddressModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => {
                }}
            />
        </>
    );
}
