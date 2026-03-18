"use client";

import { UserPlus, Bot, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "You Subscribe",
      desc: "Enter your name, email, and pick your topics in under 60 seconds."
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Fetches The News",
      desc: "Every morning at 6:00 AM IST, our AI pulls the biggest stories across your chosen topics."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Lands In Your Gmail",
      desc: "A clean, scannable briefing built just for you arrives in your inbox — free, every morning."
    }
  ];

  return (
    <section id="how-it-works" className="bg-brand-black py-16 md:py-24 px-4 md:px-8 overflow-hidden relative">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #F5A623 1px, transparent 0)', backgroundSize: '40px 40px', backgroundPosition: 'center', opacity: 0.05 }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl text-brand-cream tracking-tight uppercase">
            How It Works
          </h2>
          <div className="w-12 h-0.5 bg-brand-amber mx-auto mt-3 mb-16" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              className="relative overflow-hidden max-w-xs mx-auto text-center flex flex-col items-center group p-6 rounded-none hover:bg-white/5 transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 font-display text-[100px] font-black text-white/5 leading-none select-none -z-10 uppercase">
                0{i + 1}
              </span>

              <div className="border border-brand-amber w-12 h-12 flex items-center justify-center mb-4 mx-auto relative z-10 bg-brand-black text-brand-amber group-hover:bg-brand-amber group-hover:text-brand-black transition-colors duration-300 rounded-none">
                {step.icon}
              </div>

              <h3 className="font-display font-bold text-brand-cream text-xl md:text-2xl mb-3 relative z-10 uppercase">
                {step.title}
              </h3>
              <p className="font-mono text-sm text-brand-cream/60 leading-relaxed max-w-[200px] mx-auto relative z-10">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
