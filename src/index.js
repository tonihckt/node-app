'use strict'
/**
 * **********************************
 * API EXPRESS 
 * **********************************
**/

// Agregar modulos de node_modules
const express = require('express')
const path = require('path')
const hbs  = require('express-handlebars')
const methodOverride = require("method-override")
const session = require('express-session')
const flash = require('connect-flash') // muestra mensajes
const passport = require ('passport') // inicia session con redes sociales


/*
 * INITILIAZATIONS
*/
const app = express()
// Agregar modulos locales
require('./database')
require('./config/passport')


/*
 * SETTINGS
*/
app.set('port', process.env.PORT || 5747)
app.set('views', path.join(__dirname, 'views'))
//config motor de plantillas
app.engine('.hbs', hbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
app.set('view engine', '.hbs')


/*
 * MIDDLEWARES
*/
app.use(express.urlencoded({
    extended: false,
}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


/*
 * GLOBAL VARIABLES
*/
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    // si el usuario se autentificado
    res.locals.user = req.user || null
    next()
})


/*
 * ROUTES
*/
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))


/*
 * STATICS FILES
*/
app.use(express.static(path.join(__dirname, 'public')))


/*
 * SERVER LISTENER
*/
app.listen(app.get('port'),()=>{
    console.log(`Front-end listening port -> http://localhost:${app.get('port')}`)
});