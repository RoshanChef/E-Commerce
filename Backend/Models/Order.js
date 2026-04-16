const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  products: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
      },
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending"
  },

  // Payment Status
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },

  // Payment Method
  paymentMethod: {
    type: String,
    enum: ["COD", "card", "upi"],
    default: "COD"
  },

  // Optional Transaction ID (for online payments)
  transactionId: {
    type: String,
    default: null
  }

}, { timestamps: true });

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;