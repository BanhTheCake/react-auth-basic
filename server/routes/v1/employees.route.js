const express = require('express');
const Route = express.Router();
const employeesController = require('../../controllers/employees.controller');
const employeesValidation = require('../../validations/employees.validation');

// Create new employee
Route.post(
    '/createNewEmployee',
    employeesValidation.createNewEmployee,
    employeesController.createNewEmployee
);

// Update one employee by id
Route.put('/:id', employeesValidation.updateEmployee, employeesController.updateEmployee)

// Delete one employee by id
Route.delete('/:id', employeesValidation.deleteEmployee, employeesController.deleteEmployee)

// Get all employees
Route.get('/', employeesController.getAllEmployees)

module.exports = Route;
