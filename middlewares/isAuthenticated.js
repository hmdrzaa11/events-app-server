let jwt = require("jsonwebtoken");
let AppError = require("../utils/AppError.js");
let catchAsync = require("../utils/catchAsync.js");
let User = require("../models/User");
const GoogleUser = require("../models/GoogleUser.js");

module.exports = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    //token
    token = req.headers["authorization"].split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you are not authorized to access this route", 400)
    );
  }

  let isJwt = token.length < 500; //it means that token is jwt

  if (isJwt) {
    //here we decode data
    let { userId } = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userId);
    if (!user) {
      return next(new AppError("there is no user related to this token", 402));
    }

    req.userId = user._id; //store the user in the req
    next();
  } else {
    //in this case its probably google token we can decode it and check the db for the user if there is a user already attach that to the req
    //if there is not you carate a new user with that id
    let data = jwt.decode(token);
    if (!data) {
      return next(new AppError("invalid token please login again", 402));
    }
    req.userId = data.sub;
    next();
  }
});
