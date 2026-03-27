import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oversized Linen Shirt",
    price: "$89",
    category: "Women",
    image: "/assets/generated/product-linen-shirt.dim_600x700.jpg",
  },
  {
    id: 2,
    name: "Tailored Blazer",
    price: "$245",
    category: "Men",
    image: "/assets/generated/product-blazer.dim_600x700.jpg",
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    price: "$165",
    category: "Women",
    image: "/assets/generated/product-trousers.dim_600x700.jpg",
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    price: "$195",
    category: "Men",
    image: "/assets/generated/product-turtleneck.dim_600x700.jpg",
  },
  {
    id: 5,
    name: "Silk Slip Dress",
    price: "$320",
    category: "Women",
    image: "/assets/generated/product-slip-dress.dim_600x700.jpg",
  },
  {
    id: 6,
    name: "Leather Crossbody",
    price: "$410",
    category: "Accessories",
    image: "/assets/generated/product-leather-bag.dim_600x700.jpg",
  },
  {
    id: 7,
    name: "Merino Crewneck",
    price: "$145",
    category: "Men",
    image: "/assets/generated/product-crewneck.dim_600x700.jpg",
  },
  {
    id: 8,
    name: "Slim Chino Trousers",
    price: "$118",
    category: "Men",
    image: "/assets/generated/product-chinos.dim_600x700.jpg",
  },
  {
    id: 9,
    name: "Classic Denim Jacket",
    price: "$135",
    category: "Denim",
    image: "/assets/generated/product-denim-jacket-classic.dim_600x700.jpg",
  },
  {
    id: 10,
    name: "Slim Fit Jeans",
    price: "$98",
    category: "Denim",
    image: "/assets/generated/product-jeans-slim.dim_600x700.jpg",
  },
  {
    id: 11,
    name: "Cropped Denim Jacket",
    price: "$125",
    category: "Denim",
    image: "/assets/generated/product-denim-jacket-cropped.dim_600x700.jpg",
  },
  {
    id: 12,
    name: "Wide Leg Jeans",
    price: "$110",
    category: "Denim",
    image: "/assets/generated/product-jeans-wide-leg.dim_600x700.jpg",
  },
  {
    id: 13,
    name: "Vintage Denim Jacket",
    price: "$155",
    category: "Denim",
    image: "/assets/generated/product-denim-jacket-vintage.dim_600x700.jpg",
  },
];

interface ProductsProps {
  onAddToCart: () => void;
}

function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: Product;
  index: number;
  onAddToCart: () => void;
}) {
  return (
    <motion.article
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: "easeOut" }}
      className="group flex flex-col border border-border bg-card"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "6/7" }}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
        <span className="absolute top-3 left-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.1em] text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.price}</p>
        </div>
        <button
          type="button"
          data-ocid={`products.secondary_button.${index + 1}`}
          onClick={onAddToCart}
          className="flex w-full items-center justify-center gap-2 border border-border bg-secondary py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}

export default function Products({ onAddToCart }: ProductsProps) {
  return (
    <section id="products" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Curated Selection
          </p>
          <h2
            className="text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Featured Styles
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
