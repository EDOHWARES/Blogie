const UserModel = require("../models/User");
const PostModel = require('../models/Post');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const dotenv = require("dotenv").config();


// Create token
const createToken = (username, id) => {
  return jwt.sign({ username, id }, process.env.JWT_SECRET_KEY);
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await UserModel.findOne({ username });

    // Check if user exists
    if (!userExists) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check if password matches user's password in db
    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = createToken(username, userExists._id);
    res.clearCookie("token"); // clear existing cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        id: userExists._id,
        username: userExists.username,
        message: "Login successful",
      });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Confirm the existence of username
    const userNameExists = await UserModel.findOne({ username });
    if (userNameExists) {
      return res.json({
        success: false,
        message: "Username exists, choose another",
      });
    }

    // Don't allow a password length less than 8
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password cannot be less than 8 characters",
      });
    }

    const salt = await bcryptjs.genSalt(11);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
    });
    const user = await newUser.save();

    res.status(200).json({
      success: true,
      message: "You are registered",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const userProfile = async (req, res) => {
  // Check if the token exists in cookies
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token provided. Access denied." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, info) => {
    if (err) {
      return res
        .status(403)
        .json({
          error: "Token verification failed. Invalid or expired token.",
        });
    }

    // Send user info if verification is successful
    res.json(info);
  });
};

const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            sameSite: "None",
            expires: new Date()
        })

        res.status(200).json({
            success: true,
            message:'Logged out successfully'
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Server Error',
            error: error.message,
        })
    }
};

const post = async (req, res) => {
  try {
    const { title, summary, content } = req.body;

    const postExists = await PostModel.findOne({ title });
    if (postExists) {
      return res.json({
        success: false,
        message: 'Post already exists!'
      });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    // Retrieve author's name using synchronous JWT verification
    const { token } = req.cookies;
    let author = 'unknown'; // default to 'unknown' in case there's an issue
    try {
      const info = jwt.verify(token, process.env.JWT_SECRET_KEY);
      author = info['username']; // assuming the JWT contains 'username'
    } catch (err) {
      console.log('JWT verification error:', err);
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
      message: 'Post successfully created'
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({createdAt: -1});

    res.json({
      success: true,
      posts,
    })
  } catch (error) {
    res.json({
      success: false,
      message: 'Server Error',
      error: error.me
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
  post,
  getPosts,
};
