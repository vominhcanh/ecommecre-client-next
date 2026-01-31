import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { getLocalesSetting } from '@/lib/i18n/settings';
import { getBannerByCode } from '@/services/banner.services';
import { getMenuByCode } from '@/services/menu.services';
import { getStoreByToken } from '@/services/store.services';
import { LayoutProps } from '@/types/api.type';
import { StoreType } from '@/types/store.type';
import { ApiKey } from '@/utils/enums.utils';
import { Suspense } from 'react';
import RootLayout from '@/components/layouts/RootLayout';

export async function generateStaticParams() {
  const locales = await getLocalesSetting();

  return locales.map(lng => ({
    lang: lng.code,
  }));
}

export const generateMetadata = async ({ params }: LayoutProps) => {
  const { data } = await getBannerByCode(ApiKey.bannerHome, {
    lang: params?.lang || 'en',
  });
  const metaTitle = 'Acorneri Holdings ';
  const metaDescription = data?.details?.[0]?.description || '';

  return {
    title: {
      template: ` Acorneri Holdings | %s`,
      default: `Acorneri Holdings | ${metaTitle}`,
    },
    openGraph: {
      images: data ? [`${data?.details?.[0]?.image_url}`] : [],
    },
    description: metaDescription,
  };
};

// Component để xử lý loading state cho Header
async function HeaderWithData({ lang, storeData }: { lang: string; storeData: StoreType | null }) {
  const locales = await getLocalesSetting();
  const menuData = await getMenuByCode(ApiKey.menu, { lang });

  return <Header menuData={menuData} locales={locales} storeData={storeData} />;
}

// Loading component cho Header
function HeaderSkeleton() {
  return (
    <div className='sticky top-0 z-[9999] w-full bg-white shadow-sm'>
      <div className='h-20 w-full animate-pulse bg-gray-100'></div>
    </div>
  );
}

export default async function Layout({ children, params }: LayoutProps) {
  const dataStore = await getStoreByToken({
    lang: params?.lang,
  });

  return (
    <RootLayout params={params}>
      <main className='flex min-h-screen flex-col'>
        <Suspense fallback={<HeaderSkeleton />}>
          <HeaderWithData lang={params.lang} storeData={dataStore} />
        </Suspense>
        <div>{children}</div>
        <Footer storeData={dataStore} />
      </main>
    </RootLayout>
  );
}
