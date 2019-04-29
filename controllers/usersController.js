const express     = require('express'); 
const router      = express.Router();
const Products    = require('../models/Products');
const User       = require('../models/Users');
const bcrypt      = require('bcryptjs');



// INDEX
router.get('/', async (req, res) => {
   
    try{ 
const foundUsers = await User.find({})
const foundUser = await User.findById(req.session.usersDbId)

console.log(foundUsers)
        
        res.render('users/index.ejs', {
            users: foundUsers,
            user: foundUser
        })
    } catch (err) {
    res.send(err)
    }

});


//NEW
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
})

//CREATE
router.post('/', async (req, res)=>{

    try{
        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const userDbEntry = {};
        userDbEntry.username = req.body.username;
        userDbEntry.password = passwordHash;
        userDbEntry.email = req.body.email;
        userDbEntry.address = req.body.address;
        userDbEntry.name = req.body.name;
        userDbEntry.products = [];
        
        const createdUser = await User.create(userDbEntry);
        req.session.usersDbId = createdUser._id;
        req.session.logged = true;
        //console.log(req.session, ' successful in login');
        res.redirect('/users/' + createdUser._id);
        //console.log(createdUser);
        //console.log(userDbEntry);

    } catch (err){
        console.log(err)
        res.send(err)
   }
   
 })

//SHOW
router.get('/:id', async (req, res) => {
    if (req.session.logged != true){
        res.redirect('/')
    }
    try{
    const foundUser = await User.findById(req.params.id)
    .populate('products')
    .exec()
    //console.log(foundUser)
    res.render('users/show.ejs', {
        user: foundUser
    })

    } catch (err){
        res.send(err)
    }

})


//EDIT
router.get('/:id/edit',async (req, res)=>{
    if (req.session.logged != true){
        res.redirect('/')
    }
    try {
    const foundUser = await User.findById(req.params.id)
    res.render('users/edit.ejs', {
            user: foundUser
        })
    } catch (err){
        console.log(err)
        res.send(err)
    }
})


//UPDATE
router.put('/:id',async (req, res)=>{
    if (req.session.logged != true){
        res.redirect('/')
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/users');
    } catch(err){
        console.log(err)
        res.send(err)
    }

})


router.delete('/:id',async (req, res)=>{
    if (req.session.logged != true){
        res.redirect('/')
    }
try {

const deletedUser = await  User.findByIdAndDelete(req.session.usersDbId);
console.log(deletedUser)

//const foundProducts = await Products.deleteMany({ owner: user.id})



res.redirect('/users')
    } catch(err){
        console.log(err)
        res.send(err)
    }
});

// Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }, function (err) {});






module.exports = router; 
