import { Params } from '@/types/api.type';
import { fetchApp } from './_fetchApp';
import { MenuData } from '@/types/menu.type';
import { API_MENU } from './_const';

export const getMenuByCode = async (code: string, query?: Params) => {
  try {
    const res = await fetchApp.get<MenuData>(`${API_MENU}/${code}`, query);
    return res?.data || null;
  } catch (error) {
    return null;
  }
};
