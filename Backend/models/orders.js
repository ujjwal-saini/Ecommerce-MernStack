import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    customerName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    address: {
        type: String,
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            price: Number,
            quantity: Number,
            size: String,
            color: String,
            customDesign: String,
            image: String
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "UPI", "Card"],
        default: "COD"
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },

    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },

    note: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Order = mongoose.model("Order", OrderSchema);

export default Order;