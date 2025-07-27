//This code defines a middleware function called logErrors for use in an Express.js application. 
// It logs the stack trace of any error to the console using console.error(), 
// then passes the error to the next middleware in the stack by calling next(error).
exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
};

//This code defines two Express error-handling functions: respondNoResourceFound handles 404 errors by sending a static HTML file (404.html)
//  from the public folder when a resource isn't found, 
// while respondInternalError handles server errors by logging the error stack and sending a plain text 500 error message to the client.
//  It uses the http-status-codes package for clear, named status codes.

const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.StatusCodesNOT_FOUND;

    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {
        root: "./"
    });
};

exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`)

    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};