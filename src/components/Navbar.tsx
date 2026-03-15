"use client";

import { Moon, Sun, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-14 md:h-16 flex items-center px-4 md:px-8"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Mail className="h-4 w-4 md:h-5 md:p-0 text-primary" />
          </div>
          <span className="font-display italic text-lg md:text-xl text-foreground tracking-tight whitespace-nowrap">
            THE DAILY BRIEF
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4 md:h-5 md:p-0" /> : <Moon className="h-4 w-4 md:h-5 md:p-0" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
