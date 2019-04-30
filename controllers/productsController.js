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
router.get('/:id', async (req, res)=>{
    if (req.session.logged != true){
        res.redirect('/')
    }
  

        try {
            const foundUser = await User.findById(req.session.usersDbId)
           

            const foundProduct = await Products.findById(req.params.id)//.populate('owner');
           
       

            console.log(foundProduct)

            console.log('//////////////////////////////')
            
            res.render('products/show.ejs', {
                product: foundProduct,
                user: foundUser
            });

        } catch (err){
        res.send(err)
        }
 

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

 // UPDATE 
 router.put('/buy/:product/:owner', async (req, res) =>{
   console.log('hit route')
 




const foundProduct = await Products.findById(req.params.product)
console.log(foundProduct)
console.log('//////////FOUND PRODUCT/////////////////////////////////')
const foundOwner = await User.findById(req.params.owner)
console.log(foundOwner)
console.log('//////////FOUND OWNER/////////////////////////////////')




//FOUDN USER AND ADDED PRODUCT TO PURCHASED PRODUCTS ARRAY
const foundUser = await User.findById(req.session.usersDbId)
console.log(foundUser)
console.log('//////////FOUND USER/////////////////////////////////')


foundUser.purchasedProducts.push(foundProduct._id)
console.log(foundUser)
console.log('//////////FOUND USER before save/////////////////////////////////')

foundUser.save()
console.log(foundUser)
console.log('//////////FOUND USER after save/////////////////////////////////')

console.log(foundOwner.products)
console.log('//////////FOUND OWNER products before DELETE/////////////////////////////////')
//FIND OWNER AND DELETE PORODUCT FROM OWNERS PORDUCTS ARRAY
foundOwner.products.remove(foundProduct)
console.log(foundOwner.products)
console.log('//////////FOUND OWNER products/////////////////////////////////')
foundOwner.save()

foundProduct.delete(foundProduct)

foundProduct.save()


res.redirect('/users/' + foundUser._id)




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