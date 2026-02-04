import { Cities, CreateAddressPayload, ShareAddress, Wards, DetectAddressResponse } from "@/types/address.type";
import { API_ADDRESS } from "./_const";
import { fetchApp } from "./_fetchApp";
import { Params } from "@/types/api.type";

export const addressServices = {
    getCities: async () => await fetchApp.get<Cities[]>(API_ADDRESS.cities),

    getWards: async (cityCode: string) => await fetchApp.get<Wards[]>(API_ADDRESS.wards(cityCode)),

    getAddresses: async (query?: Params) => await fetchApp.get<ShareAddress[]>(API_ADDRESS.getAll, query),

    createAddress: async (payload: CreateAddressPayload) => await fetchApp.post(API_ADDRESS.create, payload),

    deleteAddress: async (id: string | number) => await fetchApp.delete(API_ADDRESS.delete(id)),

    updateAddress: async (id: string | number, payload: CreateAddressPayload) => await fetchApp.put(API_ADDRESS.update(id), payload),

    detectAddress: async (address: string) => await fetchApp.get<DetectAddressResponse[]>(API_ADDRESS.detect, { src: address }),
};
