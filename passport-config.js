const LocalStrategy = require('passport-local').Strategy



function initialize(passport, getUserByEmail) {

    console.log('Inside passport Configuration');
    const authenticateUser = async (email, password, done) => {
      const user = getUserByEmail(email);
        if (user == null) {
          return done(null, false);
        }
          return done(null, user);
    }
  
    
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) =>{ 
        console.log("Serialize User")
        done(null, user.email)
    });
    passport.deserializeUser((email, done) => {
      console.log('DeSerialize User');
      return done(null, getUserByEmail(email));
    });
}

module.exports = initialize