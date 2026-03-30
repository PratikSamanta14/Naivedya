import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
const combos = [
  {
    id: 1,
    name: "Saraswati Puja",
    icon: "📚",
    items: ["Sindur", "Dhup", "Ghee Diya"],
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1510166089176-b57564a5ec3a?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Lakshmi Puja",
    icon: "🪔",
    items: ["Sindur", "Pushpanjali", "Ghee"],
    price: 599,
    originalPrice: 899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605650123985-115f013bd01d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Durga Puja Mahalaya",
    icon: "🔱",
    items: ["Sindur", "Dhak", "Shankha"],
    price: 1299,
    originalPrice: 1799,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Vishwakarma Puja",
    icon: "🔧",
    items: ["Tools Puja", "Dhup", "Sindur"],
    price: 449,
    originalPrice: 599,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    name: "Ganesh Puja",
    icon: "🐘",
    items: ["Modak", "Durva", "Sindur"],
    price: 399,
    originalPrice: 549,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1567115160875-103362a7cfd1?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    name: "Kali Puja",
    icon: "🌙",
    items: ["Hibiscus", "Sindur", "Prasad"],
    price: 749,
    originalPrice: 999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1614717140889-1ea23ee2ca1e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 7,
    name: "Kartik Puja",
    icon: "🦚",
    items: ["Sindur", "Flowers", "Prasad"],
    price: 349,
    originalPrice: 499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1508210156976-74fcce0f9a2b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 8,
    name: "Shiva Ratri",
    icon: "🌊",
    items: ["Bilva", "Milk", "Honey"],
    price: 549,
    originalPrice: 749,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=600",
  },
];

const FestivalCombos = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-festive">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-primary uppercase tracking-wider mb-2"
            >
              🪔 Festival Specials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
            >
              Bengali Occasion Combos
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="ghost" className="group text-primary hover:text-primary/80">
              View All Combos
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
            {combos.map((combo, index) => (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center"
              >
                <div className="h-full bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group">
                  {/* Card Header */}
                  <div className="relative h-40 bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}% OFF
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      <span className="text-xs font-semibold">{combo.rating}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold mb-2 text-foreground">
                      {combo.name}
                    </h3>

                    {/* What's Inside */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {combo.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-primary">₹{combo.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{combo.originalPrice}</span>
                    </div>

                    {/* CTA */}
                    <Link to={`/combo/${combo.id}`}>
                      <Button variant="festive" className="w-full group">
                        <Package className="w-4 h-4 mr-2" />
                        View Combo
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient Fade */}
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default FestivalCombos;
