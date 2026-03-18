import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 relative pb-20 md:pb-0">
      {/* Subtle amber glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-brand-amber/40" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center py-8 px-4 md:px-12 gap-4 md:gap-0 text-center md:text-left">
        {/* Left: small text */}
        <div className="font-mono text-xs text-white text-center md:text-left order-3 md:order-1">
          <span>© {new Date().getFullYear()} The Daily Brief.</span>
          <br />
          <span className="text-white/60">Designed for the 1% who build.</span>
        </div>

        {/* Center: logo */}
        <div className="flex items-center justify-center gap-2 order-1 md:order-2">
          <div className="bg-brand-amber p-1.5 rounded-none">
            <Mail className="h-4 w-4 text-brand-black" />
          </div>
          <span className="font-display font-bold text-white text-xl tracking-tighter uppercase">
            The Daily Brief
          </span>
        </div>

        {/* Right: nav links */}
        <div className="font-mono text-xs text-white flex gap-6 justify-center md:justify-end order-2 md:order-3">
          <Link href="#" className="hover:text-brand-amber transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-brand-amber transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-brand-amber transition-colors">
            Unsubscribe
          </Link>
        </div>
      </div>
    </footer>
  );
}
