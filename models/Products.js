const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  owner: {type: String, required: true},
  title: {type: String, required: true},
  price: String,
  description: String,
  image: String,
  seller: String, 
});

const Products= mongoose.model('Products', productSchema);

module.exports = Products;