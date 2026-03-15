"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterPreviewModal({ isOpen, onClose }: NewsletterPreviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto p-10 relative z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="font-sans font-light text-base leading-relaxed text-foreground">
              <p className="font-display italic text-lg mb-6 border-b border-border pb-4">
                Subject: Your Daily Brief — March 15, 2026
              </p>
              
              <p className="mb-8 font-light text-lg">Good morning 👋</p>

              <div className="space-y-10">
                <div>
                  <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-primary/70 mb-4">
                    🤖 AI & TECHNOLOGY
                  </p>
                  <div className="border-l-2 border-primary pl-6 space-y-3">
                    <p className="font-light">OpenAI releases GPT-5 with real-time web browsing</p>
                    <p className="font-light">Google DeepMind announces protein folding breakthrough</p>
                  </div>
                </div>

                <div>
                  <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-primary/70 mb-4">
                    📈 STOCK MARKET & CRYPTO
                  </p>
                  <div className="border-l-2 border-primary pl-6 space-y-3">
                    <p className="font-light">Bitcoin hits $95K amid ETF inflow surge</p>
                    <p className="font-light">S&P 500 closes at record high for third week</p>
                  </div>
                </div>

                <div>
                  <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-primary/70 mb-4">
                    🚀 STARTUPS & VC
                  </p>
                  <div className="border-l-2 border-primary pl-6 space-y-3">
                    <p className="font-light">Stripe raises $1.1B at $65B valuation</p>
                    <p className="font-light">YC W26 batch: 247 companies announced</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border flex flex-col items-center text-center">
                <p className="text-display italic text-lg mb-2">The Daily Brief</p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest">
                  AI Personalized · Delivered to your Gmail Inbox
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
