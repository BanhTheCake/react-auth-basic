const express = require('express')
const Route = express.Router()
const authRoute = require('./auth.route')
const employeesRoute = require('./employees.route')

// Route authenticate
Route.use('/auth', authRoute)

// Route employees
Route.use('/employees', employeesRoute)

module.exports = Route