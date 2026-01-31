import { Params, PromiseResponse } from '@/types/api.type';
import { funcUtils } from '@/utils/func.utils';

/**
 * HTTP client wrapper for API calls with improved error handling
 */
export const fetchApp = {
  get: async <T = Record<string, unknown>>(
    url: string,
    params?: Params,
  ): Promise<PromiseResponse<T>> => {
    try {
      const response = await fetch(funcUtils.combineURL(url, params), funcUtils.fetchHeaders());

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      funcUtils.notify('error', 'Không thể tải dữ liệu. Vui lòng thử lại.');
      throw error;
    }
  },

  post: async <T = Record<string, unknown>>(url: string, payload: T): Promise<PromiseResponse<T>> => {
    try {
      const body = JSON.stringify(payload);
      const response = await fetch(url, funcUtils.postHeaders(body));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      funcUtils.notify('error', 'Không thể gửi dữ liệu. Vui lòng thử lại.');
      throw error;
    }
  },

  put: async <T = Record<string, unknown>>(url: string, payload: T): Promise<PromiseResponse<T>> => {
    try {
      const body = JSON.stringify(payload);
      const response = await fetch(url, {
        method: 'PUT',
        body: body,
        ...funcUtils.fetchHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      funcUtils.notify('error', 'Không thể cập nhật. Vui lòng thử lại.');
      throw error;
    }
  },

  delete: async (url: string, params?: Params): Promise<PromiseResponse<unknown>> => {
    try {
      const response = await fetch(funcUtils.combineURL(url, params), {
        method: 'DELETE',
        ...funcUtils.fetchHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      funcUtils.notify('error', 'Không thể xóa. Vui lòng thử lại.');
      throw error;
    }
  },

  postFile: async (url: string, formData: FormData): Promise<PromiseResponse<unknown>> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        ...funcUtils.postFileHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      funcUtils.notify('error', 'Không thể tải file lên. Vui lòng thử lại.');
      throw error;
    }
  },
};
