'use strict'

const express = require('express')
const router = express.Router()

const Ong  = require('../models/ong')
const {isAuthenticated} = require('../helpers/auth')

/*
 * NEW_ONG
*/
router.get('/ongs/add', (req, res)=>{
    res.render('ongs/new-ong')
})

router.post('/ongs/new-ong', async(res, req) => {
    console.log(req.body)
    const { title, description, image } = req.body
    const errors = []

    if (!title){
        errors.push({text: 'Insert a title'})
    }
    if (!description){
        errors.push({text: 'Insert a description'})
    }
    if (!image){
        errors.push({text: 'Insert a image'})
    }
    if (errors.length > 0) {
        res.render('ongs/new-ong', {
            errors,
            title,
            description,
            image
        })
    } else {
        const newOng = new Ong({title, description,image})
        newOng.user = req.user.id // se enlaza nota con id-user
        await newOng.save()
        req.flash('success_msg', 'Ong added successfully')
        console.log(newOng)
        res.redirect('/ongs')
    }
})

/*
 * LIST_ONG
*/
router.get('/ongs',function(req, res) {
    res.render('ongs/all-ongs')
})

module.exports = router