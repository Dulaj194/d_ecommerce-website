# E-Commerce Frontend - Next.js

Modern, responsive e-commerce frontend built with Next.js and TypeScript.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   
   Create `.env.local` (already provided):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   
   Open http://localhost:3000

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── admin/           # Admin pages
│   ├── cart/            # Cart page
│   ├── checkout/        # Checkout page
│   ├── login/           # Login page
│   ├── orders/          # Orders pages
│   ├── products/        # Products pages
│   ├── register/        # Register page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # Reusable components
│   └── Navbar.tsx      # Navigation bar
├── lib/                # Utilities
│   └── api.ts          # API client
├── store/              # State management
│   ├── authStore.ts    # Auth state
│   └── cartStore.ts    # Cart state
└── types/              # TypeScript types
    └── index.ts
```

## Features

### Customer Features
- ✅ Product browsing with filters
- ✅ Search products
- ✅ Product details
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order history
- ✅ User authentication

### Admin Features
- ✅ Product management
- ✅ Category management
- ✅ Order management
- ✅ Dashboard statistics

## Environment Variables

```bash
# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Styling

- **Framework**: Tailwind CSS
- **Responsive**: Mobile-first design
- **Components**: Custom utility classes in `globals.css`

### Custom Classes
- `btn-primary` - Primary button
- `btn-secondary` - Secondary button
- `btn-danger` - Danger button
- `input-field` - Form input
- `card` - Card container

## State Management

Using **Zustand** for state management:

### Auth Store
```typescript
const { user, login, logout, isAuthenticated } = useAuthStore();
```

### Cart Store
```typescript
const { items, total, addItem, removeItem } = useCartStore();
```

## API Integration

API client configured with:
- Automatic JWT token injection
- Error handling
- Automatic redirect on 401

```typescript
import apiClient from '@/lib/api';

// GET request
const products = await apiClient.get('/products');

// POST request
await apiClient.post('/cart/items', { productId: 1, quantity: 2 });
```

## Building for Production

```bash
# Build
npm run build

# Start production server
npm start
```

The build creates optimized production files in `.next/` directory.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment
```bash
npm run build
npm start
```

## Troubleshooting

**API Connection Issues:**
- Verify backend is running on port 8080
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

**Build Errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Type Errors:**
Check TypeScript version matches Next.js requirements

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Server-side rendering
- Image optimization
- Code splitting
- Lazy loading

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
