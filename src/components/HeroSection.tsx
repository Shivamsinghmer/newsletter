"use client";

import { Mail, Check, Loader2 } from "lucide-react";
import SignupCard from "./SignupCard";
import { useSubscribe } from "@/hooks/useSubscribe";
import { useState } from "react";
import { TOPICS } from "@/lib/constants";
import NewsletterPreviewModal from "./NewsletterPreviewModal";
import { motion } from "framer-motion";

interface HeroSectionProps {
  topics: string[];
  toggleTopic: (id: string) => void;
  setTopics: React.Dispatch<React.SetStateAction<string[]>>;
  scrollToTopics: () => void;
  setIsSubscribed: (v: boolean) => void;
}

export default function HeroSection({ topics, toggleTopic, setTopics, scrollToTopics, setIsSubscribed }: HeroSectionProps) {
  const { subscribe, loading, success, error } = useSubscribe();
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (topics.length === 0) {
      setValidationError("Please select at least one topic below.");
      scrollToTopics();
      return;
    }

    const selectedTopicNames = topics.map(id => TOPICS.find(t => t.id === id)?.name).filter(Boolean) as string[];

    await subscribe({
      fullName: "Not Provided",
      email,
      role: "Not Specified",
      topics: selectedTopicNames,
      subscribedAt: new Date().toISOString(),
      source: "hero_inline"
    });
  };

  if (success) {
    setIsSubscribed(true);
  }

  return (
    <section className="relative bg-background lg:h-[calc(100vh-64px)] px-4 md:px-8 flex items-center overflow-hidden py-12 lg:py-0">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
          <motion.div 
            className="bg-primary/5 border border-primary/10 text-primary rounded-full px-3 py-1 text-[10px] md:text-xs flex items-center gap-2 mb-4 md:mb-5 shadow-sm" 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="text-sm leading-none">🌅</span>
            <span className="font-sans font-bold uppercase tracking-[0.12em] md:tracking-[0.18em]">Delivered at 6:00 AM Sharp</span>
          </motion.div>

          <motion.h1 
            className="font-display text-[1.8rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.4rem] xl:text-[3.8rem] leading-[1.1] md:leading-[1.08] tracking-tight text-foreground uppercase mb-4 md:mb-5 max-w-2xl lg:max-w-none" 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            YOUR <em className="not-italic font-display italic text-primary">PERSONAL</em> AI-CURATED NEWS BRIEF. <br className="hidden lg:block xl:hidden" /> <br className="hidden xl:block" /> TOTALLY FREE.
          </motion.h1>

          <div className="mb-6 flex flex-col items-center lg:items-start">
            <motion.p 
              className="font-sans font-light text-sm md:text-base leading-relaxed text-muted-foreground mb-4 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              Pick from 11 topics including AI, crypto, and health. Every morning at 6:00 AM, our AI agents deliver a clean, personalized briefing straight to your Gmail.
            </motion.p>
            <motion.button 
              onClick={() => setIsPreviewOpen(true)}
              className="px-4 py-1.5 text-[10px] md:text-xs border border-border rounded-lg text-foreground font-semibold hover:bg-accent hover:border-primary/30 transition-all group flex items-center shadow-sm bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              PREVIEW TODAY'S ISSUE <span className="ml-2 group-hover:translate-x-1 transition-transform opacity-60">→</span>
            </motion.button>
          </div>

          <motion.div 
            className="w-full max-w-xl mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {success ? (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 backdrop-blur-md">
                <p className="font-display italic text-lg text-foreground flex items-center gap-3 justify-center lg:justify-start">
                  <Check className="text-primary h-5 w-5" strokeWidth={3} /> You're on the list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <div className="bg-card border border-border rounded-xl flex flex-col sm:flex-row p-1 min-h-[46px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all group shadow-lg shadow-primary/5">
                  <div className="flex items-center flex-1 min-w-0 px-3 py-2 sm:py-0">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0 opacity-60" />
                    <input
                      type="email"
                      placeholder="Your Gmail address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="font-sans font-light text-sm w-full h-full bg-transparent border-none focus:ring-0 text-foreground ml-2 min-w-0 placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-primary-foreground rounded-lg px-6 h-9 sm:h-auto font-sans font-bold uppercase tracking-[0.12em] md:tracking-[0.15em] text-[10px] whitespace-nowrap transition-all disabled:opacity-70 flex items-center justify-center min-w-[130px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "BUILD BRIEF →"}
                  </motion.button>
                </div>
                {(validationError || error) && (
                  <p className="text-destructive text-[10px] mt-2 font-semibold px-4 text-center lg:text-left">
                    {validationError || error}
                  </p>
                )}
              </form>
            )}
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 w-full">
            {[
              "11 news topics",
              "AI-powered curation",
              "100% free, forever",
              "Unsubscribe anytime"
            ].map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-center gap-2 justify-center lg:justify-start"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
              >
                <div className="bg-primary/10 rounded-full p-0.5 leading-none">
                  <Check className="h-2.5 w-2.5 text-primary" strokeWidth={5} />
                </div>
                <span className="font-sans font-medium text-[10px] md:text-xs text-foreground/60">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <motion.div 
          className="lg:col-span-5 flex flex-col justify-center py-6 lg:py-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative group scale-90 sm:scale-100 origin-center lg:origin-right max-w-md mx-auto lg:max-w-none">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl transition duration-1000 group-hover:duration-200 group-hover:opacity-100 opacity-30" />
            <div className="relative">
              <SignupCard 
                topics={topics} 
                toggleTopic={toggleTopic} 
                setTopics={setTopics} 
                onSuccess={() => setIsSubscribed(true)} 
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <NewsletterPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </section>
  );
}
