let express = require("express");
let { signInUser, signupUser } = require("../controllers/userController.js");
let userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/signin", signInUser);

module.exports = userRouter;
