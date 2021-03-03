let app = require("./index.js");
let path = require("path");
let mongoose = require("mongoose");
let dotenv = require("dotenv");

//.env config
dotenv.config({
  path: path.join(__dirname, ".env"),
});
let PORT = process.env.PORT || 8000;
//db connection

let server = app.listen(PORT, "localhost", () =>
  console.log(`Server on port ${PORT}`)
);

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB in the House!");
  } catch (error) {
    console.log(error);
    server.close(() => {
      process.exit(1);
    });
  }
}
connectToDB();
