const handleError = (err, req, res, next) => {
    const status = err?.status || 500
    const message = err?.message || 'Something wrong with server !';

    if (!message?.errCode) {
        return res.status(status).json({
            errCode: -1,
            message
        })
    }
    return res.status(status).json(message)

}

module.exports = handleError