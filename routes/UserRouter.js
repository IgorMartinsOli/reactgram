const express = require('express');
const router = express.Router();

const { register, login, getCurrentUser, update } = require('../controllers/UserController');

//Middleware
const  validation  = require('../middlewares/handleValidation');
const { useCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/useValidation');
const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');

router.post('/register', useCreateValidation(), validation, register);
router.post('/login', loginValidation(), validation, login);
router.get('/profile', authGuard, getCurrentUser);
router.put(
    "/",
    authGuard,
    userUpdateValidation(),
    validation,
    imageUpload.single("profileImage"),
    update
);

module.exports = router;