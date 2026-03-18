"use client";

import { Check } from "lucide-react";
import { TOPICS } from "@/lib/constants";
import { motion } from "framer-motion";

interface CategoryGridProps {
  selectedTopics: string[];
  toggleTopic: (id: string) => void;
}

export default function CategoryGrid({ selectedTopics, toggleTopic }: CategoryGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="topics" className="bg-[#111111] py-16 px-4 md:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-10"
        >
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            Choose Your Topics
          </h2>
          <div className="h-1 w-16 bg-brand-amber mx-auto mt-4 mb-2" />
          <p className="font-mono text-sm text-white/40 text-center">Select the categories that matter to you</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full justify-items-start"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {TOPICS.map((topic) => {
            const isSelected = selectedTopics.includes(topic.id);
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.id}
                variants={item}
                onClick={() => toggleTopic(topic.id)}
                className={`relative border rounded-none p-4 cursor-pointer flex flex-col h-full w-full group transition-transform duration-200 hover:translate-y-[-2px] ${isSelected
                    ? "border-brand-amber border-l-4 bg-white/5 shadow-[0_0_20px_rgba(245,166,35,0.06)]"
                    : "border-white/5 bg-brand-card hover:border-white/20"
                  }`}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleTopic(topic.id);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-none transition-colors duration-300 ${isSelected ? "bg-brand-amber text-brand-black" : "bg-white/5 text-brand-amber"}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <div className="bg-brand-amber text-brand-black rounded-none p-1 shadow-sm mt-1">
                      <Check className="h-3 w-3" strokeWidth={5} />
                    </div>
                  )}
                </div>
                <h3 className={`font-display text-lg md:text-xl mb-2 leading-tight uppercase font-black transition-colors ${isSelected ? "text-brand-amber" : "text-white"}`}>
                  {topic.name}
                </h3>
                <p className="font-mono text-[10px] leading-relaxed text-white/40 uppercase tracking-tight group-hover:text-white/60 transition-colors">
                  {topic.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
