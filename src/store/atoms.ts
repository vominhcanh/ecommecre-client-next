import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { CartItem } from '@/types/cart.type';
import { User } from '@/types/user.type';
import { StoreType } from '@/types/store.type';

// Cart Atoms
export const cartState = atomWithStorage<CartItem[]>('cart-items', []);

// User Atoms
export const userState = atomWithStorage<User>('user-state', {
  isLoggedIn: false,
});

// Cart Computed Atoms
export const cartItemsCountAtom = atom(get => {
  const cart = get(cartState);
  return cart.reduce((sum, item) => sum + item.quantity, 0);
});

export const cartTotalAtom = atom(get => {
  const cart = get(cartState);
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// UI State
export const themeState = atomWithStorage<'light' | 'dark'>('theme-mode', 'dark');

// Store Atoms
export const storeAtom = atom<StoreType | null>(null);
