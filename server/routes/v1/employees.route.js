const express = require('express');
const Route = express.Router();
const employeesController = require('../../controllers/employees.controller');
const employeesValidation = require('../../validations/employees.validation');
const authMiddleware = require('../../middleware/auth.middleware');
const { ROLES_LIST } = require('../../utils/variables');

// Create new employee
Route.post(
    '/createNewEmployee',
    authMiddleware.verifyRoles([ROLES_LIST.ADMIN, ROLES_LIST.EDITOR]),
    employeesValidation.createNewEmployee,
    employeesController.createNewEmployee
);

// Update one employee by id
Route.put(
    '/:id',
    authMiddleware.verifyRoles([ROLES_LIST.ADMIN, ROLES_LIST.EDITOR]),
    employeesValidation.updateEmployee,
    employeesController.updateEmployee
);

// Delete one employee by id
Route.delete(
    '/:id',
    authMiddleware.verifyRoles([ROLES_LIST.ADMIN]),
    employeesValidation.deleteEmployee,
    employeesController.deleteEmployee
);

// Get all employees
Route.get(
    '/',
    authMiddleware.verifyRoles([ROLES_LIST.ADMIN, ROLES_LIST.EDITOR, ROLES_LIST.USER]),
    employeesController.getAllEmployees
);

module.exports = Route;
