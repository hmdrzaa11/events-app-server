let mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },

  author: {
    type: String,
    required: [true, "author is required"],
  },
  tags: [String],
  image: { type: String, required: [true, "image is required"] },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Post = mongoose.model("Post", postSchema);

module.exports = Post;
