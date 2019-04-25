const express     = require('express'); 
const router      = express.Router();
const Products    = require('../models/Products');
const User       = require('../models/Users');
const bcrypt = require('bcryptjs');



// INDEX
router.get('/', async (req, res) => {
    try{ 
const foundUsers = await User.find({})
console.log(foundUsers)
        
        res.render('users/index.ejs', {
            users: foundUsers
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
        console.log(createdUser);
        console.log(passwordHash);
        console.log(userDbEntry);
        // req.session.username = users.username;
        // req.session.logged   = true;
        res.redirect('/users')

    } catch (err){
        console.log(err)
        res.send(err)
   }
})
//     router.post('/login', async (req, res) => {
//         const password = req.body.password;
//         const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//         const userDbEntry = {};
//         userDbEntry.username = req.body.username;
//         userDbEntry.password = passwordHash;
//   try {
//     const createdUser = await User.create(userDbEntry);

//     // after you create the user, this is a great time to initialize you session object
//     // add properties to the session object
//     req.session.logged = true;
//     req.session.usersDbId = createdUser._id;

//     res.redirect('/products');

//   } catch(err){
//     res.send(err)
//   }



// });

    // password: {type: String, required: true, unique: true},
    // products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]





//SHOW
router.get('/:id', async (req, res) => {
    try{
    const foundUser = await User.findById(req.params.id)
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
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/users');
    } catch(err){
        console.log(err)
        res.send(err)
    }

})


//DELETE USER
router.delete('/:id',async (req, res)=>{
try {
const foundUser = await  User.findByIdAndDelete(req.params.id);
const deletedUser = await User.deleteOne(foundUser);
res.redirect('/users')

    } catch(err){
        console.log(err)
        res.send(err)
    }
});






module.exports = router; 
