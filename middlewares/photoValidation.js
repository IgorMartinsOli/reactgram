const { body, validationResult } = require('express-validator');

const photoInsertValidation = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .not()
            .equals("undefined")
            .withMessage("Title cannot be undefined")
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        body('image')
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Image is required');
                }
                return true;
            })
    ];
}

const commentValidation = () => {
    return [
        body('comment')
            .notEmpty()
            .withMessage('Comment is required')
            .isLength({ min: 3, max: 100 })
            .withMessage('Comment must be between 3 and 100 characters')
    ];
}

module.exports = {
    photoInsertValidation,
    commentValidation
}