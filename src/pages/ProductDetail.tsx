import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Award, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const productDetails = {
  "ps1": {
    id: "ps1",
    name: "Pure Cow Ghee Diya Set (10 pcs)",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviews: 245,
    image: "🪔",
    badge: "Bestseller",
    description: "Traditional earthen diyas for daily puja",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "Lakshmi Puja", "Diwali"],
    inStock: true,
    images: ["🪔", "🪔", "🪔", "🪔"],
    highlights: [
      "Made from pure clay",
      "Perfect for ghee lighting",
      "Traditional shape and size",
      "Durable and reusable"
    ],
    usage: [
      "Used during daily aarti",
      "Essential for Lakshmi Puja",
      "Signifies victory of light over darkness",
      "Creates positive energy in home"
    ],
    specifications: {
      "Quantity": "10 pieces",
      "Material": "Earthen clay",
      "Size": "2.5 inches diameter",
      "Weight": "150g",
      "Origin": "Varanasi"
    }
  },
  "ps2": {
    id: "ps2",
    name: "Authentic Bengali Sindur (50g)",
    price: 99,
    originalPrice: 149,
    rating: 4.8,
    reviews: 189,
    image: "🔴",
    badge: "Traditional",
    description: "Pure vermillion sindur for married women",
    category: "Puja Powders & Sacred Items",
    pujaUsage: ["Daily Puja", "Durga Puja", "Kali Puja"],
    inStock: true,
    images: ["🔴", "🔴", "🔴", "🔴"],
    highlights: [
      "Made from pure ingredients",
      "Traditionally prepared",
      "Long lasting color",
      "Safe for skin"
    ],
    usage: [
      "Applied by married women on forehead",
      "Signifies marital status",
      "Used in religious ceremonies",
      "Brings good fortune"
    ],
    specifications: {
      "Weight": "50g",
      "Ingredients": "Turmeric, lime, camphor",
      "Packaging": "Airtight container",
      "Shelf Life": "2 years"
    }
  },
  "ps3": {
    id: "ps3",
    name: "Premium Dhoop Sticks (100 pcs)",
    price: 249,
    originalPrice: 349,
    rating: 4.7,
    reviews: 320,
    image: "🧴",
    badge: null,
    description: "Aromatic dhoop sticks for spiritual atmosphere",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🧴", "🧴", "🧴", "🧴"],
    highlights: [
      "Natural aromatic blend",
      "Long burning time",
      "Creates peaceful ambiance",
      "Smoke-free formula"
    ],
    usage: [
      "Burn during daily prayers",
      "Purifies the environment",
      "Enhances meditation",
      "Repels negative energy"
    ],
    specifications: {
      "Quantity": "100 pieces",
      "Length": "15cm",
      "Burning Time": "30-40 minutes",
      "Ingredients": "Sandalwood, herbs"
    }
  },
  "ps4": {
    id: "ps4",
    name: "Camphor Tablets (50 pcs)",
    price: 129,
    originalPrice: 179,
    rating: 4.6,
    reviews: 198,
    image: "⚪",
    badge: null,
    description: "Pure camphor for aarti",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["⚪", "⚪", "⚪", "⚪"],
    highlights: [
      "Made from pure camphor",
      "Clean burning",
      "Strong fragrance",
      "Traditional offering"
    ],
    usage: [
      "Used during evening aarti",
      "Creates divine atmosphere",
      "Signifies surrender to God",
      "Purifies air naturally"
    ],
    specifications: {
      "Quantity": "50 tablets",
      "Weight": "50g",
      "Diameter": "1cm",
      "Material": "Pure camphor"
    }
  },
  "ps5": {
    id: "ps5",
    name: "Cotton Wicks (100 pcs)",
    price: 49,
    originalPrice: 79,
    rating: 4.9,
    reviews: 456,
    image: "🧵",
    badge: "Best Value",
    description: "Handmade cotton wicks for diyas",
    category: "Daily Puja Essentials",
    pujaUsage: ["Daily Puja", "All Pujas"],
    inStock: true,
    images: ["🧵", "🧵", "🧵", "🧵"],
    highlights: [
      "100% pure cotton",
      "Even burning",
      "Long lasting",
      "Handmade quality"
    ],
    usage: [
      "For lighting diyas with ghee/oil",
      "Essential for daily aarti",
      "Creates bright flame",
      "Used in all Hindu rituals"
    ],
    specifications: {
      "Quantity": "100 pieces",
      "Length": "15cm",
      "Material": "Pure cotton",
      "Thickness": "Medium"
    }
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const product = productDetails[id as keyof typeof productDetails];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/category/puja-samagri">
            <Button variant="festive">Back to Puja Samagri</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    toast({
      title: wishlist ? "Removed from Wishlist" : "Added to Wishlist!",
      description: `${product.name} ${wishlist ? 'removed' : 'added'} to your wishlist.`,
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to Checkout",
      description: "Processing your order for " + product.name,
    });
    // In a real app, this would redirect to checkout
  };

  // Get related products (same category, different items)
  const relatedProducts = Object.values(productDetails)
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/category/puja-samagri" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Puja Samagri
          </Link>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-card rounded-2xl flex items-center justify-center">
                <span className="text-9xl">{product.images[selectedImage]}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gradient-to-br from-muted/50 to-card rounded-xl flex items-center justify-center ${
                      selectedImage === idx ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <span className="text-2xl">{img}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-secondary text-secondary" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    {product.badge && (
                      <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={toggleWishlist}
                  className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                <span className="text-lg font-semibold text-green-600">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              {/* Puja Usage Tags */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-2">Used in Pujas:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.pujaUsage.map((usage, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                      {usage}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {product.inStock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="festive" 
                  size="lg"
                  onClick={handleBuyNow}
                  className="flex items-center gap-2"
                >
                  Buy Now
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <Truck className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">Within 2-3 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Quality Assured</p>
                    <p className="text-xs text-muted-foreground">Authentic materials</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">7 days return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Trusted Brand</p>
                    <p className="text-xs text-muted-foreground">100% authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12 border-b border-border">
            <div className="flex gap-6">
              <button className="pb-3 font-semibold text-primary border-b-2 border-primary">
                Description
              </button>
              <button className="pb-3 text-muted-foreground hover:text-foreground">
                Specifications
              </button>
              <button className="pb-3 text-muted-foreground hover:text-foreground">
                Reviews
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="py-8">
            <h2 className="font-heading text-xl font-bold mb-4">About this Item</h2>
            <div className="prose prose-sm max-w-none">
              <p className="mb-4 text-muted-foreground">{product.description}</p>
              
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc list-inside mb-4">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-muted-foreground">{highlight}</li>
                ))}
              </ul>
              
              <h3 className="font-semibold mb-2">Usage in Puja</h3>
              <ul className="list-disc list-inside">
                {product.usage.map((usage, idx) => (
                  <li key={idx} className="text-muted-foreground">{usage}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specifications */}
          <div className="py-8 border-t border-border">
            <h2 className="font-heading text-xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div className="py-12 border-t border-border">
            <h2 className="font-heading text-2xl font-bold mb-6">Frequently Bought Together</h2>
            <div className="flex flex-wrap items-center gap-4">
              {relatedProducts.map((related, index) => (
                <div key={related.id} className="flex items-center gap-4">
                  {index > 0 && <span className="text-2xl text-muted-foreground">+</span>}
                  <Link to={`/product/${related.id}`} className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-gradient-to-br from-muted/50 to-card rounded-lg flex items-center justify-center">
                      <span className="text-3xl">{related.image}</span>
                    </div>
                    <span className="text-xs text-center line-clamp-2 max-w-24">{related.name.split(' ')[0]}</span>
                    <span className="text-sm font-bold text-primary">₹{related.price}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Related Items */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Related Items</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((related) => (
                  <Link to={`/product/${related.id}`} key={related.id}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
                    >
                      <div className="relative bg-gradient-to-br from-muted/50 to-card h-32 flex items-center justify-center">
                        <span className="text-4xl">{related.image}</span>
                        {related.badge && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                            {related.badge}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                          {related.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <span className="text-xs font-medium">{related.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">₹{related.price}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{related.originalPrice}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;