export type SettingData = {
  id: number | string;
  name?: string;
  description: string;
  code?: string;
};

export type SettingCreate = {
  code: string;
  name: string;
  description: string;
  status: string;
  company_code: string;
  company_name: string;
  company_id: number;
  publish: number;
  slug: string;
  store_code: string;
  store_id: number;
  store_name: string;
  updated_at: string;
};
export type SystemSettingData = {
  description: string;
  display: Array<SystemSettingData>;
  key: string;
  name: string;
  route_id: string;
  route_name: string;
  route_slug: string;
  status: string;
  type: string;
  type_url: string;
  value?: string;
  array: SystemSettingArrayData[];
};

export type SystemSettingArrayData = {
  key: string;
  name: string;
  value: string;
  file?: string;
  type: string;
  display: string;
  status?: string;
  array?: SystemSettingArrayData[];
  route_slug?: string;
  parent_key: string;
};

export type SystemSetting = {
  length: number;
  id: number;
  code?: string;
  slug?: string;
  name?: string;
  value?: string;
  status?: number;
  categories: Array<SystemSettingData>;
  company_code: string;
  company_id: number;
  company_name: string;
  data: Array<SystemSettingData>;
  data_cke: string;
  description: string;
  is_active: number;
  meta_description: string;
  meta_keyword: string;
  meta_robot: string;
  meta_title: string;
  publish: number;
  store_code: string;
  store_id: string;
  type: string;
  updated_at: string;
  store_name?: string;
};
