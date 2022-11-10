const handleToken = require('../utils/handleToken')

const verifyToken = (req, res, next) => {
    try {
        // Check if token is valid
        const reqToken = req.headers['Authorization'] || req.headers['authorization']
        if (!reqToken?.startsWith('Bearer ')) {
            const err = new Error()
            err.status = 400
            err.message = {
                errCode: -1,
                message: 'Token invalid !'
            }
            next(err)
        }  

        // Decode access token
        const accessToken = reqToken.split(' ')[1]
        const dataDecode = handleToken.decodeAccessToken(accessToken)

        req.user = dataDecode.username
        req.roles = dataDecode.roles

        next()
    } catch (error) {
        next(error)
    }
}

const verifyRoles = (allowRoles) => {
    return (req, res, next) => {
        try {
            const roles = req.roles
            if (!roles) {
                const err = new Error()
                err.status = 401
                err.message = {
                    errCode: -1,
                    message: 'You are not authenticate !'
                }
                next(err)
            }
            const rolesArray = [...req.roles]
            const result = rolesArray.filter(role => allowRoles.includes(role))
            if (!result.length) {
                const err = new Error()
                err.status = 401
                err.message = {
                    errCode: -1,
                    message: 'You are not permission to do this !'
                }
                next(err)
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { verifyToken, verifyRoles }