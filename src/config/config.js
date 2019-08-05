module.exports ={
    // Si existe un puerto que lo use sino el asignado
    port: process.env.PORT || 5747,
    mongoPort: process.env.PORT || 27017,
    mongoUri: process.env.MONGODB || `mongodb://localhost:27017`,  // mongodb://localhost - will fail   
    SECRET_TOKEN: 'miClaveDeTokens'
}