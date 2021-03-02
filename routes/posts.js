import express from "express";
import {
  createPost,
  getAllPosts,
  upload,
  updatePost,
  deleteEvent,
  getSinglePost,
} from "../controllers/postsController.js";

let postRouter = express.Router();

postRouter.route("/").get(getAllPosts).post(upload.single("image"), createPost);

postRouter
  .route("/:postId")
  .patch(upload.single("image"), updatePost)
  .delete(deleteEvent)
  .get(getSinglePost);

export default postRouter;
