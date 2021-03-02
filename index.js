import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRouter from "./routes/posts.js";
import errorController from "./controllers/errorController.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

let app = express();

//cors
app.use(cors());
//body-parser
app.use(bodyParser.json({ limit: "30mb" }));

//public
app.use(
  express.static(path.join(fileURLToPath(dirname(import.meta.url)), "public"))
);

//routes
app.use("/api/v1/posts", postRouter);

//error handler
app.use(errorController);

export default app;
