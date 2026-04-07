import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: String,
    description: String,
    brand: String,
    category: String,
    subCategory: String,

    stock: { type: Number, default: 0 },

    price: { type: Number, required: true },
    discountPrice: Number,

    currency: { type: String, default: "INR" },

    unit: {
      type: String,
      enum: ["piece", "kg", "gram", "litre", "ml", "meter", "pack"],
      default: "piece"
    },

    weight: Number,

    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },

    variants: [
      {
        size: String,
        color: String,
        stock: Number,
        price: Number,
        isAvailable: {
          type: Boolean,
          default: true
        }
      }
    ],

    mainImage: String,

    images: [String],

    specifications: {
      type: Map,
      of: String
    },

    features: [String],
    aboutItem: [String],
    tags: [String],

    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false },

    saleStartDate: Date,
    saleEndDate: Date,

    expiryDate: Date,
    manufacturingDate: Date,

    reviews: [
      {
        userName: String,
        userImage: String,
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);