// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  category: String,
  stock: Number,
  imageURL: {    // New field for the product image URL
    type: String, 
    required: false // Make it optional if you don't always have an image URL
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
