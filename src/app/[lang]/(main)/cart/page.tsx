import CartPageContent from "@/components/cart/CartPageContent";
import { cartServices } from "@/services/cart.services";
import { RouteProps } from "@/types/api.type";
import { CartResponse } from "@/types/cart.type";
import { CookieKey } from "@/utils/enums.utils";
import { cookies } from "next/headers";

export const metadata = {
    title: "Shopping Cart",
    description: "Review and manage your items",
};

export default async function CartPage({ params }: RouteProps<{ lang: string }>) {
    const { lang } = await params;
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(CookieKey.CART_SESSION_ID)?.value;

    let initialCartData: CartResponse | null = null;

    if (sessionId) {
        try {
            const res = await cartServices.getCart(sessionId);
            initialCartData = res.data || null;
        } catch (error) {
        }
    }

    return <div>

        <CartPageContent initialCartData={initialCartData} lang={lang} />
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-7 bg-primary rounded-full shadow-sm"></div>
                    <h2 className="text-xl font-bold font-gilroy text-primary uppercase tracking-wide">
                        Sản phẩm liên quan
                    </h2>
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-primary to-transparent ml-2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="h-40 w-full bg-gray-100 rounded-lg"></div>
                            <div className="h-4 w-full bg-gray-100 rounded-lg"></div>
                            <div className="h-4 w-full bg-gray-100 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>;
}
