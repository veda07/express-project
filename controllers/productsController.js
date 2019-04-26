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
// router.post('/',  (req, res) => {

//     Products.create(req.body, (error, newProduct)=> {
//         if (error){
//             console.log(error)
//         } else {
//             console.log(newProduct);
//             res.redirect('/products');
//         }
//     })
// });
//Create Route
// router.post('/', async (req, res) => {
//    try {
//        const newProduct = await Products.create(req.body)
//         console.log(newProduct)
//         console.log('/////////////NEW PRODUCT ^///////////////////')

//        const foundUser = await User findById(req.session.usersDbId)
//        console.log(foundUser)
//        console.log('/////////////found USer///////////////////')
//           res.redirect('/products');


//    }catch (err) {
//        res.send(err)
//    }
// });
router.post('/', (req, res)=>{
    Products.create(req.body, (err, newProduct)=>{
        User.findOne({'products': req.session.usersDbId}, (err, foundUser)=>{
        })
        if(err){
            console.log(err);
        } else {
            foundUser.products.push(req.params.id);
            console.log(newProduct);
            foundUser.save((err, foundUser)=>{
                console.log(foundUser, ' created new product');
                res.redirect('/products');
            })
        }
    })
})



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
router.delete('/:id', (req, res)=>{
    Products.findByIdAndDelete(req.params.id, (err, deletedProduct)=>{
        User.findOne({'products': req.params.id}, (err, foundUser)=>{


            if(err){
                console.log(err);
            } else {
                foundUser.products.remove(req.params.id);
                console.log(deletedProduct);
                foundUser.save((err, updatedUser) =>{
                    console.log(updatedUser, ' after mutation');
                    res.redirect('/products');

                })
            };
        });        
    });
});


// router.delete('/:id', (req, res)=>{
//   Article.findByIdAndRemove(req.params.id, (err, deletedArticle)=>{

//     // find the author and then remove the articles id from their articles array of ids
//     Author.findOne({'articles': req.params.id}, (err, foundAuthor) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(foundAuthor, "<---- foundAuthor in delete before I remove the article id")
//         foundAuthor.articles.remove(req.params.id);
//         // since we just mutated our document ^ , now we have to save
//         foundAuthor.save((err, updatedAuthor) => {
//           console.log(updatedAuthor, ' after the mutation');
//           res.redirect('/articles');
//         });
//       }
//     });
//   });
// });






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