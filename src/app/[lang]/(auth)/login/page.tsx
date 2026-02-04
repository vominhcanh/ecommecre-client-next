import type { Metadata } from 'next';
import { useServerTranslation } from '@/lib/i18n';
import { Suspense } from 'react';
import { DefaultParams } from '@/types/api.type';
import LoginClient from '@/components/auth/LoginClient';

interface Props {
    params: Promise<DefaultParams>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { lang } = await params;
        const { t } = await useServerTranslation(lang);
        return {
            title: t('login'),
        };
    } catch (error) {
        return {
            title: 'Login',
        };
    }
}


export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginClient />
        </Suspense>
    );
}
