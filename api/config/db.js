const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected!'));
};

module.exports = connectDB;