import { motion } from "framer-motion";
import { Clock, Truck, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const PromoBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-primary via-accent to-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary-foreground text-center md:text-left"
          >
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Gift className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                Limited Time Offer
              </span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Free Delivery Before 5 PM!
            </h3>
            <p className="text-sm md:text-base opacity-90">
              Order now and get your puja essentials delivered free today
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 text-primary-foreground">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Ends in:</span>
            </div>
            <div className="flex gap-2">
              {[
                { value: timeLeft.hours, label: "hrs" },
                { value: timeLeft.minutes, label: "min" },
                { value: timeLeft.seconds, label: "sec" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center"
                >
                  <span className="w-14 h-14 flex items-center justify-center bg-background text-foreground text-xl md:text-2xl font-bold rounded-lg shadow-card">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-primary-foreground/80 mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="hero" size="lg" className="group">
              <Truck className="w-5 h-5 mr-2 group-hover:animate-pulse-soft" />
              Shop Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
