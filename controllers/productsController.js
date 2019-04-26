const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const User       = require('../models/Users');



// Index route
router.get('/', async (req, res) => {
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

    console.log(req.session.usersDbEntry)


    User.findById(req.session.usersDbId, (err, foundUser)=>{

    Products.findById(req.params.id, (err, foundProduct)=>{
        
       if (req.session.logged != true){
           res.redirect('/')
       }
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
        res.redirect('/products');
    } catch (err) {
        res.send(err)
    }
})

 // UPDATE 
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
        User.findById(req.session.usersDbId, (error, findUser)=>{
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
    })
});










module.exports = router;