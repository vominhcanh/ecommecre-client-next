import { Params } from "@/types/api.type";
import { fetchApp } from "./_fetchApp";
import { API_PRODUCT } from "./_const";
import { ProductData, PropertiesTypeResponse } from "@/types/product.type";


export const getProducts = async (query?: Params) => {
    try {
        const res = await fetchApp.get<ProductData[]>(`${API_PRODUCT.getAll}`, query);
        return res?.data || null;
    } catch (error) {
        return null;
    }
};

export const getProductBySlug = async (slug: string) => {
    try {
        const res = await fetchApp.get<ProductData>(`${API_PRODUCT.getDetailBySlug(slug)}`);
        return res?.data || null;
    } catch (error) {
        return null;
    }
};

export const getSearchableProperties = async () => {
    try {
        const res = await fetchApp.get<PropertiesTypeResponse[]>(`${API_PRODUCT.getSearchableProperties}`);
        return res?.data || null;
    } catch (error) {
        return null;
    }
};

export const searchByProperties = async (query?: Params) => {
    try {
        const res = await fetchApp.get<ProductData[]>(`${API_PRODUCT.searchByProperties}`, query);
        return res?.data || null;
    } catch (error) {
        return null;
    }
};

export const searchByKeywords = async (query?: Params) => {
    try {
        const res = await fetchApp.get<ProductData[]>(`${API_PRODUCT.searchByKeywords}`, query);
        return res?.data || null;
    } catch (error) {
        return null;
    }
};
