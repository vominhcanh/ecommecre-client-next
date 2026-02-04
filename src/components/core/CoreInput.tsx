"use client";

import { Input, InputProps } from "@heroui/react";
import { forwardRef } from "react";

// Extend HeroUI InputProps to keep full compatibility
export interface CoreInputProps extends InputProps { }

const CoreInput = forwardRef<HTMLInputElement, CoreInputProps>((props, ref) => {
    return (
        <Input
            ref={ref}
            // Default styling enhancements to match "Antd-like" clean feel or project theme
            variant={props.variant || "flat"}
            radius={props.radius || "md"}
            labelPlacement={props.labelPlacement || "outside"}
            classNames={{
                inputWrapper: "bg-white border-1 border-gray-200 data-[hover=true]:bg-gray-50 group-data-[focus=true]:bg-white group-data-[focus=true]:border-primary shadow-none",
                ...props.classNames,
            }}
            {...props}
        />
    );
});

CoreInput.displayName = "CoreInput";
export default CoreInput;
