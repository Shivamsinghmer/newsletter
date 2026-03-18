"use client";

import { animate } from "framer-motion";
import { useEffect, useRef, Fragment } from "react";

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const numberStr = value.replace(/,/g, "");
  const number = parseFloat(numberStr);
  const suffix = value.replace(/[0-9,.]/g, "");
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const count = animate(0, number, {
      duration: duration,
      onUpdate: (latest) => {
        node.textContent = Math.floor(latest).toLocaleString() + suffix;
      },
    });

    return () => count.stop();
  }, [number, suffix, duration]);

  return <span ref={nodeRef}>0</span>;
}

export default function StatsBanner() {
  const stats = [
    { value: "12,000+", label: "SUBSCRIBERS", isCount: true },
    { value: "6:00 AM IST", label: "DELIVERY", isCount: false },
    { value: "100%", label: "FREE", isCount: true },
    { value: "11", label: "TOPICS", isCount: true },
    { value: "24/7", label: "AI AGENTS", isCount: false }
  ];

  return (
    <section id="stats" className="bg-brand-black border-y border-brand-amber/20 py-10 md:py-16 px-4 md:px-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-center gap-6 md:gap-0 w-full">
          {stats.map((stat, i) => (
            <Fragment key={i}>
              <div className="flex flex-col items-center min-w-0 md:min-w-[130px] text-center">
                <h3 
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-amber whitespace-nowrap"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(245,166,35,0.3))' }}
                >
                  {stat.isCount ? <Counter value={stat.value} /> : stat.value}
                </h3>
                <p className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-brand-cream/40 mt-1 md:mt-2">
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-10 bg-brand-amber/30 self-center mx-4 hidden md:block" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
