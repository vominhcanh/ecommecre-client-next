import type { Config } from 'tailwindcss';

const { heroui } = require('@heroui/react');

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      '4xs': '320px',
      '2xs': '360px',
      xs: '425px',
      // => @media (min-width: 425px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      screens: {
        // '4xs': '320px',
        // '2xs': '360px',
        // '1xs': '480px',
        // xs: '600 px',
        // sm: '768px',
        md: '1024px',
        lg: '1280px',
        xl: '1440px',
        // xxl: '1600px',
        // '3xl': '1920px',
        // '4xl': '2560px',
        // '5xl': '5120px'
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-gilroy)', 'sans-serif'],
        gilroy: ['var(--font-gilroy)', 'sans-serif'],
        urbanist: ['var(--font-urbanist)'],
      },
      keyframes: {
        'phone-rotate': {
          '0%, 10%': { transform: 'rotateZ(0deg)' },
          '40%, 60%': { transform: 'rotateZ(90deg)' },
          '90%, 100%': { transform: 'rotateZ(0deg)' },
        },
      },
      animation: {
        'phone-rotate': 'phone-rotate 3s ease-in-out infinite',
      },
      backgroundColor: {
        primary: '#186770',
        secondary: '#7828C8',
        success: '#17C964',
        warning: '#F5A524',
        orange: '#FF8924',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      // Theme mặc định
      defaultTheme: 'light',

      // Prefix để tránh conflict với classes khác (optional)
      // prefix: 'hero',

      // Default variants cho components
      defaultVariants: {
        input: 'flat',        // Input không có border, chỉ background
        select: 'flat',       // Select không có border
        textarea: 'flat',     // Textarea không có border
      },

      themes: {
        light: {
          layout: {
            // Border radius - CHỈ ÁP DỤNG cho HeroUI components
            radius: {
              small: '4px',    // Button, Input, Card nhỏ
              medium: '6px',   // Kích thước trung bình
              large: '8px',    // Kích thước lớn
            },
            // Border width - Set 0 để không có border
            borderWidth: {
              medium: '1px',
              large: '2px',
            },
            // Disabled opacity
            disabledOpacity: 0.5,
            // Divider weight
            dividerWeight: '1px',
            // Font sizes (optional - không set sẽ dùng default)
            fontSize: {
              tiny: '0.75rem',    // 12px
              small: '0.875rem',  // 14px
              medium: '1rem',     // 16px
              large: '1.125rem',  // 18px
            },
          },
          colors: {
            // KHÔNG set background/foreground để tránh ảnh hưởng toàn bộ app
            // Chỉ set màu cho các semantic colors của HeroUI

            // Primary - Màu chính #186770 (Teal)
            primary: {
              DEFAULT: '#186770',
              foreground: '#FFFFFF',
            },

            // Secondary
            secondary: {
              DEFAULT: '#7828C8',
              foreground: '#FFFFFF',
            },

            // Success
            success: {
              DEFAULT: '#17C964',
              foreground: '#FFFFFF',
            },

            // Warning
            warning: {
              DEFAULT: '#F5A524',
              foreground: '#000000',
            },

            // Danger
            danger: {
              DEFAULT: '#E14942',
              foreground: '#FFFFFF',
            },

            // Focus color - TẮT HOÀN TOÀN
            focus: 'transparent',
          },
        },
        dark: {
          layout: {
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '0px',    // KHÔNG có border mặc định
              medium: '1px',
              large: '2px',
            },
            disabledOpacity: 0.5,
            dividerWeight: '1px',
          },
          colors: {
            // Semantic colors cho dark mode
            primary: {
              DEFAULT: '#186770',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#9353D3',
              foreground: '#FFFFFF',
            },
            success: {
              DEFAULT: '#17C964',
              foreground: '#000000',
            },
            warning: {
              DEFAULT: '#F5A524',
              foreground: '#000000',
            },
            danger: {
              DEFAULT: '#F87171',
              foreground: '#FFFFFF',
            },
            focus: 'transparent', // TẮT focus ring
          },
        },
      },
    }),
  ],
};
export default config;
