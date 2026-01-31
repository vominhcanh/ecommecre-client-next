import { useHydrateAtoms } from 'jotai/utils';
import { storeAtom } from '@/store/atoms';
import { StoreType } from '@/types/store.type';

export const useHydrateStore = (storeData: StoreType | null) => {
    useHydrateAtoms([[storeAtom, storeData]]);
};
