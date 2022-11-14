const authService = require('../services/auth.service')

const register = async (req, res, next) => {
    try {
        const resData = await authService.register(req.body)
        return res.status(200).json(resData)
    } catch (error) {
    next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const [accessToken, refreshToken, roles] = await authService.login(req.body)

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            sameSite: 'None',
            secure: true
        })
        
        return res.status(200).json({
            errCode: 0,
            message: 'Login success !',
            data: {
                accessToken,
            }
        })
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies
        const [newAccessToken, roles] = await authService.refreshToken(refreshToken)
        return res.status(200).json({
            errCode: 0,
            message: 'Ok',
            accessToken: newAccessToken,
        })
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(200).json({
                errCode: 0,
                message: 'OK'
            })
        }

        // Delete refresh token in user database
        await authService.handleLogout(refreshToken)

        // Clear refresh token in cookies
        res.clearCookie('refreshToken', { httpOnly: true })
        return res.status(200).json({
            errCode: 0,
            message: 'OK'
        })
    } catch (error) {
        next(error)
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(400).json({
                errCode: -1,
                message: 'User is not exist '
            })
        }
        const resData = await authService.getCurrentUser(user)
        return res.status(200).json(resData)
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login, refreshToken, logout, getCurrentUser }