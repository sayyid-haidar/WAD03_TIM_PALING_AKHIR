const express = require('express');
const router = express.Router();

const aboutUsRoute = require('./aboutUsRoute');
const greetingRoute = require('./greetingRoute');
const usersRoute = require('./usersRouting');
const productsRoute = require('./productsRoute');

router.use('/aboutus', aboutUsRoute);
router.use('/greeting', greetingRoute);
router.use('/user', usersRoute);
router.use('/products', productsRoute);

module.exports = router;
