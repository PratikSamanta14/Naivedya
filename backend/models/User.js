const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: ""
    },
    addresses: [{
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      isDefault: {
        type: Boolean,
        default: false
      }
    }],
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
