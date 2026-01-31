import { Dispatch, Key, SetStateAction } from 'react';

export type MenuData = {
  id: number | string;
  code: string;
  created_at: string;
  created_by: string;
  data: string;
  name: string;
  is_ref?: string | null;
  lang?: string | null;
  lang_name?: string | null;
  store_id?: number;
  updated_at: string;
  updated_by: string;
};

export type MenuItem = {
  key: string;
  item: MenuItemData;
  children: MenuItem[];
};
export type MenuType = 'CATEGORY' | 'LINK-CUSTOM' | 'URL' | 'LANDING-PAGE' | 'ADMIN-ROUTE' | string;

export type MenuItemData = {
  title: string;
  type: MenuType;
  router: string;
  description: string;
  search: string;
  permission: string;
  banner: string | string[];
  banner_mobile: string | string[];
  icon: string | string[];
  icon_mobile: string | string[];
  icon_class_box: string;
  is_img: boolean;
  is_status: boolean;
  is_title: boolean;
};

type DropdownLinkType = { type: 'link'; href: string };

type DropdownItemType = { type: 'item'; children?: DropDownItem[] };

type DropdownFuncType = { type: 'func'; onClick?: () => void };

export type DropDownItem = {
  key?: Key;
  label: string;
  icon?: string;
} & (DropdownLinkType | DropdownItemType | DropdownFuncType);

export type DropDownItemProps = {
  data: DropDownItem[];
  type?: 'dropdown' | 'drawer' | 'menu';
  childCount?: number;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};
