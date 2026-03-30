import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Pure Cow Ghee Diya Set",
    category: "Diyas",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1605650123985-115f013bd01d?auto=format&fit=crop&q=80&w=600",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Authentic Bengali Sindur",
    category: "Sindur",
    price: 99,
    originalPrice: 149,
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1614717140889-1ea23ee2ca1e?auto=format&fit=crop&q=80&w=600",
    badge: "Traditional",
  },
  {
    id: 3,
    name: "Premium Dhup Sticks (100 pcs)",
    category: "Dhup",
    price: 249,
    originalPrice: 349,
    rating: 4.7,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1541814032770-4f05b0c74148?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: 4,
    name: "Fresh Marigold Garland",
    category: "Flowers",
    price: 79,
    originalPrice: 99,
    rating: 4.9,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=600",
    badge: "Fresh Daily",
  },
  {
    id: 5,
    name: "Brass Puja Thali Set",
    category: "Utensils",
    price: 599,
    originalPrice: 899,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1594916894002-3deabce3ef30?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: 6,
    name: "Tulsi Holy Basil Plant",
    category: "Plants",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1598501235339-4d6d6e2eef29?auto=format&fit=crop&q=80&w=600",
    badge: "Sacred",
  },
  {
    id: 7,
    name: "Camphor Tablets (50 pcs)",
    category: "Samagri",
    price: 129,
    originalPrice: 179,
    rating: 4.6,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: 8,
    name: "Panchamrit Mix",
    category: "Prasad",
    price: 179,
    originalPrice: 249,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1544004940-02bfbaaa481a?auto=format&fit=crop&q=80&w=600",
    badge: "Pure",
  },
];

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 md:py-16">
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
              ✨ Handpicked for You
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
            >
              Featured Products
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="ghost" className="group text-primary hover:text-primary/80">
              View All Products
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-36 md:h-44 bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${wishlist.includes(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                      }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category */}
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>

                {/* Name */}
                <h3 className="font-medium text-sm md:text-base text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                </div>

                {/* Add to Cart */}
                <Button variant="outline" size="sm" className="w-full text-sm hover:bg-primary hover:text-primary-foreground group/btn">
                  <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-pulse-soft" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
