const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const User       = require('../models/Users');


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
router.get('/new', async (req, res) => {
        try {
           //const foundUser =  await User.findById(req.session.usersDbId)
            res.render('products/new.ejs', {
                //user: foundUser
            });
        } catch (err){
            res.send(err)
        }
});


//Create Route
router.post('/', async (req, res) => {
    try {
        const newProduct = await Products.create(req.body)
         console.log(newProduct)
         console.log('/////////////NEW PRODUCT ^///////////////////')
        console.log(req.session.usersDbId)
        console.log('/////////////req.session^///////////////////')

        const foundUser = await User.findById(req.session.usersDbId)
        foundUser.products.push(newProduct._id);
        foundUser.save((err, savedUser) => {
            console.log(savedUser)
        })
            // Console/log('////////////////////////////////')
            // console.log(foundUser)
            // Console/log('/////////////FOUND USER///////////////////')
            res.redirect('/users/' + req.session.usersDbId);   
           

    }catch (err) {
        res.send(err)
    }
});

// Show Route
router.get('/:id', (req, res)=>{

    console.log(req.session.usersDbId)


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

router.delete('/:id', async (req, res)=>{
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id)
        res.redirect('/products');
    } catch (err) {
        res.send(err)
    }
})

// // Update Route
router.put('/:id', (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body, (err, foundProduct) => {
        res.redirect('/products');
    });
});


router.put('/:id', async (req, res) =>{
    try {
    const findUpdatedProduct = Products.findByIdAndUpdate(req.params.id, req.body, {new: true});
    const findFoundUser = User.findOne({'products': req.params.id });
    const [updatedProduct, foundUser ] = await Promise.all([findUpdatedProduct, findFoundUser])                 
        if(foundUser._id != req.session.usersDbId){
            console.log(req.session)
            console.log('/////session//////')
            console.log(foundUser)
            console.log('===FOUNDUSER=====')
              foundUser.products.remove(req.params.id);
                await foundUser.save();
                const newUser = await User.findById(req.session.usersDbId);
                newUser.products.push(updatedProduct);
                const savedNewUser = await newUser.save();
                res.redirect('/products/' + req.params.id);
        } else {
         console.log('hitting, else')
         res.redirect('/products/' + req.params.id);
                }
          } catch (err){
            console.log(err)
            res.send(err);
        }     
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