'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from '@heroui/react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    placement?: 'right' | 'left' | 'bottom';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
}

export default function Drawer({
    isOpen,
    onClose,
    children,
    title,
    placement = 'right',
    size = 'md',
    className
}: DrawerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    const variants = {
        right: { x: '100%' },
        left: { x: '-100%' },
        bottom: { y: '100%' },
    };

    const animate = {
        right: { x: 0 },
        left: { x: 0 },
        bottom: { y: 0 },
    };

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full',
    };

    const placementClasses = {
        right: 'right-0 top-0 h-full rounded-l-2xl',
        left: 'left-0 top-0 h-full rounded-r-2xl',
        bottom: 'bottom-0 left-0 w-full rounded-t-2xl',
    };

    const drawerContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[9998]"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={variants[placement]}
                        animate={animate[placement]}
                        exit={variants[placement]}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed bg-white shadow-2xl z-[9999] flex flex-col",
                            placementClasses[placement],
                            placement !== 'bottom' ? sizeClasses[size] : "h-auto max-h-[90vh]",
                            placement !== 'bottom' ? 'w-full' : '',
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <Icon icon="solar:close-circle-bold" className="text-2xl text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(drawerContent, document.body);
}
