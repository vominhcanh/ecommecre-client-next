'use client';

import { useState } from 'react';
import { Button, Input, Checkbox } from '@heroui/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { LoginPayload } from '@/types/auth.type';

type LoginFormProps = {
    onSubmit: (data: LoginPayload) => void;
    loading: boolean;
}

export default function LoginForm({ onSubmit, loading }: LoginFormProps) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ phone, password });
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Đăng nhập</h1>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input
                    isRequired
                    label="Số điện thoại"
                    labelPlacement="outside"
                    placeholder="Enter your phone number"
                    type="text"
                    radius="lg"
                    size="md"
                    value={phone}
                    onValueChange={setPhone}
                    startContent={
                        <Icon icon="solar:phone-linear" className="text-md text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    classNames={{
                        inputWrapper: "border-2 shadow-sm hover:border-primary-300 transition-colors",
                    }}
                />

                <div className="flex flex-col gap-4">
                    <Input
                        isRequired
                        label="Mật khẩu"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        radius="lg"
                        size="md"
                        value={password}
                        onValueChange={setPassword}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Icon icon="solar:eye-linear" className="text-md text-default-400 pointer-events-none" />
                                ) : (
                                    <Icon icon="solar:eye-closed-linear" className="text-md text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        classNames={{
                            inputWrapper: "border-2 shadow-sm hover:border-primary-300 transition-colors",
                        }}
                    />

                    <div className="flex justify-between items-center">
                        <Checkbox
                            classNames={{
                                label: "text-sm text-gray-600",
                            }}
                            size="sm"
                            color="primary"
                        >
                            Ghi nhớ
                        </Checkbox>
                        <Link href="#" className="text-primary text-sm font-semibold hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>

                <Button
                    color="primary"
                    type="submit"
                    isLoading={loading}
                    radius="lg"
                    fullWidth
                    size="md"
                >
                    Đăng nhập
                </Button>
            </form>

            <div className="relative m-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-3 text-gray-400 font-medium">Hoặc đăng nhập với</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="bordered"
                    size="md"
                    radius="lg"
                    className="font-medium border-1 border-primary hover:border-primary hover:bg-gray-50 transition-all"
                >
                    <Icon icon="logos:google-icon" className="text-xl" />
                    <span className="text-sm">Google</span>
                </Button>
                <Button
                    variant="bordered"
                    size="md"
                    radius="lg"
                    className="font-medium border-1 border-primary hover:border-primary hover:bg-gray-50 transition-all"
                >
                    <Icon icon="logos:facebook" className="text-xl" />
                    <span className="text-sm">Facebook</span>
                </Button>
            </div>

            <p className="text-center text-sm text-gray-500 pt-4">
                Chưa có tài khoản?{' '}
                <Link href="/register" className="text-primary font-bold hover:underline">
                    Đăng ký
                </Link>
            </p>
        </div>
    );
}
