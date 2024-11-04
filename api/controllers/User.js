const UserModel = require('../models/User');
const bcryptjs = require('bcryptjs');

const loginUser = async (req, res) => {

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

module.exports = {
    registerUser,
    loginUser
};