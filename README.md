-> npm install
-> npm run start 
    * http://localhost:5747

PETICONES API REST FULL -> 
    - GET(lectura) / los datos viajan en la cabecera
      * Pedir datos al servidor desde la url
    - POST(escritura) / los datos viajan en cuerpo 
      * Enviar datos al servidor para registrarla en un base de datos
    - PUT(actualización) / Hacer un update de un recurso
    - DELETE(borrado) / Pedicion por parte del cliente para borrar ciertos datos
    
    /////////////////////////////
    //// CODIGO DE RESPUESTA ////
    /////////////////////////////
        * 200 -> OK
        * 300 -> cuando hay redireccion
        * 404 -> no existe el recurso
        * 403 -> acceso restringido
        * 500 -> error en el servidor
  
    /////////////////////////////
    //// Instalar u arrancar mongo ////
    /////////////////////////////
    1 -> https://brew.sh/
    2 -> brew update
    3 -> brew install mongodb
    4 -> mkdir -p /data/db
    5 -> sudo chown -R `id -un` /data/db
    6 -> sudo.
    // ejecutar en dos terminales
    7 -> mongod (servidor)
    8 -> mongo (acceder a la bd)

    /////////////////////////////
    //// mongo - consola ////
    /////////////////////////////
    use name-data-base
    show collections -> ver tablas
    bd.name-table.find() -> ver contenido almacenado