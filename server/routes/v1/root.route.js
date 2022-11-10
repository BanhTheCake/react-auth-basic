const express = require('express')
const Route = express.Router()
const authRoute = require('./auth.route')
const employeesRoute = require('./employees.route')
const authMiddleware = require('../../middleware/auth.middleware')

// Route authenticate
Route.use('/auth', authRoute)

// Route employees
Route.use('/employees', authMiddleware.verifyToken, employeesRoute)

module.exports = Route