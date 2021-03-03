let AppError = require("../utils/AppError.js");

let handleValueErrors = (err) => {
  let message = Object.values(err.errors)
    .map((errObj) => errObj.message)
    .join(" , ");
  let error = new AppError(message, 400);
  return error;
};

let handleInvalidToken = (err) => {
  return new AppError("invalid token please login again", 402);
};
let handleTokenExpire = (err) => {
  return new AppError("invalid token please login again", 402);
};

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err = handleValueErrors(err);
  }
  if (err.name === "JsonWebTokenError") {
    err = handleInvalidToken(err);
  }
  if (err.name === "TokenExpiredError") {
    err = handleTokenExpire(err);
  }
  let statusCode = err.statusCode || 500;
  let responseStatus = err.status || "Error";
  res.status(statusCode).json({
    status: responseStatus,
    error: err.message,
    errorObj: err,
  });
};
