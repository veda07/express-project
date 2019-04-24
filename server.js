const express        = require('express'); 
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override'); 
const morgan         = require('morgan'); 
const session        = require('espress-session');

require('./db/db')

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'This is a random secret string that you would make up to protect your session',
    resave: false, 
    saveUninitialized: false 
  }))
  


app.listen(3000, () => {
    console.log('listening... on port: ', 3000);
  });
  