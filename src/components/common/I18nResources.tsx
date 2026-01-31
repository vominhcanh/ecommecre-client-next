'use client';
import type { I18nResources } from '@/types/language.type';
import { useClientTranslation } from '@/lib/i18n/client';
import { useEffect } from 'react';

type T18nResourcesProps = {
  resources: I18nResources;
  lang: string;
};
const I18nResources = ({ resources, lang }: T18nResourcesProps) => {
  const { i18n } = useClientTranslation();

  useEffect(() => {
    i18n.init({
      resources,
    });
  }, [lang]);

  return <></>;
};
export default I18nResources;
