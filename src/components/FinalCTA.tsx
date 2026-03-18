"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  const scrollToSignup = () => {
    const el = document.getElementById("signup-card");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="bg-brand-cream py-16 md:py-32 px-4 md:px-8 border-t border-brand-black/5 relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #0D0D0D 2px, transparent 0)', backgroundSize: '24px 24px', backgroundPosition: 'center', opacity: 0.03 }} />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          {/* Amber horizontal rule */}
          <div className="w-16 h-0.5 bg-brand-amber mx-auto mb-8" />
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-7xl mb-6 md:mb-8 tracking-tight leading-tight px-2 text-brand-black uppercase max-w-2xl mx-auto">
            Stop Doom-Scrolling. <br /> Start Getting Briefed.
          </h2>
          <p className="font-mono text-xs md:text-sm text-brand-black/60 mb-10 max-w-xl leading-relaxed px-4 uppercase tracking-[0.1em] font-bold">
            12,000+ founders, marketers, and builders already get their personalized AI news brief at 6:00 AM IST. It's free. It takes 30 seconds to set up.
          </p>

          <motion.button
            onClick={scrollToSignup}
            className="bg-brand-black text-brand-cream px-10 py-4 font-mono text-sm uppercase tracking-widest hover:bg-brand-amber hover:text-brand-black transition-colors duration-200 rounded-none flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SUBSCRIBE FREE →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
