const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  title: {type: String, required: true},
  price: Number,
  description: String,
  image: String,
  seller: String, 
});

const Products= mongoose.model('Products', productSchema);

module.exports = Products;