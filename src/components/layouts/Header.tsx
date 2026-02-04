'use client';

import { useHydrateStore } from '@/hooks/useHydrateStore';
import { useClientTranslation } from '@/lib/i18n/client';
import { userState } from '@/store/atoms';
import { Language } from '@/types/language.type';
import { DropDownItem, MenuData, MenuItem } from '@/types/menu.type';
import { StoreType } from '@/types/store.type';
import { funcUtils } from '@/utils/func.utils';
import { Badge, Button, cn, Input, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import LocaleSwitcher from '../common/LocaleSwitcher';
import HeaderSearch from './HeaderSearch';
import MegaMenu from './header/MegaMenu';
import MiniCart from './header/MiniCart';
import MobileMenu from './header/MobileMenu';
import UserMenu from './header/UserMenu';

export default function Header({
  menuData,
  locales,
  storeData,
  lang,
}: {
  menuData: MenuData | null;
  locales: Language[];
  storeData?: StoreType | null;
  lang: string;
}) {
  const { t } = useClientTranslation();
  useHydrateStore(storeData || null);
  const user = useAtomValue(userState);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const {
    isOpen: isSearchOpen,
    onOpen: onOpenSearch,
    onOpenChange: onOpenChangeSearch,
    onClose: onCloseSearch,
  } = useDisclosure();

  const { scrollY } = useScroll();

  const menuItems = useMemo(() => {
    try {
      const parseData = menuData?.data ? (JSON.parse(menuData?.data) as MenuItem[]) : [];

      const generateData = (data: MenuItem[]): DropDownItem[] => {
        const tns: DropDownItem[] = [];

        data.forEach(node => {
          const { key, item, children } = node;

          const newChildren = !!children.length ? generateData(children) : undefined;

          if (newChildren) {
            tns.push({
              key: key ?? item.title,
              label: item.title,
              type: 'item',
              children: newChildren,
            });
          } else {
            const href = funcUtils.getLinkMenu(item);
            tns.push({
              key: key ?? item.title,
              label: item.title,
              type: 'link',
              href: href,
            });
          }
        });
        return tns;
      };

      return generateData(parseData);
    } catch (error) {
      return [];
    }
  }, [menuData]);

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  /* State for active category in mega menu sidebar */
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 200);
  };

  return (
    <>
      <motion.header
        className={cn('sticky top-0 z-[50] w-full bg-white shadow-sm transition-all duration-300', {
          'shadow-md': isScrolled,
        })}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Row 1: Top Bar */}
        <div className='border-b border-gray-200'>
          <div className='container mx-auto px-4'>
            {/* Mobile Layout (Flex) */}
            <div className='flex lg:hidden items-center justify-between py-3 gap-4'>
              <div className='flex items-center gap-2'>
                <Button
                  isIconOnly
                  variant='light'
                  size='sm'
                  onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Icon
                    icon={isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'}
                    className='text-2xl'
                  />
                </Button>
              </div>

              <Link href={`/${lang}`} className='flex items-center'>
                <div className='relative h-10 w-32'>
                  <Image
                    src={storeData?.avatar || ''}
                    alt={storeData?.name || 'Store Logo'}
                    fill
                    sizes="150px"
                    className='object-contain object-left'
                  />
                </div>
              </Link>
              <div className='flex items-center gap-2'>
                <Badge content='2' color='danger' size='md'>
                  <Button isIconOnly variant='light' size='sm'>
                    <Icon icon='solar:cart-large-2-linear' className='text-2xl' />
                  </Button>
                </Badge>
              </div>
            </div>
            <div className='lg:hidden pb-3'>
              <Input
                classNames={{
                  base: 'max-w-full',
                  mainWrapper: 'h-full',
                  input: 'text-sm',
                  inputWrapper:
                    'h-10 font-normal text-default-500 bg-gray-50 border border-transparent focus-within:!border-primary',
                }}
                placeholder='Search products...'
                size='md'
                startContent={<Icon icon='solar:magnifer-linear' className='text-lg text-gray-400' />}
                type='search'
              />
            </div>

            <div className='hidden lg:grid grid-cols-12 gap-8 items-center'>
              <div className='col-span-2 flex items-center justify-start'>
                <Link href={`/${lang}`} className='relative block'>
                  <div className='relative h-20 w-52 transition-opacity hover:opacity-90'>
                    <Image
                      src={storeData?.avatar || ''}
                      alt={storeData?.name || 'Store Logo'}
                      fill
                      sizes="200px"
                      className='object-contain object-left'
                      priority
                    />
                  </div>

                </Link>
              </div>

              {/* Search Bar - Center */}
              <div className='col-span-6'>
                <div className='relative max-w-2xl mx-auto w-full'>
                  <Input
                    classNames={{
                      base: 'max-w-full',
                      mainWrapper: 'h-full shadow-sm rounded-full',
                      input: 'text-sm pl-5 text-gray-700 placeholder:text-gray-400',
                      inputWrapper:
                        'h-[50px] font-normal bg-gray-50 hover:bg-white border border-gray-200 hover:border-primary/30 focus-within:!border-primary/50 focus-within:!bg-white shadow-sm hover:shadow-md rounded-full transition-all duration-300 pr-1.5',
                    }}
                    placeholder='Search for any product or brand...'
                    size='lg'
                    startContent={<Icon icon='solar:magnifer-linear' className='text-2xl text-gray-400 ml-1' />}
                    endContent={
                      <Button
                        isIconOnly
                        className='h-10 w-10 min-w-10 rounded-full bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-600 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300'
                      >
                        <Icon icon='solar:magnifer-linear' className="text-xl" />
                      </Button>
                    }
                    type='search'
                  />
                </div>
              </div>

              {/* Actions - Right */}
              <div className='col-span-4 flex items-center justify-end gap-1 flex-shrink-0'>
                {/* Location Selector - Hidden on smaller large screens */}
                <Button
                  variant='light'
                  className='hidden 2xl:flex gap-2 px-3 h-10 rounded-xl hover:bg-gray-50'
                >
                  <div className="p-2 rounded-full bg-orange-50 text-orange-500">
                    <Icon icon='solar:map-point-bold' className='text-lg' />
                  </div>
                  <div className='flex flex-col items-start'>
                    <span className='text-[10px] font-semibold text-gray-400 uppercase tracking-wide'>Deliveries to</span>
                    <span className='text-sm font-bold text-gray-800'>Dubai</span>
                  </div>
                </Button>

                {/* Divider - Hidden on smaller screens */}
                <div className="hidden 2xl:block h-8 w-px bg-gray-100 mx-1"></div>

                {/* Country/Language Selector - Simplified for Layout */}
                <div className="flex items-center">
                  <LocaleSwitcher locales={locales} />
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-gray-100 mx-1"></div>
                <div className='flex items-center gap-2 pl-1 flex-shrink-0'>
                  <MiniCart lang={lang} />
                  <UserMenu lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Navigation Bar (Desktop Only) */}
        <div className='hidden lg:block bg-white border-b border-gray-100'>
          <div className='container mx-auto px-4 relative'>
            <div className='flex items-center gap-6 py-2'>
              {/* All Categories Dropdown */}
              <div>
                <Button
                  variant='flat'
                  size='sm'
                  startContent={<Icon icon="hugeicons:menu-square" className='text-md' />}
                  endContent={<Icon icon='heroicons:chevron-down' className='text-sm' />}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onPress={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className={cn('font-semibold rounded-full px-4 transition-all duration-200', {
                    'bg-primary text-white shadow-lg shadow-primary/20': isCategoriesOpen,
                    'bg-gray-100 text-gray-700 hover:bg-gray-200': !isCategoriesOpen,
                  })}
                >
                  Danh mục sản phẩm
                </Button>

                <MegaMenu
                  isOpen={isCategoriesOpen}
                  onClose={() => setIsCategoriesOpen(false)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  menuItems={menuItems}
                />
              </div>

              {/* Horizontal Navigation Menu */}
              <nav className='flex items-center gap-6'>
                {menuItems.slice(0, 7).map(item => (
                  <Link
                    key={item.key}
                    href={item.type === 'link' ? item.href || '#' : '#'}
                    className='rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          menuItems={menuItems}
          locales={locales}
        />

        {/* Search Modal */}
        <HeaderSearch isOpen={isSearchOpen} onClose={onCloseSearch} />
      </motion.header>
    </>
  );
}
