const express = require('express');
const router = express.Router();
const User   = require('../models/Users');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) =>{
    res.render('login.ejs');
})

//     router.post('/login', async (req, res) => {
//     	const password = req.body.password;
//     	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// 		const userDbEntry = {};
// 		userDbEntry.username = req.body.username;
// 		userDbEntry.password = passwordHash;
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
// router.post('/login', async (req, res) => {

//   // Query the database to see if the user exists
//   try {
//     const foundUser = await User.findOne({'username': req.body.username});
//     // Is foundUser a truthy value, if it is its the user object,
//     // if we didn't find anything then foundUser === null a falsy value
//     if(foundUser){
//       // since the user exist compare the passwords
//       if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
//         // set up the session
//         req.session.logged = true;
//         req.session.usersDbId = foundUser._id;
//         console.log(req.session, ' successful in login')
//         res.redirect('/authors');
//       } else {
//         // redirect them back to the login with a message
//         req.session.message = "Username or password is incorrect";
//         res.redirect('/auth/login');
//       }
//     } else {
//       req.session.message = 'Username or Password is incorrect';
//       res.redirect('/auth/login');
//     }
//   } catch(err){
//     res.send(err);
//   }
// });


//   req.session.username = req.body.username;
//   req.session.logged = true;
//   res.redirect('/users');
// });



    // password: {type: String, required: true, unique: true},
    // products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]

// router.post('/register', async (req, res) => {

//   // First we must hash the password
//   const password = req.body.password;
//   // The password hash is what we want to put in the Database
//   const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));


//   // create an object for the db entry, the properties of this object
//   // will match up with our model
//   const userDbEntry = {};
//   userDbEntry.username = req.body.username;
//   userDbEntry.password = passwordHash;

//   try {
//     const createdUser = await User.create(userDbEntry);

//     // after you create the user, this is a great time to initialize you session object
//     // add properties to the session object
//     req.session.logged = true;
//     req.session.usersDbId = createdUser._id;

//     res.redirect('/authors');

//   } catch(err){
//     res.send(err)
//   }



// });





//     const foundUser = await User.find({userName: req.body.userName});
//         console.log(foundUser);
//     if(foundUser.userName === req.body.userName){
//         if(foundUser.password === req.body.password){
//             req.session.userName = req.body.userName;
//             req.session.logged = true
//         } else {
//             res.redirect('/auth/login')
//         }
//     } else { // if no users are found
//         // res.redirect('/users/new')
//     }

//     res.redirect('/products');

// });

router.get('logout', (req, res)=>{
    if(err){
        res.send(err);
    } else {
        res.redirect('/auth/login')
    }
})

module.exports = router; 