let User = require("../models/User.js");
let catchAsync = require("../utils/catchAsync.js");
let AppError = require("../utils/AppError.js");
let sendJwt = require("../utils/sendJwt.js");

exports.signupUser = catchAsync(async (req, res, next) => {
  let { username, password, passwordConfirm, email } = req.body;
  let newUser = await User.create({
    username,
    password,
    passwordConfirm,
    email,
  });
  sendJwt(res, newUser, 201);
});

exports.signInUser = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("invalid email or password", 400));
  }
  let isPasswordMatch = await user.passwordMatch(password);
  if (!isPasswordMatch) {
    return next(new AppError("invalid email or password", 400));
  }
  sendJwt(res, user, 200);
});
