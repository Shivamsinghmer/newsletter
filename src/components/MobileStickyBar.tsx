"use client";
import { motion } from "framer-motion";

export default function MobileStickyBar({ isSubscribed }: { isSubscribed: boolean }) {
  if (isSubscribed) return null;

  return (
    <motion.div 
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
      className="fixed bottom-0 left-0 right-0 bg-brand-black/95 backdrop-blur-md border-t border-brand-amber/20 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] z-40 md:hidden"
    >
      <button
        onClick={() => {
          const el = document.getElementById('signup-card');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="w-full bg-brand-amber text-brand-black rounded-none py-4 font-mono font-black text-xs uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all"
      >
        BUILD PERSONAL BRIEF →
      </button>
    </motion.div>
  );
}
