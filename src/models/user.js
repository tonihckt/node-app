'use strict'
const mongoose = require('mongoose'); //(acceder a la db-crear esquemas..)
const { Schema } = mongoose
const bcrypt = require('bcryptjs')


const UserSchema = new Schema ({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    date: {type: Date, default: Date.now},
})


UserSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10) // lo ejecuta 10 veces y devuelve un hash
    const hash = bcrypt.hash(password, salt) //ontenemos al contraseña cifrada
    return hash
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// registrar y exportar model
module.exports = mongoose.model('User', UserSchema)