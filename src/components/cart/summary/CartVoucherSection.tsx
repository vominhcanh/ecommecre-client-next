"use client";

import { Icon } from "@iconify/react";
import { Voucher } from "../modals/VoucherModal";

interface CartVoucherSectionProps {
    selectedVoucher: Voucher | null;
    onOpenModal: () => void;
}

export default function CartVoucherSection({ selectedVoucher, onOpenModal }: CartVoucherSectionProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Ưu đãi</h3>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon icon="solar:ticket-sale-linear" className="text-primary text-lg" />
                    <span>{selectedVoucher ? selectedVoucher.code : 'Mã giảm giá'}</span>
                </div>
                <button
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={onOpenModal}
                >
                    {selectedVoucher ? 'Đổi mã' : 'Chọn hoặc nhập mã'}
                </button>
            </div>
            {selectedVoucher && (
                <div className="text-xs text-green-600 px-1">
                    Đã áp dụng mã: giảm {selectedVoucher.discount_amount?.toLocaleString() || 0}đ
                </div>
            )}
        </div>
    );
}
