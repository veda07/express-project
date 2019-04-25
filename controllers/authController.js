const express = require('express');
const router = express.Router();
const User   = require('../models/Users');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) =>{
    res.render('login.ejs');
})


router.post('/login', async (req, res) =>{

    const foundUser = await User.findOne({username: req.body.username});
        console.log('/////////////////////////////////');
        console.log(foundUser);
        console.log('/////////////FOUND USERs////////////////////');
        console.log(req.session)
        console.log('/////////////FOUND session////////////////////');
        console.log(req.body.username)
        console.log('/////////////FOUND req.body.username////////////////////');
 
     if(req.body.password === foundUser.password){
        console.log(req.session)
        console.log('/////////////FOUND NEWsession////////////////////');
 
            req.session.username = req.body.username;
            req.session.logged = true
            res.redirect('/users')
         } else {
             res.redirect('/auth/login')
         }
 });

  
router.post('/login', async (req, res)=>{
    try{
        const foundUser = await User.findOne({'username':req.body.username});
            if(foundUser){
                console.log(foundUser);
                if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
                    req.session.logged = true;
                    req.session.usersDbId = foundUser._id;
                    console.log(req.session, ' successful in login');
                    res.redirect('/users');
                } else {
                    req.session.message = "Username or password is incorrect";
                    res.redirect('/auth/login');
                }
            } else {
                req.session.message = 'Username or password is incorrect';
                res.redirect('/auth/login');
            }
    } catch(err){
        res.send(err);
    }
})





router.get('logout', (req, res)=>{
    if(err){
        res.send(err);
    } else {
        res.redirect('/auth/login')
    }
})

module.exports = router; 