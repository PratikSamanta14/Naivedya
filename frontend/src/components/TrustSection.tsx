import { motion } from "framer-motion";
import { CheckCircle2, Shield, Truck, Award } from "lucide-react";

const trustItems = [
  {
    icon: CheckCircle2,
    title: "Verified Pandits",
    description: "Experienced Bengali priests for authentic rituals",
    color: "text-success",
  },
  {
    icon: Shield,
    title: "Temple-Grade Samagri",
    description: "Pure, authentic items sourced from trusted vendors",
    color: "text-primary",
  },
  {
    icon: Award,
    title: "Shuddho & Authentic",
    description: "Traditionally blessed and culturally correct items",
    color: "text-secondary",
  },
  {
    icon: Truck,
    title: "Same Day Delivery",
    description: "Order before 5 PM for free same-day delivery",
    color: "text-accent",
  },
];

const TrustSection = () => {
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Why Choose Naivedya?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bringing devotion to your doorstep with authenticity and trust
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-6 bg-background rounded-2xl border border-border shadow-soft hover:shadow-card transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-muted to-card flex items-center justify-center mb-4 ${item.color}`}>
                <item.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-tr-2xl rounded-bl-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
