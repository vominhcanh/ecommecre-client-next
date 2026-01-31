export type BannerColumns = {
  field: string;
  header: string;
};

export type BannerDetail = {
  category_id: number | string;
  category_name: string;
  category_post_name: string;
  category_post_slug: string;
  category_slug: string;
  color: string;
  content: string;
  data: string;
  description: string;
  display_in_categories: [];
  group: {
    code: string;
    name: string;
  }[];
  id: number | string;
  image: number;
  image_alt: string;
  image_alt_mobile: string;
  image_mobile: number;
  image_type: string;
  image_url: string;
  image_url_mobile: string;
  is_active: number;
  lp_name: string;
  name: string;
  order_by: number;
  post_name: string;
  post_slug: string;
  product_id: string;
  product_name: string;
  product_search_query: string;
  query: string;
  router: string;
  slug: string;
  target_id: string;
  type: string;
};

export type BannerData = {
  id?: number | string;
  background_color: string;
  code: string;
  columns: BannerColumns[];
  created_at: string;
  created_by: string;
  description: string;
  details: BannerDetail[];
  display_in_categories: [];
  display_in_category_details: [];
  is_active: number;
  is_show_name: number;
  padding_bottom: number;
  padding_left?: number;
  padding_right: number;
  padding_top: number;
  store_id: number;
  title: string;
  type_section: string;
  updated_at: string;
  updated_by: string;
  attribute_info: { key: string; value: string }[];
};

export type UrlVideo = {
  url: string;
  url_mobile: string;
};

export type BannerProps<DataType = unknown> = {
  code?: string;
  data?: DataType;
  container?: boolean;
  className?: string;
  type?: 'SLIDER' | 'SLIDER-DETAIL-PAGE' | 'FLEX';
  title?: string;
  description?: string;
  subTitle?: string;
  background?: 'DARK' | 'LIGHT' | 'TRANSPARENT';
};
