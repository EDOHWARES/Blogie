const {post, getPosts, viewPost} = require('../controllers/Post');

const express = require('express');
const postRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


postRouter.post('/', upload.single('file'), post)
postRouter.get('/posts', getPosts);
postRouter.get('/viewPost/:id', viewPost);

module.exports = postRouter;