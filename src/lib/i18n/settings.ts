import { getCountryLanguage, getLanguage } from '@/services/language.services';
import { I18nResources } from '@/types/language.type';

/** Hàm lấy dữ liệu đa ngôn ngữ */
export const getResources = async () => {
  try {
    const res = await getLanguage();
    const data = res?.data;
    const dataResult: I18nResources = {};
    if (!data) return dataResult;
    Object.entries(data.dataImport).forEach(([key, value]) => {
      dataResult[key] = {
        [i18nConf.defaultNS]: value,
      };
    });
    return dataResult;
  } catch (error) {
    return {};
  }
};
/** Hàm lấy các quốc gia đa ngôn ngữ */
export const getLocalesSetting = async () => {
  try {
    const res = await getCountryLanguage({
      is_active: '1',
    });
    const data = res?.data;
    if (!data) return [];

    return data;
  } catch (error) {
    return [];
  }
};

export const i18nConf = {
  defaultLocale: 'vi',
  defaultNS: 'global',
} as const;
