require('dotenv').config()

const env = {
    MONGO_URL: process.env.MONGO_URL
}

const ROLES_LIST = {
    ADMIN: 5012,
    EDITOR: 1986,
    USER: 2001
}

module.exports = { env, ROLES_LIST }