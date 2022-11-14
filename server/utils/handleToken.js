const jwt = require('jsonwebtoken');
const { env } = require('./variables');

// Access Token
const createAccessToken = (data) => {
    return jwt.sign(data, env.ACCESS_TOKEN, { expiresIn: env.ACCESS_TOKEN_EX });
};

const decodeAccessToken = (token) => {
    try {
        const data = jwt.verify(token, env.ACCESS_TOKEN);
        return data
    } catch (error) {
        const err = new Error()
        err.status = 401
        err.message = {
            errCode: -1,
            message: error.message
        }
        throw err
    }
};

// Refresh Token
const createRefreshToken = (data) => {
    return jwt.sign(data, env.REFRESH_TOKEN, {
        expiresIn: env.REFRESH_TOKEN_EX,
    });
};

// const decodeRefreshToken = (token) => {
//     try {
//         const data = jwt.verify(token, env.REFRESH_TOKEN);
//         return data
//     } catch (error) {
//         const err = new Error()
//         err.status = 401
//         err.message = {
//             errCode: -1,
//             message: error.message
//         }
//         throw err
//     }
// };

const decodeRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const data = jwt.verify(token, env.REFRESH_TOKEN);
            resolve(data)
        } catch (error) {
            const err = new Error()
            err.status = 401
            err.message = {
                errCode: -1,
                message: error.message
            }
            reject(err)
        }
    })
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeAccessToken,
    decodeRefreshToken,
};
