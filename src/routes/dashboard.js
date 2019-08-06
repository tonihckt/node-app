'use strict'

const express = require('express')
const router = express.Router()

const Post  = require('../models/post')
const {isAuthenticated} = require('../helpers/auth')



/*
 * DASHBOARD
*/
router.get('/dashboard',function (req, res) {
    // Post.find({}, (err, posts)=>{
    //     if (err) return res.status(500).send({message: err})
    //     if (!posts) return res.status(404).send({message: 'Dont route this route'})
        
    //     res.render('blog/all-posts', {posts})
    // })
    res.render('dashboard/index')
})

module.exports = router