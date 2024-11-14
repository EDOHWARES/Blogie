const PostModel = require('../models/Post');
const fs = require('fs');

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
      author = info["username"]; // assuming the JWT contains 'username'
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
  }
};

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

const viewPost = async (req, res) => {
  try {
    const {id} = req.params;
    const post = await PostModel.findById(id);
    res.json({
      success: true,
      post,
    })
  } catch (error) {
    
  }
}

module.exports = {
  post,
  getPosts,
  viewPost,
};
