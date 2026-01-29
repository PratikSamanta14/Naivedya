import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";



const suggestedAddons = [
  { id: "a1", name: "Premium Dhup Sticks", price: 249, image: "🧴" },
  { id: "a2", name: "Camphor Tablets", price: 129, image: "⚪" },
  { id: "a3", name: "Pandit Booking", price: 500, image: "👳" },
];

const Cart = () => {
  const { toast } = useToast();
  const { items: cartItems, removeItem, updateQuantity, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border shadow-sm"
                >
                  <div className="text-4xl">{item.image}</div>

                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {item.selectedAddons.map((addon, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground flex items-center">
                            <span className="mr-1">+</span> {addon.name} (₹{addon.price})
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 text-primary font-bold">
                      ₹{(item.price + (item.selectedAddons?.reduce((acc, a) => acc + a.price, 0) || 0)) * item.quantity}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 bg-muted rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="p-2 hover:bg-background rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="p-2 hover:bg-background rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
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
