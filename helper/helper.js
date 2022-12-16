exports.success = (res, status, message, statusCode, data = null, extra) => {
    let response = "";

    response = {

        meta: {
            status: status,
            message: message,
            ...extra
        },
        data: data,
        statusCode: statusCode
    }

    return res.send(response);
}


exports.error = (res, message, statusCode) => {

    let response ;
    response = {
        message: message,
        statusCode: statusCode
    }
    return res.status(statusCode).send(response);
}
