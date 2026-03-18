"use client";

import { useSubscribe } from "@/hooks/useSubscribe";
import { ChevronDown, Check, ArrowLeft, Loader2 } from "lucide-react";
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
      <div id="signup-card" className="bg-[#0D0D0D] border border-brand-amber/40 p-6 w-full rounded-none shadow-[0_8px_40px_rgba(0,0,0,0.4)] relative overflow-hidden min-h-[440px] flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-amber" />
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full px-6"
        >
          <div className="text-6xl mb-6">🌅</div>
          <h3 className="font-display text-2xl font-black tracking-tight text-white uppercase mb-2">You're In!</h3>
          <p className="font-mono text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">Your first personalized briefing arrives tomorrow at 6:00 AM IST.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="signup-card" className="bg-[#0D0D0D] border border-brand-amber/40 p-6 w-full rounded-none shadow-[0_8px_40px_rgba(0,0,0,0.4)] relative overflow-hidden min-h-[440px] flex flex-col justify-center">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-amber" />

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col relative z-10"
          >
            {/* Step indicator */}
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-amber mb-1">
              STEP 01 — IDENTITY
            </div>
            {/* Progress bar */}
            <div className="w-full h-px bg-white/10 mb-4">
              <div className="h-px bg-brand-amber w-1/3" />
            </div>
            
            <h2 className="font-display font-bold text-2xl text-white uppercase mb-1 tracking-tight">
              BUILD YOUR BRIEF
            </h2>
            <p className="font-mono text-[11px] text-white/40 mb-5">30 seconds. No password required.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="flex flex-col">
              {/* Full Name */}
              <div className="relative mb-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">✦</span>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white font-mono text-sm pl-8 pr-3 py-2.5 placeholder:text-white/25 focus:border-brand-amber focus:bg-white/[0.08] focus:outline-none transition-all duration-200 rounded-none"
                />
              </div>

              {/* Email */}
              <div className="relative mb-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">✦</span>
                <input
                  type="email"
                  placeholder="Gmail Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white font-mono text-sm pl-8 pr-3 py-2.5 placeholder:text-white/25 focus:border-brand-amber focus:bg-white/[0.08] focus:outline-none transition-all duration-200 rounded-none"
                />
              </div>

              {/* Role Select */}
              <div className="relative mb-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">✦</span>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-amber pointer-events-none" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white font-mono text-sm pl-8 pr-8 py-2.5 focus:border-brand-amber focus:bg-white/[0.08] focus:outline-none transition-all duration-200 rounded-none appearance-none cursor-pointer [&>option]:bg-[#0D0D0D] [&>option]:text-white"
                >
                  <option value="" disabled>Brand Owner or Builder?</option>
                  <option value="Founder">Founder / Brand Owner</option>
                  <option value="Marketer">Marketer / Copywriter</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Creator">Content Creator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-brand-amber text-brand-black font-mono font-bold text-sm uppercase tracking-widest py-3 mt-2 flex items-center justify-center gap-2 hover:bg-white transition-colors duration-200 rounded-none"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>NEXT →</span>
              </motion.button>

              <p className="font-mono text-[10px] text-white/25 text-center mt-3">
                Takes 30 seconds. No password required.
              </p>

              {validationError && (
                <p className="text-red-500 font-mono text-[10px] mt-2 text-center font-bold tracking-tight">
                  {validationError}
                </p>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col relative z-10"
          >
            {/* Step indicator */}
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-amber mb-1">
              STEP 02 — TOPICS ({topics.length}/{TOPICS.length})
            </div>
            {/* Progress bar */}
            <div className="w-full h-px bg-white/10 mb-4">
              <div className="h-px bg-brand-amber w-2/3" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setStep(1)} 
                disabled={loading}
                className="text-white/40 text-[10px] hover:text-brand-amber flex items-center gap-1.5 font-mono uppercase tracking-widest transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
              <div className="flex gap-4">
                <button 
                  onClick={() => setTopics(TOPICS.map(t => t.id))} 
                  className="font-mono font-bold text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                >
                  All
                </button>
                <button 
                  onClick={() => setTopics([])} 
                  className="font-mono font-bold text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6 max-h-[160px] overflow-y-auto pr-1 flex-grow">
              {TOPICS.map(t => {
                const isSelected = topics.includes(t.id);
                return (
                  <motion.button 
                    key={t.id} 
                    onClick={() => toggleTopic(t.id)}
                    className={`border rounded-none px-2.5 py-2 text-[10px] cursor-pointer select-none flex items-center gap-2 font-mono uppercase tracking-tighter text-left transition-all ${
                      isSelected 
                        ? "bg-brand-amber/10 border-brand-amber text-brand-amber font-black" 
                        : "bg-white/5 border-white/10 text-white/30 hover:border-white/20 hover:text-white/60"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="shrink-0">
                      <t.icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="leading-tight flex-grow line-clamp-1">{t.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-brand-amber shrink-0" />}
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-4 mt-auto">
              <motion.button
                onClick={handleSubmit}
                disabled={topics.length === 0 || loading}
                className="w-full bg-brand-amber text-brand-black font-mono font-bold text-sm uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 rounded-none"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>COMPLETE →</span>}
              </motion.button>
              
              {error && (
                <p className="text-red-500 font-mono text-[10px] mt-2 text-center font-bold tracking-tight">
                  {error}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
