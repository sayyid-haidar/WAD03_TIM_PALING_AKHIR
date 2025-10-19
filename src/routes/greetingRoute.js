const express = require("express");
const router = express.Router();
const greetingController = require('../controllers/greetingController');

router.get("/", greetingController.getWelcome);

router.get("/greeting", greetingController.getGreeting);

module.exports = router;
