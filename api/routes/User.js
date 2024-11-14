const express = require('express');
const { registerUser, loginUser, userProfile, logoutUser} = require('../controllers/User');
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', userProfile);
userRouter.post('/logout', logoutUser);

module.exports = userRouter;