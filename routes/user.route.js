// importing router 
const router = require('express').Router();
const passport = require('passport');
const flash = require('express-flash');
const initialize = require('../passport-config');

const userModel = require('../models/user.schema.js');
const mongoose = require('mongoose');

initialize(
  passport,
  (email) => users.find((user) => user.email === email)
);

const products = [
  {
    name: 'Samsung S2',
    price: 100,
  },
  {
    name: 'Samsung S4',
    price: 1000,
  },
];

function checkAuth(req,res,next){
  if(req.user)
  {
    next()
  }
  else{
    res.redirect('/user/login')
  }
  
}

// routes
router.get(
  '/',
  checkAuth,
  (req, res, next) => {
    let status = '';
    if (req.isAuthenticated()) {
      status = 'Login';
    } else {
      status = 'Not Login';
    }
    req.session.viewCount += 1;
    console.log('SESSION ==>> ', req.session);
    console.log('Cookies are' + JSON.stringify(req.cookies));
    console.log(req.user);
    res.render('index', { prods: products, status: status });
  }
);

router.get('/admin',(req,res,next)=>{
    res.render('admin',{prods:products})
})

router.get('/register',(req,res,next)=>{
    res.render('register')
})

router.get('/login',(req,res,next)=>{
    res.render('login')
})

router.get('/logout', (req, res, next) => {
  console.log("Logout")
  req.logout(); 
  console.log(req.session)
  res.redirect('/user/login');

});

router.post('/login',  
passport.authenticate('local',
 { failureRedirect: '/user/login',
 successRedirect:'/user/' 
}));

router.post('/register',async(req,res,next)=>{

  console.log(req.body)

  const newUser = new userModel({
    _id: mongoose.Types.ObjectId(),
    userName: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  console.log('user model ', newUser);
  try {
     console.log("saving")
     // Saving Data in Database
     console.log(mongoose.connections)
     const response = await newUser.save();
     console.log(response);
     return res.redirect('/user/login');
  } 
   catch(error) {
    console.log(error)
    return res.redirect('/user/register')
  }
  
})
//exporting
module.exports = router