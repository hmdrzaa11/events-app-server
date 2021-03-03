let express = require("express");
let path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
let bodyParser = require("body-parser");
let cors = require("cors");
let postRouter = require("./routes/posts.js");
let userRouter = require("./routes/users.js");
let errorController = require("./controllers/errorController.js");

let app = express();

//cors
app.use(cors());
//body-parser
app.use(bodyParser.json({ limit: "30mb" }));

//public
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

//error handler
app.use(errorController);

module.exports = app;
