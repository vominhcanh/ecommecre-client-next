"use client";

import { useCart } from "@/hooks/useCart";
import { CartResponse } from "@/types/cart.type";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import CustomBreadcrumbs from "../ui/CustomBreadcrumbs";

interface CartPageContentProps {
    initialCartData: CartResponse | null;
    lang: string;
}

export default function CartPageContent({ initialCartData, lang }: CartPageContentProps) {
    const { cartData, isLoading } = useCart();

    const displayData = cartData || initialCartData;
    const items = displayData?.details || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <CustomBreadcrumbs
                items={[
                    { label: 'Trang chủ', href: `/${lang}` },
                    { label: 'Giỏ hàng', isCurrent: true }
                ]}
                containerClasses="mb-8"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <CartItemList items={items} lang={lang} />
                </div>
                <div className="lg:col-span-4">
                    <CartSummary cartData={displayData || undefined} lang={lang} />
                </div>
            </div>
        </div>
    );
}
