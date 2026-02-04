'use client';

import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterClient() {
    const { register, loading } = useAuth();

    return (
        <AuthLayout
            title="Join Our Community"
            subtitle="Create an account and unlock exclusive deals, personalized recommendations, and premium shopping experience."
        >
            <RegisterForm onSubmit={register} loading={loading} />
        </AuthLayout>
    );
}
