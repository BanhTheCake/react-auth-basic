require('dotenv').config();

const env = {
    MONGO_URL: process.env.MONGO_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_EX: process.env.ACCESS_TOKEN_EX,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    REFRESH_TOKEN_EX: process.env.REFRESH_TOKEN_EX,
};

const ROLES_LIST = {
    ADMIN: 5012,
    EDITOR: 1986,
    USER: 2001,
};

module.exports = { env, ROLES_LIST };
