import { Autocomplete, AutocompleteItem, AutocompleteProps } from "@heroui/react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useJsApiLoader } from "@react-google-maps/api";
import { Key, useState, useEffect, useMemo, useCallback } from "react";

const libraries: ("places")[] = ["places"];

interface PlacePrediction {
    place_id: string;
    description: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    };
}

export interface PlaceSearchSelect {
    address: string;
    lat: number;
    lng: number;
    city?: string;
    district?: string;
    ward?: string;
}

interface PlaceAutocompleteProps extends Omit<AutocompleteProps, "children" | "items"> {
    onSelectAddress: (data: PlaceSearchSelect) => void;
    value?: string;
}

const parseAddressComponents = (components: google.maps.GeocoderAddressComponent[]) => {
    let city = '';
    let district = '';
    let ward = '';

    components.forEach(component => {
        if (component.types.includes('administrative_area_level_1')) {
            city = component.long_name;
        }
        if (component.types.includes('administrative_area_level_2')) {
            district = component.long_name;
        }
        if (component.types.includes('sublocality_level_1') || component.types.includes('administrative_area_level_3')) {
            ward = component.long_name;
        }
    });

    return { city, district, ward };
};

export default function PlaceAutocomplete({ onSelectAddress, value: propValue, ...props }: PlaceAutocompleteProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_KEY_MAP || "",
        libraries,
    });

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "vn" },
        },
        debounce: 300,
        defaultValue: propValue,
        initOnMount: isLoaded,
    });

    // Sync input value when prop changes
    useEffect(() => {
        if (propValue !== undefined && propValue !== value) {
            setValue(propValue, false);
        }
    }, [propValue, setValue, value]);

    const handleSelect = useCallback(async (key: Key | null) => {
        if (!key) return;

        const selectedItem = data.find(d => d.place_id === key);
        if (!selectedItem) return;

        const address = selectedItem.description;
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            const { city, district, ward } = parseAddressComponents(results[0].address_components);

            onSelectAddress({
                address,
                lat,
                lng,
                city,
                district,
                ward
            });
        } catch (error) {
            console.error("Error fetching address details:", error);
        }
    }, [data, setValue, clearSuggestions, onSelectAddress]);

    const handleInputChange = useCallback((val: string) => {
        setValue(val);
        props.onInputChange?.(val);
    }, [setValue, props.onInputChange]);

    const listboxProps = useMemo(() => ({
        itemClasses: {
            base: "data-[hover=true]:bg-primary/10 data-[hover=true]:text-primary",
        }
    }), []);

    if (!isLoaded) {
        return (
            <Autocomplete
                isDisabled
                label="Loading Maps..."
                {...props}
            >
                <AutocompleteItem key="loading">Loading...</AutocompleteItem>
            </Autocomplete>
        );
    }

    return (
        <Autocomplete
            {...props}
            allowsCustomValue
            isDisabled={!ready || props.isDisabled}
            inputValue={value}
            onInputChange={handleInputChange}
            onSelectionChange={handleSelect}
            items={data}
            placeholder={props.placeholder || "Tìm kiếm địa chỉ..."}
            listboxProps={listboxProps}
            aria-label="Address Autocomplete"
        >
            {(item) => {
                const prediction = item as unknown as PlacePrediction;
                return (
                    <AutocompleteItem key={prediction.place_id} textValue={prediction.description}>
                        <div className="flex flex-col">
                            <span className="text-small font-bold text-inherit">{prediction.structured_formatting.main_text}</span>
                            <span className="text-tiny text-default-500 group-data-[hover=true]:text-primary/80">{prediction.structured_formatting.secondary_text}</span>
                        </div>
                    </AutocompleteItem>
                );
            }}
        </Autocomplete>
    );
}
