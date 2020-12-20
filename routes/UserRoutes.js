const express = require('express')
const router = express.Router()

const Authenticator = require('Authenticator')

const {register, getCurrentUser, getUsers} = require('../Controllers/Users/UserController')

//http://localhost:3000/users/
//http://localhost:3000/users/my-info 
//De la ruta mas especifica a la mas general || de la mas corta a la mas larga
router.get('/', getUsers)
//A donde se ejecuta la autenticacion
router.get('/my-info', Authenticator ,getCurrentUser)
//http://localhost:3000/users/register
router.post('/register', register)
//debe ser tipo login porque  va a enviar dato
router.post('/login', login)

module.exports = router