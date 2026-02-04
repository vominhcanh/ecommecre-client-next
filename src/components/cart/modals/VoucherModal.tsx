'use client';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    RadioGroup,
    Radio,
    cn
} from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { API_VOUCHER } from '@/services/_const';
import { fetchApp } from '@/services/_fetchApp';
import { QueryKey } from '@/utils/enums.utils';
import { Icon } from '@iconify/react';
import { useState } from 'react';

// Basic Voucher Type
export type Voucher = {
    id: number;
    code: string;
    description: string;
    discount_amount: number;
    min_order_value: number;
    expiry_date: string;
};

interface VoucherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (voucher: Voucher) => void;
    currentVoucherCode?: string;
}

const getVouchers = async () => {
    const res = await fetchApp.get<Voucher[]>(API_VOUCHER.getAll);
    return res?.data || [];
};

export default function VoucherModal({ isOpen, onClose, onSelect, currentVoucherCode }: VoucherModalProps) {
    const { data: vouchers = [], isLoading } = useQuery({
        queryKey: [QueryKey.VOUCHERS],
        queryFn: getVouchers,
        enabled: isOpen
    });

    const [selectedCode, setSelectedCode] = useState(currentVoucherCode);
    const [manualCode, setManualCode] = useState('');

    const handleApply = () => {
        // If manual code entered, prioritize it (or maybe search in list?)
        // For now, if a code is selected from list, return that object.
        // If manual code, we might need to validate it first or just pass it back.
        // The prompt asked for "selecting" modal.

        const selected = vouchers.find(v => v.code === selectedCode);
        if (selected) {
            onSelect(selected);
            onClose();
        } else if (manualCode) {
            // Mock manual voucher object if logic allows, or handle error.
            // For now, let's assume we pass a pseudo-voucher object
            onSelect({
                id: 0,
                code: manualCode,
                description: 'Custom code',
                discount_amount: 0,
                min_order_value: 0,
                expiry_date: ''
            });
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Chọn mã khuyến mãi</ModalHeader>
                        <ModalBody>
                            <div className="flex gap-2 mb-4">
                                <Input
                                    placeholder="Nhập mã khuyến mãi"
                                    value={manualCode}
                                    onChange={(e) => setManualCode(e.target.value)}
                                />
                                <Button color="primary" isDisabled={!manualCode}>Áp dụng</Button>
                            </div>

                            <div className="font-semibold mb-2">Mã giảm giá của bạn</div>

                            {isLoading ? (
                                <div className="text-center p-4">Loading...</div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {vouchers.length === 0 ? (
                                        <div className="text-gray-500 text-center py-4">Không có mã giảm giá nào khả dụng</div>
                                    ) : (
                                        <RadioGroup value={selectedCode} onValueChange={setSelectedCode}>
                                            {vouchers.map((voucher) => (
                                                <Radio
                                                    key={voucher.id}
                                                    value={voucher.code}
                                                    classNames={{
                                                        base: cn(
                                                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                                            "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                                                            "data-[selected=true]:border-primary"
                                                        ),
                                                    }}
                                                >
                                                    <div className="w-full flex justify-between items-center">
                                                        <div>
                                                            <div className="font-bold text-primary">{voucher.code}</div>
                                                            <div className="text-sm">{voucher.description}</div>
                                                            <div className="text-xs text-gray-400">HSD: {voucher.expiry_date}</div>
                                                        </div>
                                                        <div className="font-bold text-red-500">
                                                            -{voucher.discount_amount?.toLocaleString() || 0}đ
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
                            <Button variant="light" onPress={onClose}>Thoát</Button>
                            <Button color="primary" onPress={handleApply}>Đồng ý</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
