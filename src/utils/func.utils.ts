import { FetchHeaders, FuncUntilFilterMenu, Params, ResponseData } from '@/types/api.type';
import { MenuItemData } from '@/types/menu.type';
import { addToast } from '@heroui/toast';
import { deleteCookie, getCookie } from 'cookies-next';
import { CookieKey, LocalStorageKey } from './enums.utils';
import { MEDIA_URL, STORE_TOKEN } from './constants.utils';
import { BannerDetail, UrlVideo } from '@/types/banners.type';
import { postFile } from '@/services/file.services';

const funcUtils = {
  // ====== GET
  getStore: () => {
    return localStorage.getItem(LocalStorageKey.STORE_ID);
  },

  getLinkMenu: (item: MenuItemData) => {
    switch (item.type) {
      case 'CATEGORY':
        return `/san-pham/${item.router}`;
      case 'LINK-CUSTOM':
        return item.router;
      case 'URL':
        return item.router;
      case 'LANDING-PAGE':
        return `/lang-ding/${item.router}`;
      default:
        return item.router;
    }
  },

  getBannerLink: (item: BannerDetail) => {
    switch (item.type) {
      case 'PRODUCT':
        return `/san-pham/san-pham-theo-danh-muc/${item.slug}`;
      case 'NEWS':
        return `blogs/${item.category_post_slug}/${item.post_slug}`;
      case 'CATEGORY':
        return `/san-pham/${item.category_slug}`;
      default:
        return `${item.router}`;
    }
  },

  // ====== AuthHeader
  fetchHeaders: (host?: string | null) => {
    const tokenUser = getCookie(CookieKey.TOKEN_KEY);

    // xác định xem có phải là server đang gọi hàm hay không (để xử lý revalidate)
    const isServer = typeof window === 'undefined';

    const serverHeader = isServer
      ? {
        // cập nhật cache trên server sau 60s
        next: { revalidate: 10 },
      }
      : undefined;

    const fetchHeaders = {
      ...serverHeader,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenUser ?? STORE_TOKEN}`,
        Origin: host || '',
      },
      method: 'GET',
    } as FetchHeaders;
    return fetchHeaders;
  },

  postHeaders: (body: string) => {
    const fetchHeaders = {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STORE_TOKEN}`,
      },
      method: 'POST',
      body: body,
    } as FetchHeaders;
    return fetchHeaders;
  },

  postFileHeaders: () => {
    const fetchHeaders = {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${STORE_TOKEN}`,
      },
    } as FetchHeaders;
    return fetchHeaders;
  },

  // ======= other
  combineURL: (url: string, params?: Params) => {
    if (params) {
      const query = new URLSearchParams(params).toString();
      return `${url}?${query}`;
    }
    return `${url}`;
  },

  notify: (type: 'error' | 'warning' | 'success' | 'info', content?: string) => {
    if (typeof window === 'undefined') return;

    const color: Record<string, string> = {
      error: 'danger',
      warning: 'warning',
      success: 'success',
      info: 'default',
    };

    try {
      addToast({
        title: 'Thông báo',
        description: content || 'Có lỗi vui lòng liên hệ quản trị viên!',
        color: color[type] as 'danger' | 'warning' | 'success' | 'default',
      });
    } catch (error) {
      console.error("Toast error:", error);
    }
  },

  truncateString: (str: string, maxLength: number) => {
    if (!str) return;
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  },

  slugify: (str: string) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
  },

  progressError: <T = unknown>(response: ResponseData<T>) => {
    if (response.error) {
      const { errors } = response.error;
      const message = errors.msg;
      funcUtils.notify('error', message);
      throw new Error(message);
    }

    if (response?.message && response.status_code === 405) {
      funcUtils.notify('error', response.message);
      throw new Error(response.message);
    }

    if (response?.message && response.status_code === 500) {
      funcUtils.notify('error', response.message);
      throw new Error(response.message);
    }
    if (response?.message && response.status_code === 400) {
      funcUtils.notify('error', response.message);
      throw new Error(response.message);
    }
    if (response?.message && response.status_code === 401) {
      funcUtils.notify('error', response.message);
      deleteCookie(CookieKey.TOKEN_KEY);
      throw new Error(response.message);
    }
  },

  filterMenuData: (options: FuncUntilFilterMenu): MenuItemData[] => {
    const { data, filterType } = options;
    if (!data) return [];
    const menuData = data
      .filter(item => item?.item?.type === filterType && item.item.is_status)
      .map(item => item.item);
    return menuData;
  },

  filterBannerData: (options: { data: BannerDetail[] }): BannerDetail[] => {
    const { data } = options;
    if (!data) return [];
    const bannerData = data.filter(item => item.is_active);
    return bannerData;
  },

  handleUploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', '');
    formData.append('store_id', '');
    const response = await postFile(formData);
    const uploadedImageId = (response?.data as { id?: string })?.id;
    const dataRes = `${MEDIA_URL}/file/${uploadedImageId}`;
    return dataRes;
  },

  getLinkVideo: (data: BannerDetail): UrlVideo | undefined => {
    if (!data) return;

    const content = data.content;

    if (content?.includes('youtube.com')) {
      return {
        url: content,
        url_mobile: content,
      };
    }

    if (data.image_type === 'VIDEO') {
      return {
        url: data.image_url,
        url_mobile: data.image_url_mobile,
      };
    }

    return undefined;
  },
};

export { funcUtils };
