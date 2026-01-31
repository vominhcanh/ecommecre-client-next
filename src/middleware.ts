import { match as matchLocale } from '@formatjs/intl-localematcher';
import { NextRequest } from 'next/server';

import Negotiator from 'negotiator';
import { getLocalesSetting, i18nConf } from './lib/i18n/settings';

// Get the preferred locale, similar to the above or using a library
let isFirstRender = true;
function getLocale(request: NextRequest, locales: string[]) {
  // If it's the first render, return the default locale
  // if (isFirstRender) {
  //   isFirstRender = false;
  //   return i18nConf.defaultLocale;
  // }

  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  let locale: string;

  locale = matchLocale(languages, locales, i18nConf.defaultLocale);

  return locale;
}

export async function middleware(request: NextRequest) {
  const locales = (await getLocalesSetting()).map(item => item.code);

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request, locales);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), static files, and images
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico|css|js)$).*)',
    // Optional: only run on root (/) URL
    // '/',
  ],
  unstable_allowDynamic: [
    // Allow dynamic routes
    '/:path*',
  ],
};
