const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');

router.get('/:name', aboutUsController.getAnggotaByName);

module.exports = router;