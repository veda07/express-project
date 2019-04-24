const express     = require('express'); 
const router      = express.Router();
const Products    = require('../models/Products');
const User       = require('../models/Users')



// Index route
router.get('/', (req, res) => {
    res.render('users/index.ejs')
});




module.exports = router; 
