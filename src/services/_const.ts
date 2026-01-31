import { BASE_URL, MEDIA_FOLDER, MEDIA_URL } from '@/utils/constants.utils';

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
  register: `${API_V1}/auth/register`,
  login: `${API_V1}/auth/login`,
  sendResetPasswordOtp: `${API_V1}/auth/reset-password/send-phone`,
  resetPassword: `${API_V1}/auth/reset-password`,
  getProfile: `${API_V1}/users/profile`,
  registerAndLogin: `${API_V1}/auth/register-and-login`,
};