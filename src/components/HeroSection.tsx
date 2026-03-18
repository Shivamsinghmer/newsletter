"use client";

import SignupCard from "./SignupCard";
import NewsletterPreviewModal from "./NewsletterPreviewModal";
import { useState } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  topics: string[];
  toggleTopic: (id: string) => void;
  setTopics: React.Dispatch<React.SetStateAction<string[]>>;
  scrollToTopics: () => void;
  setIsSubscribed: (v: boolean) => void;
}

export default function HeroSection({ topics, toggleTopic, setTopics, scrollToTopics, setIsSubscribed }: HeroSectionProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <section className="relative bg-brand-cream min-h-screen lg:h-screen px-4 md:px-8 flex items-center overflow-hidden pt-20 pb-12 lg:pt-16 lg:pb-0">
      {/* Dot pattern background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #0D0D0D 1.5px, transparent 0)', backgroundSize: '24px 24px', backgroundPosition: 'center', opacity: 0.06 }} />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10 w-full">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
          <motion.div 
            className="bg-brand-amber text-brand-black rounded-full px-3 py-1 sm:px-4 sm:py-1.5 flex items-center gap-2 mb-4 md:mb-8 shadow-sm" 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">Delivered Daily at 6:00 AM IST</span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            <h1 
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[96px] font-black leading-[0.95] tracking-tighter text-brand-black uppercase mb-4 md:mb-8 max-w-2xl lg:max-w-none"
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.08)' }}
            >
              {"YOUR PERSONAL AI-CURATED NEWS BRIEF.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.2em] last:mr-0"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word === "AI-CURATED" ? (
                    <span>
                      <em className="not-italic font-display">AI</em>-CURATED
                    </span>
                  ) : word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p 
            className="font-mono text-xs sm:text-sm text-brand-black/60 mb-4 md:mb-8 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            Pick from 11 topics including AI, crypto, and health. Every morning at 6:00 AM IST, our AI agents deliver a clean, personalized briefing straight to your Gmail.
          </motion.p>

          <div className="font-mono text-[10px] sm:text-[11px] text-brand-black/50 flex gap-4 sm:gap-6 flex-wrap mt-1 sm:mt-3">
            {[
              "11 news topics",
              "AI-powered curation",
              "100% free, forever",
              "Unsubscribe anytime"
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              >
                <span className="w-1 h-1 rounded-full bg-brand-amber inline-block" />
                <span className="uppercase">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Right Column — stacks below on mobile */}
        <motion.div
          className="lg:col-span-5 flex flex-col justify-center w-full max-w-sm mx-auto lg:max-w-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full">
            <SignupCard
              topics={topics}
              toggleTopic={toggleTopic}
              setTopics={setTopics}
              onSuccess={() => setIsSubscribed(true)}
            />
          </div>
        </motion.div>
      </div>

      <NewsletterPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </section>
  );
}
