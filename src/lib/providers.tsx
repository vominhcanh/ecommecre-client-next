'use client';

import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Create a client for TanStack Query
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <HeroUIProvider>
          <NextThemesProvider attribute='class' defaultTheme='light' themes={['light', 'dark']}>
            <ToastProvider />
            <main>{children}</main>
          </NextThemesProvider>
        </HeroUIProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
