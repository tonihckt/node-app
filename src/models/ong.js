'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose

const OngSchema = new Schema ({
    title: {type: String, require: true},
    description: {type: String, require: true},
    image: {type: String, require: true},
    date: {type: Date, default: Date.now},
})

// registrar y exportar model
module.exports = mongoose.model('Ong', OngSchema)