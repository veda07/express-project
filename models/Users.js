const mongoose = require('mongoose'); 
const Products = require('./Products')

const userSchema = new mongoose.Schema({
    name: {type: String, required: false, unique: false },
    email: {type: String, required: false, unique: false },
    address: {type: String, required: false, unique: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}],
    purchasedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User; 


