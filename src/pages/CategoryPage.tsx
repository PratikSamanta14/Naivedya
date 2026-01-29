import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Heart, Filter, Grid3X3, List, ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const categoryProducts: Record<string, Array<{
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  description: string;
  category: string;
  pujaUsage: string[];
  inStock: boolean;
}>> = {
  "puja-samagri": [
    { id: "ps1", name: "Pure Cow Ghee Diya Set (10 pcs)", price: 149, originalPrice: 199, rating: 4.9, reviews: 245, image: "🪔", badge: "Bestseller", description: "Traditional earthen diyas for daily puja", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "Lakshmi Puja", "Diwali"], inStock: true },
    { id: "ps2", name: "Authentic Bengali Sindur (50g)", price: 99, originalPrice: 149, rating: 4.8, reviews: 189, image: "🔴", badge: "Traditional", description: "Pure vermillion sindur for married women", category: "Puja Powders & Sacred Items", pujaUsage: ["Daily Puja", "Durga Puja", "Kali Puja"], inStock: true },
    { id: "ps3", name: "Premium Dhoop Sticks (100 pcs)", price: 249, originalPrice: 349, rating: 4.7, reviews: 320, image: "🧴", badge: null, description: "Aromatic dhoop sticks for spiritual atmosphere", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps4", name: "Camphor Tablets (50 pcs)", price: 129, originalPrice: 179, rating: 4.6, reviews: 198, image: "⚪", badge: null, description: "Pure camphor for aarti", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps5", name: "Cotton Wicks (100 pcs)", price: 49, originalPrice: 79, rating: 4.9, reviews: 456, image: "🧵", badge: "Best Value", description: "Handmade cotton wicks for diyas", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps6", name: "Kumkum Powder (100g)", price: 89, originalPrice: 129, rating: 4.8, reviews: 234, image: "🔴", badge: null, description: "Natural kumkum for tilak and puja", category: "Puja Powders & Sacred Items", pujaUsage: ["Daily Puja", "Lakshmi Puja", "Saraswati Puja"], inStock: true },
    { id: "ps7", name: "Haldi Powder (200g)", price: 79, originalPrice: 109, rating: 4.7, reviews: 178, image: "🟡", badge: null, description: "Pure turmeric powder for puja rituals", category: "Puja Powders & Sacred Items", pujaUsage: ["Marriage Ceremonies", "Ganesh Puja"], inStock: true },
    { id: "ps8", name: "Chandan Powder (50g)", price: 199, originalPrice: 299, rating: 4.9, reviews: 312, image: "🟤", badge: "Premium", description: "Authentic sandalwood powder", category: "Puja Powders & Sacred Items", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps9", name: "Fresh Marigold Flowers (1kg)", price: 79, originalPrice: 99, rating: 4.9, reviews: 412, image: "🌼", badge: "Fresh Daily", description: "Farm-fresh marigold for decoration", category: "Flowers & Natural Offerings", pujaUsage: ["Durga Puja", "Lakshmi Puja", "All Pujas"], inStock: true },
    { id: "ps10", name: "Tulsi Leaves (Fresh)", price: 29, originalPrice: 49, rating: 4.8, reviews: 267, image: "🌿", badge: null, description: "Sacred tulsi leaves for offerings", category: "Flowers & Natural Offerings", pujaUsage: ["Daily Puja", "Vishnu Puja"], inStock: true },
    { id: "ps11", name: "Bel Patra (25 leaves)", price: 39, originalPrice: 59, rating: 4.7, reviews: 189, image: "🍃", badge: null, description: "Sacred bel leaves for Shiva puja", category: "Flowers & Natural Offerings", pujaUsage: ["Shiva Puja", "Mahashivratri"], inStock: true },
    { id: "ps12", name: "Coconut (Nariyal)", price: 49, originalPrice: 69, rating: 4.9, reviews: 345, image: "🥥", badge: null, description: "Fresh coconut for puja offerings", category: "Fruits & Dry Items", pujaUsage: ["All Pujas", "Ganesh Puja"], inStock: true },
    { id: "ps13", name: "Supari (Betel Nut) 100g", price: 89, originalPrice: 119, rating: 4.6, reviews: 156, image: "🟤", badge: null, description: "Premium betel nuts for puja", category: "Fruits & Dry Items", pujaUsage: ["Marriage Ceremonies", "All Pujas"], inStock: true },
    { id: "ps14", name: "Pure Honey (250ml)", price: 199, originalPrice: 279, rating: 4.8, reviews: 234, image: "🍯", badge: "Pure", description: "Natural honey for prasad", category: "Fruits & Dry Items", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps15", name: "Brass Puja Thali (8 inch)", price: 299, originalPrice: 449, rating: 4.9, reviews: 178, image: "🍽️", badge: "Handcrafted", description: "Traditional brass thali for aarti", category: "Puja Accessories", pujaUsage: ["All Pujas"], inStock: true },
    { id: "ps16", name: "Puja Bell (Brass)", price: 179, originalPrice: 249, rating: 4.8, reviews: 234, image: "🔔", badge: null, description: "Sacred bell for puja rituals", category: "Puja Accessories", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps17", name: "Kalash (Copper)", price: 599, originalPrice: 899, rating: 4.9, reviews: 156, image: "🏺", badge: "Premium", description: "Authentic copper kalash for rituals", category: "Puja Accessories", pujaUsage: ["Lakshmi Puja", "Durga Puja", "Marriage"], inStock: true },
    { id: "ps18", name: "Sacred Moli Thread (Red)", price: 29, originalPrice: 49, rating: 4.7, reviews: 345, image: "🧵", badge: null, description: "Red sacred thread for wrist tying", category: "Sacred Threads & Cloth", pujaUsage: ["All Pujas", "Raksha Bandhan"], inStock: true },
    { id: "ps19", name: "Janeu (Sacred Thread)", price: 49, originalPrice: 79, rating: 4.8, reviews: 189, image: "⚪", badge: null, description: "Sacred thread for Brahmin rituals", category: "Sacred Threads & Cloth", pujaUsage: ["Thread Ceremony", "Daily Puja"], inStock: true },
    { id: "ps20", name: "Puja Cloth (Red & Gold)", price: 149, originalPrice: 199, rating: 4.9, reviews: 234, image: "🧣", badge: null, description: "Beautiful cloth for covering puja items", category: "Sacred Threads & Cloth", pujaUsage: ["All Pujas"], inStock: true },
    { id: "ps21", name: "Agarbatti (Incense Sticks) 100pcs", price: 99, originalPrice: 149, rating: 4.8, reviews: 456, image: "🪔", badge: "Bestseller", description: "Fragrant incense sticks for daily puja", category: "Daily Puja Essentials", pujaUsage: ["Daily Puja", "All Pujas"], inStock: true },
    { id: "ps22", name: "Akshat (Rice Grains) 500g", price: 59, originalPrice: 89, rating: 4.7, reviews: 234, image: "🌾", badge: null, description: "Unbroken rice grains for offerings", category: "Puja Powders & Sacred Items", pujaUsage: ["All Pujas"], inStock: true },
    { id: "ps23", name: "Durva Grass (Fresh)", price: 39, originalPrice: 59, rating: 4.8, reviews: 178, image: "🌱", badge: "Fresh", description: "Sacred grass for Ganesh puja", category: "Flowers & Natural Offerings", pujaUsage: ["Ganesh Puja", "Ganesh Chaturthi"], inStock: true },
    { id: "ps24", name: "Panchapatra Set (Brass)", price: 249, originalPrice: 349, rating: 4.9, reviews: 156, image: "🥄", badge: null, description: "Traditional vessel set for puja", category: "Puja Accessories", pujaUsage: ["All Pujas"], inStock: true },
  ],
  "festival-combos": [
    { id: "c1", name: "Saraswati Puja Combo", price: 499, originalPrice: 699, rating: 4.8, reviews: 245, image: "📚", badge: "Popular", description: "Complete combo for Saraswati Puja", category: "Festival Combo", pujaUsage: ["Saraswati Puja"], inStock: true },
    { id: "c2", name: "Lakshmi Puja Combo", price: 599, originalPrice: 899, rating: 4.9, reviews: 312, image: "🪔", badge: "Bestseller", description: "Everything needed for Lakshmi Puja", category: "Festival Combo", pujaUsage: ["Lakshmi Puja"], inStock: true },
    { id: "c3", name: "Durga Puja Mahalaya", price: 1299, originalPrice: 1799, rating: 5.0, reviews: 489, image: "🔱", badge: "Premium", description: "Premium Durga Puja package", category: "Festival Combo", pujaUsage: ["Durga Puja"], inStock: true },
    { id: "c4", name: "Kali Puja Combo", price: 749, originalPrice: 999, rating: 4.9, reviews: 356, image: "🌙", badge: null, description: "Traditional Kali Puja items", category: "Festival Combo", pujaUsage: ["Kali Puja"], inStock: true },
  ],
  "flowers-garlands": [
    { id: "4", name: "Fresh Marigold Garland", price: 79, originalPrice: 99, rating: 4.9, reviews: 412, image: "🌼", badge: "Fresh Daily", description: "Farm-fresh marigold garlands", category: "Flowers", pujaUsage: ["All Pujas"], inStock: true },
    { id: "f1", name: "Red Rose Garland", price: 149, originalPrice: 199, rating: 4.8, reviews: 267, image: "🌹", badge: "Premium", description: "Beautiful red rose garlands", category: "Flowers", pujaUsage: ["All Pujas"], inStock: true },
    { id: "f2", name: "Mixed Flower Bouquet", price: 199, originalPrice: 299, rating: 4.7, reviews: 189, image: "💐", badge: null, description: "Assorted fresh flower bouquet", category: "Flowers", pujaUsage: ["All Pujas"], inStock: true },
    { id: "f3", name: "Lotus Flowers (5 pcs)", price: 129, originalPrice: 179, rating: 4.9, reviews: 345, image: "🪷", badge: "Sacred", description: "Sacred lotus for offerings", category: "Flowers", pujaUsage: ["Lakshmi Puja", "Saraswati Puja"], inStock: true },
  ],
  "book-pandit": [
    { id: "p1", name: "Bengali Puja Pandit", price: 500, originalPrice: 700, rating: 4.9, reviews: 342, image: "👳", badge: "Top Rated", description: "Experienced Bengali puja pandit", category: "Pandit Service", pujaUsage: ["All Pujas"], inStock: true },
    { id: "p2", name: "Festival Puja Specialist", price: 400, originalPrice: 600, rating: 4.8, reviews: 256, image: "🧔", badge: null, description: "Specializes in festival pujas", category: "Pandit Service", pujaUsage: ["Festival Pujas"], inStock: true },
    { id: "p3", name: "Marriage Ceremony Expert", price: 800, originalPrice: 1200, rating: 5.0, reviews: 489, image: "👨‍🦳", badge: "Premium", description: "Expert in marriage ceremonies", category: "Pandit Service", pujaUsage: ["Marriage"], inStock: true },
  ],
  "prasad-sweets": [
    { id: "s1", name: "Sandesh Box (12 pcs)", price: 299, originalPrice: 399, rating: 4.8, reviews: 234, image: "🍬", badge: "Fresh", description: "Traditional Bengali sandesh", category: "Sweets", pujaUsage: ["All Pujas"], inStock: true },
    { id: "s2", name: "Rasgulla Pack", price: 199, originalPrice: 279, rating: 4.9, reviews: 456, image: "⚪", badge: "Bestseller", description: "Soft and sweet rasgullas", category: "Sweets", pujaUsage: ["All Pujas"], inStock: true },
    { id: "s3", name: "Mishti Doi", price: 149, originalPrice: 199, rating: 4.7, reviews: 189, image: "🥛", badge: null, description: "Sweet yogurt dessert", category: "Sweets", pujaUsage: ["All Pujas"], inStock: true },
    { id: "8", name: "Panchamrit Mix", price: 179, originalPrice: 249, rating: 4.8, reviews: 234, image: "🥛", badge: "Pure", description: "Sacred panchamrit mixture", category: "Prasad", pujaUsage: ["All Pujas"], inStock: true },
  ],
  "idols-murtis": [
    { id: "m1", name: "Ganesh Murti (Brass)", price: 999, originalPrice: 1499, rating: 4.9, reviews: 178, image: "🐘", badge: "Handcrafted", description: "Handcrafted brass Ganesh idol", category: "Idols", pujaUsage: ["Ganesh Puja"], inStock: true },
    { id: "m2", name: "Lakshmi Statue (Clay)", price: 599, originalPrice: 899, rating: 4.8, reviews: 234, image: "🪔", badge: null, description: "Traditional clay Lakshmi statue", category: "Idols", pujaUsage: ["Lakshmi Puja"], inStock: true },
    { id: "m3", name: "Saraswati Idol", price: 799, originalPrice: 1199, rating: 4.9, reviews: 156, image: "📚", badge: "Premium", description: "Beautiful Saraswati idol", category: "Idols", pujaUsage: ["Saraswati Puja"], inStock: true },
  ],
  "utensil-rentals": [
    { id: "u1", name: "Complete Puja Thali Set", price: 199, originalPrice: 299, rating: 4.7, reviews: 145, image: "🍽️", badge: "Rental", description: "Complete thali set for rent", category: "Rentals", pujaUsage: ["All Pujas"], inStock: true },
    { id: "u2", name: "Hawan Kund Set", price: 299, originalPrice: 499, rating: 4.8, reviews: 89, image: "🔥", badge: null, description: "Hawan kund set for rent", category: "Rentals", pujaUsage: ["Hawan"], inStock: true },
    { id: "5", name: "Brass Puja Thali Set", price: 599, originalPrice: 899, rating: 4.8, reviews: 156, image: "🍽️", badge: "Buy", description: "Premium brass thali to buy", category: "Utensils", pujaUsage: ["All Pujas"], inStock: true },
  ],
  "puja-knowledge": [
    { id: "k1", name: "Bengali Puja Guide Book", price: 199, originalPrice: 349, rating: 4.9, reviews: 567, image: "📖", badge: "Bestseller", description: "Comprehensive puja guide", category: "Books", pujaUsage: ["All Pujas"], inStock: true },
    { id: "k2", name: "Mantra Collection Audio", price: 149, originalPrice: 249, rating: 4.8, reviews: 345, image: "🎵", badge: "Digital", description: "Audio collection of mantras", category: "Digital", pujaUsage: ["All Pujas"], inStock: true },
    { id: "k3", name: "Puja Vidhi Cards Set", price: 99, originalPrice: 149, rating: 4.7, reviews: 234, image: "📋", badge: null, description: "Step-by-step puja cards", category: "Books", pujaUsage: ["All Pujas"], inStock: true },
  ],
};

const categoryInfo: Record<string, { name: string; icon: string; description: string; subtitle: string }> = {
  "puja-samagri": { name: "Puja Samagri", icon: "🪔", description: "Individual Items for Every Puja", subtitle: "All essential puja items, sold individually" },
  "festival-combos": { name: "Festival Combos", icon: "🎁", description: "Ready-to-use combo packs for all Bengali festivals", subtitle: "Complete festival packages" },
  "flowers-garlands": { name: "Flowers & Garlands", icon: "💐", description: "Fresh flowers and garlands delivered daily", subtitle: "Farm-fresh daily" },
  "book-pandit": { name: "Book Pandit", icon: "👳", description: "Verified pandits for all ceremonies", subtitle: "Experienced pandits" },
  "prasad-sweets": { name: "Prasad & Sweets", icon: "🍬", description: "Authentic Bengali sweets and prasad", subtitle: "Traditional sweets" },
  "idols-murtis": { name: "Idols & Murtis", icon: "🙏", description: "Handcrafted idols and murtis", subtitle: "Sacred idols" },
  "utensil-rentals": { name: "Utensil Rentals", icon: "🍲", description: "Puja utensils for rent and purchase", subtitle: "Rent or buy" },
  "puja-knowledge": { name: "Puja Knowledge", icon: "📖", description: "Learn about Bengali puja traditions", subtitle: "Guides and resources" },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const category = slug ? categoryInfo[slug] : null;
  const products = slug ? categoryProducts[slug] || [] : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Category not found</h1>
          <Link to="/">
            <Button variant="festive">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
      category: product.category,
    });
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews; // popular
  });

  // Filter products
  const filteredProducts = sortedProducts.filter((product) => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

    // Rating filter
    if (selectedRatings.length > 0 && !selectedRatings.some((r) => product.rating >= r)) return false;

    // Category-specific filters
    if (selectedFilters["Item Category"]?.length > 0 && slug === "puja-samagri") {
      if (!selectedFilters["Item Category"].includes(product.category)) return false;
    }

    if (selectedFilters["Puja Usage"]?.length > 0 && slug === "puja-samagri") {
      const hasMatchingUsage = product.pujaUsage.some(puja =>
        selectedFilters["Puja Usage"].includes(puja)
      );
      if (!hasMatchingUsage) return false;
    }

    if (selectedFilters["Availability"]?.length > 0 && slug === "puja-samagri") {
      if (selectedFilters["Availability"].includes("In Stock") && !product.inStock) return false;
      if (selectedFilters["Availability"].includes("Same-Day Delivery") && !product.inStock) return false; // Simplified for demo
    }

    return true;
  });

  const handleAddBundleToCart = () => {
    const bundleProducts = filteredProducts.slice(0, 3);
    bundleProducts.forEach(product => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        image: product.image,
        category: product.category,
      });
    });

    toast({
      title: "Bundle Added! 🛍️",
      description: `${bundleProducts.length} items added to your cart.`,
    });
  };

  // Get category-specific filters
  const getCategoryFilters = () => {
    switch (slug) {
      case "puja-samagri":
        return {
          "Item Category": [
            "Daily Puja Essentials",
            "Puja Powders & Sacred Items",
            "Flowers & Natural Offerings",
            "Fruits & Dry Items",
            "Puja Accessories",
            "Sacred Threads & Cloth"
          ],
          "Puja Usage": [
            "Daily Puja",
            "Lakshmi Puja",
            "Saraswati Puja",
            "Durga Puja",
            "Ganesh Puja",
            "Kali Puja",
            "All Pujas"
          ],
          "Availability": ["In Stock", "Same-Day Delivery"]
        };
      case "festival-combos":
        return {
          "Festival": ["Durga Puja", "Kali Puja", "Saraswati Puja", "Lakshmi Puja"],
          "Service": ["With Pandit", "Without Pandit"]
        };
      case "flowers-garlands":
        return {
          "Flower Type": ["Marigold", "Rose", "Lotus", "Mixed"],
          "Freshness": ["Today's Fresh", "Premium", "Standard"]
        };
      case "book-pandit":
        return {
          "Location": ["Kolkata", "Howrah", "Salt Lake", "Dum Dum"],
          "Experience": ["5+ years", "10+ years", "15+ years"],
          "Specialization": ["Bengali Puja", "Festival", "Marriage"]
        };
      case "prasad-sweets":
        return {
          "Type": ["Sandesh", "Rasgulla", "Mishti Doi", "Mixed"],
          "Shelf Life": ["Same Day", "2-3 Days", "1 Week"]
        };
      case "utensil-rentals":
        return {
          "Duration": ["1 Day", "3 Days", "1 Week"],
          "Deposit": ["Required", "Not Required"]
        };
      default:
        return {};
    }
  };

  const categoryFilters = getCategoryFilters();

  // Related products (from other categories)
  const relatedProducts = Object.values(categoryProducts).flat().filter(p => !products.find(prod => prod.id === p.id)).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-4 mb-2">
              <span className="text-6xl">{category.icon}</span>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {category.name} – {category.description}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">{category.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.aside
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="hidden lg:block w-64 flex-shrink-0"
                >
                  <div className="sticky top-24 space-y-6">
                    {/* Filter Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setPriceRange([0, 2000]);
                          setSelectedRatings([]);
                          setSelectedFilters({});
                        }}
                      >
                        Clear All
                      </Button>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3 pb-6 border-b border-border">
                      <h4 className="font-semibold text-sm">Price Range</h4>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={2000}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-3 pb-6 border-b border-border">
                      <h4 className="font-semibold text-sm">Customer Rating</h4>
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRatings([...selectedRatings, rating]);
                              } else {
                                setSelectedRatings(selectedRatings.filter((r) => r !== rating));
                              }
                            }}
                          />
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < rating ? "fill-secondary text-secondary" : "text-gray-300"
                                  }`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">& Up</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Category-specific Filters */}
                    {Object.entries(categoryFilters).map(([filterName, options]) => (
                      <div key={filterName} className="space-y-3 pb-6 border-b border-border">
                        <h4 className="font-semibold text-sm">{filterName}</h4>
                        {options.map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              checked={selectedFilters[filterName]?.includes(option)}
                              onCheckedChange={(checked) => {
                                const current = selectedFilters[filterName] || [];
                                if (checked) {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    [filterName]: [...current, option]
                                  });
                                } else {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    [filterName]: current.filter((o) => o !== option)
                                  });
                                }
                              }}
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Right Content Area */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredProducts.length}</span> of {products.length} products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-background shadow-sm" : ""}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`grid gap-4 md:gap-6 mb-12 ${viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
                }`}>
                {filteredProducts.map((product, index) => {
                  const isPanditService = slug === "book-pandit" || product.category === "Pandit Service";

                  return isPanditService ? (
                    <Link to={`/pandit/${product.id}`} key={product.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer ${viewMode === "list" ? "flex" : ""
                          }`}
                      >
                        {/* Image */}
                        <div className={`relative bg-gradient-to-br from-muted/50 to-card flex items-center justify-center ${viewMode === "list" ? "w-40 h-40 flex-shrink-0" : "h-36 md:h-44"
                          }`}>
                          <span className={`group-hover:scale-110 transition-transform duration-300 ${viewMode === "list" ? "text-5xl" : "text-5xl md:text-6xl"
                            }`}>
                            {product.image}
                          </span>

                          {product.badge && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                              {product.badge}
                            </div>
                          )}

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                            />
                          </button>
                        </div>

                        {/* Content */}
                        <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                          <h3 className="font-medium text-sm md:text-base text-foreground mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-3 fill-secondary text-secondary" />
                            <span className="text-xs font-medium">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">₹{product.price}</span>
                            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                            <span className="text-xs font-semibold text-green-600">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </span>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-sm hover:bg-primary hover:text-primary-foreground"
                          >
                            View Profile
                          </Button>
                        </div>
                      </motion.div>
                    </Link>
                  ) : (
                    <Link to={`/product/${product.id}`} key={product.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer ${viewMode === "list" ? "flex" : ""
                          }`}
                      >
                        {/* Image */}
                        <div className={`relative bg-gradient-to-br from-muted/50 to-card flex items-center justify-center ${viewMode === "list" ? "w-40 h-40 flex-shrink-0" : "h-36 md:h-44"
                          }`}>
                          <span className={`group-hover:scale-110 transition-transform duration-300 ${viewMode === "list" ? "text-5xl" : "text-5xl md:text-6xl"
                            }`}>
                            {product.image}
                          </span>

                          {product.badge && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                              {product.badge}
                            </div>
                          )}

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                            />
                          </button>
                        </div>

                        {/* Content */}
                        <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                          <h3 className="font-medium text-sm md:text-base text-foreground mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                            <span className="text-xs font-medium">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">₹{product.price}</span>
                            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                            <span className="text-xs font-semibold text-green-600">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </span>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-sm hover:bg-primary hover:text-primary-foreground"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </motion.div>
                    </Link>
                  )
                })}
              </div>

              {/* Related Items Section */}
              {relatedProducts.length > 0 && (
                <div className="mt-16 space-y-6">
                  <h2 className="font-heading text-2xl font-bold text-foreground">Related Items You May Like</h2>
                  <div className="overflow-x-auto pb-4 -mx-4 px-4">
                    <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
                      {relatedProducts.map((product) => (
                        <Link to={product.category === "Pandit Service" ? `/pandit/${product.id}` : `/product/${product.id}`} key={product.id}>
                          <motion.div
                            whileHover={{ y: -8 }}
                            className="w-48 flex-shrink-0 bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer"
                          >
                            <div className="relative bg-gradient-to-br from-muted/50 to-card h-32 flex items-center justify-center">
                              <span className="text-4xl">{product.image}</span>
                              {product.badge && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                                  {product.badge}
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-sm text-foreground mb-2 line-clamp-2 h-10">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-1 mb-2">
                                <Star className="w-3 h-3 fill-secondary text-secondary" />
                                <span className="text-xs font-medium">{product.rating}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-primary">₹{product.price}</span>
                                <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Frequently Bought Together */}
              {filteredProducts.length >= 2 && (
                <div className="mt-12 space-y-6 bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-heading text-2xl font-bold text-foreground">Frequently Bought Together</h2>
                  <div className="flex flex-wrap items-center gap-4">
                    {filteredProducts.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-4">
                        {index > 0 && <span className="text-2xl text-muted-foreground">+</span>}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-24 h-24 bg-gradient-to-br from-muted/50 to-card rounded-lg flex items-center justify-center">
                            <span className="text-3xl">{product.image}</span>
                          </div>
                          <span className="text-xs text-center line-clamp-2 max-w-24">{product.name}</span>
                          <span className="text-sm font-bold text-primary">₹{product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bundle Price</p>
                      <p className="text-2xl font-bold text-primary">
                        ₹{filteredProducts.slice(0, 3).reduce((sum, p) => sum + p.price, 0)}
                      </p>
                    </div>
                    <Button variant="festive" size="lg" onClick={handleAddBundleToCart}>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add All to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
