const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }],
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pincode: String
    },
    pujaDetails: {
      festival: String,
      pujaDate: Date,
      deliverySlot: String,
      pandit: String
    },
    subtotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "card", "upi", "netbanking"]
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed", "refunded"]
    },
    paymentIntent: {
      type: String
    },
    orderStatus: {
      type: String,
      default: "confirmed",
      enum: ["confirmed", "preparing", "shipped", "delivered", "cancelled"]
    },
    deliveryDate: Date,
    trackingNumber: String
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)
