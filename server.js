import app from "./index.js";
import path, { dirname } from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
//.env config
dotenv.config({
  path: fileURLToPath(path.join(dirname(import.meta.url), ".env")),
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
