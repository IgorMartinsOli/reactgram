const express = require('express');
const router = express.Router();

router.use('/api/users', require('./UserRouter'));
router.use('/api/photos', require('./PhotoRoutes'));

router.get('/', (req, res) => {
    res.json('Hello World!');
});

module.exports = router;