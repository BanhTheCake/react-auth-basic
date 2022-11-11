import * as yup from 'yup';

const registerSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    password: yup
        .string()
        .required('Password is required!')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    cfpassword: yup
        .string()
        .required('Confirm Password is required!')
        .oneOf([yup.ref('password')], 'Passwords do not match!'),
});

const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    password: yup
        .string()
        .required('Password is required!')
});

export { registerSchema, loginSchema }