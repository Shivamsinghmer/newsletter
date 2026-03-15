import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-6 md:px-8 pb-32 md:pb-12 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:items-start text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <span className="font-display italic text-xl text-foreground tracking-tight uppercase whitespace-nowrap">
              The Daily Brief
            </span>
          </div>
          <p className="text-muted-foreground/50 text-xs max-w-[200px] leading-relaxed hidden md:block">
            AI Personalized News · Delivered to your Gmail every morning at 6:00 AM.
          </p>
        </div>

        <div className="flex flex-col items-center text-muted-foreground text-sm font-sans font-light max-w-xs gap-2">
          <span>© {new Date().getFullYear()} The Daily Brief.</span>
          <span className="text-muted-foreground/60 text-xs text-center">
            All rights reserved. Designed for builders.
          </span>
          <span className="text-muted-foreground/40 text-[10px] md:hidden">
            AI Personalized News · Delivered to your Gmail
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 text-xs md:text-sm text-foreground/80 font-sans font-medium">
          <Link href="#" className="hover:text-primary transition-colors uppercase tracking-[0.1em]">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary transition-colors uppercase tracking-[0.1em]">
            Unsubscribe
          </Link>
        </div>
      </div>
    </footer>
  );
}
