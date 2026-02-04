"use client";

import { ShareAddress } from "@/types/address.type";
import PlaceAutocomplete, { PlaceSearchSelect } from "@/components/ui/PlaceAutocomplete";
import { Button, Input } from "@heroui/react";

interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
    lat: string;
    lng: string;
}

interface CartAddressSectionProps {
    selectedAddress: ShareAddress | null;
    customerInfo: CustomerInfo;
    onInfoChange: (info: CustomerInfo) => void;
    onCheckUser: () => void;
    onCreateAddress: () => void;
    onChangeAddress: () => void;
}

export default function CartAddressSection({
    selectedAddress,
    customerInfo,
    onInfoChange,
    onCheckUser,
    onCreateAddress,
    onChangeAddress
}: CartAddressSectionProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Thông tin nhận hàng</h3>
                {selectedAddress && (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            onPress={onCreateAddress}
                        >
                            Tạo địa chỉ
                        </Button>
                        <Button
                            size="sm"
                            variant="light"
                            color="primary"
                            onPress={onChangeAddress}
                        >
                            Thay đổi
                        </Button>
                    </div>
                )}
            </div>
            {!selectedAddress ? (
                <div className="flex flex-col gap-3">
                    <Input
                        label="Họ và tên"
                        placeholder="Nhập họ tên người nhận"
                        value={customerInfo.name}
                        onChange={(e) => onInfoChange({ ...customerInfo, name: e.target.value })}
                        variant="flat"
                        radius="md"
                        labelPlacement="outside"
                    />
                    <div className="flex gap-2 items-start">
                        <Input
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            value={customerInfo.phone}
                            onChange={(e) => onInfoChange({ ...customerInfo, phone: e.target.value })}
                            variant="flat"
                            radius="md"
                            labelPlacement="outside"
                            className="flex-1"
                        />
                    </div>
                    <PlaceAutocomplete
                        label="Địa chỉ"
                        placeholder="Số nhà, tên đường..."
                        value={customerInfo.address}
                        onInputChange={(val) => onInfoChange({ ...customerInfo, address: val })}
                        onSelectAddress={(data: PlaceSearchSelect) => {
                            onInfoChange({
                                ...customerInfo,
                                address: data.address,
                                lat: data.lat.toString(),
                                lng: data.lng.toString()
                            });
                        }}
                        variant="flat"
                        radius="md"
                        labelPlacement="outside"
                    />
                    <Button
                        color="primary"
                        className="w-full font-bold"
                        onPress={onCheckUser}
                        isDisabled={!customerInfo.phone}
                    >
                        Kiểm tra & Xác nhận thông tin
                    </Button>
                </div>
            ) : (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{selectedAddress.full_name || selectedAddress.user_name}</span>
                        <div className="w-[1px] h-3 bg-gray-300"></div>
                        <span className="font-normal text-gray-600">{selectedAddress.phone}</span>
                    </div>
                    <p>{selectedAddress.address}</p>
                    <p className="text-gray-500 text-xs mt-1">
                        {[selectedAddress.ward?.name, selectedAddress.district?.name, selectedAddress.city?.name].filter(Boolean).join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
}
