# AURA Clothing Store

## Current State
App has Navbar, Hero, Products grid, Lookbook, Footer. Products component shows a grid of clothing items. Cart is just a counter in the Navbar. Clicking a product card does nothing except "Add to Cart" button.

## Requested Changes (Diff)

### Add
- Product detail modal that opens when clicking a product card (image, name, price, size selector with XS/S/M/L/XL buttons, "Add to Cart" + "Buy Now" button)
- Cart sidebar/drawer that slides in from the right, showing cart items with quantity, total price, and a checkout/order via WhatsApp action
- WhatsApp floating action button (bottom-right corner) that opens a WhatsApp chat link

### Modify
- ProductCard: clicking anywhere on the card opens the product detail modal
- App.tsx: manage cart items state (array of {product, size, qty}), pass open-cart handler down, wire up modal and cart drawer
- "Add to Cart" in modal adds item to cart and opens cart sidebar
- "Buy Now" in modal adds item and opens cart sidebar immediately

### Remove
- Nothing removed

## Implementation Plan
1. Create `ProductModal.tsx` — full-screen or centered modal with product image, name, price, size buttons (XS S M L XL), Add to Cart + Buy Now actions
2. Create `CartDrawer.tsx` — right-side sliding drawer listing cart items, quantities, subtotal, and a "Order via WhatsApp" button that builds a WhatsApp message with cart contents
3. Create `WhatsAppButton.tsx` — fixed bottom-right floating button linking to `https://wa.me/<number>` (use a placeholder number)
4. Update `Products.tsx` — card click opens modal (pass `onSelectProduct` prop)
5. Update `App.tsx` — add cartItems state, selectedProduct state, isCartOpen state; wire everything together
