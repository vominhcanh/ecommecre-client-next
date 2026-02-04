"use client";

import { CartDetail } from "@/types/cart.type";
import { Button, Checkbox, Image, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect, useMemo, useCallback } from "react";
import { funcUtils } from "@/utils/func.utils";

interface CartItemListProps {
    items: CartDetail[];
    lang: string;
}

export default function CartItemList({ items, lang }: CartItemListProps) {
    const { updateQuantity, removeFromCart } = useCart();
    const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());

    useEffect(() => {
        setSelectedKeys(new Set(items.filter(i => i.price > 0).map(i => i.id)));
    }, [items.length]);


    const toggleSelection = (id: number) => {
        const newSet = new Set(selectedKeys);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedKeys(newSet);
    };

    const isSelected = (id: number) => selectedKeys.has(id);

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold font-gilroy text-gray-900">
                    Giỏ hàng <span className="text-gray-500 font-normal text-base">({items.length} sản phẩm)</span>
                </h2>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
                {items.map((item) => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        lang={lang}
                        isSelected={isSelected(item.id)}
                        toggleSelection={toggleSelection}
                    />
                ))}

                {items.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
                        <Icon icon="solar:cart-large-minimalistic-linear" className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Your cart is empty</p>
                        <Link href={`/${lang}/products`} className="text-primary font-medium hover:underline mt-2 inline-block">
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function CartItemRow({ item, lang, isSelected, toggleSelection }: { item: CartDetail, lang: string, isSelected: boolean, toggleSelection: (id: number) => void }) {
    const { updateQuantity, removeFromCart, isLoading } = useCart();
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    // Sync state when props change (e.g. from partial page reloads)
    useEffect(() => {
        setLocalQuantity(item.quantity);
    }, [item.quantity]);

    const debouncedUpdate = useMemo(
        () => funcUtils.debounce((id: number, qty: number, detail: number) => {
            updateQuantity(id, qty, detail);
        }, 800),
        [updateQuantity]
    );

    const handleQuantityChange = (newVal: number) => {
        if (newVal < 1) return;
        setLocalQuantity(newVal);
        debouncedUpdate(item.product_id, newVal, item.cart_id);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            setLocalQuantity(1); // or allow empty temporary? Better to keep valid.
            return;
        }
        const num = parseInt(val, 10);
        if (!isNaN(num)) {
            handleQuantityChange(num);
        }
    };

    const containerClasses = isSelected ? "bg-primary/10 border-primary/10" : "bg-white border-gray-100";

    return (
        <div
            className={cn(
                "flex gap-3 p-3 sm:p-4 rounded-md border transition-all duration-200",
                containerClasses
            )}
        >
            <div className="flex items-center">
                <Checkbox
                    isSelected={isSelected}
                    onValueChange={() => toggleSelection(item.id)}
                    color="primary"
                    classNames={{
                        wrapper: "before:border-gray-300"
                    }}
                />
            </div>

            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                <Image
                    src={item.product_thumb?.file || "/placeholder.jpg"}
                    alt={item.product_name}
                    className="h-full w-full object-cover"
                    width={80}
                    height={80}
                />
            </div>

            <div className="flex flex-1 flex-col justify-between py-0.5">
                <div className="flex justify-between gap-3">
                    <div>
                        <Link href={`/${lang}/product/${item.slug}`} className="font-bold text-gray-900 line-clamp-1 text-sm sm:text-base hover:text-primary transition-colors">
                            {item.product_name}
                        </Link>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 font-medium mt-0.5">
                            {item.product_code && <span>Mã SP: {item.product_code}</span>}
                        </div>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 transition-colors p-1 -mt-1 -mr-1"
                    >
                        <Icon icon="solar:trash-bin-trash-linear" className="text-md" />
                    </button>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <span className={`font-bold text-gray-900 text-base`}>
                            {`${item.price_formatted}`}
                        </span>
                        {item.old_product_price > item.price && (
                            <span className="text-xs text-gray-400 line-through font-medium hidden sm:inline-block">
                                {item.old_product_price_formatted}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center h-9 rounded-lg border border-gray-200 bg-white overflow-hidden group hover:border-primary/50 transition-colors">
                        <button
                            onClick={() => handleQuantityChange(localQuantity - 1)}
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:cursor-not-allowed"
                            disabled={localQuantity <= 1}
                        >
                            <Icon icon="ic:sharp-minus" width="16" height="16" />
                        </button>
                        <div className="h-4 w-[1px] bg-gray-100"></div>
                        <input
                            type="text"
                            value={localQuantity}
                            onChange={handleInputChange}
                            className="w-10 h-full text-center text-sm font-bold text-gray-900 outline-none bg-transparent selection:bg-primary/20"
                        />
                        <div className="h-4 w-[1px] bg-gray-100"></div>
                        <button
                            onClick={() => handleQuantityChange(localQuantity + 1)}
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors active:bg-gray-100"
                        >
                            <Icon icon="material-symbols:add" width="16" height="16" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
