
export type RegisterPayload = {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    group_code: string;
    group_id: number;
    group_name: string;
}

export type LoginPayload = {
    phone: string;
    password: string;
}