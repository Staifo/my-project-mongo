const express = require('express')
const authenticationRouter = express.Router();

const authenticationcontroller = require('../controllers/authenticationController')

authenticationRouter.post('/login', authenticationcontroller.login)

module.exports = authenticationRouter