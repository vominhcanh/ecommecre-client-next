import { useAtom, useAtomValue } from 'jotai';
import { CartItem } from '@/types/cart.type';
import { cartState, cartItemsCountAtom, cartTotalAtom } from '@/store/atoms';

export function useCart() {
  const [cart, setCart] = useAtom(cartState);
  const itemsCount = useAtomValue(cartItemsCountAtom);
  const total = useAtomValue(cartTotalAtom);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart(currentCart => {
      // Check if item already exists
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        return currentCart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      // Add new item to cart
      return [...currentCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart =>
      currentCart.map(item => (item.id === productId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    itemsCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
