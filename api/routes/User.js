const express = require('express');
const { registerUser, loginUser, userProfile, logoutUser, post, getPosts } = require('../controllers/User');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', userProfile);
userRouter.post('/logout', logoutUser);
userRouter.post('/post', upload.single('file'), post)
userRouter.get('/posts', getPosts);

module.exports = userRouter;