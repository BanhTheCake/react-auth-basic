const handleError = (err, req, res, next) => {
    let status = err?.status || 500
    let message = err?.message || 'Something wrong with server !';

    if (message === 'jwt expired') {
        status = 401
    }

    if (!message?.errCode) {
        return res.status(status).json({
            errCode: -1,
            message
        })
    }

    return res.status(status).json(message)

}

module.exports = handleError