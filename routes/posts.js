let express = require("express");
let {
  createPost,
  getAllPosts,
  upload,
  updatePost,
  deleteEvent,
  getSinglePost,
  addLikes,
} = require("../controllers/postsController.js");
let isAuthenticated = require("../middlewares/isAuthenticated.js");

let postRouter = express.Router();

postRouter
  .route("/")
  .get(getAllPosts)
  .post(isAuthenticated, upload.single("image"), createPost);

postRouter.patch("/:postId/like", addLikes);

postRouter
  .route("/:postId")
  .patch(isAuthenticated, upload.single("image"), updatePost)
  .delete(isAuthenticated, deleteEvent)
  .get(getSinglePost);

module.exports = postRouter;
