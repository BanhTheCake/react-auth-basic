const yup = require('yup');

const handleError = (error) => {
    const errorMsgs = error.errors;
    const errorNames = [...error.inner?.map((err) => err.path)];
    const errorLogs = {};
    errorNames.forEach((errName, index) => {
        errorLogs[errName] = errorMsgs[index];
    });
    return errorLogs;
};

const createNewEmployee = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            firstName: yup
                .string('Username must be string !')
                .required('Username must be required !'),
            lastName: yup
                .string('Password must be string !')
                .required('Password must be required !'),
        });
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const err = new Error();
        err.status = 404;
        err.message = {
            errCode: -1,
            message: handleError(error),
        };
        next(err);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            firstName: yup.string('Username must be string !'),
            lastName: yup.string('Password must be string !'),
            id: yup
                .string('Password must be string !')
                .required('Id employee must be required !'),
        });
        await schema.validate(
            { ...req.body, id: req.params.id },
            { abortEarly: false }
        );
        next();
    } catch (error) {
        const err = new Error();
        err.status = 404;
        err.message = {
            errCode: -1,
            message: handleError(error),
        };
        next(err);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            id: yup
                .string('Password must be string !')
                .required('Id employee must be required !'),
        });
        await schema.validate(req.params, { abortEarly: false });
        next();
    } catch (error) {
        const err = new Error();
        err.status = 404;
        err.message = {
            errCode: -1,
            message: handleError(error),
        };
        next(err);
    }
};

module.exports = { createNewEmployee, updateEmployee, deleteEmployee };
