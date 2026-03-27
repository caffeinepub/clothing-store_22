import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Product } from "./Products";

const SIZES = ["XS", "S", "M", "L", "XL"];

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow: (product: Product, size: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            key="modal"
            data-ocid="product.modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] w-auto max-w-3xl -translate-y-1/2 overflow-y-auto border border-border bg-background shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
          >
            {/* Close */}
            <button
              type="button"
              data-ocid="product.close_button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "6/7" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-background/80 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
                  {product.category}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between gap-6 p-8">
                <div>
                  <h2
                    className="mb-2 text-2xl font-bold uppercase tracking-tight text-foreground"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {product.name}
                  </h2>
                  <p className="text-2xl font-light text-foreground">
                    {product.price}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                    Premium quality piece crafted for the modern wardrobe.
                    Designed to complement your personal style with effortless
                    elegance.
                  </p>
                </div>

                {/* Size Selector */}
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Select Size
                  </p>
                  <div className="flex gap-2" data-ocid="product.toggle">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 w-10 border text-xs font-semibold uppercase tracking-wider transition-all ${
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    data-ocid="product.primary_button"
                    onClick={() => {
                      onBuyNow(product, selectedSize);
                    }}
                    className="w-full border border-foreground bg-foreground py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/90"
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    data-ocid="product.secondary_button"
                    onClick={() => {
                      onAddToCart(product, selectedSize);
                      onClose();
                    }}
                    className="w-full border border-border bg-transparent py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
