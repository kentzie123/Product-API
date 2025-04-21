// server.js

// Load env variables
require('dotenv').config();

// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Product model
const Product = require('./models/product'); // Ensure you have the Product.js model

// App setup
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Server is up and running!');
});

// POST route to add a product
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);  // Create a new product with the data from the request body
    const savedProduct = await newProduct.save();  // Save the product to the database
    res.status(201).json(savedProduct);  // Respond with the saved product and status 201
  } catch (err) {
    res.status(400).json({ error: err.message });  // Handle errors and send a response
  }
});

// GET route to fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Send the list of products in the response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' }); // Handle errors
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔊 Server listening on port ${PORT}`);
});
