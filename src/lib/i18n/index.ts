import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getResources, i18nConf } from './settings';

const initI18next = async (lng: string) => {
  const i18nInstance = createInstance();
  await i18nInstance.use(initReactI18next).init({
    fallbackLng: i18nConf.defaultLocale,
    resources: await getResources(),
    lng: lng ?? i18nConf.defaultLocale,
    ns: [i18nConf.defaultNS],
  });
  return i18nInstance;
};
  /** Chỉ sử dụng với `server` component */
export async function useServerTranslation(lng: string) {
  const i18nextInstance = await initI18next(lng);
  i18nextInstance.language;
  return {
    t: i18nextInstance.getFixedT(i18nextInstance.language, i18nConf.defaultNS),
    i18n: i18nextInstance,
  };
}
