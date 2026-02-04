"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem as HeroBreadcrumbItem } from "@heroui/breadcrumbs";

interface BreadcrumbItemType {
    label: string;
    href?: string;
    isCurrent?: boolean;
}

interface CustomBreadcrumbsProps {
    items: BreadcrumbItemType[];
    containerClasses?: string;
}

export default function CustomBreadcrumbs({ items, containerClasses }: CustomBreadcrumbsProps) {
    return (
        <HeroBreadcrumbs
            separator={<Icon icon="solar:alt-arrow-right-linear" className="text-gray-400 text-xs" />}
            className={containerClasses}
            itemClasses={{
                item: "text-sm text-gray-500 hover:text-primary transition-colors data-[current=true]:text-primary data-[current=true]:font-bold",
                separator: "px-1",
            }}
        >
            {items.map((item, index) => (
                <HeroBreadcrumbItem
                    key={index}
                    isCurrent={item.isCurrent}
                    className="max-w-[200px] sm:max-w-md truncate"
                >
                    {item.href && !item.isCurrent ? (
                        <Link href={item.href}>
                            {item.label}
                        </Link>
                    ) : (
                        <span>
                            {item.label}
                        </span>
                    )}
                </HeroBreadcrumbItem>
            ))}
        </HeroBreadcrumbs>
    );
}
