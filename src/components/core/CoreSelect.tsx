"use client";

import { Select, SelectProps } from "@heroui/react";
import { forwardRef } from "react";

// Extend HeroUI SelectProps to keep full compatibility
export interface CoreSelectProps extends SelectProps { }

const CoreSelect = forwardRef<HTMLSelectElement, CoreSelectProps>((props, ref) => {
    return (
        <Select
            ref={ref}
            variant={props.variant || "flat"}
            radius={props.radius || "md"}
            labelPlacement={props.labelPlacement || "outside"}
            classNames={{
                ...props.classNames,
            }}
            {...props}
        >
            {props.children}
        </Select>
    );
});

CoreSelect.displayName = "CoreSelect";
export default CoreSelect;
