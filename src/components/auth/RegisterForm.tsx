'use client';

import { useState } from 'react';
import { Button, Input, Checkbox } from '@heroui/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { RegisterPayload } from '@/types/auth.type';

interface RegisterFormProps {
    onSubmit: (data: RegisterPayload) => void;
    loading: boolean;
}

export default function RegisterForm({ onSubmit, loading }: RegisterFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            full_name: name,
            email,
            phone,
            password,
            group_code: 'GUEST',
            group_id: 240,
            group_name: 'Khách lẻ',
        };
        onSubmit(payload);
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <Input
                    isRequired
                    label="Full Name"
                    labelPlacement="outside"
                    placeholder="e.g. John Doe"
                    radius="lg"
                    size="md"
                    value={name}
                    onValueChange={setName}
                    startContent={<Icon icon="solar:user-linear" className="text-md text-default-400 pointer-events-none flex-shrink-0" />}
                    classNames={{
                        inputWrapper: "border-2 shadow-sm hover:border-primary-300 transition-colors",
                    }}
                />
                <Input
                    isRequired
                    label="Phone Number"
                    labelPlacement="outside"
                    placeholder="e.g. 0912345678"
                    radius="lg"
                    size="md"
                    value={phone}
                    onValueChange={setPhone}
                    startContent={<Icon icon="solar:phone-linear" className="text-md text-default-400 pointer-events-none flex-shrink-0" />}
                    classNames={{
                        inputWrapper: "border-2 shadow-sm hover:border-primary-300 transition-colors",
                    }}
                />
                <Input
                    isRequired
                    label="Email Address"
                    labelPlacement="outside"
                    placeholder="e.g. john@example.com"
                    type="email"
                    radius="lg"
                    size="md"
                    value={email}
                    onValueChange={setEmail}
                    startContent={<Icon icon="solar:letter-linear" className="text-md text-default-400 pointer-events-none flex-shrink-0" />}
                    classNames={{
                        inputWrapper: "border-2 shadow-sm hover:border-primary-300 transition-colors",
                    }}
                />
                <Input
                    isRequired
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Create a strong password"
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

                <Checkbox
                    defaultSelected
                    size="sm"
                    color="primary"
                    classNames={{ label: "text-sm text-gray-600" }}
                >
                    I agree to the <Link href="#" className="text-primary font-semibold hover:underline">Terms</Link> and <Link href="#" className="text-primary font-semibold hover:underline">Privacy Policy</Link>
                </Checkbox>

                <Button
                    color="primary"
                    type="submit"
                    isLoading={loading}
                    radius="lg"
                    fullWidth
                    size="md"
                >
                    Create Account
                </Button>
            </form>

            <div className="relative m-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-3 text-gray-400 font-medium">Or register with</span>
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
                Already have an account?
                <Link href="/login" className="text-primary font-bold hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
