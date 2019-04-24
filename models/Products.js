const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  description: String,
  image: String
});

const Products= mongoose.model('Products', productSchema);

module.exports = Products;