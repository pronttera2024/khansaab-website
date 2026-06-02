# Quick Start Guide

## 1️⃣ Install & Run

```bash
# Navigate to the project
cd /Users/apple/Desktop/pronttera/react-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open automatically at `http://localhost:5173`

## 2️⃣ Project Structure at a Glance

```
src/
├── App.jsx                 ← Main app with routing
├── main.jsx                ← Entry point
├── components/
│   ├── Nav.jsx            ← Header & navigation
│   ├── Footer.jsx         ← Footer
│   ├── AnnouncementBar.jsx
│   ├── TweaksPanel.jsx    ← Dev tweaks (⚙️ button)
│   └── shared/            ← Reusable components
│       ├── KhanSaabLogo.jsx
│       ├── Img.jsx
│       └── Ornament.jsx
├── pages/
│   ├── HomePage.jsx       ← Home page
│   ├── ProductsPage.jsx   ← Product grid
│   ├── ProductDetailPage.jsx ← Single product
│   └── StoryPage.jsx      ← Brand story
├── context/
│   ├── RouterContext.jsx  ← Navigation
│   └── ModalsContext.jsx  ← Modals
├── hooks/
│   ├── useViewport.js     ← Responsive breakpoints
│   └── useReveal.js       ← Scroll animations
└── styles/
    └── index.css          ← All CSS (design system)
```

## 3️⃣ Navigate Between Pages

Click the navigation links in the header:

- **Home** → Homepage with hero and collections
- **Collection** → Product grid
- **Our Story** → Brand story and team
- **Custom Tailoring** → collection info

Or use the tweaks panel (⚙️):

- **Display** → Toggle RTL (Arabic layout)
- **Accent palette** → Change house color
- **Navigate** → Jump to any page

## 4️⃣ Edit Content

### Add a new section to Home

Edit `src/pages/HomePage.jsx`:

```jsx
<section style={{ padding: "160px 0", background: "var(--ivory)" }}>
  <div className="container">
    <h2 className="display">Your Section Title</h2>
    {/* Add content here */}
  </div>
</section>
```

### Change colors

Edit `src/styles/index.css`:

```css
:root {
  --gold: #c9a961; /* Luxury accent */
  --emerald: #0f3b2e; /* Primary accent */
  --ink: #0a0908; /* Dark background */
  --ivory: #f5efe3; /* Light background */
}
```

### Update product data

Edit `src/pages/ProductsPage.jsx`:

```jsx
const products = [
  { id: 1, name: "Ivory Thobe", price: "AED 1,200" },
  { id: 2, name: "Navy Kandura", price: "AED 1,500" },
  // Add more...
];
```

## 5️⃣ Build for Production

```bash
npm run build      # Creates optimized dist/ folder
npm run preview    # Preview production build locally
```

Deploy the `dist/` folder to:

- Vercel
- Netlify
- Any static host

## 6️⃣ Component Usage Examples

### Use navigation

```jsx
import { useRouter } from "../context/RouterContext.jsx";

function MyComponent() {
  const { route, go } = useRouter();

  return <button onClick={() => go("products")}>View Products</button>;
}
```

### Use responsive breakpoints

```jsx
import { useViewport } from "../hooks/useViewport";

function MyComponent() {
  const { isMobile, isTablet } = useViewport();

  if (isMobile) return <MobileLayout />;
  return <DesktopLayout />;
}
```

### Use scroll reveal animation

```jsx
import { useReveal } from "../hooks/useReveal";

function MyComponent() {
  const [ref, visible] = useReveal();

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0 }}>
      Content that fades in on scroll
    </div>
  );
}
```

## 7️⃣ Key Features

✅ **Responsive** - Works on mobile, tablet, desktop
✅ **Fast** - Vite dev server with HMR
✅ **No component library** - Pure React + CSS
✅ **Customizable** - Easy to change colors, fonts, content
✅ **Production-ready** - Optimized build, tree-shaking

## 8️⃣ Troubleshooting

### Port 5173 already in use?

```bash
npm run dev -- --port 3000
```

### Want to change Google Fonts?

Edit `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=YOUR+FONTS&display=swap"
  rel="stylesheet"
/>
```

### Need dark mode?

Add to `src/styles/index.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --ivory: #1a1a1a;
    --ink: #f5f5f5;
  }
}
```

## 📚 Learn More

- **React Basics** - https://react.dev
- **Vite Docs** - https://vitejs.dev
- **CSS Variables** - https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Responsive Design** - https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design

## 💡 Tips

1. **Hot Reload** - Changes save instantly during `npm run dev`
2. **Use browser DevTools** - Inspect styles and React component tree
3. **Tweaks Panel** - Use ⚙️ button to test color variants
4. **Test responsiveness** - Use browser dev tools device emulation
5. **Check console** - No errors means you're good!

---

**Ready to start coding?** Run `npm run dev` and have fun! 🚀
