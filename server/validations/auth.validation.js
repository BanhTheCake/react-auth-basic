const yup = require('yup');

const handleError = (error) => {
    const errorMsgs = error.errors;
    const errorNames = [...error.inner.map((err) => err.path)];
    const errorLogs = {};
    errorNames.forEach((errName, index) => {
        errorLogs[errName] = errorMsgs[index];
    });
    return errorLogs
};

const register = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            username: yup
                .string('Username must be string !')
                .required('Username must be required !'),
            password: yup
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

const login = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            username: yup
                .string('Username must be string !')
                .required('Username must be required !'),
            password: yup
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


module.exports = { register, login };
