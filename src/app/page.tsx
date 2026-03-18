"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import StatsBanner from "@/components/StatsBanner";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function Home() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const scrollToTopics = () => {
    const el = document.getElementById("topics");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col space-y-0">
      <Navbar />
      <main className="flex-1">
        <HeroSection 
          topics={selectedTopics} 
          setTopics={setSelectedTopics}
          toggleTopic={toggleTopic}
          scrollToTopics={scrollToTopics} 
          setIsSubscribed={setIsSubscribed}
        />
        <HowItWorks />
        <CategoryGrid 
          selectedTopics={selectedTopics} 
          toggleTopic={toggleTopic} 
        />
        <StatsBanner />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar isSubscribed={isSubscribed} />
    </div>
  );
}
