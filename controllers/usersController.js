const express     = require('express'); 
const router      = express.Router();
const Products    = require('../models/Products');
const Users        = require('../models/Users')

router.get('/', (req, res)=>{
    res.render('index.ejs');
});






module.export = router; 
