import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function Lookbook() {
  return (
    <section className="bg-card border-y border-border px-6 py-0">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[480px] grid-cols-1 md:grid-cols-2">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center py-20 pr-0 md:pr-16"
          >
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Spring Issue
            </p>
            <h2
              className="mb-6 text-4xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Explore the
              <br />
              <span className="italic">Lookbook</span>
            </h2>
            <p className="mb-10 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A visual journey through the season's defining pieces — styled for
              the contemporary wardrobe.
            </p>
            <motion.button
              data-ocid="lookbook.primary_button"
              whileHover={{ x: 6 }}
              className="group flex w-fit items-center gap-3 border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-muted-foreground"
            >
              View Lookbook
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>

          {/* Right — visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex items-center justify-center overflow-hidden border-l border-border"
            style={{
              background:
                "linear-gradient(135deg, #0e1014 0%, #141820 50%, #0b0c0e 100%)",
            }}
          >
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.96 0 0 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.96 0 0 / 0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 p-12 text-center">
              <p
                className="text-5xl font-bold uppercase leading-none tracking-tighter text-foreground opacity-20 md:text-7xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                CURATED
              </p>
              <p
                className="mt-2 text-5xl font-bold uppercase leading-none tracking-tighter text-accent md:text-7xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                DESIGN
              </p>
              <div className="mx-auto mt-8 h-px w-16 bg-accent opacity-40" />
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                SS 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
