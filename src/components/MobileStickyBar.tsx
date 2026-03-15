"use client";
import { motion } from "framer-motion";

export default function MobileStickyBar({ isSubscribed }: { isSubscribed: boolean }) {
  if (isSubscribed) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 shadow-2xl z-40 md:hidden"
    >
      <button
        onClick={() => {
          const el = document.getElementById('signup-card');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="w-full bg-primary text-primary-foreground rounded-lg py-4 font-sans font-bold text-sm uppercase tracking-[0.12em] shadow-lg active:scale-[0.98] transition-all"
      >
        BUILD MY FREE BRIEF →
      </button>
    </motion.div>
  );
}
