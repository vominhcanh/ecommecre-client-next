import localFont from 'next/font/local';
import '@/app/globals.css';

const gilroy = localFont({
  src: [
    {
      path: '../../public/fonts/SVN-Gilroy Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SVN-Gilroy Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SVN-Gilroy Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SVN-Gilroy SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SVN-Gilroy Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SVN-Gilroy Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={gilroy.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
