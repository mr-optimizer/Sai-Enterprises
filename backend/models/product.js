const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 charectors"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxlength: [10, "Product price length cannot exceed 10 charectors"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product name"],
  },
  stock: {
    type: Number,
    default: 0.0,
  },
  ratting: {
    type: Number,
    default: 0.0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Fan",
        "Wire",
        "Capacitors",
        "LED",
        "Meters",
        "Pipes",
        "MCB Box",
        "Heaters",
        "Tape",
        "Fan cores",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product stock"],
    maxlength: [15, "Length cannot exeed of length 5"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      ratting: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
