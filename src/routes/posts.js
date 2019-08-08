'use strict'

const express = require('express')
const router = express.Router()

const Post  = require('../models/post')
const {isAuthenticated} = require('../helpers/auth')

/*
 * NEW_POST
*/
router.get('/posts/add',(req, res)=> {
    res.render('posts/new-post')
})

router.post('/posts/new-post',async(req, res)=>{
    console.log(req.body)
    const { title, description } = req.body
    const errors = []
    if (!title){
        errors.push({text: 'Insert a title'})
    }
    if (!description){
        errors.push({text: 'Insert a description'})
    }
    if (errors.length > 0) {
        res.render('posts/new-post', {
            errors,
            title,
            description
        })
    } else {
        const newPost = new Post({title, description})
        // newPost.user = req.user.id
        await newPost.save()
        console.log(newPost)
        res.redirect('/posts')
        // res.send('ok')
    }
})
/*
 * LIST_POST
*/
router.get('/posts',async(req, res) =>{
    // Post.find({}, (err, posts)=>{
    //     if (err) return res.status(500).send({message: err})
    //     if (!posts) return res.status(404).send({message: 'Dont route this route'})
        
    //     res.render('posts/all-posts', {posts})
    // })

    const posts = await Post.find().sort({date: 'desc'})
    res.render('posts/all-posts', {posts})
})


/*
 * EDIT_NOTES
*/

router.get('/posts/edit/:id', async(req, res)=>{
    const post = await Post.findById(req.params.id) //se pasa el id que se esta obteniendo
    res.render('posts/edit-post', {post})
})


router.put('/posts/edit-post/:id', async(req, res)=>{
    const {title, description} = req.body
    await Post.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Post updated successfully')
    res.redirect('/posts')
 })
 

/*
 * DELETE_NOTES
*/

router.delete('/posts/delete/:id', async(req, res)=>{
    await Post.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Post deleted successfully')
    res.redirect('/posts')
})

module.exports = router
