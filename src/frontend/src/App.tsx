import { useState } from "react";
import { useRef } from "react";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Lookbook from "./components/Lookbook";
import Navbar from "./components/Navbar";
import ProductModal from "./components/ProductModal";
import Products, { type Product } from "./components/Products";
import WhatsAppButton from "./components/WhatsAppButton";

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
  };

  const handleBuyNow = (product: Product, size: string) => {
    handleAddToCart(product, size);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: number, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, qty: item.qty + delta }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const handleRemove = (productId: number, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size),
      ),
    );
  };

  const handleShopNow = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero onShopNow={handleShopNow} />
        <div ref={productsRef}>
          <Products onSelectProduct={setSelectedProduct} />
        </div>
        <Lookbook />
      </main>
      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />

      <WhatsAppButton />
    </div>
  );
}
