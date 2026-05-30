# WoodCraft - Premium Handcrafted Furniture E-Commerce

A fully functional e-commerce website for a premium furniture shop built with Next.js 16, Tailwind CSS v4, Framer Motion, and Anime.js.

## Live Demo

🔗 [View Live Site](https://ecom-furniture-kohl.vercel.app)

## Features

### Core E-Commerce
- **Product Catalog** — Browse 12 handcrafted furniture items with grid/list views
- **Advanced Filters** — Filter by category, material, color, price range with sort options
- **Product Detail** — Image gallery with zoom-on-hover, specs tabs, reviews, related products
- **Shopping Cart** — Add/remove items, quantity controls, order summary with free shipping threshold
- **Checkout Flow** — Multi-step form (Shipping → Payment → Review) with validation
- **Wishlist** — Save and manage favorite items with dedicated page
- **Quick View** — Preview product details in a modal without leaving the shop

### Authentication
- Custom JWT simulation with localStorage persistence
- Login/Register with form validation (React Hook Form + Zod)
- Demo credentials: `john@example.com` / `password123`

### UI/UX
- **Hero Section** — Letter-by-letter anime.js reveal, typewriter subtitle, 3D tilt images, parallax scroll, cursor trail, animated counters, scrolling marquee
- **Toast Notifications** — Animated alerts for cart and wishlist actions
- **Scroll Progress Bar** — Accent-colored progress indicator at the top
- **Back to Top** — Animated button appears on scroll
- **Page Transitions** — Smooth route changes
- **Mobile Responsive** — Fully responsive across all breakpoints with accordion navigation

### Homepage Sections
- Hero with animated typography and 3-image photo stack
- Why Choose Us (elastic icon animations)
- Categories browse
- Featured Products
- Brand ticker (As Featured In)
- Testimonial carousel with auto-slide
- Instagram-style photo gallery
- Newsletter subscription

### SEO & Performance
- Full metadata (title, description, keywords, OpenGraph, Twitter cards)
- Canonical URLs and sitemap.xml
- robots.txt with crawl rules
- SVG favicon
- Image optimization via Next.js Image component

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion + Anime.js v4 |
| State | Zustand (persisted to localStorage) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/nick0221/ecom-furniture.git
cd ecom-furniture

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── products/           # Shop + Product detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Multi-step checkout
│   ├── wishlist/           # Saved items
│   ├── auth/               # Login / Register
│   ├── orders/             # Order history
│   ├── about/              # About page
│   ├── contact/            # Contact + FAQ
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Crawl rules
├── components/
│   ├── ui/                 # Reusable UI (Button, Input, Card, Modal, etc.)
│   ├── layout/             # Navbar, Footer, Breadcrumb
│   ├── products/           # ProductCard, ProductGrid, QuickView
│   ├── cart/               # CartItem, CartSummary
│   └── home/               # Hero, Categories, Testimonials, etc.
├── data/                   # Mock products, categories, reviews
├── hooks/                  # Custom hooks (useHydrated, etc.)
├── store/                  # Zustand stores (cart, auth, wishlist)
├── lib/                    # Utilities, constants, animation presets
└── types/                  # TypeScript interfaces
```

## Demo Credentials

| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password123 |

## License

Built with care by NickDevs
