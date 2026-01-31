import { Params } from "@/types/api.type";
import { fetchApp } from "./_fetchApp";
import { StoreType } from "@/types/store.type";
import { API_STORE } from "./_const";


export const getStoreByToken = async (query?: Params) => {
    try {
        const res = await fetchApp.get<StoreType>(`${API_STORE.getStoreByToken}`, query);
        return res?.data || null;
    } catch (error) {
        return null;
    }
};
