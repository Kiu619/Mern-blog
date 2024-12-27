export const errorHandlingMiddleware = (error, req, res, next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    const responseError = {
        statusCode: error.statusCode,
        message: error.message,
        stack: error.stack,

    }
    return res.status(error.statusCode).json(responseError);
}