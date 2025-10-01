const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.post('/', usersController.createUser);

router.put('/:username', usersController.updateUser);

console.log('usersRouting.js loaded');

module.exports = router;
console.log('usersRouting.js exported');

