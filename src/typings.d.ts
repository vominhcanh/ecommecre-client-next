declare module 'react-render-html';

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE: string;
    NEXT_PUBLIC_API_CLIENT: string;
    NEXT_PUBLIC_MEDIA_URL: string;
    NEXT_PUBLIC_MEDIA_FOLDER: string;
    NEXT_PUBLIC_MEDIA_SCALE: string;
    NEXT_PUBLIC_STORE_TOKEN: string;
  }
}
