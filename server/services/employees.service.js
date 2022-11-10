const Employees = require('../models/employee.model');
const ObjectId = require('mongoose').Types.ObjectId;

const createNewEmployee = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const duplicate = await Employees.findOne({
                firstName: data.firstName,
                lastName: data.lastName,
            }).exec();
            if (duplicate) {
                const err = new Error();
                err.status = 200;
                err.message = {
                    errCode: -1,
                    message: 'Employee has been exist in out system !',
                };
                return reject(err);
            }
            const newEmployee = await Employees.create({ ...data });
            resolve({
                errCode: 0,
                message: 'Create employee success',
                data: newEmployee,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllEmployees = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allEmployees = await Employees.find({}).exec();
            resolve({
                errCode: 0,
                message: 'Ok',
                data: allEmployees,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateEmployee = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check id is valid or not
            const isValidId = ObjectId.isValid(id);
            if (!isValidId) {
                const err = new Error();
                err.status = 400;
                err.message = {
                    errCode: -1,
                    message: 'Employee Id is not valid !',
                };
                return reject(err);
            }

            const updateEmployee = await Employees.findOneAndUpdate(
                { _id: id },
                { ...data },
                { new: true }
            ).exec();

            resolve({
                errCode: 0,
                message: 'Update employee success !',
                data: updateEmployee,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check id is valid or not
            const isValidId = ObjectId.isValid(id);
            if (!isValidId) {
                const err = new Error();
                err.status = 400;
                err.message = {
                    errCode: -1,
                    message: 'Employee Id is not valid !',
                };
                return reject(err);
            }

            await Employees.findOneAndRemove({ _id: id }).exec();

            resolve({
                errCode: 0,
                message: 'Delete employee success !',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
};
