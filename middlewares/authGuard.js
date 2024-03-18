const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    const tokenHeader = req.header('authorization');
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ errors: ['No token, authorization denied'] });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = await User.findById(decoded._id).select('-password');
        next();
    }catch (err) {
        return res.status(401).json({ errors: [`Token invalido.`] });
    }
}

module.exports = authGuard;