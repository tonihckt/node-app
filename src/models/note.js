'use strict'
const mongoose = require('mongoose'); //(acceder a la db-crear esquemas..)
// const Schema = mongoose.Schema
const { Schema } = mongoose

const NoteSchema = new Schema ({
    title: {type: String, require: true},
    description: {type: String, require: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
})

// registrar y exportar model
module.exports = mongoose.model('Note', NoteSchema)