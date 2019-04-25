const express = require('express');
const router = express.Router();
const Products = require('../models/Products');


// Index route
router.get('/', (req, res) => {
    Products.find({}, (error, foundProducts) => {
        if(error){
            console.log(error);
        } else {
            res.render('products/index.ejs', {
                products: foundProducts
            })
        }
    })
});

// New Route
router.get('/new', (req, res) =>{
   res.render('products/new.ejs');
});


// Show Route 




//Create Route
router.post('/', (req, res) => {
    Products.create(req.body, (error, newProduct) => {

              res.redirect('/products');           
    })
});


// router.post('/', async (req, body)=>{
//     try{
//         const product = await Products.create(req.body);
//         res.redirect('/products')
//     } catch(err){
//         res.send(err);
//     }
// })


















module.exports = router;