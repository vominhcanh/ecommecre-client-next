import { Language } from '@/types/language.type';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';

const LocaleSwitcher = ({ locales }: { locales: Language[] }) => {
  const pathName = usePathname();
  const params = useParams();
  const [isShow, setIsShow] = useState(false);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <>
      <div className='relative cursor-pointer'>
        <div className='flex flex-nowrap items-center gap-1' onClick={() => setIsShow(!isShow)}>
          {locales &&
            locales?.map((locale: Language) => {
              if (locale.code == params?.lang) {
                return (
                  <div key={locale.code} className='flex items-center lg:gap-2'>
                    <div className='flex items-center justify-center overflow-hidden rounded-sm'>
                      <Image
                        src={locale?.image_url}
                        alt={locale?.code || 'image locale'}
                        width={24}
                        height={16}
                        className='h-4 w-6 object-cover'
                      />
                    </div>
                    <div className='flex items-center'>
                      <span className='hidden text-sm font-medium text-gray-700 lg:block dark:text-gray-200 min-w-max'>
                        {locale?.name}
                      </span>
                      <Icon
                        icon='heroicons:chevron-down'
                        className={`ml-1 text-sm transition-transform duration-300 ${isShow ? 'rotate-180' : 'rotate-0'
                          }`}
                      />
                    </div>
                  </div>
                );
              }
            })}
        </div>

        {isShow && (
          <>
            <AnimatePresence>
              <motion.div
                className={`absolute right-0 top-full z-50 mt-2 min-w-[160px] rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-700`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {locales
                  ?.filter(locale => locale.code === 'vi' || locale.code === 'en')
                  .map((locale: Language, childIndex: number) => {
                    return (
                      <Link key={locale.code} href={redirectedPathName(locale.code)}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.1 * childIndex + 0.2,
                            duration: 0.3,
                          }}
                          className='flex min-w-max items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                        >
                          <div className='flex items-center justify-center overflow-hidden rounded-sm border border-gray-200 dark:border-gray-600'>
                            <Image
                              src={locale.image_url}
                              alt={locale.code}
                              width={24}
                              height={16}
                              className='h-4 w-6 object-cover'
                            />
                          </div>
                          {locale.name}
                        </motion.div>
                      </Link>
                    );
                  })}
              </motion.div>
            </AnimatePresence>

            <div
              className='fixed inset-0 z-40 h-full w-full bg-transparent'
              onClick={() => setIsShow(false)}
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default LocaleSwitcher;
