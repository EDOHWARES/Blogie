const express = require('express');
const { registerUser, loginUser, userProfile, logoutUser, post } = require('../controllers/User');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', userProfile);
userRouter.post('/logout', logoutUser);
userRouter.post('/post', upload.single('file'), post)

module.exports = userRouter;