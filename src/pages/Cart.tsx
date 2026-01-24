import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  category: string;
}

const initialCartItems: CartItem[] = [
  { id: "1", name: "Pure Cow Ghee Diya Set", price: 149, originalPrice: 199, quantity: 2, image: "🪔", category: "Diyas" },
  { id: "c1", name: "Saraswati Puja Combo", price: 499, originalPrice: 699, quantity: 1, image: "📚", category: "Festival Combo" },
  { id: "4", name: "Fresh Marigold Garland", price: 79, originalPrice: 99, quantity: 3, image: "🌼", category: "Flowers" },
];

const suggestedAddons = [
  { id: "a1", name: "Premium Dhup Sticks", price: 249, image: "🧴" },
  { id: "a2", name: "Camphor Tablets", price: 129, image: "⚪" },
  { id: "a3", name: "Pandit Booking", price: 500, image: "👳" },
];

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "NAIVEDYA10") {
      setAppliedCoupon("NAIVEDYA10");
      toast({
        title: "Coupon Applied! 🎉",
        description: "You got 10% discount on your order.",
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive",
      });
    }
    setCouponCode("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const total = subtotal - discount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="font-heading text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Add some puja essentials to get started!</p>
            <Link to="/">
              <Button variant="festive" size="lg">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="font-heading text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border p-4 md:p-6"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-muted/50 to-card rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-4xl md:text-5xl">{item.image}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                      <h3 className="font-medium text-foreground mb-2 truncate">{item.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-primary">₹{item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-2 bg-muted rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-background rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-background rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Total & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">₹{item.price * item.quantity}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Suggested Add-ons */}
              <div className="bg-gradient-festive rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold mb-4">✨ You might also need</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedAddons.map((addon) => (
                    <div
                      key={addon.id}
                      className="bg-card rounded-xl p-4 flex items-center gap-3 border border-border"
                    >
                      <span className="text-3xl">{addon.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{addon.name}</p>
                        <p className="text-primary font-bold">₹{addon.price}</p>
                      </div>
                      <Button variant="outline" size="sm">Add</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h3 className="font-heading text-xl font-bold mb-6">Order Summary</h3>

                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-success text-sm mt-2 flex items-center gap-1">
                      ✓ {appliedCoupon} applied
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Try: NAIVEDYA10</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}</span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{500 - subtotal} more for free delivery
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">₹{total}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button variant="festive" size="lg" className="w-full h-14 text-lg">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                    <span>🔒 Secure Checkout</span>
                    <span>📦 Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
