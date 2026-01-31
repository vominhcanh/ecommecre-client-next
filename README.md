# E-commerce Client Platform

A modern e-commerce client application built with Next.js 15, React 19, TypeScript, and HeroUI.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, Server Actions, ISR/SSR/SSG
- **Internationalization**: Multi-language support with next-intl
- **State Management**: Recoil for atomic state management
- **UI Components**: HeroUI (NextUI) component library
- **Animations**: Framer Motion for smooth animations
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Data Fetching**: TanStack Query for server state management
- **Theme Support**: Dark/Light mode with next-themes

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ecommerce-client.git
cd ecommerce-client

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Start development server
pnpm dev
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE=https://your-api-domain.com/api
NEXT_PUBLIC_API_CLIENT=your-client-id
NEXT_PUBLIC_MEDIA_URL=https://your-media-domain.com
NEXT_PUBLIC_MEDIA_FOLDER=uploads
NEXT_PUBLIC_MEDIA_SCALE=s1200
NEXT_PUBLIC_STORE_TOKEN=your-store-token

# Deployment Configuration (Optional)
# Set to 'true' if you want to use static export
NEXT_PUBLIC_STATIC_EXPORT=false
# Base path for deployment (e.g., for GitHub Pages)
NEXT_PUBLIC_BASE_PATH=

# Development
NODE_ENV=development
```

## 🖼️ Image Configuration

### For Production Deployment:

1. **Vercel/Netlify**: Images work automatically with default configuration
2. **Static Export**: Set `NEXT_PUBLIC_STATIC_EXPORT=true` in environment variables
3. **Custom Domain**: Add your domain to `remotePatterns` in `next.config.mjs`

### Image Optimization:
- Supports WebP and AVIF formats
- Responsive images with multiple device sizes
- Lazy loading by default
- Optimized for Core Web Vitals

### Troubleshooting Images:
- Ensure all image files are properly uploaded and not corrupted
- Check that image paths start with `/` for public folder images
- Verify environment variables are set correctly
- For static export, images are unoptimized automatically

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Static Export
```bash
# Set environment variable
export NEXT_PUBLIC_STATIC_EXPORT=true

# Build and export
pnpm build

# The 'out' folder contains the static files
```

### Other Platforms
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Localized routes
│   │   ├── (shop)/         # Shopping routes group
│   │   ├── account/        # User account routes
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout process
│   │   └── layout.tsx      # Localized layout
│   ├── api/                # API route handlers
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── cart/               # Cart components
│   ├── checkout/           # Checkout components
│   ├── common/             # Shared components
│   ├── layouts/            # Layout components
│   ├── product/            # Product components
│   └── ui/                 # UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── locales/                # Translation files
│   ├── en/                 # English translations
│   └── vi/                 # Vietnamese translations
├── services/               # API services
├── store/                  # Recoil state
├── types/                  # TypeScript types
└── utils/                  # Utility functions
```

## 🛠️ Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🌐 Internationalization

The app supports multiple languages:
- Vietnamese (vi)
- English (en)

Language files are managed through the API and cached locally.

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **HeroUI**: Modern React component library
- **Custom Components**: Styled with Tailwind classes
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic theme switching

## 📱 Components

### Key Components:
- `HeroBanner`: Image carousel for hero sections
- `ProductsCarousel`: Product showcase carousel
- `HeaderSearch`: Advanced search with suggestions
- `LocaleSwitcher`: Language switching component

### Image Components:
- All images use Next.js `Image` component for optimization
- Responsive images with proper sizing
- WebP/AVIF format support
- Lazy loading enabled

## 🔍 API Integration

The app integrates with a backend API for:
- Product data
- User authentication
- Shopping cart
- Order management
- Content management

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 📈 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: WebP/AVIF formats, responsive images
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: API responses cached with TanStack Query
- **Bundle Analysis**: Use `pnpm build` to analyze bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
# ecommecre-client-next
