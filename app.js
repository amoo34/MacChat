// importing Dependencies
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const router = require('express-promise-router')()
const passport = require('passport')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const Mongostore = require('connect-mongo')(session)
const flash = require('express-flash');

app.use(flash());
// setting Routes
const userRoute = require('./routes/user.route');

// setting Templating Engine
app.set('view engine', 'pug');

// additional configuration by default it is set to views folder
app.set('views', 'views');



// mongodb Connection
const connection = mongoose.createConnection('mongodb://localhost:27017/Chatapp', { useUnifiedTopology: true })
console.log(connection)
const sessionStore = new Mongostore({
  mongooseConnection:connection,
  collection:'sessionsRecord'
})
app.use(express.static(path.join(__dirname, 'css')));
// using Middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret:'asdf',
  resave:true,
  saveUninitialized:true,
  store:sessionStore,
  cookie:{
    maxAge: 1000 * 60 * 60 
  }
}))

app.use(bodyParser.urlencoded({extended:false}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/user',userRoute)


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Export app Module to server.js file
module.exports = app
