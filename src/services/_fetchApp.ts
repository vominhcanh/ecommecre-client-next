import { Params, PromiseResponse } from '@/types/api.type';
import { funcUtils } from '@/utils/func.utils';

/**
 * HTTP client wrapper for API calls with improved error handling
 */
export const fetchApp = {
  get: async <TResponse = unknown>(
    url: string,
    params?: Params,
  ): PromiseResponse<TResponse> => {
    try {
      const response = await fetch(funcUtils.combineURL(url, params), funcUtils.fetchHeaders());

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData) throw errorData;
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // funcUtils.notify('error', 'Không thể tải dữ liệu. Vui lòng thử lại.');
      throw error;
    }
  },

  post: async <TResponse = unknown, TData = unknown>(url: string, payload: TData): PromiseResponse<TResponse> => {
    try {
      const body = JSON.stringify(payload);
      const response = await fetch(url, funcUtils.postHeaders(body));

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData) throw errorData;
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // funcUtils.notify('error', 'Không thể gửi dữ liệu. Vui lòng thử lại.');
      throw error;
    }
  },

  put: async <TResponse = unknown, TData = unknown>(url: string, payload: TData): PromiseResponse<TResponse> => {
    try {
      const body = JSON.stringify(payload);
      const response = await fetch(url, {
        method: 'PUT',
        body: body,
        ...funcUtils.fetchHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData) throw errorData;
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // funcUtils.notify('error', 'Không thể cập nhật. Vui lòng thử lại.');
      throw error;
    }
  },

  delete: async <TResponse = unknown>(url: string, params?: Params): PromiseResponse<TResponse> => {
    try {
      const response = await fetch(funcUtils.combineURL(url, params), {
        method: 'DELETE',
        ...funcUtils.fetchHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData) throw errorData;
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // funcUtils.notify('error', 'Không thể xóa. Vui lòng thử lại.');
      throw error;
    }
  },

  postFile: async <TResponse = unknown>(url: string, formData: FormData): PromiseResponse<TResponse> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        ...funcUtils.postFileHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData) throw errorData;
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // funcUtils.notify('error', 'Không thể tải file lên. Vui lòng thử lại.');
      throw error;
    }
  },
};
