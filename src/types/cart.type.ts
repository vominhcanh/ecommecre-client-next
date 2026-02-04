export interface CartResponse {
    id: number;
    user_id: number | null;
    session_id: string;
    order_source: string | null;
    order_number: string | null;
    po_number: string | null;
    order_created_by: string | null;
    order_date: string | null;
    estimated_deliver_time: string | null;
    description: string | null;
    shipping_address_id: number | null;
    shipping_address_info: ShippingAddressInfo | null;
    customer_id: number | null;
    seller_id: number | null;
    payment_method: string;
    payment_method_name: string | null;
    shipping_method: string;
    shipping_method_code: string | null;
    shipping_method_name: string | null;
    ship_fee: number;
    shipping_service: string | null;
    shipping_service_name: string | null;
    distributor_id: number | null;
    totals: CartTotal[];
    details: CartDetail[];
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
}

export interface ShippingAddressInfo {
    id: number;
    lat: string | null;
    long: string | null;
    email: string | null;
    phone: string | null;
    erp_id: string | null;
    address: string | null;
    deleted: number;
    user_id: number | null;
    store_id: number;
    city_code: string | null;
    city_name: string | null;
    full_name: string | null;
    user_type: string | null;
    ward_code: string | null;
    ward_name: string | null;
    company_id: number;
    created_at: string;
    created_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    is_default: number;
    updated_at: string;
    updated_by: string | null;
    district_code: string | null;
    district_name: string | null;
    street_address: string | null;
}

export interface CartTotal {
    code: string;
    title: string;
    text: string;
    value: number;
}

export interface CartDetail {
    id: number;
    cart_id: number;
    product_id: number;
    product_code: string;
    product_name: string;
    product_description: string;
    product_thumb: ProductThumb | null;
    main_category_slug: string | null;
    old_product_price: number;
    weight: number;
    length: number;
    width: number;
    note: string | null;
    quantity: number;
    price: number;
    price_after_discount_after_vat: number;
    price_after_discount_before_vat: number;
    amount_vat: number;
    amount_discount_after_vat: number;
    amount_discount_before_vat: number;
    amount_after_discount_before_vat: number;
    total_after_discount_after_vat: number;
    total_before_discount_before_vat: number;
    total_before_discount_after_vat: number;
    vat_value: number;
    item_value: number;
    deleted: number;
    created_at: string;
    created_by: string | null;
    updated_at: string;
    updated_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    total: string;
    price_after_tax: string;
    price_before_tax: string;
    total_after_tax: string;
    total_before_tax: string;
    tax_value: string;
    old_product_price_formatted: string;
    price_formatted: string;
    price_after_discount_after_vat_formatted: string;
    price_after_discount_before_vat_formatted: string;
    amount_vat_formatted: string;
    amount_discount_after_vat_formatted: string;
    amount_discount_before_vat_formatted: string;
    amount_after_discount_before_vat_formatted: string;
    total_after_discount_after_vat_formatted: string;
    total_before_discount_before_vat_formatted: string;
    total_before_discount_after_vat_formatted: string;
    slug?: string;
}

export interface ProductThumb {
    id: number;
    alt: string;
    file: string;
    type: string;
}

// Keep backward compatibility if needed, or alias
export type CartItem = CartDetail;

export type addToCart = {
    session_id?: string;
    product_id?: number;
    price?: number;
    quantity?: number;
    update_detail?: number;
}