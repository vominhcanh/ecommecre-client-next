'use client';

import { useEffect, useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Checkbox,
    addToast,
} from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addressServices } from '@/services/address.services';
import { QueryKey } from '@/utils/enums.utils';
import { useClientTranslation } from '@/lib/i18n/client';
import { CoreLocation } from '@/components/core';
import { LocationValue } from '@/components/core/CoreLocation';

type CreateAddressPayload = {
    full_name: string;
    phone: string;
    address: string;
    city_code: string;
    district_code: string;
    ward_code: string;
    is_default: number; // 0 or 1
    lat: string;
    long: string;
    cart_id: number | null;
};

interface CreateAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    initialData?: {
        name: string;
        phone: string;
        address: string;
        lat?: string;
        lng?: string;
    };
    cartId?: number | null;
}

export default function CreateAddressModal({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    cartId,
}: CreateAddressModalProps) {
    const { t } = useClientTranslation();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<CreateAddressPayload>({
        full_name: initialData?.name || '',
        phone: initialData?.phone || '',
        lat: initialData?.lat || '10.74314',
        long: initialData?.lng || '106.6807191',
        address: initialData?.address || '',
        city_code: '',
        district_code: '',
        ward_code: '',
        is_default: 0,
        cart_id: cartId || null,
    });

    // Reset form when modal opens or initialData/cartId changes
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                full_name: initialData?.name || '',
                phone: initialData?.phone || '',
                address: initialData?.address || '',
                lat: initialData?.lat || '10.74314',
                long: initialData?.lng || '106.6807191',
                cart_id: cartId || null
            }));
        }
    }, [isOpen, initialData, cartId]);

    const createMutation = useMutation({
        mutationFn: async () => {
            const payload = {
                ...formData,
                cart_id: cartId || null,
            };
            return addressServices.createAddress(payload);
        },
        onSuccess: (data) => {
            if (data?.data) {
                addToast({ title: 'Success', description: 'Address created successfully', color: 'success' });
                queryClient.invalidateQueries({ queryKey: [QueryKey.ADDRESS] });
                onSuccess?.();
                onClose();
            } else {
                addToast({ title: 'Error', description: data?.message || 'Failed to create address', color: 'danger' });
            }
        },
        onError: (error: Error) => {
            addToast({ title: 'Error', description: error?.message || 'Failed to create address', color: 'danger' });
        }
    });

    const handleSubmit = () => {
        if (!formData.full_name || !formData.phone || !formData.address || !formData.city_code || !formData.district_code) {
            addToast({ title: 'Validation', description: 'Please fill all fields', color: 'warning' });
            console.log(formData);
            return;
        }
        createMutation.mutate();
    };

    const handleLocationChange = (val: LocationValue) => {
        setFormData(prev => ({
            ...prev,
            city_code: val.city_code,
            district_code: val.district_code,
            ward_code: val.ward_code,
            address: val.address,
            lat: val.lat || prev.lat,
            long: val.long || prev.long,
            full_name: val.full_name || prev.full_name,
            phone: val.phone || prev.phone,
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Thêm địa chỉ mới</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Họ và tên"
                                    placeholder="Nhập họ tên"
                                    labelPlacement='outside'
                                    isRequired
                                    errorMessage="Vui lòng nhập họ và tên"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                />
                                <Input
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    labelPlacement='outside'
                                    value={formData.phone}
                                    isRequired
                                    errorMessage="Vui lòng nhập số điện thoại"
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <CoreLocation
                                value={{
                                    city_code: formData.city_code,
                                    district_code: formData.district_code,
                                    ward_code: formData.ward_code,
                                    address: formData.address,
                                    lat: formData.lat,
                                    long: formData.long
                                }}
                                onChange={handleLocationChange}
                                fieldConfig={{
                                    city: {
                                        label: "Tỉnh/Thành phố",
                                        placeholder: "Chọn Tỉnh/Thành",
                                        isRequired: true
                                    },
                                    district: {
                                        label: "Quận/Huyện",
                                        placeholder: "Chọn Quận/Huyện",
                                        isRequired: true
                                    },
                                    address: {
                                        label: "Địa chỉ cụ thể",
                                        placeholder: "Nhập địa chỉ...",
                                        isRequired: true
                                    }
                                }}
                            />

                            <Checkbox
                                isSelected={formData.is_default === 1}
                                onValueChange={(val) => setFormData({ ...formData, is_default: val ? 1 : 0 })}
                            >
                                Đặt làm địa chỉ mặc định
                            </Checkbox>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Hủy
                            </Button>
                            <Button color="primary" onPress={handleSubmit} isLoading={createMutation.isPending}>
                                Hoàn thành
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
