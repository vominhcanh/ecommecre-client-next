import { getLocalesSetting, getResources } from '@/lib/i18n/settings';
import { Providers } from '@/lib/providers';
import { LayoutProps } from '@/types/api.type';
import I18nResources from '../common/I18nResources';
import { notFound } from 'next/navigation';

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = params;
  const resources = await getResources();
  const locales = await getLocalesSetting();

  if (locales.length > 0) {
    const findLang = locales.find(item => item.code === lang);
    if (!findLang) return notFound();
  }

  return (
    <Providers>
      <I18nResources resources={resources} lang={lang} />
        {children}
    </Providers>
  );
}
