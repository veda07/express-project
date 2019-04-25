const express     = require('express'); 
const router      = express.Router();
const Products    = require('../models/Products');
const User       = require('../models/Users')



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
        const createdUser = await User.create(req.body)
        //console.log(createdUser)
        res.redirect('/users')

    } catch (err){
        console.log(err)
        res.send(err)
   }
})

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



//DELETE







module.exports = router; 
