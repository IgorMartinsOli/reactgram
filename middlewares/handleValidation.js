const { validationResult } = require('express-validator');

const validation = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next(); // Chama next() para passar o controle para o próximo middleware ou rota
    }

    const extractedErrors = [];

    errors.array().map(err => extractedErrors.push(err.msg));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = validation;
