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

router.post('/ongs/new-ong', async (req, res)=>{
    console.log(req.body)
    // res.send("Rendering file")
    const { name, description } = req.body
    // recomendable usar expres validator
    const errors = []
    if (!name){
        errors.push({text: 'Insert a name'})
    }
    if (!description){
        errors.push({text: 'Insert a description'})
    }
    // rederizamos la vista
    if (errors.length > 0){
        res.render('ongs/new-ong', {
            errors,
            name,
            description
        })
    } else {
        const newOng = new Ong({name, description})
        // console.log(newOng)
        await newOng.save()
        res.redirect('/ongs')
    }
})


/*
 * LIST_ONG (cosulta con la bae de datos)
*/
router.get('/ongs',async (req, res)=> {
   const ongs = await Ong.find().sort({date:'desc'})
   res.render('ongs/all-ongs', {ongs})
})


/*
 * EDIT_ONG
*/
router.get('/ongs/edit/:id',async (req, res)=> {
    const ong = await Ong.findById(req.param.id)
    res.render('ongs/edit-ong', {ong})
 })

router.put('/ongs/edit-ong/:id', async(res, req)=>{
    const { name, description } = req.body
    await Ong.findByIdAndUpdate(req.param.id, {name, description})
    req.flash('success_msg', 'Ong updated successfully')
    res.redirect('/ongs')
})

/*
 * DELETE_ONGS
*/
router.delete('/ongs/delete/:id', async(req, res)=>{
    await Ong.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Ong deleted successfully')
    res.redirect('/ongs')
})


module.exports = router