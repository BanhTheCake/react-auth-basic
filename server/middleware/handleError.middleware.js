const handleError = (err, req, res, next) => {
    let status = err?.status || 500
    let message = err?.message || 'Something wrong with server !';

    if (!message?.errCode) {
        console.log(err);
        return res.status(status).json({
            errCode: -1,
            message
        })
    }

    return res.status(status).json(message)

}

module.exports = handleError