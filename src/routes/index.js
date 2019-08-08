'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/about', (req, res)=>{
    res.render('about')
})

router.get('/contact', (req, res)=>{
    res.render('contact')
})

router.get('/entities', (req, res)=>{
    res.render('entities')
})

router.get('/blog', (req, res)=>{
    res.render('blog')
})

/// cuando buscas cualquier ruta - parecido a un error 404 
// router.get('*', (req, res) => {
//     res.send('Dont route this route')
// })

module.exports = router



