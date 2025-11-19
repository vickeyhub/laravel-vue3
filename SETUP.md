# Project Setup - Vue.js Admin + Livewire Customer

## Overview
This project uses:
- **Vue.js** for admin panel and non-SEO pages
- **Livewire** for customer-facing SEO pages

## Build Structure

### Separate Entry Points
- `resources/js/admin.js` - Vue.js admin panel entry point
- `resources/js/customer.js` - Livewire customer side (no Vue.js)

### Build Output
When you run `npm run build`, it creates separate builds:
- `admin-*.js` - Admin entry point (small)
- `customer-*.js` - Customer entry point (no Vue.js)
- `vue-vendor-*.js` - Vue.js vendor chunk (only loaded on admin pages)

## Routes

### Customer Routes (Livewire)
- `/` - Customer home page with Livewire components
- All customer routes use `layouts/customer.blade.php`
- Vue.js is NOT loaded on these pages

### Admin Routes (Vue.js)
- `/admin/*` - All admin routes use Vue.js SPA
- Uses `layouts/admin.blade.php`
- Vue Router handles client-side routing

## Usage

### Development
```bash
npm run dev
php artisan serve
```

### Production Build
```bash
npm run build
```

## Important Notes

1. **Vue.js is NOT loaded on customer pages** - This keeps customer pages lightweight and SEO-friendly
2. **Separate builds** - Admin and customer have completely separate JavaScript bundles
3. **Shared hosting ready** - Builds are optimized and separate, perfect for shared hosting

## Adding New Pages

### Customer Side (Livewire)
1. Create a Livewire component: `php artisan make:livewire ComponentName`
2. Create a view in `resources/views/customer/`
3. Add route in `routes/web.php`
4. Use `@extends('layouts.customer')` in your view

### Admin Side (Vue.js)
1. Create Vue component in `resources/js/pages/`
2. Add route in `resources/js/router/router.js`
3. Access via `/admin/your-route`

