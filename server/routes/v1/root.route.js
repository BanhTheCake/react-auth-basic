const express = require('express')
const Route = express.Router()
const authRoute = require('./auth.route')

// Route authenticate
Route.use('/auth', authRoute)

module.exports = Route