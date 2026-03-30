import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, CreditCard, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import PaymentForm from "@/components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentResult } from "@/lib/payment";
import { ordersAPI } from "@/lib/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Kolkata",
    pincode: "",
    pujaDate: "",
    festival: "Saraswati Puja",
    deliverySlot: "",
    paymentMethod: "cod",
  });

  const steps = [
    { id: 1, title: "Address", icon: MapPin },
    { id: 2, title: "Occasion", icon: Calendar },
    { id: 3, title: "Delivery", icon: Clock },
    { id: 4, title: "Payment", icon: CreditCard },
  ];

  const deliverySlots = [
    "7:00 AM - 9:00 AM",
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  const festivals = [
    "Saraswati Puja",
    "Lakshmi Puja",
    "Durga Puja",
    "Kali Puja",
    "Vishwakarma Puja",
    "Ganesh Puja",
    "Shiva Ratri",
    "Other Occasion",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const { items: cartItems, subtotal, clearCart } = useCart();

  const discount = Math.round(subtotal * 0.1); // Mock discount logic
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const total = subtotal - discount + deliveryFee;

  const handlePlaceOrder = async () => {
    if (formData.paymentMethod === 'cod') {
      // Process Cash on Delivery order
      processCODOrder();
    } else {
      // Show payment form for online payments
      setShowPaymentForm(true);
    }
  };

  const processCODOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode
        },
        pujaDetails: {
          festival: formData.festival,
          pujaDate: formData.pujaDate,
          deliverySlot: formData.deliverySlot,
          pandit: "Pandit Ramesh Bhattacharya"
        },
        subtotal,
        discount,
        deliveryFee,
        total,
        paymentMethod: "cod"
      };

      const response = await ordersAPI.create(orderData);
      
      clearCart();
      setLoading(false);
      
      const orderDetails = {
        orderId: response.order.orderId,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        items: cartItems,
        subtotal,
        discount,
        delivery: deliveryFee,
        total,
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
        deliverySlot: formData.deliverySlot || "9:00 AM - 11:00 AM",
        pandit: "Pandit Ramesh Bhattacharya",
        pujaDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
        shippingAddress: formData,
        paymentMethod: "Cash on Delivery"
      };
      
      navigate("/order-confirmation", { state: orderDetails });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePaymentComplete = async (result: PaymentResult) => {
    setLoading(false);
    
    if (result.success) {
      try {
        const orderData = {
          items: cartItems.map(item => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode
          },
          pujaDetails: {
            festival: formData.festival,
            pujaDate: formData.pujaDate,
            deliverySlot: formData.deliverySlot,
            pandit: "Pandit Ramesh Bhattacharya"
          },
          subtotal,
          discount,
          deliveryFee,
          total,
          paymentMethod: formData.paymentMethod,
          paymentIntent: result.paymentIntent?.id
        };

        const response = await ordersAPI.create(orderData);
        
        clearCart();
        
        const orderDetails = {
          orderId: response.order.orderId,
          date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
          items: cartItems,
          subtotal,
          discount,
          delivery: deliveryFee,
          total,
          deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
          deliverySlot: formData.deliverySlot || "9:00 AM - 11:00 AM",
          pandit: "Pandit Ramesh Bhattacharya",
          pujaDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
          shippingAddress: formData,
          paymentMethod: formData.paymentMethod === 'card' ? 'Card Payment' : formData.paymentMethod === 'upi' ? 'UPI Payment' : 'Net Banking',
          paymentIntent: result.paymentIntent
        };
        
        navigate("/order-confirmation", { state: orderDetails });
      } catch (error: any) {
        toast({
          title: "Order Failed",
          description: error.message || "Payment successful but failed to create order. Please contact support.",
          variant: "destructive"
        });
      }
    } else {
      // Payment failed, show error
      toast({
        title: "Payment Failed",
        description: result.error || "Payment could not be processed. Please try again.",
        variant: "destructive"
      });
    }
  };

  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const orderSummary = {
    items: itemsCount,
    subtotal: subtotal,
    discount: discount,
    delivery: deliveryFee,
    total: total,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link to="/cart" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                    }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= step.id ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                      }`}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="hidden md:block font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 md:w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl border border-border p-6 md:p-8"
              >
                {/* Step 1: Address */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold">Delivery Address</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House no., Street, Landmark"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        >
                          <option>Kolkata</option>
                          <option>Howrah</option>
                          <option>Salt Lake</option>
                          <option>Dum Dum</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">PIN Code</label>
                        <Input
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="6-digit PIN"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Occasion */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold">Occasion Details</h2>

                    <div>
                      <label className="block text-sm font-medium mb-2">Puja/Occasion Date</label>
                      <Input
                        type="date"
                        name="pujaDate"
                        value={formData.pujaDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Festival/Occasion</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {festivals.map((festival) => (
                          <button
                            key={festival}
                            type="button"
                            onClick={() => setFormData({ ...formData, festival })}
                            className={`p-3 rounded-xl border-2 text-sm transition-all ${formData.festival === festival
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                              }`}
                          >
                            {festival}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-festive rounded-xl p-4">
                      <p className="text-sm">
                        🪔 <strong>Selected:</strong> {formData.festival}
                        {formData.pujaDate && ` on ${new Date(formData.pujaDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Delivery */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold">Delivery Slot</h2>

                    <p className="text-muted-foreground">
                      Choose a delivery slot. We recommend selecting a slot at least 2 hours before your puja time.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {deliverySlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, deliverySlot: slot })}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${formData.deliverySlot === slot
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                            }`}
                        >
                          <Clock className="w-5 h-5 text-primary mb-2" />
                          <p className="font-medium">{slot}</p>
                          <p className="text-xs text-muted-foreground">Free delivery</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold">Payment Method</h2>

                    <div className="space-y-3">
                      {[
                        { id: "cod", label: "Cash on Delivery", icon: "💵", description: "Pay when you receive" },
                        { id: "card", label: "Card Payment", icon: "💳", description: "Credit/Debit Card" },
                        { id: "upi", label: "UPI Payment", icon: "📱", description: "GPay, PhonePe, Paytm" },
                        { id: "netbanking", label: "Net Banking", icon: "🏦", description: "Bank Transfer" },
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${formData.paymentMethod === method.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                            }`}
                        >
                          <span className="text-3xl">{method.icon}</span>
                          <div>
                            <p className="font-medium">{method.label}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                          <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                            }`}>
                            {formData.paymentMethod === method.id && (
                              <Check className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {formData.paymentMethod !== 'cod' && (
                      <Alert>
                        <AlertDescription>
                          You will be redirected to a secure payment gateway to complete your transaction.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>

                  {currentStep < 4 ? (
                    <Button variant="festive" onClick={handleNext}>
                      Continue
                    </Button>
                  ) : (
                    <Button
                      variant="festive"
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="min-w-[150px]"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        formData.paymentMethod === 'cod' ? "Place Order" : "Proceed to Payment"
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h3 className="font-heading text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({orderSummary.items})</span>
                    <span>₹{orderSummary.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-₹{orderSummary.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-success">FREE</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">₹{orderSummary.total}</span>
                  </div>
                </div>

                {/* Order Details Summary */}
                {(formData.festival || formData.pujaDate || formData.deliverySlot) && (
                  <div className="bg-gradient-festive rounded-xl p-4 space-y-2">
                    <p className="text-sm font-medium">Order Details:</p>
                    {formData.festival && (
                      <p className="text-sm text-muted-foreground">🪔 {formData.festival}</p>
                    )}
                    {formData.pujaDate && (
                      <p className="text-sm text-muted-foreground">
                        📅 {new Date(formData.pujaDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    )}
                    {formData.deliverySlot && (
                      <p className="text-sm text-muted-foreground">🕐 {formData.deliverySlot}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold">Complete Payment</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentForm(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">
                Amount payable: <span className="font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
              </p>
            </div>
            
            <div className="p-6">
              <Elements stripe={loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)}>
                <PaymentForm
                  amount={total}
                  onPaymentComplete={handlePaymentComplete}
                  customerInfo={{
                    name: formData.fullName,
                    email: `${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                    phone: formData.phone
                  }}
                />
              </Elements>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
