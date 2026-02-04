Documentation: CartTemporary Logic & HeaderCart Component
This document outlines the logic, API structure, service layer, and UI components related to the Temporary Cart functionality (using session_id), enabling you to port this logic to another project.

1. API Configuration
File: 
src/common/configs/api.ts

The cart system uses a set of endpoints under the cartTemporary key. It primarily relies on a session_id to manage the cart state for guest users or before merging.

// src/common/configs/api.ts
cartTemporary: {
  getCart: `${baseUrl}/${v1}/my-product-collections`,
  addToCart: `${baseUrl}/${v1}/product-collections`,
  updateProductInCart: `${baseUrl}/${v1}/update-quantity-product-collections`,
  deleteProductInCart: `${baseUrl}/${v1}/remove-product-collections`,
  deleteCart: `${baseUrl}/${v1}/delete-product-collections`,
},
2. API Service Layer
File: 
src/services/cart/cartTemporary.ts

This service file encapsulates the API calls. It uses helper hooks/functions (useApiGet, useApiPost, etc.) which likely wrapper 
fetch
 or axios.

Types
export type TypeParamsCartTemp = {
  session_id: string;
  product_id: number;
  price: number;
  quantity: number;
};
Methods
Function	Method	Params	Description
getCart
GET	session (string)	Fetches cart details by session ID.
addToCart
POST	
TypeParamsCartTemp
Adds an item to the cart.
updateProductInCart
PUT	
TypeParamsCartTemp
Updates quantity of an item.
deleteProductInCart
PUT	{ session_id, product_id }	Removes a specific item. (Note: Uses PUT in code)
deleteCart
DELETE	session (string)	Clears the entire cart.
3. Data Fetching Hook (SWR)
File: 
src/utils/queryHooks.ts

The project uses SWR for state management and data fetching. The hook 
useFetchCartCollections
 is responsible for keeping the cart data fresh.

Key Logic:

Retrieves sessionKey from cookies using getCookie(appConfig.cookies.sessionKey).
Constructs the API URL with session_id.
Uses useSWR to fetch and cache the data.
// src/utils/queryHooks.ts
export const useFetchCartCollections = (
  option?: Omit<TOptionHook<ICartTemporaryData>, 'params'>,
) => {
  const { isFetch = true, config } = option ?? {};
  // Fetcher function
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: 'GET',
      ...funcUtils.FetchHeaders(),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data?.data as ICartTemporaryData;
  };
  // Get Session ID from Cookies
  const sessionKey = getCookie(appConfig.cookies.sessionKey);
  
  // Construct API Path
  const apiPath = funcUtils.combineURL(
    `${API_ROUTE_CONFIG.cartTemporary.getCart}?session_id=${sessionKey}`,
  );
  // SWR Hook
  const { data, error, isLoading, mutate } = useSWR(isFetch ? apiPath : null, fetcher);
  return { data, error, isLoading, mutate };
};
4. UI Component: HeaderCart
File: 
src/components/Layout/Header/components/HeaderCart.tsx

The 
HeaderCart
 component displays the cart icon and a badge showing the number of items.

Dependencies:

useFetchCartCollections
: To get the cart count.
ClientOnly: A wrapper to ensure rendering happens only on the client (avoids hydration mismatch for cookies/localstorage).
IconIfy: Icon component.
Logic:

Calls 
useFetchCartCollections()
 to get 
cart
 data.
Checks cart?.details?.length to display the badge count.
Links to 
/cart
 (or /thanh-toan for VI) based on the current language.
Hides text label on desktop (commented out code), only showing the icon and badge.
Includes LocaleSwitcher for mobile/tablet screens (based on !isLg media query).
// Simplified Component Logic
const HeaderCart = ({ language, locales }: { language: string; locales: ILanguage[] }) => {
  const { data: cart } = useFetchCartCollections();
  return (
    <ClientOnly>
      <div className='flex items-center gap-2'>
        <Link href={`/${language}/cart`} className='relative text-white'>
          <Icon />
          {/* Badge Logic */}
          {!!cart?.details?.length && (
            <span className='absolute ...'>
              {cart?.details?.length}
            </span>
          )}
        </Link>
      </div>
    </ClientOnly>
  );
};
5. Summary for Porting
To port this to a new project, you will need:

Define Endpoints: Copy the cartTemporary object to your API config.
Service: Create a 
cartTemporary.ts
 service using your project's HTTP client (Axios/Fetch).
Hook: Implement 
useFetchCartCollections
 using your state manager (React Query/SWR). Crucially, ensure you have logic to generate and store a session_id in cookies so the API knows which guest cart to fetch.
Component: Copy 
HeaderCart.tsx
 and ensure styling/icons match your new project.