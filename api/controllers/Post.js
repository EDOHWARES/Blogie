const PostModel = require("../models/Post");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// Create Post
const post = async (req, res) => {
  try {
    const { title, summary, content } = req.body;

    const postExists = await PostModel.findOne({ title });
    if (postExists) {
      return res.json({
        success: false,
        message: "Post already exists!",
      });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    // Retrieve author's name using synchronous JWT verification
    const { token } = req.cookies;
    let author = "unknown"; // default to 'unknown' in case there's an issue
    try {
      const info = jwt.verify(token, process.env.JWT_SECRET_KEY);
      author = info; // assuming the JWT contains 'username'
    } catch (err) {
      console.log("JWT verification error:", err);
    }

    const newPost = new PostModel({
      title,
      summary,
      file: newPath,
      content,
      author, // This will be set to 'unknown' if JWT verification fails
    });

    const post = await newPost.save();

    return res.json({
      success: true,
      message: "Post successfully created",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
    console.log(error);
  }
};

// Get Post
const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error.me,
    });
  }
};


// View a Post
const viewPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// Update Post
const updatePost = async (req, res) => {
  let newPath;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await PostModel.findById(id);
    const isAuthor = postDoc.author.id === info.id;
    if (!isAuthor) {
      return res.status(400).json({
        success: false,
        message: "You're not the author",
      });
    }

    await postDoc.updateOne({ 
      title, 
      summary, 
      content ,
      file: newPath?newPath : postDoc.file,
    });

    res.json({
      success: true,
      message: 'Post Updated Successfully'
    })

  });
};

module.exports = {
  post,
  getPosts,
  viewPost,
  updatePost,
};
