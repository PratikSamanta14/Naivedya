import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Celebrate with Devotion",
    subtitle: "Complete Festival Collections",
    description: "Authentic samagri & exclusive combos for Durga Puja, Lakshmi Puja, and more.",
    cta: "Explore Festivals",
    link: "/category/festival-combos",
    image: "https://images.unsplash.com/photo-1601006830507-683a54a72d1f?q=80&w=2670&auto=format&fit=crop", // Durga Idol/Sacred Deity
    overlayColor: "bg-black/10",
  },
  {
    id: 2,
    title: "Divine Atmosphere",
    subtitle: "Premium Daily Essentials",
    description: "Pure ghee diyas, aromatic dhoop, and everything for your daily woship.",
    cta: "Shop Essentials",
    link: "/category/puja-samagri",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=2574&auto=format&fit=crop", // Sacred Aarti/Diya in Temple
    overlayColor: "bg-black/10",
  },
  {
    id: 3,
    title: "Fresh from the Farm",
    subtitle: "Sacred Flowers & Garlands",
    description: "Vibrant marigolds, lotus, and fresh bel patra delivered to your doorstep.",
    cta: "Order Flowers",
    link: "/category/flowers-garlands",
    image: "https://images.unsplash.com/photo-1596627685600-0588647008c2?q=80&w=2574&auto=format&fit=crop", // Vibrant Marigold/Lotus Flowers
    overlayColor: "bg-black/10",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Slightly slower for better readability
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative h-[500px] md:h-[600px] lg:h-[650px]">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Background Image with Zoom Effect */}
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient Overlay for Readability (Light Theme) */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent" />

                  {/* Content */}
                  <div className="relative container mx-auto px-4 h-full flex items-center justify-start text-left">
                    <div className="max-w-4xl pt-20 pl-4 md:pl-10">

                      {/* Subtitle with decorative lines */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 mb-4 md:mb-6"
                      >
                        <div className="h-[2px] w-8 md:w-16 bg-primary" />
                        <span className="text-sm md:text-lg font-bold tracking-[0.2em] uppercase text-primary">
                          {slide.subtitle}
                        </span>
                      </motion.div>

                      {/* Main Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 50 }}
                        className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-foreground drop-shadow-sm leading-tight"
                      >
                        {slide.title}
                      </motion.h1>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl font-medium leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>

                      {/* CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col sm:flex-row items-start gap-4"
                      >
                        <Button
                          variant="festive"
                          size="lg"
                          className="h-12 px-8 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300"
                          onClick={() => navigate(slide.link)}
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          {slide.cta}
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-12 px-8 text-lg border-primary text-primary hover:bg-primary hover:text-white backdrop-blur-sm"
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full border border-primary/20 bg-white/50 text-primary backdrop-blur-md hover:bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full border border-primary/20 bg-white/50 text-primary backdrop-blur-md hover:bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${index === currentSlide
                ? "w-10 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                : "w-2 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
