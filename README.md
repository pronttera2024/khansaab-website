# KhanSaab Website - React + Vite

A modern React + Vite implementation of the KhanSaab luxury menswear website, featuring Khaleeji traditional garments (thobes, kanduras, bishts).

## 🚀 Tech Stack

- **React 18.3.1** - UI library
- **Vite 5.0** - Build tool & dev server
- **React Router DOM 6.22** - Client-side routing
- **CSS3** - Design system with CSS custom properties

## 📁 Project Structure

```
react-website/
├── src/
│   ├── components/
│   │   ├── shared/              # Reusable UI components
│   │   │   ├── KhanSaabLogo.jsx
│   │   │   ├── Img.jsx          # Image placeholder component
│   │   │   └── Ornament.jsx     # Decorative ornaments
│   │   ├── AnnouncementBar.jsx  # Top ribbon
│   │   ├── Nav.jsx              # Navigation header
│   │   ├── Footer.jsx           # Footer with links
│   │   └── TweaksPanel.jsx      # Dev tweaks panel
│   ├── context/
│   │   ├── RouterContext.jsx    # Navigation context
│   │   └── ModalsContext.jsx    # Modal dialogs context
│   ├── hooks/
│   │   ├── useViewport.js       # Responsive breakpoints
│   │   └── useReveal.js         # Intersection observer for animations
│   ├── pages/
│   │   ├── HomePage.jsx         # Hero + collections + CTA
│   │   ├── ProductsPage.jsx     # Product grid
│   │   ├── ProductDetailPage.jsx # Single product view
│   │   └── StoryPage.jsx        # Brand story
│   ├── styles/
│   │   └── index.css            # Global design system
│   ├── App.jsx                  # Root component with routing
│   └── main.jsx                 # Entry point
├── public/
│   └── assets/                  # Images and media
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
└── README.md
```

## 🎨 Design System

All colors, typography, and spacing use CSS custom properties defined in `src/styles/index.css`:

### Colors

- **Ink**: `#0A0908` (dark background)
- **Emerald**: `#0F3B2E` (accent)
- **Gold**: `#C9A961` (luxury accent)
- **Ivory**: `#F5EFE3` (light backgrounds)

### Typography

- **Display**: Cormorant Garamond (serif, headlines)
- **Body**: Manrope (sans-serif, body text)
- **Arabic**: Amiri (Arabic script)
- **Mono**: JetBrains Mono (technical/monospace)

### Responsive Breakpoints

- **Tablet**: ≤ 1024px
- **Phone**: ≤ 720px
- **Tiny Phone**: ≤ 420px

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

Opens automatically at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Component Hierarchy

### Nav Component

- Renders announcement bar, logo, desktop nav links
- Mobile hamburger menu with drawer
- Sticky header with scroll effect
- Uses `useRouter` to navigate between pages

### Footer Component

- Contact information
- Multi-column link structure
- Newsletter signup
- Social media links

### Page Components

Each page is self-contained and imported into `App.jsx`:

- **HomePage**: Hero carousel, featured collections, testimonials
- **ProductsPage**: Grid of products with filtering
- **ProductDetailPage**: Single product with gallery, sizing, customization options
- **StoryPage**: Brand heritage, team, values

## 🎯 Key Features

### 1. Context-Based Routing

Simple custom routing using React Context instead of React Router (for flexibility):

```jsx
const { route, go } = useRouter();
go("products"); // Navigate to products page
```

### 2. Responsive Design

CSS media queries handle:

- Grid layout adjustments
- Typography scaling with `clamp()`
- Mobile-first drawer navigation
- Touch-friendly interactive elements

### 3. Animations

Predefined CSS animations:

- `fadeUp` - Entrance animations
- `fadeIn` - Fade effects
- `ribbonScroll` - Announcement bar
- `heroProgress` - Progress bars

### 4. Tweaks Panel

Built-in development panel to:

- Toggle RTL (Arabic) layout
- Change accent colors
- Switch between pages
- Test responsiveness

## 🔄 Navigation Flow

```
┌─────────────┐
│   HomePage  │ (default)
└──────┬──────┘
       │
       ├─→ ProductsPage ──→ ProductDetailPage
       │
       └─→ StoryPage
```

Uses custom context-based routing for simple page transitions with scroll-to-top on navigation.

## 📱 Mobile Considerations

- **Hamburger menu**: Hidden on desktop, visible on phones (<900px)
- **Flexible layouts**: Grids stack to single column on mobile
- **Typography**: Uses `clamp()` for fluid scaling
- **Touch targets**: Buttons ≥ 44px for accessibility
- **Viewport units**: `svh` (small viewport height) for better mobile UX

## 🎭 Tweaks Panel

Access the floating tweaks panel (⚙️ button in bottom-right) during development:

- **Display**: RTL layout toggle for Arabic/LTR switching
- **Accent**: Change house color palette
- **Navigate**: Jump to any page for testing

## 🚢 Deployment

Build for production:

```bash
npm run build
```

This creates optimized bundle in `dist/` directory, ready for:

- Vercel
- Netlify
- Any static host

## 📝 Notes

- All UI components use inline styles for simplicity and bundle size
- CSS Grid and Flexbox handle responsive layouts
- No external component libraries (pure React + CSS)
- Placeholder images from `picsum.photos` API
- WhatsApp integration for contact (hardcoded number can be updated)

## 🔗 Original Files

Converted from `/project/` folder:

- `components.jsx` → Split into individual component files
- `app.jsx` → `App.jsx` with routing logic
- `home-1.jsx`, `home-2.jsx` → `pages/HomePage.jsx`
- `products.jsx` → `pages/ProductsPage.jsx`
- `product-detail.jsx` → `pages/ProductDetailPage.jsx`
- `story.jsx` → `pages/StoryPage.jsx`
- `system.css` → `src/styles/index.css`
- `tweaks-panel.jsx` → `src/components/TweaksPanel.jsx`

## ✨ Customization

To adapt this template:

1. **Colors**: Update CSS variables in `src/styles/index.css` `:root`
2. **Content**: Edit text/images in page components
3. **Routes**: Add new pages in `src/pages/` and update `App.jsx`
4. **Assets**: Replace images in `public/assets/`
5. **Footer Links**: Update `src/components/Footer.jsx`

---

**Built with React + Vite for the KhanSaab collection** ✨
