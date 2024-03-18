const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ _id: id, }, secret, { expiresIn: '7d' });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(422).json({ errors: ['User already exists'] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        
        // If user was created sucessfully, return the token
        if (!newUser) {
            res.status(422).json({
            errors: ["User could not be created. Please try again later"],
            });
            return;
        }
        
        return res.status(201).json({
            _id: newUser._id,
            token: generateToken(newUser._id),
        });
    }
    catch (err) {
        return res.status(500).json({ errors: [`Internal server error: ${err.message}`] });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: ['Invalid credentials'] });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: ['Invalid credentials'] });
        }

        res.status(200).json({
            _id: user._id,
            profileImage: user.profileImage,
            token: generateToken(user._id),
        });
    }
    catch (err) {
        return res.status(500).json({ errors: [`Internal server error: ${err.message}`] });
    }
}

//get current logged in user
const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
}

module.exports = {
    register,
    login,
    getCurrentUser
}