
  const express        = require('express');
  const app            = express();
  const bodyParser     = require('body-parser');
  const methodOverride = require('method-override');
  const session        = require('express-session');
  require('./db/db')
  const morgan         = require('morgan');
  
  const usersController = require('./controllers/usersController');
  const productsController = require('./controllers/productsController');
  const authController = require('./controllers/authController');


  app.use(bodyParser.urlencoded({extended: false}));
  app.use(methodOverride('_method'));
  app.use(morgan('short'));
  app.use(express.static('public'));
  app.use(session({
    secret: 'This is a random secret string that you would make up to protect your session',
    resave: false, 
    saveUninitialized: false 
  }))
  
 
  
app.get('/', (req, res)=>{
    res.render('index.ejs')
})
  
app.use('/products', productsController);
app.use('/users', usersController);
app.use('/auth', authController); 
  
  app.listen(3000, () => {
    console.log('listening... on port: ', 3000);
  });
  
