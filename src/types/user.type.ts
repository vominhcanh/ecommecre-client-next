export type UserData = {
    id?: number;
    code?: string;
    phone?: string;
    email?: string;
    type?: string;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string | null;
    gender?: string;
    birthday?: string;
    city_code?: string;
    district_code?: string;
    ward_code?: string;
    address?: string | null;
    is_active?: number;
    account_status?: string;
    group_code?: string;
    role_code?: string;
    permissions?: Record<string, string>;
    isLoggedIn: boolean;
}
