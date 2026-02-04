import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { CartItem } from '@/types/cart.type';
import { UserData } from '@/types/user.type';
import { StoreType } from '@/types/store.type';
import { LocalStorageKey } from '@/utils/enums.utils';
import { ResponseData } from '@/types/api.type';

// Cart Atoms
export const cartState = atomWithStorage<CartItem[]>(LocalStorageKey.CART, []);

// User Atoms
export const userState = atomWithStorage<UserData>(LocalStorageKey.USER, {
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
