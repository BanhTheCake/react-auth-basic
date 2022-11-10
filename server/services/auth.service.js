const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const handleToken = require('../utils/handleToken');

const register = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if username has been exist in database
            const duplicate = await Users.findOne({
                username: data.username,
            }).exec();
            if (duplicate) {
                const err = new Error();
                err.status = 200;
                err.message = {
                    errCode: -1,
                    message: 'Username has been exist !',
                };
                return reject(err);
            }

            // Hash password
            const hashPassword = await bcrypt.hash(data.password, 10);
            const dataInsert = { ...data, password: hashPassword };

            // Create user
            await Users.create({ ...dataInsert });
            resolve({
                errCode: 0,
                message: 'Create user success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const login = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check username is exist in database
            const currentUser = await Users.findOne({
                username: data.username,
            }).exec();
            if (!currentUser) {
                const err = new Error();
                err.status = 200;
                err.message = {
                    errCode: -1,
                    message: 'Username or password is incorrect !',
                };
                return reject(err);
            }

            // Compare password
            const match = await bcrypt.compare(
                data.password,
                currentUser.password
            );
            if (!match) {
                const err = new Error();
                err.status = 200;
                err.message = {
                    errCode: -1,
                    message: 'Username or password is incorrect !',
                };
                return reject(err);
            }
            // Get roles
            const roles = [...Object.values({ ...currentUser.roles })].filter(
                (role) => role
            );

            // Generate access and refresh token
            const accessToken = handleToken.createAccessToken({
                username: currentUser.username,
                roles,
            });
            const refreshToken = handleToken.createRefreshToken({
                username: currentUser.username,
            });

            currentUser.refreshToken = refreshToken
            await currentUser.save()

            resolve([accessToken, refreshToken]);
        } catch (error) {
            reject(error);
        }
    });
};

const refreshToken = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!refreshToken) {
                const err = new Error();
                err.status = 401;
                err.message = {
                    errCode: -1,
                    message: 'You are not authenticate !',
                };
                return reject(err);
            }

            // Decode refresh token
            const dataDecode = handleToken.decodeRefreshToken(refreshToken);

            // Check username is exist in database
            const currentUser = await Users.findOne({
                username: dataDecode.username,
                refreshToken: refreshToken
            }).exec();

            if (!currentUser) {
                const err = new Error();
                err.status = 401;
                err.message = {
                    errCode: -1,
                    message: 'You are not authenticate !',
                };
                return reject(err);
            }

            // Get roles
            const roles = [...Object.values({ ...currentUser.roles })].filter(
                (role) => role
            );

            // Generate new access token for user
            const newAccessToken = handleToken.createAccessToken({
                username: currentUser.username,
                roles,
            });

            resolve(newAccessToken);
        } catch (error) {
            reject(error);
        }
    });
};

const handleLogout = (refreshToken) => {
    return new Promise( async (resolve, reject) => {
        try {
            const foundUser = await Users.findOne({ refreshToken }).exec()
            if (!foundUser) {
                return resolve()
            }
            foundUser.refreshToken = ''
            await foundUser.save()
            resolve()
        } catch (error) {
            
        }
    })
}

module.exports = { register, login, refreshToken, handleLogout };
