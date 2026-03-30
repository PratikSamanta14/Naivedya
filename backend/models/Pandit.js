const mongoose = require("mongoose")

const panditSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    languages: [{
      type: String,
      required: true
    }],
    specializations: [{
      type: String,
      required: true
    }],
    location: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      comment: String,
      date: {
        type: Date,
        default: Date.now
      }
    }],
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    },
    bookingSlots: [{
      date: Date,
      time: String,
      available: {
        type: Boolean,
        default: true
      }
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model("Pandit", panditSchema)
