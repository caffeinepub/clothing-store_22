import { useRef, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Lookbook from "./components/Lookbook";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleShopNow = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCartClick = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} onCartClick={handleCartClick} />
      <main>
        <Hero onShopNow={handleShopNow} />
        <div ref={productsRef}>
          <Products onAddToCart={handleAddToCart} />
        </div>
        <Lookbook />
      </main>
      <Footer />
    </div>
  );
}
