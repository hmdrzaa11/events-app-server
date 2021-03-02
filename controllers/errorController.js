import AppError from "../utils/AppError.js";

let handleValueErrors = (err) => {
  let message = Object.values(err.errors)
    .map((errObj) => errObj.message)
    .join(" , ");
  let error = new AppError(message, 400);
  return error;
};

export default (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err = handleValueErrors(err);
  }
  let statusCode = err.statusCode || 500;
  let responseStatus = err.status || "Error";
  res.status(statusCode).json({
    status: responseStatus,
    error: err.message,
    errorObj: err,
  });
};
