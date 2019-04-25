const mongoose = require('mongoose'); 
const Products = require('./Products')

const userSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: false},
    address: {type: String, required: false},
    username: {type: String, required: true},
    password: {type: String, required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]

})

const User = mongoose.model('User', userSchema)

module.exports = User; 


