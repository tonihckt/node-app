'use strict'

const express = require('express')
const router = express.Router()

const Note  = require('../models/note')
const {isAuthenticated} = require('../helpers/auth')

/*
 * NEW_NOTES (send-receive the data)
*/
router.get('/notes/add', isAuthenticated, (req, res)=>{
    res.render('notes/new-note')
})

router.post('/notes/new-note', isAuthenticated, async(req, res)=>{
    console.log(req.body)
    const { title, description } = req.body
    const errors = []
    if (!title){
        errors.push({text: 'Insert a title'})
    }
    if (!title){
        errors.push({text: 'Insert a description'})
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({title, description})
        newNote.user = req.user.id // se enlaza nota con id-user
        await newNote.save()
        req.flash('success_msg', 'Note added successfully')
        console.log(newNote)
        res.redirect('/notes')
    }
})


/*
 * LIST_NOTES
*/
router.get('/notes', isAuthenticated, async(req, res)=>{
    // busca y ordena los datos (de + a -)
    // trae notas que coindice con el user.id (usuario autetificado)
   const notes = await Note.find({user: req.user.id}).sort({date: 'desc'})
   res.render('notes/all-notes', {notes}) // each en all-notes.hbs
})


/*
 * EDIT_NOTES
*/
router.get('/notes/edit/:id', async(req, res)=>{
    const note = await Note.findById(req.params.id) //se pasa el id que se esta obteniendo
    res.render('notes/edit-note', {note})
})

router.put('/notes/edit-note/:id', isAuthenticated, async(req, res)=>{
   const {title, description} = req.body
   await Note.findByIdAndUpdate(req.params.id, {title, description})
   req.flash('success_msg', 'Note updated successfully')
   res.redirect('/notes')
})


/*
 * DELETE_NOTES
*/
router.delete('/notes/delete/:id', isAuthenticated, async(req, res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted successfully')
    res.redirect('/notes')
})

module.exports = router

