export type Cities = {
  id: string;
  code: string;
  crm_code: string;
  name: string;
  full_name: string;
  description: string;
  region_code: string;
  region_name: string;
  country_id: number;
  country_name: string;
  is_active: number;
  update_at: string;
};

export type Districts = {
  id: string;
  code: string;
  crm_code: string;
  name: string;
  description: string;
  city_code: string;
  city_name: string;
  county_id: number;
  country_name: string;
  is_active: number;
  update_at: string;
};

export type Wards = {
  id: string;
  code: string;
  crm_code: string;
  name: string;
  description: string;
  city_code: string;
  city_name: string;
  county_id: number;
  country_name: string;
  is_active: number;
  update_at: string;
};

export type ShareAddress = {
  id: string;
  user_name: string;
  name: string;
  phone: string;
  typeAddress: boolean;
  defaultAddress: boolean;
  is_default: number;
  city_code: string;
  city_name: string;
  district_code: string;
  district_name: string;
  ward_code: string;
  ward_name: string;
  city: string;
  districts: string;
  ward: string;
};
