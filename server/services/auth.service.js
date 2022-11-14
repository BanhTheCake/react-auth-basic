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

const login = (data, oldRefreshToken) => {
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
                    message: 'Username or password is incorrect!',
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

            let newRefreshTokenArr = oldRefreshToken
                ? currentUser.refreshToken.filter(
                      (rt) => rt !== oldRefreshToken
                  )
                : currentUser.refreshToken;

            if (oldRefreshToken) {
                const foundToken = await Users.findOne({
                    refreshToken: oldRefreshToken,
                }).exec();
                // That rf has been reused
                if (!foundToken) {
                    newRefreshTokenArr = [];
                }
            }

            currentUser.refreshToken = [...newRefreshTokenArr, refreshToken];
            await currentUser.save();
            resolve([accessToken, refreshToken, roles]);
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

            // Check username is exist in database
            const currentUser = await Users.findOne({
                refreshToken,
            }).exec();

            // Detected refresh token reused
            if (!currentUser) {
                handleToken
                    .decodeRefreshToken(refreshToken)
                    .then(async (decode) => {
                        // Logout all devices
                        const hackUser = await Users.findOne({
                            username: decode.username,
                        });
                        if (hackUser) {
                            hackUser.refreshToken = [];
                            await hackUser.save();
                        }
                        const err = new Error();
                        err.status = 401;
                        err.message = {
                            errCode: -1,
                            message: 'You are not authenticate !',
                        };
                        return reject(err);
                    })
                    .catch((_) => {
                        // Refresh token hack expired
                        return reject(err);
                    });
            } else {
                // Clear refresh token in database
                const newRefreshTokenArr = currentUser.refreshToken.filter(
                    (rt) => rt !== refreshToken
                );

                // Decode refresh token
                handleToken
                    .decodeRefreshToken(refreshToken)
                    .then(async (decode) => {
                        if (decode?.username !== currentUser.username) {
                            const err = new Error();
                            err.status = 401;
                            err.message = {
                                errCode: -1,
                                message: 'You are not authenticate !',
                            };
                            return reject(err);
                        }

                        // Get roles
                        const roles = [
                            ...Object.values({ ...currentUser.roles }),
                        ].filter((role) => role);

                        // Generate new access token for user
                        const newAccessToken = handleToken.createAccessToken({
                            username: currentUser.username,
                            roles,
                        });

                        const newRefreshToken = handleToken.createRefreshToken({
                            username: currentUser.username,
                        });

                        currentUser.refreshToken = [
                            ...newRefreshTokenArr,
                            newRefreshToken,
                        ];
                        await currentUser.save();

                        resolve([newAccessToken, newRefreshToken]);
                    })
                    .catch(async (err) => {
                        // expired rf token
                        currentUser.refreshToken = [...newRefreshTokenArr];
                        await currentUser.save();
                        return reject(err);
                    });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const handleLogout = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const foundUser = await Users.findOne({ refreshToken }).exec();
            if (!foundUser) {
                return resolve();
            }
            foundUser.refreshToken = foundUser.refreshToken.filter(
                (rt) => rt !== refreshToken
            );
            await foundUser.save();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const getCurrentUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await Users.findOne({ username: user }).exec();
            if (!currentUser) {
                const err = new Error();
                err.status(400);
                err.message = {
                    errCode: -1,
                    message: 'Username not exist !',
                };
                return reject(err);
            }
            resolve({
                errCode: 0,
                message: 'Ok',
                data: currentUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    register,
    login,
    refreshToken,
    handleLogout,
    getCurrentUser,
};
