import AuthGuard from '@/components/auth/AuthGuard';
import UserSidebar from '@/components/user/UserSidebar';
import { LayoutProps } from '@/types/api.type';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 min-h-[70vh]">
                <div className="hidden lg:block w-72 shrink-0">
                    <UserSidebar />
                </div>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
