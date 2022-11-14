const express = require('express')
const Route = express.Router()
const authController = require('../../controllers/auth.controller')
const authValidation = require('../../validations/auth.validation')
const authMiddleware = require('../../middleware/auth.middleware')

// Register
Route.post('/register',authValidation.register, authController.register)

// Login
Route.post('/login',authValidation.login, authController.login )

// Refresh token
Route.get('/refreshToken', authController.refreshToken)

// Log out
Route.get('/logout', authController.logout)

Route.get('/currentUser', authMiddleware.verifyToken, authController.getCurrentUser)

module.exports = Route