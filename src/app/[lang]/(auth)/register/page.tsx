import type { Metadata } from 'next';
import { useServerTranslation } from '@/lib/i18n';
import RegisterClient from './RegisterClient';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { lang } = await params;
        const { t } = await useServerTranslation(lang);
        return {
            title: t('register'),
        };
    } catch (error) {
        return {
            title: 'Register',
        };
    }
}

import { Suspense } from 'react';

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterClient />
        </Suspense>
    );
}
