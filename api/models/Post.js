const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    summary: {type: String, required: true},
    file: {type: String},
    content: {type: String, required: true},
    author: {type: Object, required: true}
}, {
    timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
 