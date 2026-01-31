'use client';

import { useClientTranslation } from '@/lib/i18n/client';
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Kbd,
  Image,
  cn,
  Divider,
  Chip,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useMemo, useEffect } from 'react';

// Fake product data
const FAKE_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    price: '30.490.000đ',
    image: '/images/products/earbuds.jpg',
    category: 'iPhone',
    slug: '/products/iphone-16-pro-max',
  },
  {
    id: 2,
    name: 'iPhone 16 Pro',
    price: '28.990.000đ',
    image: '/images/products/earbuds.jpg',
    category: 'iPhone',
    slug: '/products/iphone-16-pro',
  },
  {
    id: 3,
    name: 'iPhone 15 Pro Max',
    price: '26.990.000đ',
    image: '/images/products/earbuds.jpg',
    category: 'iPhone',
    slug: '/products/iphone-15-pro-max',
  },
  {
    id: 4,
    name: 'MacBook Pro M3',
    price: '42.990.000đ',
    image: '/images/products/tv.jpg',
    category: 'Mac',
    slug: '/products/macbook-pro-m3',
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    price: '24.990.000đ',
    image: '/images/products/tv.jpg',
    category: 'iPad',
    slug: '/products/ipad-pro-12-9',
  },
  {
    id: 6,
    name: 'AirPods Pro 2',
    price: '5.390.000đ',
    image: '/images/products/headphones.jpg',
    category: 'Tai nghe, Loa',
    slug: '/products/airpods-pro-2',
  },
  {
    id: 7,
    name: 'Apple Watch Series 9',
    price: '8.990.000đ',
    image: '/images/products/watch.jpg',
    category: 'Watch',
    slug: '/products/apple-watch-series-9',
  },
  {
    id: 8,
    name: 'iPhone 15',
    price: '19.990.000đ',
    image: '/images/products/earbuds.jpg',
    category: 'iPhone',
    slug: '/products/iphone-15',
  },
];

const POPULAR_SEARCHES = [
  'iPhone 16',
  'iPhone 15 (Plus, Pro, Pro Max)',
  'iPhone 14 (Plus, Pro, Pro Max)',
];

const SUGGESTED_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 16 Pro 1TB',
    price: '40.490.000đ',
    originalPrice: '43.990.000đ',
    discount: '-7%',
    image: '/images/products/earbuds.jpg',
    badge: 'Online giá rẻ quá',
    isHot: true,
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Max 256GB',
    price: '30.490.000đ',
    originalPrice: '34.990.000đ',
    discount: '-12%',
    image: '/images/products/earbuds.jpg',
    badge: 'Online giá rẻ quá',
    isHot: false,
  },
  {
    id: 3,
    name: 'iPhone 14 256GB',
    price: '16.390.000đ',
    originalPrice: '20.990.000đ',
    discount: '-21%',
    image: '/images/products/earbuds.jpg',
    badge: 'Online giá rẻ quá',
    isHot: true,
  },
  {
    id: 4,
    name: 'iPhone 14 128GB',
    price: '12.690.000đ',
    originalPrice: '17.990.000đ',
    discount: '-29%',
    image: '/images/products/earbuds.jpg',
    badge: 'Online giá rẻ quá',
    isHot: false,
  },
];

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeaderSearch({ isOpen, onClose }: HeaderSearchProps) {
  const { t } = useClientTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Check if should show dropdown content (when user types something)
  const shouldShowDropdown = searchQuery.trim().length > 0;

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return FAKE_PRODUCTS.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    ).slice(0, 8); // Limit to 8 results
  }, [searchQuery]);

  // Handle search with debounce effect
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => setIsSearching(false), 300);
    } else {
      setIsSearching(false);
    }
  }, []);

  // Handle popular search click
  const handlePopularSearchClick = (search: string) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setIsSearching(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement='top'
      backdrop='blur'
      hideCloseButton
      classNames={{
        base: 'max-h-[90vh] mt-0 sm:mt-0',
        body: 'p-0',
        wrapper: 'items-start',
        backdrop: 'bg-black/60 backdrop-blur-2xl backdrop-saturate-150',
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 40,
              duration: 0.4,
            },
          },
          exit: {
            y: -40,
            opacity: 0,
            scale: 0.96,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 40,
              duration: 0.3,
            },
          },
        },
      }}
    >
      <ModalContent className='!mx-0 w-full max-w-full bg-black shadow-md transition-all duration-500'>
        {/* Header - Always visible */}
        <ModalHeader className='flex-col items-stretch p-0 pb-0'>
          <div className='w-full px-3 py-3 sm:px-5 sm:py-2'>
            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                delay: 0.1,
              }}
              className='flex items-center gap-4'
            >
              <div className='relative flex-1'>
                <Input
                  placeholder={t('searchPlaceholder') || 'Tìm kiếm sản phẩm'}
                  value={searchQuery}
                  onValueChange={handleSearch}
                  startContent={
                    <div className='flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600'>
                      <Icon
                        icon={isSearching ? 'eos-icons:loading' : 'heroicons:magnifying-glass'}
                        className={cn('h-4 w-4 text-white', {
                          'animate-spin': isSearching,
                        })}
                      />
                    </div>
                  }
                  endContent={
                    <div className='mr-2 flex items-center gap-2'>
                      {!searchQuery && (
                        <Kbd className='rounded-md border-0 bg-transparent px-2 py-1 text-xs text-gray-400'>
                          ⌘K
                        </Kbd>
                      )}
                      {searchQuery && (
                        <Button
                          variant='light'
                          size='sm'
                          isIconOnly
                          className='rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-200/50 hover:text-gray-600 dark:hover:bg-gray-700/50 dark:hover:text-gray-300'
                          onPress={() => handleSearch('')}
                        >
                          <Icon icon='heroicons:x-mark' className='h-3 w-3' />
                        </Button>
                      )}
                    </div>
                  }
                  classNames={{
                    base: 'w-full',
                    mainWrapper: 'w-full',
                    input:
                      '!text-white placeholder:text-gray-500 bg-transparent text-lg font-medium',
                    inputWrapper: '!bg-transparent !border-none !shadow-none !ring-transparent',
                  }}
                  autoFocus
                />
              </div>

              {/* Close Button */}
              <Button
                variant='light'
                isIconOnly
                className='h-12 w-12 flex-shrink-0 rounded-full text-gray-400 transition-all duration-200 hover:text-white'
                onPress={onClose}
              >
                <Icon icon='heroicons:x-mark' className='h-6 w-6' />
              </Button>
            </motion.div>
          </div>
        </ModalHeader>

        {/* Body - Only show when there's search query */}
        <AnimatePresence>
          {shouldShowDropdown && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
                duration: 0.4,
              }}
              className='overflow-hidden'
            >
              <div className='mx-5 h-px bg-gradient-to-r from-transparent via-gray-300/30 to-transparent sm:mx-7' />
              <div className='bg-white backdrop-blur-xl'>
                <ModalBody className='max-h-[calc(90vh-140px)] overflow-y-auto px-5 py-6 scrollbar-hide sm:px-7'>
                  {filteredProducts.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        delay: 0.1,
                      }}
                      className='space-y-7'
                    >
                      {/* Search Suggestions */}
                      <div>
                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className='mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700'
                        >
                          <Icon icon='heroicons:lightbulb' className='h-4 w-4 text-amber-500' />
                          Có phải bạn muốn tìm
                        </motion.h3>
                        <div className='space-y-1'>
                          {POPULAR_SEARCHES.map((search, index) => (
                            <motion.div
                              key={search}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + 0.1 * index }}
                            >
                              <Button
                                variant='light'
                                className='h-auto w-full justify-start rounded-lg border border-transparent px-4 py-3 font-medium text-gray-800 transition-all duration-200 hover:scale-[1.01] hover:border-gray-200/50 hover:bg-white/60 active:scale-[0.99]'
                                startContent={
                                  <Icon
                                    icon='heroicons:magnifying-glass'
                                    className='h-4 w-4 text-gray-500'
                                  />
                                }
                                onPress={() => handlePopularSearchClick(search)}
                              >
                                <span className='text-left text-base'>{search}</span>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Product Suggestions */}
                      <div>
                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className='mb-5 flex items-center gap-2 text-sm font-semibold text-gray-700'
                        >
                          <Icon icon='heroicons:sparkles' className='h-4 w-4 text-purple-500' />
                          Sản phẩm gợi ý
                        </motion.h3>
                        <div className='grid grid-cols-1 items-center gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                          {SUGGESTED_PRODUCTS.map((product, index) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                                delay: 0.5 + 0.1 * index,
                              }}
                            >
                              <Link href={`/products/${product.id}`} onClick={onClose}>
                                <Card
                                  className='group w-full cursor-pointer border border-gray-200/30 bg-white/90 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-gray-300/50 hover:bg-white hover:shadow-xl active:scale-[0.98] dark:border-gray-700/30 dark:bg-gray-800/80 dark:hover:border-gray-600/50 dark:hover:bg-gray-800'
                                  isPressable
                                >
                                  <CardBody className='p-4'>
                                    <div className='flex items-center gap-4'>
                                      <div className='relative flex-shrink-0'>
                                        <div className='h-16 w-16 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner dark:from-gray-700 dark:to-gray-800'>
                                          <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={64}
                                            height={64}
                                            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                                            fallbackSrc='/images/placeholder-product.jpg'
                                          />
                                        </div>
                                        {product.isHot && (
                                          <div className='absolute -right-1 -top-1 z-10'>
                                            <Chip
                                              size='sm'
                                              className='rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-1 py-0.5 text-xs font-bold text-white shadow-lg'
                                            >
                                              HOT
                                            </Chip>
                                          </div>
                                        )}
                                      </div>
                                      <div className='min-w-0 flex-1'>
                                        <h4 className='mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'>
                                          {product.name}
                                        </h4>
                                        <div className='mb-2 flex items-baseline gap-2'>
                                          <span className='text-lg font-bold text-red-600 dark:text-red-400'>
                                            {product.price}
                                          </span>
                                          <span className='text-sm text-gray-400 line-through'>
                                            {product.originalPrice}
                                          </span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                          <Chip
                                            size='sm'
                                            className='bg-gradient-to-r from-red-500 to-red-600 text-xs font-bold text-white'
                                          >
                                            {product.discount}
                                          </Chip>
                                          <Chip
                                            size='sm'
                                            variant='flat'
                                            className='bg-orange-100 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                                          >
                                            {product.badge}
                                          </Chip>
                                        </div>
                                      </div>
                                      <div className='flex-shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100'>
                                        <Icon
                                          icon='heroicons:arrow-right'
                                          className='h-5 w-5 text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-500'
                                        />
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                      className='py-16 text-center'
                    >
                      <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner dark:from-gray-800 dark:to-gray-900'>
                        <Icon
                          icon='heroicons:magnifying-glass'
                          className='h-12 w-12 text-gray-400'
                        />
                      </div>
                      <h4 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
                        Không tìm thấy sản phẩm nào
                      </h4>
                      <p className='text-base text-gray-500 dark:text-gray-400'>
                        Thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả
                      </p>
                    </motion.div>
                  )}
                </ModalBody>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalContent>
    </Modal>
  );
}
