import { Params } from "@/types/api.type";
import { BannerData } from "@/types/banners.type";
import { fetchApp } from "./_fetchApp";
import { API_BANNER } from "./_const";

export const getBannerByCode = async (code: string, query?: Params) => {
  const res = await fetchApp.get<BannerData>(`${API_BANNER}/${code}`, query);
  return res || {};
};
