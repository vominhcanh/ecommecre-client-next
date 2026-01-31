import { Language, LanguageSettings } from '@/types/language.type';
import { fetchApp } from './_fetchApp';
import { API_LANGUAGE } from './_const';
import { Params } from '@/types/api.type';

export const getLanguage = () => fetchApp.get<LanguageSettings>(API_LANGUAGE.getLanguageDefault);

export const getCountryLanguage = (params: Params) =>
  fetchApp.get<Language[]>(API_LANGUAGE.getCountryLanguage, params);
