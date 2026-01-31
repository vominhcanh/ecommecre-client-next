'use client';

import { useSetAtom } from 'jotai';
import { userState } from '@/store/atoms';
import { Input, Button, Checkbox } from '@heroui/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const setUser = useSetAtom(userState);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock Registration Flow
        setTimeout(() => {
            // Auto-login after register
            setUser({
                isLoggedIn: true,
                name: name || 'New User',
                email: email || 'user@example.com'
            });
            setLoading(false);
            router.push('/profile');
        }, 1500);
    };

    return (
        <div className="w-full min-h-[calc(100vh-160px)] grid lg:grid-cols-2">
            {/* Left Side - Branding Image */}
            <div className="hidden lg:flex relative bg-gradient-to-br from-primary-600 to-primary-800 items-center justify-center overflow-hidden m-4 rounded-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
                />
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <Icon icon="solar:shop-2-bold-duotone" className="text-6xl mb-6" />
                    <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
                    <p className="text-lg text-primary-100 leading-relaxed">
                        Create an account and unlock exclusive deals, personalized recommendations, and premium shopping experience.
                    </p>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
                <div className="w-full max-w-md flex flex-col gap-6">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-sm text-gray-500 mt-2">Join us and start your journey today</p>
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
                            className="font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="relative">
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
                            className="font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                        >
                            <Icon icon="logos:google-icon" className="text-xl" />
                            <span className="text-sm">Google</span>
                        </Button>
                        <Button
                            variant="bordered"
                            size="md"
                            radius="lg"
                            className="font-medium border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
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
            </div>
        </div>
    );
}
