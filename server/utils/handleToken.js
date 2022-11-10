const jwt = require('jsonwebtoken');
const { env } = require('./variables');

// Access Token
const createAccessToken = (data) => {
    return jwt.sign(data, env.ACCESS_TOKEN, { expiresIn: env.ACCESS_TOKEN_EX });
};

const decodeAccessToken = (token) => {
    return jwt.verify(token, env.ACCESS_TOKEN);
};

// Refresh Token
const createRefreshToken = (data) => {
    return jwt.sign(data, env.REFRESH_TOKEN, {
        expiresIn: env.REFRESH_TOKEN_EX,
    });
};

const decodeRefreshToken = (token) => {
    return jwt.verify(token, env.REFRESH_TOKEN);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeAccessToken,
    decodeRefreshToken,
};
