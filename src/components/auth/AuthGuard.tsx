'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { userState } from '@/store/atoms';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useAtomValue(userState);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (!user.isLoggedIn) {
            // Debounce redirect to allow for hydration/storage read of atomWithStorage
            // This prevents "flash of unauthenticated" redirect when refreshing
            timeoutId = setTimeout(() => {
                const pathSegments = pathname.split('/');
                const lang = pathSegments[1] || 'en';
                const loginUrl = `/${lang}/login?returnUrl=${encodeURIComponent(pathname)}`;
                router.push(loginUrl);
                setAuthorized(false);
            }, 200);
        } else {
            setAuthorized(true);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [user.isLoggedIn, router, pathname]);

    // Show nothing while checking (or a loading spinner)
    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}
