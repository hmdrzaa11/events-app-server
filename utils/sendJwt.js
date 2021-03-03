let jwt = require("jsonwebtoken");

module.exports = (res, user, statusCode) => {
  let token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    user,
    token,
  });
};
