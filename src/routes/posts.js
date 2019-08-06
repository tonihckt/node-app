'use strict'

const express = require('express')
const router = express.Router()

const Post  = require('../models/post')
const {isAuthenticated} = require('../helpers/auth')



/*
 * LIST_POST
*/
router.get('/blog',function (req, res) {
    Post.find({}, (err, posts)=>{
        if (err) return res.status(500).send({message: err})
        if (!posts) return res.status(404).send({message: 'Dont route this route'})
        
        res.render('blog/all-posts', {posts})
    })
})

module.exports = router
