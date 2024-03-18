const {body} = require('express-validator');

const useCreateValidation = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({min: 3})
            .withMessage('Name must be at least 3 characters long'),
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('confirmPassword')
            .notEmpty()
            .withMessage('Confirm Password is required')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            })
    ];
}

const loginValidation = () => {
    return [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ];
}

module.exports = {useCreateValidation, loginValidation};