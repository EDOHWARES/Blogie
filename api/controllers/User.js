const UserModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Create token
const createToken = (username, id) => {
    return jwt.sign({username, id}, process.env.JWT_SECRET_KEY);
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const userExists = await UserModel.findOne({username});

        // Check if user exists
        if (!userExists) {
            return res.json({
                success: false,
                message: 'User does not exist'
            });
        }

        // Check if password matches user's password in db
        const isMatch = await bcryptjs.compare(password, userExists.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Invalid password',
            });
        }

        const token = createToken(username, userExists._id);
        // res.status(200).json({
        //     success: true,
        //     token,
        // })
        res.cookie('token', token, {httpOnly: true, security: true}).json({
            success: true,
            message: "Login successful",
        });

    } catch (error) {
        res.json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const registerUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        // Confirm the existence of username
        const userNameExists = await UserModel.findOne({username});
        if (userNameExists) {
            return res.json({
                success: false,
                message: 'Username exists, choose another'
            });
        };

        // Don't allow a password length less than 8
        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Password cannot be less than 8 characters'
            });
        };

        const salt = await bcryptjs.genSalt(11);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({
            username: username,
            password: hashedPassword,
        });
        const user = await newUser.save();

        res.status(200).json({
            success: true,
            message: 'You are registered'
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const userProfile = async (req, res) => {
    // Retrieve cookies, verify and retrieve details
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, info) => {
       if (err) throw err;

       res.json(info);
    })
}

module.exports = {
    registerUser,
    loginUser,
    userProfile
};