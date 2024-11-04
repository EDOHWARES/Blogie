const express = require('express');
const { registerUser, loginUser } = require('../controllers/User');
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/loginUser', loginUser);

module.exports = userRouter;