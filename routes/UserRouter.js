const express = require('express');
const router = express.Router();

const { register, login, getCurrentUser } = require('../controllers/UserController');

//Middleware
const  validation  = require('../middlewares/handleValidation');
const { useCreateValidation, loginValidation } = require('../middlewares/useValidation');
const authGuard = require('../middlewares/authGuard');

router.post('/register', useCreateValidation(), validation, register);
router.post('/login', loginValidation(), validation, login);
router.get('/profile', authGuard, getCurrentUser);

module.exports = router;