const express = require('express')
const router = express.Router()

const {register} = require('../Controllers/Users/UserController')

//http://localhost:3000/users/register
router.post('/register', register)

module.exports = router