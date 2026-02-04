import { API_CART } from './_const';
import { fetchApp } from './_fetchApp';
import { PromiseResponse, ResponseData } from '@/types/api.type';
import { addToCart, CartResponse } from '@/types/cart.type';

export const cartServices = {
    getCart: (sessionId: string) => fetchApp.get<CartResponse>(API_CART.getCart, { session_id: sessionId }),

    addToCart: (payload: addToCart) => fetchApp.post(API_CART.addToCart, payload),

    updateProductInCart: (payload: addToCart) => fetchApp.post(API_CART.updateProductInCart, payload),

    deleteProductInCart: (id: number, sessionId: string) => fetchApp.delete(API_CART.deleteProductInCart(id), { session_id: sessionId }),

    deleteCart: (id: number) => fetchApp.delete(API_CART.deleteCart(id)),

};
