import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const NAV_LINKS = ["New", "Men", "Women", "Accessories", "Sale", "Journal"];

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <a
          href="/"
          data-ocid="nav.link"
          className="font-serif text-xl font-bold tracking-[0.25em] text-foreground"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          AURA
        </a>

        {/* Center nav — desktop */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="/"
              data-ocid="nav.link"
              className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            data-ocid="nav.search_input"
            aria-label="Search"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            <Search size={17} />
          </button>
          <button
            type="button"
            data-ocid="nav.link"
            aria-label="Account"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            <User size={17} />
          </button>
          <button
            type="button"
            data-ocid="nav.primary_button"
            aria-label={`Cart, ${cartCount} items`}
            onClick={onCartClick}
            className="relative flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ShoppingBag size={17} />
            <AnimatePresence mode="popLayout">
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-xs font-medium text-foreground"
                >
                  [{cartCount}]
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-border py-3 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
