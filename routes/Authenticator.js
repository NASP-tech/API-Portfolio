const jwt = require('jsonwebtoken')

function Authenticate(req, res, next) {
    console.log(`Ejecutando Middleware`)
    const token = req.header('Authorize')

    if(!token)
        return res.status(401).json({error: true, message: "Access Denied"})

    try{
        //verifica y descriptar
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = verified
        next()
        //En pausa 
        /**
         * TODO:
         * Terminar la funcion (middelware)
         * Ejecutar NEXT
         */

    }
    catch(err) {
        return res.status(400).json({error: true, message: "Invalid Token"})

    }
}

module.exports = Authenticate