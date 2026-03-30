const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
    subcategories: [{
      name: String,
      slug: String,
      description: String
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema)
