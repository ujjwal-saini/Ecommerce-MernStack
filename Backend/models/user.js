import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profile: {
      profilePic: {
        type: String,
        default:
          "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
      },

      dateOfBirth: {
        type: Date,
      },

      phone: {
        type: String,
      },

      address: {
        fullAddress: String,
        country: String,
        state: String,
        city: String,
        postalCode: String,
      },
    },

    // Cart Items Object
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },

        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;