const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  price: String,
  description: String,
  image: String,
  sold: Boolean,
  authNum: Number
});

const Products= mongoose.model('Products', productSchema);

module.exports = Products;