import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderConfirmation = () => {
  const [showDiya, setShowDiya] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDiya(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const orderDetails = {
    orderId: "NAI" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    items: [
      { name: "Pure Cow Ghee Diya Set", qty: 2, price: 298 },
      { name: "Saraswati Puja Combo", qty: 1, price: 499 },
      { name: "Fresh Marigold Garland", qty: 3, price: 237 },
    ],
    subtotal: 1034,
    discount: 103,
    delivery: 0,
    total: 931,
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
    deliverySlot: "9:00 AM - 11:00 AM",
    pandit: "Pandit Ramesh Bhattacharya",
    pujaDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              {/* Lit Diya Animation */}
              <div className="relative inline-block">
                <motion.div
                  animate={{ 
                    scale: showDiya ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-[8rem] md:text-[10rem]"
                >
                  🪔
                </motion.div>
                
                {/* Flame Glow */}
                {showDiya && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-20 h-20 bg-secondary/50 rounded-full blur-xl"
                  />
                )}
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-4 mb-2"
              >
                Order Confirmed!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground"
              >
                May your puja be blessed 🌸
              </motion.p>
            </motion.div>

            {/* Order Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Order ID</p>
                    <p className="font-heading text-xl font-bold">{orderDetails.orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90 mb-1">Order Date</p>
                    <p className="font-semibold">{orderDetails.date}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 border-b border-border">
                <h3 className="font-heading text-lg font-bold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                      </div>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{orderDetails.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-success">
                    <span>Discount</span>
                    <span>-₹{orderDetails.discount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-success">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total Paid</span>
                    <span className="text-primary">₹{orderDetails.total}</span>
                  </div>
                </div>
              </div>

              {/* Delivery & Puja Info */}
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading font-bold mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    Delivery Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Expected:</span> {orderDetails.deliveryDate}</p>
                    <p><span className="text-muted-foreground">Time Slot:</span> {orderDetails.deliverySlot}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-bold mb-3 flex items-center gap-2">
                    🪔 Puja Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Pandit:</span> {orderDetails.pandit}</p>
                    <p><span className="text-muted-foreground">Puja Date:</span> {orderDetails.pujaDate}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-muted/50 flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download Invoice
                </Button>
                <Link to="/" className="flex-1">
                  <Button variant="festive" className="w-full gap-2">
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              <p>A confirmation email has been sent to your registered email.</p>
              <p className="mt-2">For any queries, contact us at support@naivedya.com</p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
