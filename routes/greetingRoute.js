const express = require('express');
const router = express.Router();

// GET /getting - API information
router.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API kami!' });
});

module.exports = router;