import React from 'react';

type AuthLayoutProps = {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    image?: string;
}

export default function AuthLayout({ children, title, subtitle, image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" }: AuthLayoutProps) {
    return (
        <div className="w-full min-h-[calc(100vh-260px)] grid lg:grid-cols-2">
            {/* Left Side - Branding Image */}
            <div className="hidden lg:flex relative bg-gradient-to-br from-primary-600 to-primary-800 items-center justify-center overflow-hidden m-4 rounded-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <h2 className="text-4xl font-bold mb-6">{title}</h2>
                    <p className="text-lg text-primary-100 leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
