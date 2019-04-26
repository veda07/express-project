const express = require('express');
const router = express.Router();
const User   = require('../models/Users');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) =>{
    res.render('login.ejs');
})


//LOGIN
 router.post('/login', async (req, res)=>{
	try{
		const foundUser = await User.findOne({'username':req.body.username});
			if(foundUser){
				console.log(foundUser);
				if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
					req.session.logged = true;
					req.session.usersDbId = foundUser._id;
					console.log(req.session, ' successful in login');
					res.redirect('/users/' + foundUser._id);
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




//LOGOUT
router.get('logout', (req, res)=>{
    if(err){
        res.send(err);
    } else {
        res.redirect('/auth/login')
    }
})

module.exports = router; 