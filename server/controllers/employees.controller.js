const employeesService = require('../services/employees.service')

const createNewEmployee = async (req, res, next) => {
    try {
        const resData = await employeesService.createNewEmployee(req.body)
        return res.status(200).json(resData)
    } catch (error) {
        next(error)
    }
}

const getAllEmployees = async (req, res, next) => {
    try {
        const resData = await employeesService.getAllEmployees()
        return res.status(200).json(resData)
    } catch (error) {
        next(error)
    }
}

const updateEmployee = async (req, res, next) => {
    try {
        const resData = await employeesService.updateEmployee(req.params.id, req.body)
        return res.status(200).json(resData)
    } catch (error) {
        next(error)
    }
}

const deleteEmployee = async (req, res, next) => {
    try {
        const resData = await employeesService.deleteEmployee(req.params.id)
        return res.status(200).json(resData)
    } catch (error) {
        next(error)
    }
}

module.exports = { createNewEmployee, getAllEmployees, updateEmployee, deleteEmployee }