const express = require('express');
const router = express.Router();
const User   = require('../models/Users');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) =>{
    res.render('login.ejs');
})

router.post('/login', async (req, res) =>{
    
    const foundUser = await User.find({userName: req.body.userName});
        console.log(foundUser);
    // if(foundUser.userName === req.body.userName){
    //     if(foundUser.password === req.body.password){
    //         req.session.userName = req.body.userName;
    //         req.session.logged = true
            res.redirect('/products')
    //     } else {
    //         res.redirect('/auth/login')
    //     }
    // } else { // if no users are found
    //     // res.redirect('/users/new')
    // }

    // res.redirect('/products');

});

router.get('logout', (req, res)=>{
    if(err){
        res.send(err);
    } else {
        res.redirect('/auth/login')
    }
})

module.exports = router; 