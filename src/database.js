'use strict'
/**
 * **********************************
 * MONGOOOSE 
 * **********************************
**/

// Agregar modulos de node_modules
 const mongoose = require('mongoose'); //(acceder a la base de datos Y crear esquemas...)

 mongoose.connect('mongodb://localhost/wecker-app', {
     useNewUrlParser: true,
     useFindAndModify: true,
     useCreateIndex: true
})
    .then (() => { 
        // console.log (`Back-end mongo listening port -> http://localhost:27017`)
        console.log('Conección a la base de datos establecida...')
    })
    .catch ((err) => { 
        console.log(`Error al conectar a al base de datos: ${err}`)
    })