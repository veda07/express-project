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


//Create Route
router.post('/', (req, res) => {

    Products.create(req.body, (error, newProduct)=> {
        if (error){
            console.log(error)
        } else {

            console.log(newProduct);
            res.redirect('/products');
        }
    })
});

// Show Route

router.get('/:id', (req, res)=>{
    Products.findById(req.params.id, (err, foundProduct)=>{
        if(err){
            console.log(err)
        } else {
            res.render('products/show.ejs', {
                product: foundProduct
            })
        }
    })
})

// Delete Route

router.delete('/:id', (req, res)=>{
    Products.findByIdAndDelete(req.params.id, (err, deletedProduct)=>{
        if(err){
            console.log(err);
        } else {
            console.log(deletedProduct);
            res.redirect('/products');
        }
    })
})

// // Update Route
router.put('/:id', (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body, (err, foundProduct) => {
        res.redirect('/products');
    });
});

// Edit Route
router.get('/:id/edit', (req, res) =>{
    Products.findByIdAndUpdate(req.params.id, req.body, (error, updatedProduct) =>{
      if (error){
        console.log(error)
      } else {
        console.log(updatedProduct);
    res.render('products/edit.ejs', {
        id: req.params.id,
        product: updatedProduct
    });
    }
    })
});











module.exports = router;