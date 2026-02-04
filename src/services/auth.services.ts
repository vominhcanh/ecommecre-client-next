import { fetchApp } from "./_fetchApp";
import { API_AUTH } from "./_const";
import { UserData } from "@/types/user.type";
import { ResponseData } from "@/types/api.type";
import { LoginPayload, RegisterPayload } from "@/types/auth.type";

export const authServices = {
    register: async (payload: RegisterPayload) => {
        const res = await fetchApp.post(API_AUTH.register, payload);
        return res;
    },
    login: async (payload: LoginPayload) => {
        const res = await fetchApp.post(API_AUTH.login, payload);
        return res;
    },
    getProfile: async () => {
        const res = await fetchApp.get<UserData>(API_AUTH.getProfile);
        return res;
    }
};
