import { Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CartItem } from "../App";

const WA_NUMBER = "+1234567890";

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: number, size: string, delta: number) => void;
  onRemove: (productId: number, size: string) => void;
}

function buildWhatsAppMessage(items: CartItem[]): string {
  if (items.length === 0) return "Hi, I'd like to place an order!";
  const lines = items.map(
    (item) =>
      `• ${item.product.name} (Size: ${item.size}) x${item.qty} — ${item.product.price}`,
  );
  const subtotal = items.reduce((acc, item) => {
    const price = Number.parseFloat(item.product.price.replace("$", ""));
    return acc + price * item.qty;
  }, 0);
  return encodeURIComponent(
    `Hi AURA! I'd like to order:\n\n${lines.join("\n")}\n\nTotal: $${subtotal.toFixed(2)}`,
  );
}

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => {
    const price = Number.parseFloat(item.product.price.replace("$", ""));
    return acc + price * item.qty;
  }, 0);

  const waMessage = buildWhatsAppMessage(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <motion.aside
            key="cart-drawer"
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                Your Cart
                {items.length > 0 && (
                  <span className="ml-2 text-muted-foreground">
                    ({items.length})
                  </span>
                )}
              </h2>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={onClose}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                >
                  <p className="text-4xl">🛍️</p>
                  <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-5" data-ocid="cart.list">
                  {items.map((item, i) => (
                    <li
                      key={`${item.product.id}-${item.size}`}
                      data-ocid={`cart.item.${i + 1}`}
                      className="flex gap-4 border-b border-border pb-5"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-16 object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                              {item.product.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              Size: {item.size}
                            </p>
                          </div>
                          <button
                            type="button"
                            data-ocid={`cart.delete_button.${i + 1}`}
                            onClick={() => onRemove(item.product.id, item.size)}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Remove item"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              data-ocid={`cart.secondary_button.${i + 1}`}
                              onClick={() =>
                                onUpdateQty(item.product.id, item.size, -1)
                              }
                              className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs font-medium text-foreground">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              data-ocid={`cart.primary_button.${i + 1}`}
                              onClick={() =>
                                onUpdateQty(item.product.id, item.size, 1)
                              }
                              className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            $
                            {(
                              Number.parseFloat(
                                item.product.price.replace("$", ""),
                              ) * item.qty
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="cart.submit_button"
                  className="flex w-full items-center justify-center gap-2.5 bg-[#25D366] py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#20bc5a]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                    role="img"
                    aria-label="WhatsApp"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order via WhatsApp
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
