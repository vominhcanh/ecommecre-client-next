import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';
import { useMemo, useState } from 'react';

import { cartServices } from '@/services/cart.services';
import { CookieKey, QueryKey } from '@/utils/enums.utils';
import { addToCart, CartDetail, CartResponse } from '@/types/cart.type';
import { ResponseData } from '@/types/api.type';
import { addToast } from '@heroui/react';
import { funcUtils } from '@/utils/func.utils';

export function useCart() {
  const queryClient = useQueryClient();

  const [sessionId, setSessionId] = useState<string>(() => {
    let sid = getCookie(CookieKey.CART_SESSION_ID);
    if (!sid) {
      sid = uuidv4();
      setCookie(CookieKey.CART_SESSION_ID, sid);
    }
    return sid as string;
  });

  const { data: cartData, isLoading: isCartLoading } = useQuery<ResponseData<CartResponse>, Error, CartResponse | undefined>({
    queryKey: [QueryKey.CART, sessionId],
    queryFn: () => cartServices.getCart(sessionId),
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
  const cart = useMemo(() => cartData?.details || [], [cartData]);
  const itemsCount = useMemo(() => {
    return cartData?.details?.length || 0;
  }, [cartData]);

  const total = useMemo(() => {
    const apiTotal = cartData?.totals?.find(t => t.code === 'total')?.text;
    if (apiTotal !== undefined) return apiTotal;

    return (cartData?.details || []).reduce((sum: number, item: CartDetail) => sum + (item.price || 0) * (item.quantity || 0), 0);
  }, [cartData]);

  // ============================================================================
  // 4. Mutations (Write Operations)
  // ============================================================================

  const addToCartMutation = useMutation({
    mutationFn: (payload: addToCart) => {
      return cartServices.addToCart({
        ...payload,
        session_id: sessionId,
      });
    },
    onSuccess: (data) => {
      if (!data) return;
      addToast({
        description: data?.message,
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.CART, sessionId] });
    },
    onError: (error) => {
      addToast({
        title: error?.message,
        description: funcUtils.getErrorMessage(error),
        color: 'danger',
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: (payload: { productId: number; quantity: number, updateDetail: number }) => {
      return cartServices.updateProductInCart({
        session_id: sessionId,
        product_id: payload.productId,
        quantity: payload.quantity,
        update_detail: payload.updateDetail,
      });
    },
    onSuccess: (data) => {
      if (!data) return;
      // For quantity updates, we usually want to fetch fresh totals from server
      queryClient.invalidateQueries({ queryKey: [QueryKey.CART, sessionId] });
    },
    onError: (error) => {
      addToast({
        title: error?.message,
        description: funcUtils.getErrorMessage(error),
        color: 'danger',
      });
    },
  });

  /**
   * Remove a single product from the cart.
   */
  const removeFromCartMutation = useMutation({
    mutationFn: (id: number) => {
      return cartServices.deleteProductInCart(id, sessionId);
    },
    onSuccess: (data) => {
      if (!data) return;
      addToast({
        description: data?.message,
        color: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.CART, sessionId] });
    },
    onError: (error) => {
      addToast({
        title: error?.message,
        description: funcUtils.getErrorMessage(error),
        color: 'danger',
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => {
      return cartServices.deleteCart(cartData?.id || 0);
    },
    onSuccess: (data) => {
      if (!data) return;
      addToast({
        description: data?.message,
        color: 'success',
      });
      const newSid = uuidv4();
      setCookie(CookieKey.CART_SESSION_ID, newSid);
      setSessionId(newSid);
    },
    onError: (error) => {
      addToast({
        title: error?.message,
        description: funcUtils.getErrorMessage(error),
        color: 'danger',
      });
    },
  });

  // ============================================================================
  // 5. Public API
  // ============================================================================

  const addToCart = (product: addToCart) => {
    addToCartMutation.mutate({ ...product });
  };

  const removeFromCart = (id: number) => {
    removeFromCartMutation.mutate(id);
  };

  const updateQuantity = (productId: number, quantity: number, updateDetail: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    updateQuantityMutation.mutate({ productId, quantity, updateDetail });
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  // Combine all loading states
  const isLoading =
    isCartLoading ||
    addToCartMutation.isPending ||
    updateQuantityMutation.isPending ||
    removeFromCartMutation.isPending ||
    clearCartMutation.isPending;

  return {
    cart,           // List of cart items (restored for compatibility)
    cartData,       // Full cart response object
    itemsCount,     // Number of distinct items
    total,          // Formatted total price string
    isLoading,      // Unified loading state (true if ANY operation is pending)
    isCartLoading,  // Loading state of initial fetch
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
    addToCart,      // Function to add item
    removeFromCart, // Function to remove item
    updateQuantity, // Function to update quantity
    clearCart,      // Function to clear cart
  };
}
