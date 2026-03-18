"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav 
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-black/10 h-16 flex items-center px-6 md:px-12 w-full"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="font-display font-bold text-brand-black flex items-center gap-2">
          <div className="bg-brand-black text-brand-cream p-1.5 rounded-none">
            <Mail className="h-4 w-4" />
          </div>
          <span className="font-display text-xl text-brand-black tracking-tighter uppercase">
            THE DAILY BRIEF
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-brand-black/70">
            <button onClick={() => scrollTo("how-it-works")} className="cursor-pointer hover:text-brand-black transition-colors">How It Works</button>
            <button onClick={() => scrollTo("topics")} className="cursor-pointer hover:text-brand-black transition-colors">Topics</button>
            <button onClick={() => scrollTo("stats")} className="cursor-pointer hover:text-brand-black transition-colors">Stats</button>
          </div>
          <button 
            onClick={() => scrollTo("signup-card")}
            className="bg-brand-black text-brand-cream font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-none hover:bg-brand-amber hover:text-brand-black transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
