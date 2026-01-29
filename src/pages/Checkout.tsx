import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, CreditCard, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Prepare order details
    const orderDetails = {
      orderId: "NAI" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      items: cartItems,
      subtotal,
      discount,
      delivery: deliveryFee,
      total,
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
      deliverySlot: formData.deliverySlot || "9:00 AM - 11:00 AM",
      pandit: "Pandit Ramesh Bhattacharya", // Mock
      pujaDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
      shippingAddress: formData // Pass address if needed for invoice
    };

    clearCart();
    setLoading(false);
    navigate("/order-confirmation", { state: orderDetails });
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
                        { id: "upi", label: "UPI Payment", icon: "📱", description: "GPay, PhonePe, Paytm" },
                        { id: "card", label: "Card Payment", icon: "💳", description: "Credit/Debit Card" },
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
                        "Place Order"
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

      <Footer />
    </div>
  );
};

export default Checkout;
