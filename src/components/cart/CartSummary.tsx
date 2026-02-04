"use client";

import { CartResponse } from "@/types/cart.type";
import { Card, CardBody, Divider } from "@heroui/react";
import { useState } from "react";
import AddressModal from "./modals/AddressModal";
import VoucherModal, { Voucher } from "./modals/VoucherModal";
import CreateAddressModal from "./modals/CreateAddressModal";
import { ShareAddress } from "@/types/address.type";
import { addressServices } from "@/services/address.services";
import CartAddressSection from "./summary/CartAddressSection";
import CartPaymentSection from "./summary/CartPaymentSection";
import CartVoucherSection from "./summary/CartVoucherSection";
import CartTotalsSection from "./summary/CartTotalsSection";
import CartSummaryActions from "./summary/CartSummaryActions";

interface CartSummaryProps {
    cartData: CartResponse | undefined;
    lang: string;
}

export default function CartSummary({ cartData, lang }: CartSummaryProps) {
    const totals = cartData?.totals || [];

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: '',
        lat: '',
        lng: ''
    });

    const [selectedAddress, setSelectedAddress] = useState<ShareAddress | null>(null);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

    const handleCheckUser = async () => {
        if (!customerInfo.phone) return;

        try {
            const res = await addressServices.getAddresses({
                query: customerInfo.phone,
            });
            const addresses = res.data as ShareAddress[];
            if (addresses && addresses.length > 0) {
                setIsAddressModalOpen(true);
            } else {
                setIsCreateModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            setIsCreateModalOpen(true);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Card className="border-none shadow-sm drop-shadow-sm bg-white rounded-2xl overflow-hidden">
                <CardBody className="p-6 flex flex-col gap-6">

                    <CartAddressSection
                        selectedAddress={selectedAddress}
                        customerInfo={customerInfo}
                        onInfoChange={setCustomerInfo}
                        onCheckUser={handleCheckUser}
                        onCreateAddress={() => {
                            setIsCreateModalOpen(true);
                            setCustomerInfo(prev => ({ ...prev, address: '', lat: '', lng: '' }));
                        }}
                        onChangeAddress={() => setIsAddressModalOpen(true)}
                    />

                    <Divider />

                    <CartPaymentSection />

                    <Divider />

                    <CartVoucherSection
                        selectedVoucher={selectedVoucher}
                        onOpenModal={() => setIsVoucherModalOpen(true)}
                    />

                    <Divider />

                    <CartTotalsSection totals={totals} />

                    <CartSummaryActions />

                </CardBody>
            </Card>

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSelect={(addr) => {
                    setSelectedAddress(addr);
                    setCustomerInfo(prev => ({
                        ...prev,
                        name: addr.full_name || addr.user_name || '',
                        phone: addr.phone || '',
                    }));
                }}
                selectedAddressId={String(selectedAddress?.id)}
                phone={customerInfo.phone}
            />

            <VoucherModal
                isOpen={isVoucherModalOpen}
                onClose={() => setIsVoucherModalOpen(false)}
                onSelect={setSelectedVoucher}
                currentVoucherCode={selectedVoucher?.code}
            />

            <CreateAddressModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => {
                    handleCheckUser();
                }}
                initialData={customerInfo}
            />
        </div>
    );
}
