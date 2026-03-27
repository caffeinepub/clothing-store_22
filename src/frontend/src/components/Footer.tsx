import { Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

const SHOP_LINKS = ["New Arrivals", "Men", "Women", "Accessories", "Sale"];
const INFO_LINKS = ["Our Story", "Sustainability", "Careers", "Press"];
const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card px-6 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h3
              className="mb-4 text-xl font-bold uppercase tracking-[0.25em] text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              AURA
            </h3>
            <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
              Modern luxury fashion for those who move through the world with
              intention. Refined, considered, enduring.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Shop
            </h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="/"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Info
            </h4>
            <ul className="space-y-3">
              {INFO_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="/"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="/"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
              Stay Inspired
            </h4>
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
              New arrivals, editorials, and exclusive access — directly to your
              inbox.
            </p>
            {subscribed ? (
              <p
                data-ocid="newsletter.success_state"
                className="text-xs text-accent"
              >
                You're on the list. Welcome to AURA.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  data-ocid="newsletter.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="border border-border bg-background px-4 py-2.5 text-xs text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-accent"
                  required
                />
                <button
                  data-ocid="newsletter.submit_button"
                  type="submit"
                  className="border border-foreground bg-foreground px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-background transition-all hover:bg-transparent hover:text-foreground"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-[11px] text-muted-foreground">
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
