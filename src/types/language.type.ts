export interface Language {
  id: number;
  name: string;
  code: string;
  nationality: string;
  image_url: string;
  is_active: 0 | 1 | number;
}
export interface LocaleSwitcher {
  locales: Language[];
}
export interface DataImportLanguages {
  [key: string]: {
    [key: string]: string;
  };
}

export interface LanguageSettings {
  id: number;
  name: string;
  code: string;
  created_at?: string;
  updated_at?: string;
  platform: 'CLIENT' | 'ADMIN';
  languageOptions: string[];
  dataImport: DataImportLanguages;
}

export interface I18nResources {
  [key: string]: {
    global: Record<string, string>;
  };
}
