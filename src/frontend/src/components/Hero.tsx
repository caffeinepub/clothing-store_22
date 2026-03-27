import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { Suspense } from "react";
import Particles from "./ParticleBackground";

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
    >
      {/* Three.js canvas */}
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          style={{ background: "#0B0C0E" }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <Particles />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, transparent 30%, rgba(11,12,14,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero copy */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.45em] text-muted-foreground"
        >
          Spring / Summer 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-5xl font-bold uppercase leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          THE MODERNE
          <br />
          <span className="italic">Collection</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Refined silhouettes. Considered materials. Pieces that endure beyond
          the season.
        </motion.p>

        <motion.button
          data-ocid="hero.primary_button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onShopNow}
          className="mt-10 border border-foreground bg-foreground px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-foreground"
        >
          Shop Now
        </motion.button>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="h-8 w-px bg-muted-foreground opacity-50"
          />
        </div>
      </motion.div>
    </section>
  );
}
