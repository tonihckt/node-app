'use strict'

const passport = require ('passport') // inicia session con redes sociales
const localStrategy = require('passport-local').Strategy // guarda datos en una sesion
const User = require ('../models/user')

passport.use(new localStrategy({
    usernameField:'email' //sobre que se va autenficar

}, async (email, password, done) => {
    // Match Email's User
   const user = await User.findOne({email: email})
   if (!user) {
       // null-> ningun errror -- false -> ningun usuario
       return done(null, false, {message: 'User not fund'})
   } else {
        // Match Password's User
       const match = await user.matchPassword(password)
       if (match){
           return done(null, user)
       } else {
           return done(null, false, {message: 'Incorrect password'})
       }
   }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
})