'use strict'

const express = require('express')
const router = express.Router()

const User = require('../models/user')
const passport = require ('passport') 

/*
 * SIGNIN
*/
router.get('/users/signin', (req, res)=>{
    res.render('users/signin')
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

/*
 * SIGNUP
*/
router.get('/users/signup', (req, res)=>{
    res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body
    const errors = []
    console.log(req.body)
    
    if (name.length <= 0){
        errors.push({text: 'Please enter a name'})
    }
    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match.'})
    }
    if (password.length < 4) {
        errors.push({text: 'Passwords must be at least 4 characters.'})
    }
    if  (errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        // Look for email coincidence
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
          req.flash('error_msg', 'The Email is already in use.');
          res.redirect('/users/signup');
        } else {
            // Saving a New User
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered.');
            res.redirect('/users/signin');
        }
    }
})

/*
 * LOGOUT
*/
router.get('/users/logout', async (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router

