"use client";

import { useSubscribe } from "@/hooks/useSubscribe";
import { User, Mail, ChevronDown, Check, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { TOPICS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

interface SignupCardProps {
  topics: string[];
  toggleTopic: (id: string) => void;
  setTopics: React.Dispatch<React.SetStateAction<string[]>>;
  onSuccess?: () => void;
}

export default function SignupCard({ topics, toggleTopic, setTopics, onSuccess }: SignupCardProps) {
  const { subscribe, loading, success, error } = useSubscribe();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
    }
  }, [success, onSuccess]);

  const handleNext = () => {
    setValidationError(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (fullName.trim().length < 2) {
      setValidationError("Full name must be at least 2 characters.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (topics.length === 0) return;

    const selectedTopicNames = topics.map(id => TOPICS.find(t => t.id === id)?.name).filter(Boolean) as string[];

    await subscribe({
      fullName,
      email,
      role: role || "Not Specified",
      topics: selectedTopicNames,
      subscribedAt: new Date().toISOString(),
      source: "hero_card"
    });
  };

  if (success) {
    return (
      <div id="signup-card" className="bg-card border border-border rounded-xl shadow-lg h-full flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
        <motion.div 
          key="success"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center py-8 w-full px-6"
        >
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`absolute w-2 h-2 rounded-sm animate-confetti ${
                i % 3 === 0 ? 'bg-chart-1' : i % 3 === 1 ? 'bg-primary' : 'bg-secondary-foreground'
              }`}
              style={{
                top: `${Math.random() * 20 + 70}%`,
                left: `${Math.random() * 60 + 20}%`,
                animationDelay: `${Math.random() * 0.4}s`
              }}
            />
          ))}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
            className="text-6xl mb-4"
          >
            🌅
          </motion.div>
          <h3 className="font-display text-3xl tracking-tight text-foreground text-center mb-2">You're In!</h3>
          <p className="font-sans font-light text-base md:text-lg leading-relaxed text-muted-foreground mb-1">Your first personalized briefing arrives tomorrow at 6:00 AM.</p>
          <p className="font-sans font-light text-sm text-muted-foreground/60">Check your spam folder if you don't see it.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="signup-card" className="bg-card border border-border/50 rounded-2xl shadow-2xl p-6 h-full flex flex-col justify-center min-h-[420px] overflow-hidden relative group">
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {step === 1 ?
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col h-full relative z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-primary">STEP 1: IDENTITY</div>
              <div className="flex gap-1">
                <div className="h-1 w-8 bg-primary rounded-full"></div>
                <div className="h-1 w-8 bg-muted rounded-full"></div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="font-display text-xl tracking-tight text-foreground text-center uppercase mb-1">
                Build Your Brief
              </h2>
              <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">Takes 30 seconds. No password required.</p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="flex flex-col space-y-3">
              <div className="relative group/input">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="font-sans font-light text-sm w-full h-11 pl-11 pr-4 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-foreground"
                />
              </div>

              <div className="relative group/input">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                <input
                  type="email"
                  placeholder="Your Gmail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-sans font-light text-sm w-full h-11 pl-11 pr-4 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-foreground"
                />
              </div>

              <div className="relative group/input">
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none group-focus-within/input:rotate-180 transition-transform" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="font-sans font-light text-sm w-full h-11 pl-4 pr-11 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 appearance-none text-foreground transition-all"
                >
                  <option value="" disabled>Founder, Marketer, or Builder?</option>
                  <option value="Founder">Founder / Brand Owner</option>
                  <option value="Marketer">Marketer / Copywriter</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Creator">Content Creator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 w-full h-12 rounded-xl font-sans font-bold uppercase tracking-[0.15em] text-xs mt-4 flex justify-center items-center hover:shadow-xl hover:shadow-primary/30 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                NEXT: CUSTOMIZE TOPICS →
              </motion.button>

              {validationError && (
                <p className="text-destructive text-[11px] mt-1 text-center font-medium">
                  {validationError}
                </p>
              )}
            </form>
          </motion.div>
         : 
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="font-sans font-semibold text-[10px] uppercase tracking-[0.15em] text-muted-foreground">STEP 2 OF 2</div>
              <div className="bg-accent text-accent-foreground rounded-full text-[10px] px-2 py-0.5 font-sans font-semibold">
                {topics.length} of {TOPICS.length} selected
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              <div className="h-1 w-1/2 bg-primary rounded-full"></div>
              <div className="h-1 w-1/2 bg-primary rounded-full"></div>
            </div>
            
            <p className="font-sans font-light text-xs leading-relaxed text-muted-foreground mb-2">We'll fetch top stories for each topic every morning using AI. Pick everything that interests you.</p>
            
            <div className="flex items-center justify-between gap-3 mb-2">
              <button 
                onClick={() => setStep(1)} 
                disabled={loading}
                className="text-muted-foreground text-xs hover:text-foreground flex items-center justify-center gap-1.5 font-sans font-semibold transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setTopics(TOPICS.map(t => t.id))} 
                  className="font-sans font-semibold text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Select All
                </button>
                <button 
                  onClick={() => setTopics([])} 
                  className="font-sans font-semibold text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-2 gap-2 mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {TOPICS.map(t => {
                const isSelected = topics.includes(t.id);
                return (
                  <motion.button 
                    key={t.id} 
                    onClick={() => toggleTopic(t.id)}
                    className={`border rounded-lg px-2 py-1.5 text-xs cursor-pointer select-none flex items-center gap-1.5 overflow-hidden font-sans text-left ${
                      isSelected 
                        ? "bg-accent border-primary font-semibold text-accent-foreground" 
                        : "bg-muted border-transparent hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="w-3.5 flex justify-center shrink-0">
                      <AnimatePresence>
                        {isSelected ? (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Check className="w-3 h-3 text-primary" />
                          </motion.span>
                        ) : (
                          <span className="w-3 h-3" />
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="text-sm leading-none shrink-0" role="img" aria-hidden>{t.emoji}</span>
                    <span className="text-[10.5px] sm:text-[11.5px] leading-tight">{t.name}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="mt-auto pt-1">
              <motion.button
                onClick={handleSubmit}
                disabled={topics.length === 0 || loading}
                className="bg-primary text-primary-foreground w-full h-10 rounded-lg font-sans font-bold uppercase tracking-[0.12em] text-xs flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "CLAIM YOUR FREE BRIEF"}
              </motion.button>
              
              {error && (
                <p className="text-destructive text-[11px] mt-2 text-center font-medium">
                  {error}
                </p>
              )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}
