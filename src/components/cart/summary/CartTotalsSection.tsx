"use client";

import { CartTotal } from "@/types/cart.type";
import { Divider } from "@heroui/react";

interface CartTotalsSectionProps {
    totals: CartTotal[];
}

export default function CartTotalsSection({ totals }: CartTotalsSectionProps) {
    return (
        <div className="flex flex-col gap-3">
            {totals.map((item) => {
                if (item.code === 'total') {
                    return (
                        <div key={item.code} className="flex flex-col gap-3">
                            <Divider className="my-1" />
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-red-600">{item.title}</span>
                                <span className="text-xl font-bold text-red-600">
                                    {item.text}
                                </span>
                            </div>
                        </div>
                    );
                }

                return (
                    <div key={item.code} className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">{item.title}</span>
                        <span className={`font-semibold ${item.value < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            {item.text}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
