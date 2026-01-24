import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categorySlugMap: Record<string, string> = {
  "Puja Samagri": "puja-samagri",
  "Festival Combos": "festival-combos",
  "Flowers & Garlands": "flowers-garlands",
  "Book Pandit": "book-pandit",
  "Prasad & Sweets": "prasad-sweets",
  "Idols & Murtis": "idols-murtis",
  "Utensil Rentals": "utensil-rentals",
  "Puja Knowledge": "puja-knowledge",
};

const categories = [
  { id: 1, name: "Puja Samagri", icon: "🪔", count: 150 },
  { id: 2, name: "Festival Combos", icon: "🎁", count: 25 },
  { id: 3, name: "Flowers & Garlands", icon: "💐", count: 45 },
  { id: 4, name: "Book Pandit", icon: "👳", count: 30 },
  { id: 5, name: "Prasad & Sweets", icon: "🍬", count: 60 },
  { id: 6, name: "Idols & Murtis", icon: "🙏", count: 80 },
  { id: 7, name: "Utensil Rentals", icon: "🍲", count: 40 },
  { id: 8, name: "Puja Knowledge", icon: "📖", count: 100 },
];

const CategorySection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Explore Categories
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Shop by Category
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link to={`/category/${categorySlugMap[category.name]}`} key={category.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-6 bg-card rounded-2xl border border-border shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-300 text-center"
              >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>

              {/* Name */}
              <h3 className="font-heading text-base md:text-lg font-semibold text-foreground mb-1">
                {category.name}
              </h3>

              {/* Count */}
              <p className="text-sm text-muted-foreground">
                {category.count}+ items
              </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
