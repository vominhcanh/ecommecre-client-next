# Core Components Usage Guide

This directory contains enhanced wrappers around HeroUI components to provide consistent styling and advanced logic (like Location).

## Components

### 1. CoreLocation

A smart component that handles City -> District -> Address logic automatically.

**Usage:**

```tsx
import { useState } from "react";
import { CoreLocation, LocationValue } from "@/components/core";

export default function MyForm() {
    // 1. Initialize state
    const [location, setLocation] = useState<LocationValue>({
        city_code: "",
        district_code: "",
        ward_code: "",
        address: "",
        lat: "",
        long: ""
    });

    // 2. Handle changes
    const handleLocationChange = (newLocation: LocationValue) => {
        setLocation(newLocation);
        console.log("Full address data:", newLocation);
    };

    return (
        <form>
            <CoreLocation 
                value={location} 
                onChange={handleLocationChange} 
            />
            
            {/* You can access the data like this: */}
            <p>City Code: {location.city_code}</p>
            <p>Address: {location.address}</p>
        </form>
    );
}
```

### 2. CoreInput

A wrapper for HeroUI `Input` with preset styles (flat variant, outside label).

**Usage:**

```tsx
import { CoreInput } from "@/components/core";

<CoreInput 
    label="Full Name" 
    placeholder="Enter your name" 
    isRequired 
    errorMessage="Name is required"
    // All other HeroUI Input props work here
/>
```

### 3. CoreSelect

A wrapper for HeroUI `Select` with preset styles.

**Usage:**

```tsx
import { CoreSelect } from "@/components/core";
import { SelectItem } from "@heroui/react";

<CoreSelect 
    label="Gender" 
    placeholder="Select gender"
>
    <SelectItem key="male">Male</SelectItem>
    <SelectItem key="female">Female</SelectItem>
</CoreSelect>
```

## Tips
- **CoreLocation** automatically fetches Cities from API.
- **CoreLocation** automatically fetches Districts/Wards when a City is selected.
- All components support `className` and other standard props for customization.
