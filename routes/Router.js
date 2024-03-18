const express = require('express');
const router = express.Router();

router.use('/users', require('./UserRouter'));

router.get('/', (req, res) => {
    res.json('Hello World!');
});

module.exports = router;