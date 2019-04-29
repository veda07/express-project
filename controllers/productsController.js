const express = require('express');
const jquery = require('jquery');
const router = express.Router();
const Products = require('../models/Products');
const User = require('../models/Users');



// Index route
router.get('/', async (req, res) => {
    if (req.session.logged != true){
        res.redirect('/')
    }
    try {
       const foundProduct = await  Products.find({})
       const foundUser = await User.findById(req.session.usersDbId)
       console.log(req.session.usersDbId)
        res.render('products/index.ejs', {
            products: foundProduct,
            user: foundUser
        })
    } catch(err){
        res.send(err)
        console.log(err)
    }
});


// New Route
router.get('/new', async (req, res) => {
    if (req.session.logged != true){
        res.redirect('/')
    }
        try {
           const foundUser =  await User.findById(req.session.usersDbId)
           console.log(foundUser)
           console.log('/////////found user for new ejs//////////')
            res.render('products/new.ejs', {
                user: foundUser
            });
        } catch (err){
            res.send(err)
        }
});


//Create Route
router.post('/', async (req, res) => {

    if (req.session.logged != true){
        res.redirect('/')
    }
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
    if (req.session.logged != true){
        res.redirect('/')
    }
    console.log(req.session.usersDbEntry)

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

// Show Route
router.get('/:id', (req, res)=>{
    if (req.session.logged != true){
        res.redirect('/')
    }
    console.log(req.session.usersDbEntry)

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
router.delete('/:id', async (req, res)=>{
    if (req.session.logged != true){
        res.redirect('/')
    }
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id)
        res.redirect('/users/' + req.session.usersDbId);
    } catch (err) {
        res.send(err)
    }
})

// const buyNow = function () {
//     $('.buyNow').on('click', () => {
//     console.log('working!')
// })
// }


// // Update Route
router.put('/:id', (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body, (err, foundProduct) => {
        res.redirect('/products');
    });
});

 




// Edit Route
router.get('/:id/edit', (req, res) =>{
Products.findByIdAndUpdate(req.params.id, req.body, (error, updatedProduct) =>{
    User.findById(req.session.usersDbId, (error, findUser)=>{
  if (error){
    console.log(error)
  } else {
    console.log(updatedProduct);
res.render('products/edit.ejs', {
    user: req.params.id,
    product: updatedProduct
    
        });
        }   
    })
})
});









//buyNow();



module.exports = router;