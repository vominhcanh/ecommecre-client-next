"use client";

import { useEffect, useState, useCallback } from "react";
import { CoreSelect, CoreInput, CoreSelectProps, CoreInputProps } from ".";
import { SelectItem } from "@heroui/react";
import { addressServices } from "@/services/address.services";
import { Cities, Wards } from "@/types/address.type";
import PlaceAutocomplete, { PlaceSearchSelect } from "@/components/ui/PlaceAutocomplete";
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

export interface LocationValue {
    city_code: string;
    district_code: string;
    ward_code: string;
    address: string;
    lat?: string;
    long?: string;
    full_name?: string;
    phone?: string;
}

export interface CoreLocationProps {
    value?: LocationValue;
    onChange?: (value: LocationValue) => void;
    orientation?: "vertical" | "horizontal";
    fieldConfig?: {
        city?: Partial<CoreSelectProps>;
        district?: Partial<CoreSelectProps>;
        address?: Record<string, any>;
    };
}

export default function CoreLocation({ value, onChange, orientation = "vertical", fieldConfig }: CoreLocationProps) {
    const [internalValue, setInternalValue] = useState<LocationValue>(value || {
        city_code: "",
        district_code: "",
        ward_code: "",
        address: "",
        lat: "",
        long: ""
    });

    // --- Data Queries ---
    const { data: cities = [] } = useQuery<Cities[]>({
        queryKey: ['cities'],
        queryFn: async () => {
            const res = await addressServices.getCities();
            return res.data || [];
        },
        staleTime: 1000 * 60 * 60, // Cache for 1 hour
    });

    const { data: districts = [] } = useQuery<Wards[]>({
        queryKey: ['districts', internalValue.city_code],
        queryFn: async () => {
            if (!internalValue.city_code) return [];
            const res = await addressServices.getWards(internalValue.city_code);
            return res.data || [];
        },
        enabled: !!internalValue.city_code,
        staleTime: 1000 * 60 * 30, // Cache for 30 mins
    });

    // --- State Management ---
    // --- State Management ---
    useEffect(() => {
        if (value) {
            setInternalValue(prev => {
                // Check if values are actually different before updating
                const isDifferent = Object.keys(value).some(key => {
                    const k = key as keyof LocationValue;
                    return value[k] !== prev[k];
                });

                if (isDifferent) {
                    return { ...prev, ...value };
                }
                return prev;
            });
        }
    }, [value]);

    const updateState = (updates: Partial<LocationValue>) => {
        const newValue = { ...internalValue, ...updates };
        setInternalValue(newValue);
        onChange?.(newValue);
        return newValue; // Return for chaining if needed
    };

    // --- AI Detection Logic ---
    // --- AI Detection Logic ---
    const detectAddress = async (addressText: string) => {
        if (!addressText || addressText.length < 5) return;

        try {
            console.log("Detecting address for:", addressText);
            const res = await addressServices.detectAddress(addressText);
            const data = res;
            console.log("Detection result:", data);
            if (Array.isArray(data) && data.length > 0) {
                const detected = data[0].cds_address;
                const extraInfo = data[0]; // Access top-level fields like phone/full_name

                if (detected) {
                    setInternalValue(prev => {
                        // Logic to find codes by name if code is missing or invalid
                        let cityCode = detected.city_code;
                        if (!cityCode && detected.city_name) {
                            const foundCity = cities.find(c =>
                                c.name.toLowerCase().includes(detected.city_name!.toLowerCase()) ||
                                detected.city_name!.toLowerCase().includes(c.name.toLowerCase())
                            );
                            if (foundCity) cityCode = foundCity.code;
                        }

                        // We can only check district/ward validity if we have their lists loaded, 
                        // which depends on city. For now, we trust the code or basic name matching if we could.
                        // Since districts are loaded async based on city, we might need to rely on the code 
                        // or wait for the user to verify.

                        // Ideally we would look up district/ward here too, but we need the lists. 
                        // The select component validation helps prevent crashes.

                        const newValue = {
                            ...prev,
                            city_code: cityCode || prev.city_code,
                            ward_code: detected.ward_code || detected.district_code || "",
                            district_code: "", // Assuming ward_code implies district or we clear to force re-selection check
                            address: prev.address, // Keep current input or update? Usually keep input.
                            full_name: extraInfo.full_name || prev.full_name,
                            phone: extraInfo.phone || prev.phone
                        };

                        setTimeout(() => onChange?.(newValue), 0);
                        return newValue;
                    });
                }
            }
        } catch (error) {
            console.error("AI Detect Address Error:", error);
        }
    };


    return (
        <div className="flex flex-col gap-4 w-full">
            <PlaceAutocomplete
                label="Địa chỉ cụ thể"
                placeholder="Nhập địa chỉ để tìm kiếm..."
                labelPlacement='outside'
                {...fieldConfig?.address}
                value={internalValue.address}
                onInputChange={(val) => {
                    updateState({ address: val });
                    // Only debounce detect on typing if desired, likely better on selection
                }}
                onSelectAddress={(data: PlaceSearchSelect) => {
                    updateState({
                        address: data.address,
                        lat: data.lat.toString(),
                        long: data.lng.toString()
                    });
                    // Trigger detection immediately upon selection
                    detectAddress(data.address);
                }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CoreSelect
                    label="Tỉnh/Thành phố"
                    placeholder="Chọn Tỉnh/Thành"
                    {...fieldConfig?.city}
                    selectedKeys={internalValue.city_code && cities.some(c => c.code === internalValue.city_code) ? [internalValue.city_code] : []}
                    onChange={(e) => updateState({ city_code: e.target.value, district_code: '', ward_code: '' })}
                >
                    {cities.map((city) => (
                        <SelectItem key={city.code}>{city.name}</SelectItem>
                    ))}
                </CoreSelect>

                <CoreSelect
                    label="Phường/Xã"
                    placeholder="Chọn Phường/Xã"
                    {...fieldConfig?.district}
                    selectedKeys={internalValue.ward_code && districts.some(d => d.code === internalValue.ward_code) ? [internalValue.ward_code] : []}
                    isDisabled={!internalValue.city_code}
                    onChange={(e) => updateState({ ward_code: e.target.value })}
                >
                    {districts.map((w) => (
                        <SelectItem key={w.code}>{w.name}</SelectItem>
                    ))}
                </CoreSelect>
            </div>
        </div>
    );
}
