"use client";
import { useState } from "react";
import { useSubscribe } from "@/hooks/useSubscribe";
import { Mail, Loader2, Check } from "lucide-react";
import { TOPICS } from "@/lib/constants";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";

interface FinalCTAProps {
  topics: string[];
  scrollToTopics: () => void;
  onSuccess?: () => void;
}

export default function FinalCTA({ topics, scrollToTopics, onSuccess }: FinalCTAProps) {
  const { subscribe, loading, success, error } = useSubscribe();
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (topics.length === 0) {
      setValidationError("Please select at least one topic above.");
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
      source: "footer_cta"
    });
  };

  if (success && onSuccess) {
    onSuccess();
  }

  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24 px-4 overflow-hidden">
      <FadeInSection className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="font-display italic text-3xl sm:text-4xl md:text-6xl mb-6 tracking-tight leading-tight px-2">
          Stop Doom-Scrolling.<br className="hidden sm:block" />Start Getting Briefed.
        </h2>
        <p className="font-sans font-light text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-8 md:mb-12 max-w-2xl leading-relaxed px-4">
          12,000+ founders, marketers, and builders already get their personalized AI news brief at 6:00 AM. It's free. It takes 30 seconds to set up.
        </p>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-6 md:p-8 w-full max-w-lg mx-auto"
          >
            <h3 className="font-display text-xl md:text-2xl flex items-center justify-center gap-3">
              <Check className="h-5 w-5 md:h-6 md:w-6" strokeWidth={3} /> You're In!
            </h3>
            <p className="font-sans font-light text-sm md:text-base text-primary-foreground/70 mt-2">Your first brief arrives tomorrow morning.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col items-center px-2">
            <div className="flex flex-col md:flex-row w-full gap-3">
              <div className="relative flex-grow w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/50 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Enter your Gmail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 md:h-14 pl-12 pr-4 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-sans font-light text-base md:text-lg"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary-foreground text-primary h-12 md:h-14 rounded-lg md:rounded-xl px-8 md:px-10 font-sans font-bold uppercase tracking-[0.12em] text-xs md:text-sm whitespace-nowrap disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center shadow-lg transition-all w-full md:w-auto hover:opacity-90"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "SUBSCRIBE FREE"}
              </motion.button>
            </div>

            <p className="font-sans font-light text-primary-foreground/60 text-[10px] md:text-sm text-center mt-4 tracking-wide">
              Your first briefing arrives tomorrow at 6:00 AM
            </p>

            {(validationError || error) && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white bg-destructive/80 border border-white/20 rounded-lg px-4 py-2 text-xs md:text-sm mt-6 font-sans font-medium shadow-sm w-full"
              >
                {validationError || error}
              </motion.p>
            )}
          </form>
        )}
      </FadeInSection>
    </section>
  );
}
