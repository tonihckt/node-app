'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PostSchema = new Schema ({
    title: {type: String, require: true},
    description: {type: String, require: true},
    content: {type: String, require: true},
    image: {type: String, require: true},
    autor: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        usermane:{type: String, require: true},
    },
    date: {type: Date, default: Date.now},
})


module.exports = mongoose.model('Post', PostSchema)