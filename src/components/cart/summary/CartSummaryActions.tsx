"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "@heroui/react";

export default function CartSummaryActions() {
    const { clearCart, cartData } = useCart();
    const hasItems = (cartData?.details?.length || 0) > 0;

    return (
        <div className="flex flex-col gap-3 mt-2">
            <Button
                size="lg"
                color="primary"
                className="w-full shadow-primary/20 bg-primary font-bold"
                isDisabled={!hasItems}
            >
                Thanh toán đơn hàng
            </Button>
            <Button
                size="lg"
                variant="bordered"
                color="danger"
                className="w-full border-red-200 text-red-500 hover:bg-red-50"
                onPress={() => {
                    clearCart();
                }}
            >
                Xóa giỏ hàng
            </Button>
        </div>
    );
}
