"use client";

import { Check } from "lucide-react";
import { TOPICS } from "@/lib/constants";
import FadeInSection from "./FadeInSection";

interface CategoryGridProps {
  selectedTopics: string[];
  toggleTopic: (id: string) => void;
}

export default function CategoryGrid({ selectedTopics, toggleTopic }: CategoryGridProps) {
  return (
    <section id="topics" className="bg-muted py-16 md:py-24 px-4 md:px-8 border-t border-border">
      <FadeInSection className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-6 md:mb-8 tracking-tight px-4 leading-tight">
          Choose Your Morning Briefing Topics
        </h2>
        <p className="font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground text-center mb-12 md:mb-16 max-w-2xl px-6">
          Select the categories you care about to receive personalized daily briefings direct to your Gmail every morning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
          {TOPICS.map((topic) => {
            const isSelected = selectedTopics.includes(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`relative border rounded-xl p-5 md:p-6 cursor-pointer transition-all duration-300 hover:scale-[1.03] flex flex-col h-full bg-card group ${
                  isSelected
                    ? "border-primary bg-accent shadow-md ring-1 ring-primary"
                    : "border-border shadow-sm hover:shadow-md hover:border-primary/50"
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
                <div className="flex items-start justify-between mb-4 md:mb-5">
                  <span className="text-3xl sm:text-4xl md:text-5xl transition-transform group-hover:scale-110 duration-300" role="img" aria-label={topic.name}>
                    {topic.emoji}
                  </span>
                  {isSelected && (
                    <div className="bg-primary text-primary-foreground rounded-full p-1 md:p-1.5 shadow-sm mt-1 animate-in zoom-in duration-300">
                      <Check className="h-3 w-3 md:h-4 md:w-4" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <h3 className="font-display text-lg md:text-xl text-foreground mb-2 leading-tight">
                  {topic.name}
                </h3>
                <p className="font-sans font-light text-xs sm:text-sm md:text-[15px] leading-relaxed text-muted-foreground flex-grow">
                  {topic.desc}
                </p>
              </div>
            );
          })}
        </div>
      </FadeInSection>
    </section>
  );
}
