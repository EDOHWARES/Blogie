const express = require('express');
const { registerUser, loginUser, userProfile } = require('../controllers/User');
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', userProfile);

module.exports = userRouter;