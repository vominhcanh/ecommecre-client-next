import type { Metadata } from 'next';
import { useServerTranslation } from '@/lib/i18n';
import LoginClient from './LoginClient';

interface Props {
    params: {
        lang: string;
    };
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
    try {
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

import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginClient />
        </Suspense>
    );
}
