import { UserPlus, Bot, Mail } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-10 h-10 text-primary mb-4" />,
      title: "You Subscribe",
      desc: "Enter your name, email, and pick your topics in under 60 seconds."
    },
    {
      icon: <Bot className="w-10 h-10 text-primary mb-4" />,
      title: "AI Fetches The News",
      desc: "Every morning at 6:00 AM, our AI pulls the biggest stories across your chosen topics."
    },
    {
      icon: <Mail className="w-10 h-10 text-primary mb-4" />,
      title: "Lands In Your Gmail",
      desc: "A clean, scannable briefing built just for you arrives in your Gmail inbox — free, every morning."
    }
  ];

  return (
    <section className="bg-background py-16 md:py-24 px-4 md:px-8 overflow-hidden border-t border-border">
      <FadeInSection className="max-w-6xl mx-auto">
        <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-12 md:mb-20 tracking-tight px-4">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
          <div className="hidden md:block absolute top-[45%] left-0 right-0 h-px bg-border z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="absolute -top-10 md:-top-16 font-display italic text-primary/5 text-[6rem] sm:text-[8rem] md:text-[10rem] pointer-events-none select-none"
              >
                0{i + 1}
              </motion.div>

              <div className="p-3 md:p-4 relative z-10 mb-2">
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <h3 className="font-display italic text-xl md:text-2xl text-foreground mb-3 relative z-10 px-2">
                {step.title}
              </h3>
              <p className="font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-[280px] sm:max-w-[300px] mx-auto relative z-10">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
