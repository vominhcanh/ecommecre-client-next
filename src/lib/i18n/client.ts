'use client';

import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import { usePathname } from 'next/navigation';
import { i18nConf } from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: i18nConf.defaultLocale,
    lng: i18nConf.defaultLocale, // let detect the language on client side
    ns: [i18nConf.defaultNS],
    returnNull: false,
    // preload: runsOnServerSide ? i18nConf.locales.map((item) => item.code) : [],
  });



  /** Chỉ sử dụng với `client` component */
export function useClientTranslation() {
  const ret = useTranslationOrg(i18nConf.defaultNS);
  const { i18n } = ret;
  const pathname = usePathname();
  const lng = pathname.split('/')[1];

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);

    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
  }
  return ret;
}
