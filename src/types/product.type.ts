import { StaticImageData } from 'next/image';
import { Params, Meta } from './api.type';

export type ProductOption = {
    id?: number | string;
    code?: string;
    name?: string;
};

export type ParamsProduct = {
    lang?: 'vi' | string;
    limit: 20;
    status: 1;
    category_slug?: string;
    page: 1;
};

export type ProductVariantData = {
    id: number;
    product_id: number;
    product_variant_erp_id: number | null;
    product_attributes: string[];
    product_code: string;
    product_name: string;
    price: number;
    image: string;
    inventory: number;
    is_active: number;
    availability: number;
    deleted: number;
    created_at: string;
    updated_at: string;
    price_formatted: string;
    name: string;
};

export type ProductData = {
    id: number | string;
    code: string;
    name: string;
    slug: string;
    url?: string;
    description: string;
    short_description: string | null;
    view: number | null;
    sku: string | null;
    width: number;
    height: number;
    length: number;
    weight: number;
    length_class: string;
    weight_class: string;
    thumbnail_id: number | string;
    thumbnail_type: string;
    thumbnail: string;
    iframe_image_promotion: any[];
    gallery_image_ids: string;
    gallery_images: any[]; // relaxed as per JSON showing [[Object]]
    feature_img: string | null;
    feature_img_mobile: string | null;
    unit_id: number | string;
    unit_name: string;
    qty_selling: number;
    sold_count: number;
    sold_count_formatted: string;
    star: {
        total_rate: any;
        avg_star: {
            avg: number;
            total: number;
        } | any;
    };
    price: number;
    price_formatted: string;
    price_freelancer?: number;
    price_freelancer_formatted?: string;
    freelancer_commission?: number;
    freelancer_commission_formatted?: string;
    original_price: number;
    original_price_formatted: string;
    percentage_price_old: string;
    promotion_price_formatted?: string;
    special: number | null;
    special_formatted: string | null;
    special_start_date?: string | null;
    special_end_date?: string | null;
    special_percentage: number;
    special_percentage_formatted: string;
    property_variant_ids?: any;
    property_variant: any[];
    brand: { id: number; code: string; name: string } | null;
    manufacture: any | null;
    sale_area: any[];
    areas?: any;
    main_category: any | null;
    main_category_slug: string | null;
    category_ids: any | null;
    categories: any[];
    category_code: string;
    category: { id: number; code: string; name: string };
    product_type: string;
    is_ref?: any;
    lang: string;
    lang_name: string;
    shop_contact?: any;

    // Kept some likely optional fields from previous if needed for UI elsewhere, 
    // but prioritized JSON structure above.
    is_featured?: number | string;
    is_cool?: number;
    program_point?: number;
    product_trial?: number;
    tags?: string; // missing in json but might be used

    // Methods or other computed props used in UI might need review
    // But this matches the JSON.
};

export type ProductSearch = Pick<ProductData, 'id' | 'code' | 'name' | 'slug' | 'main_category_slug'>;

export type SliderSection = {
    typeSection: 'SLIDER';
};

export type ListSection = {
    typeSection: 'LIST';
    pagination?: boolean;
};

export type ListSectionFlashSale = {
    typeSection: 'FLASH_SALE';
    pagination?: boolean;
};

export type BannerSection = {
    typeSection: 'BANNER';
    bannerImage: string | StaticImageData;
    positionBanner: 'LEFT' | 'TOP';
};

export type ItemPropsProductSection = {
    title?: string;
    col?: 3 | 4 | 5;
    dataList?: ProductData[];
    container?: boolean;
    className?: string;
    color?: string;
    params?: Params;
    meta?: Meta;
    sold?: boolean;
    btnTitle?: string;
    pathBtn?: string;
    typeProduct?: 'RETAIL-SERVICE' | 'PRODUCT' | 'FLASH_SALE' | 'COMBO-SERVICE' | 'CROUSE';
    /**
     * @description Nếu truyền `true` thì nếu không có data sẽ hiển thị 404
     */
    has404?: boolean;
} & (SliderSection | ListSection | BannerSection | ListSectionFlashSale);

export type ProductTypeSectionAttributePick = Pick<
    ItemPropsProductSection,
    'col' | 'dataList' | 'title' | 'meta' | 'sold' | 'typeProduct' | 'btnTitle' | 'pathBtn'
>;

export type SectionFlashSaleProps = ProductTypeSectionAttributePick & {
    color?: string;
    sold?: boolean;
};

export type BannerTopSectionProps = ProductTypeSectionAttributePick &
    Pick<BannerSection, 'bannerImage'>;

export type BannerLeftSectionProps = BannerTopSectionProps;

export type PropertiesTypeResponse = {
    key: string;
    slug: string;
    value: string[];
};
