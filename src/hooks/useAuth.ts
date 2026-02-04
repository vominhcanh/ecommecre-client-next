import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { userState } from '@/store/atoms';
import { authServices } from '@/services/auth.services';
import { addToast } from '@heroui/react';
import { LoginPayload, RegisterPayload } from '@/types/auth.type';
import { LocalStorageKey } from '@/utils/enums.utils';

export const useAuth = () => {
    const setUser = useSetAtom(userState);
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl') || '/';
    const [loading, setLoading] = useState(false);

    const handleAuthSuccess = async (token: string) => {

        document.cookie = `token=${token}; path=/; max-age=2592000`; // 30 days

        const profile = await authServices.getProfile();

        if (profile) {
            setUser({ ...profile?.data, isLoggedIn: true });
            addToast({ title: 'Success', description: 'Welcome back!', color: 'success' });
            router.push(returnUrl);
        }
    };

    const login = async (payload: LoginPayload) => {
        setLoading(true);
        try {
            const res = await authServices.login(payload);
            if (res.token) {
                await handleAuthSuccess(res.token);
            } else {
                throw new Error(res.message || 'Login failed');
            }
        } catch (error: any) {
            addToast({ title: 'Error', description: error?.message || 'Login failed', color: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload: RegisterPayload) => {
        setLoading(true);
        try {
            const res = await authServices.register(payload);
            if (res.token) {
                await handleAuthSuccess(res.token);
            } else {
                throw new Error(res.message || 'Registration failed');
            }
        } catch (error: any) {
            addToast({ title: 'Error', description: error?.message || 'Registration failed', color: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        document.cookie = 'token=; path=/; max-age=0';
        localStorage.removeItem(LocalStorageKey.USER);
        setUser({
            isLoggedIn: false,
        });
        router.push('/login');
    };

    return {
        login,
        register,
        logout,
        loading,
    };
};
