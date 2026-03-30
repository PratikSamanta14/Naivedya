import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const combosData = [
  {
    id: "1",
    name: "Saraswati Puja",
    icon: "📚",
    items: ["Sindur", "Dhup", "Ghee Diya", "White Flowers", "Pushpanjali", "Prasad Box"],
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 245,
    description: "Complete Saraswati Puja combo with all traditional Bengali samagri. Includes authentic items sourced from verified vendors.",
    image: "🪷",
    significance: "Saraswati Puja is celebrated to honor Goddess Saraswati, the deity of knowledge, music, and arts. This festival holds immense importance in Bengali culture, especially for students seeking blessings for academic success.",
    includedItems: [
      { name: "Premium Sindur", quantity: "50g", essential: true },
      { name: "Pure Ghee Diya Set", quantity: "5 pcs", essential: true },
      { name: "Agarbatti Pack", quantity: "20 sticks", essential: true },
      { name: "White Lotus Flowers", quantity: "7 pcs", essential: true },
      { name: "Yellow Marigold Garland", quantity: "1 pc", essential: false },
      { name: "Prasad Container", quantity: "1 box", essential: false },
    ],
    addons: [
      { id: "a1", name: "Pandit Booking", price: 500, icon: "👳" },
      { id: "a2", name: "Extra Flower Garland", price: 79, icon: "💐" },
      { id: "a3", name: "Premium Sweets Box", price: 299, icon: "🍬" },
    ],
  },
  {
    id: "2",
    name: "Lakshmi Puja",
    icon: "🪔",
    items: ["Sindur", "Pushpanjali", "Ghee", "Alpana Colors", "Lotus", "Prasad"],
    price: 599,
    originalPrice: 899,
    rating: 4.9,
    reviews: 312,
    description: "Auspicious Lakshmi Puja combo for prosperity and wealth. All items are temple-grade and sourced from trusted vendors.",
    image: "🪙",
    significance: "Lakshmi Puja is performed to invoke the blessings of Goddess Lakshmi for wealth, prosperity, and good fortune. It is especially significant during Diwali and Kojagari Lakshmi Puja.",
    includedItems: [
      { name: "Kumkum Sindur", quantity: "100g", essential: true },
      { name: "Fresh Lotus Flowers", quantity: "5 pcs", essential: true },
      { name: "Alpana Color Set", quantity: "4 colors", essential: true },
      { name: "Silver Coin (Pure)", quantity: "1 pc", essential: true },
      { name: "Rice & Paddy Bundle", quantity: "500g", essential: false },
      { name: "Ghee Lamp Set", quantity: "7 pcs", essential: false },
    ],
    addons: [
      { id: "a1", name: "Pandit Booking", price: 500, icon: "👳" },
      { id: "a2", name: "Silver Lakshmi Idol", price: 999, icon: "🪙" },
      { id: "a3", name: "Dry Fruits Box", price: 499, icon: "🥜" },
    ],
  },
  {
    id: "3",
    name: "Durga Puja Mahalaya",
    icon: "🔱",
    items: ["Sindur", "Dhak", "Shankha", "Incense", "Flowers", "Complete Samagri"],
    price: 1299,
    originalPrice: 1799,
    rating: 5.0,
    reviews: 489,
    description: "The most comprehensive Durga Puja combo with all essential items for the grand celebration. Premium quality assured.",
    image: "🌺",
    significance: "Durga Puja is the biggest festival for Bengalis, celebrating the victory of Goddess Durga over the demon Mahishasura. Mahalaya marks the beginning of Devipaksha.",
    includedItems: [
      { name: "Complete Sindur Set", quantity: "200g", essential: true },
      { name: "Conch Shell (Shankha)", quantity: "1 pc", essential: true },
      { name: "Hibiscus Garland", quantity: "3 pcs", essential: true },
      { name: "Premium Dhup Set", quantity: "50 sticks", essential: true },
      { name: "Bilva Leaves", quantity: "108 pcs", essential: true },
      { name: "Complete Prasad Kit", quantity: "1 set", essential: false },
    ],
    addons: [
      { id: "a1", name: "Expert Pandit", price: 1000, icon: "👳" },
      { id: "a2", name: "Dhak Player", price: 1500, icon: "🥁" },
      { id: "a3", name: "Anjali Thali Set", price: 299, icon: "🍽️" },
    ],
  },
  {
    id: "4",
    name: "Vishwakarma Puja",
    icon: "🔧",
    items: ["Tools Puja", "Dhup", "Sindur", "Machine Tilak", "Flowers"],
    price: 449,
    originalPrice: 599,
    rating: 4.7,
    reviews: 178,
    description: "Special combo for Vishwakarma Puja to bless your tools, machines, and workplace with divine energy.",
    image: "⚙️",
    significance: "Vishwakarma Puja honors Lord Vishwakarma, the divine architect. Workers, craftsmen, and factory owners worship their tools and machinery on this day.",
    includedItems: [
      { name: "Industrial Sindur", quantity: "100g", essential: true },
      { name: "Machine Tilak Set", quantity: "5 pcs", essential: true },
      { name: "Premium Agarbatti", quantity: "30 sticks", essential: true },
      { name: "Yellow Flowers", quantity: "1 bunch", essential: true },
      { name: "Coconut", quantity: "1 pc", essential: false },
      { name: "Prasad Kit", quantity: "1 set", essential: false },
    ],
    addons: [
      { id: "a1", name: "Factory Pandit Visit", price: 800, icon: "👳" },
      { id: "a2", name: "Extra Flower Bunches", price: 150, icon: "💐" },
    ],
  },
  {
    id: "5",
    name: "Ganesh Puja",
    icon: "🐘",
    items: ["Modak", "Durva", "Sindur", "Red Flowers", "Coconut"],
    price: 399,
    originalPrice: 549,
    rating: 4.8,
    reviews: 234,
    description: "Complete Ganesh Puja essentials to invoke Lord Ganesha's blessings for new beginnings and obstacle removal.",
    image: "🍬",
    significance: "Ganesh Puja is performed to seek blessings from Lord Ganesha, the remover of obstacles. He is worshipped at the beginning of any auspicious activity.",
    includedItems: [
      { name: "Modak Pack", quantity: "11 pcs", essential: true },
      { name: "Durva Grass", quantity: "21 blades", essential: true },
      { name: "Red Sindur", quantity: "50g", essential: true },
      { name: "Red Hibiscus", quantity: "5 pcs", essential: true },
      { name: "Coconut", quantity: "1 pc", essential: false },
      { name: "Banana Bunch", quantity: "1 bunch", essential: false },
    ],
    addons: [
      { id: "a1", name: "Clay Ganesh Idol", price: 199, icon: "🐘" },
      { id: "a2", name: "Pandit Booking", price: 500, icon: "👳" },
    ],
  },
  {
    id: "6",
    name: "Kali Puja",
    icon: "🌙",
    items: ["Hibiscus", "Sindur", "Prasad", "Incense", "Ghee Lamps"],
    price: 749,
    originalPrice: 999,
    rating: 4.9,
    reviews: 356,
    description: "Authentic Kali Puja combo with all traditional items for the powerful worship of Goddess Kali.",
    image: "🌹",
    significance: "Kali Puja celebrates Goddess Kali, the fierce form of Durga. It is performed on Diwali night in Bengal and symbolizes the victory of good over evil.",
    includedItems: [
      { name: "Red Hibiscus", quantity: "108 pcs", essential: true },
      { name: "Sindur (Dark Red)", quantity: "100g", essential: true },
      { name: "Incense Set", quantity: "50 sticks", essential: true },
      { name: "Ghee Lamp Set", quantity: "11 pcs", essential: true },
      { name: "Black Sesame", quantity: "100g", essential: false },
      { name: "Night Puja Kit", quantity: "1 set", essential: false },
    ],
    addons: [
      { id: "a1", name: "Tantric Pandit", price: 1500, icon: "👳" },
      { id: "a2", name: "Extra Hibiscus Bundle", price: 199, icon: "🌺" },
    ],
  },
  {
    id: "7",
    name: "Kartik Puja",
    icon: "🦚",
    items: ["Sindur", "Flowers", "Prasad", "Peacock Feather", "Incense"],
    price: 349,
    originalPrice: 499,
    rating: 4.6,
    reviews: 145,
    description: "Complete essentials for Kartik Puja to honor Lord Kartikeya with traditional Bengali rituals.",
    image: "🌿",
    significance: "Kartik Puja worships Lord Kartikeya, the god of war and victory. He is the elder son of Lord Shiva and Goddess Parvati.",
    includedItems: [
      { name: "Sindur", quantity: "50g", essential: true },
      { name: "Peacock Feather", quantity: "5 pcs", essential: true },
      { name: "White Flowers", quantity: "1 bunch", essential: true },
      { name: "Premium Dhup", quantity: "20 sticks", essential: true },
      { name: "Fruits Basket", quantity: "1 set", essential: false },
    ],
    addons: [
      { id: "a1", name: "Pandit Booking", price: 500, icon: "👳" },
      { id: "a2", name: "Extra Peacock Feathers", price: 99, icon: "🦚" },
    ],
  },
  {
    id: "8",
    name: "Shiva Ratri",
    icon: "🌊",
    items: ["Bilva", "Milk", "Honey", "Water Pot", "Rudrakhsha"],
    price: 549,
    originalPrice: 749,
    rating: 4.9,
    reviews: 423,
    description: "Sacred Shiva Ratri combo with all essential items for the night-long worship of Lord Shiva.",
    image: "🔔",
    significance: "Maha Shivaratri is one of the most important Hindu festivals celebrating Lord Shiva. Devotees observe fasts and perform Abhishek throughout the night.",
    includedItems: [
      { name: "Bilva Leaves", quantity: "108 pcs", essential: true },
      { name: "Pure Honey", quantity: "250ml", essential: true },
      { name: "Ganga Jal", quantity: "500ml", essential: true },
      { name: "Milk (Pure)", quantity: "1 liter", essential: true },
      { name: "Rudrakhsha Mala", quantity: "1 pc", essential: false },
      { name: "Shiva Lingam Decor", quantity: "1 set", essential: false },
    ],
    addons: [
      { id: "a1", name: "Night Puja Pandit", price: 800, icon: "👳" },
      { id: "a2", name: "Brass Shiva Lingam", price: 599, icon: "🕉️" },
    ],
  },
];

const ComboDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const { addItem } = useCart();
  const combo = combosData.find((c) => c.id === id);

  if (!combo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Combo not found</h1>
          <Link to="/">
            <Button variant="festive">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const addonsTotal = combo.addons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  const totalPrice = combo.price * quantity + addonsTotal;

  const handleAddToCart = () => {
    const selectedAddonDetails = combo.addons
      .filter((addon) => selectedAddons.includes(addon.id))
      .map((addon) => ({ name: addon.name, price: addon.price }));

    addItem({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      originalPrice: combo.originalPrice,
      quantity: quantity,
      image: combo.icon,
      category: "Festival Combo",
      selectedAddons: selectedAddonDetails,
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${combo.name} combo has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl flex items-center justify-center sticky top-24">
                <span className="text-[12rem] md:text-[16rem]">{combo.icon}</span>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                  {Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}% OFF
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-background/90 backdrop-blur-sm rounded-full shadow-soft">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="font-semibold">{combo.rating}</span>
                  <span className="text-sm text-muted-foreground">({combo.reviews})</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                  Festival Combo
                </p>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {combo.name} Combo
                </h1>
                <p className="text-muted-foreground">{combo.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">₹{combo.price}</span>
                <span className="text-xl text-muted-foreground line-through">₹{combo.originalPrice}</span>
              </div>

              {/* Included Items */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  What's Included
                </h3>
                <div className="space-y-3">
                  {combo.includedItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Check className={`w-4 h-4 ${item.essential ? "text-success" : "text-muted-foreground"}`} />
                        <span className={item.essential ? "font-medium" : "text-muted-foreground"}>
                          {item.name}
                        </span>
                        {item.essential && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                            Essential
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-heading text-lg font-bold mb-4">
                  Add-ons (Optional)
                </h3>
                <div className="space-y-3">
                  {combo.addons.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedAddons.includes(addon.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{addon.icon}</span>
                        <span className="font-medium">{addon.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-primary">+₹{addon.price}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddons.includes(addon.id)
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                          }`}>
                          {selectedAddons.includes(addon.id) && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-4 bg-muted rounded-xl px-4 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  variant="festive"
                  size="lg"
                  className="flex-1 h-14 text-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{totalPrice}
                </Button>
              </div>

              {/* Significance */}
              <div className="bg-gradient-festive rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold mb-3">
                  ✨ Significance
                </h3>
                <p className="text-muted-foreground">{combo.significance}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComboDetail;
