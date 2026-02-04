import { BASE_URL, MEDIA_FOLDER, MEDIA_URL } from '@/utils/constants.utils';

export const API_V0 = `${BASE_URL}/v0`;

export const API_V1 = `${BASE_URL}/v1/client`;

export const API_UPLOAD_FILE = `${MEDIA_URL}/upload/${MEDIA_FOLDER}`;
export const API_MENU = `${API_V1}/site-menus`;
export const API_BANNER = `${API_V1}/banners`;

export const API_LANGUAGE = {
  getLanguageDefault: `${API_V1}/language-admin/CLIENT-LANGUAGE`,
  getCountryLanguage: `${API_V1}/setting-languages`,
};

export const API_STORE = {
  getStoreByToken: `${API_V1}/store-by-token`,
};

export const API_AUTH = {
  getUserGroup: `${API_V1}/auth/user-group`,
  listUsersByPhone: `${API_V1}/auth/list-users-by-phone`,
  register: `${BASE_URL}/client/auth/register`,
  login: `${BASE_URL}/client/auth/login`,
  sendResetPasswordOtp: `${API_V1}/auth/reset-password/send-phone`,
  resetPassword: `${API_V1}/auth/reset-password`,
  getProfile: `${API_V1}/users/profile`,
  registerAndLogin: `${API_V1}/auth/register-and-login`,
};

export const API_PRODUCT = {
  getAll: `${API_V1}/products`,
  getDetailBySlug: (slug: string) => `${API_V1}/product-detail-by-slug/${slug}`,
  getLanguagePaths: `${API_V1}/product-path-of-langs`,
  getSearchableProperties: `${API_V1}/list-properties-can-search`,
  searchByProperties: `${API_V1}/search-properties`,
  searchByKeywords: `${API_V1}/search_keyword`,
  getComments: (id: string) => `${API_V1}/product/${id}/comments`,
  postComment: `${API_V1}/product-comment`,
};

export const API_CATEGORY = {
  getAll: `${API_V1}/categories`,
  getBySlug: (slug: string) => `${API_V1}/categories-by-slug/${slug}`,
  getDetailBySlug: (slug: string) => `${API_V1}/category/detail-by-slug/${slug}`,
  getLanguagePaths: `${API_V1}/category-path-of-langs`,
};

export const API_CART = {
  getCart: `${API_V1}/cart/get-cart`,
  addToCart: `${API_V1}/cart/add-to-cart`,
  updateProductInCart: `${API_V1}/cart/add-to-cart`,
  deleteProductInCart: (id: number) => `${API_V1}/cart/remove-item/${id}`,
  deleteCart: (id: number) => `${API_V1}/cart/remove-cart/${id}`,
};

export const API_ADDRESS = {
  getAll: `${API_V1}/shipping-address`,
  create: `${API_V1}/shipping-address`,
  update: (id: string | number) => `${API_V1}/shipping-address/${id}`,
  delete: (id: string | number) => `${API_V1}/shipping-address/${id}`,
  cities: `${API_V0}/1/cities`,
  wards: (city_code: string) => `${API_V0}/${city_code}/wards`,
  detect: "https://detect-dms.daithuan.vn/v1/ai/txt/str_to_search_cds_address"
};

export const API_VOUCHER = {
  getAll: `${API_V1}/vouchers`,
};