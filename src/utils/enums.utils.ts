// local storage
export enum LocalStorageKey {
  TOKEN = 'jwt',
  STORE_ID = 'store_id',
}

export enum CookieKey {
  SESSION_KEY = 'sessionIdCookie',
  TOKEN_KEY = 'token',
}

export enum ScreenSize {
  mobile = '425px',
  tablet = '768px',
  laptop = '1024px',
  desktop = '1280px',
  desktopL = '1536px',
}

export enum Track {
  GA = 'GA',
  META = 'META-PIXEL',
  TIKTOK = 'TIKTOK-PIXEL',
}

// những key cứng của api
export enum ApiKey {
  menu = 'MEGA-MENU',
  bannerHome = 'BANNER-HOME',
  achievement = 'OUR-ACHIEVEMENTS',
}

export enum FormatDate {
  DATE_TIME = 'YYYY-MM-DD HH:mm:ss',
  DATE = 'YYYY-MM-DD',
  DATE_VN = 'DD/MM/YYYY',
  DATE_TIME_VN = 'DD/MM/YYYY HH:mm:ss',
  TIME = 'HH:mm:ss',
  TIME_VN = 'HH:mm:ss',
  TIME_DATE = 'HH:mm:ss DD-MM-YYYY',
  TIME_DATE_VN = 'HH:mm:ss - DD/MM/YYYY',
}

export enum MenuItemType {
  CATEGORY = 'CATEGORY',
  LINK_CUSTOM = 'LINK-CUSTOM',
  URL = 'URL',
  LANDING_PAGE = 'LANDING-PAGE',
}

export enum BannerType {
  PRODUCT = 'PRODUCT',
  NEWS = 'NEWS',
  CATEGORY = 'CATEGORY',
}
