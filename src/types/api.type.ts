import { MenuItem, MenuType } from './menu.type';

export type Params = string | string[][] | Record<string, string> | URLSearchParams | undefined;

export type FetchHeaders = {
  cache?: RequestCache;
  next?: { revalidate?: number };
  headers: {
    'Content-Type': string;
    Authorization: string;
  };
};

export type PromiseResponse<T = unknown> = Promise<ResponseData<T>>;

export type Meta = {
  pagination: {
    count?: number;
    current_page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
};

export type ResponseData<T = unknown> = {
  data?: T;
  meta?: Meta;
  message?: string;
  status?: string;
  status_code?: number;
  error?: {
    errors: {
      msg: string;
    };
  };
};

export type ArgMutate<T = unknown> = {
  arg: T;
};

export type DefaultParams = {
  lang: string;
};

export type LayoutProps<T extends Record<string, string> | DefaultParams = DefaultParams> = {
  children: React.ReactNode;
  params: T;
};

export type RouteProps<
  Params extends Record<string, string> = Record<string, string>,
  Search extends Record<string, string> = Record<string, string>,
> = {
  params: Params;
  searchParams: Partial<Search & Record<string, string>>;
};

export type StoreData = {
  address: string;
  avatar: null | string;
  batch_code: string;
  batch_id: number;
  batch_name: string;
  city_code: string;
  city_name: string;
  city_type: string;
  code: string;
  company_code: string;
  company_id: number;
  company_name: string;
  contact_phone: string;
  created_at: string;
  description: null | string;
  district_code: string;
  district_name: string;
  district_type: string;
  email: string;
  email_notify: string;
  id: number;
  is_active: number;
  lat: string;
  long: string;
  name: string;
  token: string;
  updated_at: string;
  ward_code: string;
  ward_name: string;
  ward_type: string;
  warehouse_code: null | string;
  warehouse_id: null | number;
  warehouse_name: null | string;
};

export type FuncUntilFilterMenu = {
  filterType: MenuType;
  data: MenuItem[];
};
