"use client";

export default function CartPaymentSection() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Phương thức thanh toán</h3>
                <button className="text-sm font-medium text-primary hover:underline">Thay đổi</button>
            </div>
            <div className="text-sm text-gray-600">
                <p>Thanh toán khi nhận hàng (COD)</p>
            </div>
        </div>
    );
}
