import FadeInSection from "./FadeInSection";

export default function StatsBanner() {
  const stats = [
    { value: "12,000+", label: "SUBSCRIBERS" },
    { value: "6:00 AM", label: "DAILY DELIVERY" },
    { value: "100%", label: "FREE FOREVER" },
    { value: "11 Topics", label: "TO CHOOSE FROM" },
    { value: "AI Powered", label: "CURATION" }
  ];

  return (
    <section className="bg-background border-y border-border py-8 md:py-12 px-4 shadow-sm relative z-10">
      <FadeInSection className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-8 md:gap-y-0 md:gap-4 lg:gap-0 lg:divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center text-center px-2 md:px-4 ${i === 4 && 'col-span-2 lg:col-span-1'}`}>
              <h3 className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-foreground mb-1 md:mb-2 whitespace-nowrap">
                {stat.value}
              </h3>
              <p className="font-sans font-semibold text-[8px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.15em] md:tracking-[0.2em] text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
