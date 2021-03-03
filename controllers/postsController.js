let catchAsync = require("../utils/catchAsync.js");
let AppError = require("../utils/AppError.js");
let deletePic = require("../utils/deletePic.js");
let Post = require("../models/Post.js");
let multer = require("multer");
let path = require("path");

//***************************** Multer *******************************/

let multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    let filePath = path.join(__dirname, "../public/images/events");
    cb(null, filePath);
  },
  filename(req, file, cb) {
    let extension = file.mimetype.split("/")[1];
    let filename = `event-${
      file.originalname.split(".")[0]
    }-${Date.now()}.${extension}`;
    cb(null, filename);
  },
});

let fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  } else {
    let err = new AppError("file not supported please upload an image");
    return cb(err, false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter,
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  let allPosts = await Post.find();
  res.status(200).json({
    status: "success",
    posts: allPosts,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.image = req.file ? req.file.filename : "default.jpg";
  let post = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  let data = Object.assign(req.body);
  let post = await Post.findById(req.params.postId);
  if (!post) {
    return next(new AppError("no event related to this id", 404));
  }
  if (!req.file) {
    data.image = post.image;
  } else {
    await deletePic(post.image);
    data.image = req.file.filename;
  }

  let updatePost = await Post.findByIdAndUpdate(post._id, data, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    post: updatePost,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  let post = await Post.findByIdAndDelete(req.params.postId);

  if (!post) {
    return next(new AppError("no event related to this id", 404));
  }

  await deletePic(post.image);

  res.status(204).json({
    status: "success",
  });
});

exports.getSinglePost = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.postId);
  if (!post) {
    return next(new AppError("no event related to this id", 404));
  }
  res.status(200).json({
    status: "success",
    post,
  });
});

exports.addLikes = catchAsync(async (req, res, next) => {});
