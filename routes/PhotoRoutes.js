const express = require('express');
const router = express.Router();

const { photoInsertValidation } = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard');
const validation = require('../middlewares/handleValidation');

module.exports = router;