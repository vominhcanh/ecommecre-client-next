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

export type CreateAddressPayload = {
  full_name: string;
  phone: string;
  address: string;
  lat: string;
  long: string;
  is_default: '0' | '1' | number;
  cart_id: number | null;
  city_code?: string;
  district_code?: string;
  ward_code?: string;
};

export type AddressRegion = {
  code: string | null;
  name: string | null;
};

export type ShareAddress = {
  id: number;
  user_id: number | null;
  code: string | null;
  user_name: string | null;
  phone: string | null;
  full_name: string | null;
  address: string | null;
  street_address: string | null;
  is_default: number;
  city: AddressRegion;
  district: AddressRegion;
  ward: AddressRegion;
  lat: number;
  long: number;
  created_at: string;
  updated_at: string;
};

export interface DetectAddressResponse {
  cds_address: {
    city_code: string;
    city_name?: string;
    district_code: string;
    district_name?: string;
    ward_code: string;
    ward_name?: string;
  };
  phone?: string;
  full_name?: string;
}
