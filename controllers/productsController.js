const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const User = require('../models/Users');


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
router.get('/new', (req, res) => {
    User.findById(req.session.usersDbId, (err, foundUser)=>{

    if(err){
      res.send(err);
    } else {
      res.render('products/new.ejs', {
        user: foundUser
      });
}
});
});


//Create Route
router.post('/',  (req, res) => {

        console.log(req.session)
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
    console.log(req.session.usersDbId)

console.log('//////////////////////////////')
    User.findById(req.session.usersDbId, (err, foundUser)=>{

    Products.findById(req.params.id, (err, foundProduct)=>{
        if(err){
            console.log(err)
        } else {
            res.render('products/show.ejs', {
                product: foundProduct,
                user: foundUser

            })
        }
    })    
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