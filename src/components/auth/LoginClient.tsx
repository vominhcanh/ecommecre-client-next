'use client';

import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export default function LoginClient() {
    const { login, loading } = useAuth();

    return (
        <AuthLayout
            title="Welcome Back!"
            subtitle="Discover premium products tailored just for you. Sign in to continue your journey with us."
        >
            <LoginForm onSubmit={login} loading={loading} />
        </AuthLayout>
    );
}
