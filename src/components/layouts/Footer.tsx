'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useClientTranslation } from '@/lib/i18n/client';
import { StoreType } from '@/types/store.type';

interface FooterProps {
  storeData?: StoreType | null;
}

export default function Footer({ storeData }: FooterProps) {
  const { t } = useClientTranslation();

  return (
    <footer className='bg-gray-100 border-t border-gray-200'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-10'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5'>
          {/* Company Info */}
          <div className='lg:col-span-2'>
            <h3 className='mb-4 text-base font-bold text-gray-800 uppercase'>
              {storeData?.company_name}
            </h3>
            <div className='space-y-2 text-sm text-gray-600'>
              <p>
                Địa chỉ trụ sở chính: {storeData?.address}
              </p>
              <p className='flex items-center gap-2'>
                <Icon icon='solar:phone-linear' className='text-lg text-gray-500' />
                Điện thoại: {storeData?.contact_phone}
              </p>
              <p className='flex items-center gap-2'>
                <Icon icon='solar:letter-linear' className='text-lg text-gray-500' />
                Email: {storeData?.email}
              </p>
              {storeData?.email_notify && (
                <p className='flex items-center gap-2'>
                  <Icon icon='solar:letter-linear' className='text-lg text-gray-500' />
                  Email kinh doanh: {storeData?.email_notify}
                </p>
              )}
            </div>
          </div>

          {/* About Us Links */}
          <div>
            <h3 className='mb-4 text-base font-bold text-gray-800'>Về chúng tôi</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/about' className='text-gray-600 hover:text-primary transition-colors'>
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href='/products' className='text-gray-600 hover:text-primary transition-colors'>
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href='/news' className='text-gray-600 hover:text-primary transition-colors'>
                  Tin Tức
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-gray-600 hover:text-primary transition-colors'>
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link href='/business' className='text-gray-600 hover:text-primary transition-colors'>
                  Đăng kí kinh doanh
                </Link>
              </li>
              <li>
                <Link href='/services' className='text-gray-600 hover:text-primary transition-colors'>
                  Dịch Vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support Links */}
          <div>
            <h3 className='mb-4 text-base font-bold text-gray-800'>Hỗ Trợ Khách Hàng</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/terms' className='text-gray-600 hover:text-primary transition-colors'>
                  Điều khoản chung
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='text-gray-600 hover:text-primary transition-colors'>
                  Chính sách bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link href='/shipping' className='text-gray-600 hover:text-primary transition-colors'>
                  Phương thức vận chuyển
                </Link>
              </li>
              <li>
                <Link href='/payment' className='text-gray-600 hover:text-primary transition-colors'>
                  Thông tin chuyển khoản
                </Link>
              </li>
              <li>
                <Link href='/warranty' className='text-gray-600 hover:text-primary transition-colors'>
                  Chính sách bảo hành sản phẩm
                </Link>
              </li>
              <li>
                <Link href='/return' className='text-gray-600 hover:text-primary transition-colors'>
                  Chính sách đổi - trả sản phẩm
                </Link>
              </li>
              <li>
                <Link href='/faq' className='text-gray-600 hover:text-primary transition-colors'>
                  Các câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* App Download Section */}
          <div>
            <h3 className='mb-4 text-base font-bold text-gray-800'>Tải App tại đây</h3>
            <div className='space-y-3'>
              {/* QR Code and App Store Badges */}
              <div className='flex items-start gap-4'>
                {/* QR Code Placeholder */}
                <div className='w-20 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center'>
                  <Icon icon='solar:qr-code-bold' className='text-4xl text-gray-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  {/* Google Play Badge */}
                  <Link href='#' className='flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors'>
                    <Icon icon='logos:google-play-icon' className='text-lg' />
                    <div className='flex flex-col'>
                      <span className='text-[8px] text-gray-400 uppercase'>Get it on</span>
                      <span className='text-xs font-semibold text-white'>Google Play</span>
                    </div>
                  </Link>
                  {/* App Store Badge */}
                  <Link href='#' className='flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors'>
                    <Icon icon='ic:baseline-apple' className='text-lg text-white' />
                    <div className='flex flex-col'>
                      <span className='text-[8px] text-gray-400 uppercase'>Download on the</span>
                      <span className='text-xs font-semibold text-white'>App Store</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Verified Badge */}
              <div className='flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <Icon icon='solar:verified-check-bold' className='text-lg text-green-600' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-[10px] text-gray-500 uppercase'>Đã thông báo</span>
                  <span className='text-xs font-semibold text-primary'>Bộ Công Thương</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-200 bg-gray-50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            {/* Copyright */}
            <p className='text-sm text-gray-600'>
              © {new Date().getFullYear()} {storeData?.name || 'Nam Tiến Medical'}. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 rounded-md'>
                <Icon icon='logos:apple-pay' className='text-2xl' />
              </div>
              <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 rounded-md'>
                <Icon icon='logos:visa' className='text-2xl' />
              </div>
              <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 rounded-md'>
                <span className='text-xs font-bold text-orange-500'>DISCOVER</span>
              </div>
              <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 rounded-md'>
                <Icon icon='logos:mastercard' className='text-2xl' />
              </div>
              <div className='flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md'>
                <Icon icon='solar:shield-check-bold' className='text-lg text-green-600' />
                <span className='text-xs font-semibold text-gray-700'>Secure<br />Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
