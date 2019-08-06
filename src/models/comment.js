'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema ({
	text: { type: String, trim: true, validate: validateText },
	post: { type: ObjectId, index: true },
	author: {type: String, require: true},
	created: { type: Date, default: Date.now }
})

function validateText (str) {
	return str.length < 250
}

module.exports = mongoose.model('Comment', CommentSchema)